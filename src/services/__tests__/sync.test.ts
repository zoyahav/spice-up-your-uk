import 'fake-indexeddb/auto';
import { describe, expect, it, vi } from 'vitest';
import { SpiceUpUkDB } from '../../db/schema';
import {
  recordFlashcardReview,
  runFullSync,
  updateAppSettings,
} from '../../db/repository';
import {
  buildPairingUrl,
  compactOutboxMutations,
  exchangeWithAppsScript,
  extractPairingPayloadFromHash,
} from '../sync';

describe('Offline Outbox, Pairing QR Codec & Google Sheet Sync', () => {
  it('encodes and decodes private QR pairing URLs without leaking invalid schemes', () => {
    const url = buildPairingUrl('https://example.github.io/spice-up-your-uk/', {
      v: 1,
      scriptUrl: 'https://script.google.com/macros/s/abc123/exec',
      passcode: 'zig-a-zig-secret',
      partnerAName: 'Ginger',
      partnerBName: 'Posh',
      suggestedProfile: 'partner_b',
    });

    const hash = '#' + url.split('#')[1]!;
    const decoded = extractPairingPayloadFromHash(hash);
    expect(decoded).toEqual({
      v: 1,
      scriptUrl: 'https://script.google.com/macros/s/abc123/exec',
      passcode: 'zig-a-zig-secret',
      partnerAName: 'Ginger',
      partnerBName: 'Posh',
      suggestedProfile: 'partner_b',
    });
  });

  it('compacts repeated offline Tube mutations for the same card down to the latest state', () => {
    const compacted = compactOutboxMutations([
      {
        seq: 1,
        table: 'srsProgress',
        recordKey: 'partner_a:fc-1',
        payload: { intervalDays: 1 },
        updatedAt: '2026-11-17T08:00:00.000Z',
        createdAt: '2026-11-17T08:00:00.000Z',
      },
      {
        seq: 2,
        table: 'srsProgress',
        recordKey: 'partner_a:fc-1',
        payload: { intervalDays: 4 },
        updatedAt: '2026-11-17T08:05:00.000Z',
        createdAt: '2026-11-17T08:05:00.000Z',
      },
    ]);

    expect(compacted).toHaveLength(1);
    expect(compacted[0]?.payload).toEqual({ intervalDays: 4 });
  });

  it('queues mutations offline in IndexedDB and syncs cleanly via CORS-simple text/plain POST', async () => {
    const testDb = new SpiceUpUkDB(`TestDB_${Date.now()}`);
    await updateAppSettings(
      {
        scriptUrl: 'https://script.google.com/macros/s/mock/exec',
        passcode: 'secret-123',
        activeProfileId: 'partner_a',
      },
      testDb,
    );

    await recordFlashcardReview('partner_a', 'fc-ch1-001', 'good', testDb);
    expect(await testDb.syncOutbox.count()).toBeGreaterThan(0);

    const mockFetch = vi.fn(async (_url: string, init?: RequestInit) => {
      expect(init?.method).toBe('POST');
      expect((init?.headers as Record<string, string>)['Content-Type']).toContain('text/plain');
      return new Response(
        JSON.stringify({
          ok: true,
          serverTime: '2026-11-17T12:30:00.000Z',
          updates: [
            {
              table: 'dailyActivity',
              recordKey: 'partner_b:2026-11-17',
              updatedAt: '2026-11-17T12:25:00.000Z',
              payload: {
                key: 'partner_b:2026-11-17',
                profileId: 'partner_b',
                date: '2026-11-17',
                xp: 75,
                cardsReviewed: 10,
                questionsAnswered: 10,
                gamesPlayed: 1,
                freezeUsed: false,
                updatedAt: '2026-11-17T12:25:00.000Z',
              },
            },
          ],
        }),
        { status: 200 },
      );
    });

    const result = await runFullSync(testDb, mockFetch);
    expect(result.pushed).toBeGreaterThan(0);
    expect(result.pulled).toBe(1);
    expect(await testDb.syncOutbox.count()).toBe(0);

    const partnerRecord = await testDb.dailyActivity.get('partner_b:2026-11-17');
    expect(partnerRecord?.xp).toBe(75);
    await testDb.delete();
  });

  it('detects HTML login pages and /dev URLs from Apps Script with clear instructions', async () => {
    const dummyReq = {
      passcode: 'p',
      profileId: 'partner_a' as const,
      profile: {
        id: 'partner_a' as const,
        displayName: 'Ginger',
        spiceAlias: 'Posh',
        avatarEmoji: '🐰',
        updatedAt: '2026-11-17T00:00:00.000Z',
      },
      since: null,
      mutations: [],
    };

    await expect(
      exchangeWithAppsScript(
        'https://script.google.com/macros/s/abc/dev',
        dummyReq,
      ),
    ).rejects.toThrow(/ends in \/dev/i);

    await expect(
      exchangeWithAppsScript(
        'https://script.google.com/macros/s/abc/exec',
        dummyReq,
        async () =>
          new Response('<!DOCTYPE html><html><body>accounts.google.com</body></html>', {
            status: 200,
            headers: { 'content-type': 'text/html; charset=utf-8' },
          }),
      ),
    ).rejects.toThrow(/Who has access: Anyone/i);
  });
});
