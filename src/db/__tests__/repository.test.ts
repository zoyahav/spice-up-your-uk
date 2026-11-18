import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import { SpiceUpUkDB } from '../schema';
import {
  cacheLocalStandardPackRecords,
  recordSmartQuestionReview,
  resetLocalDeviceData,
  saveImportedCustomRecords,
  toggleStudyGuideSectionRead,
  updateAppSettings,
  updateUserProfile,
} from '../repository';

describe('Dexie Repository: Standard Pack Hydration & Safe Device Reset', () => {
  it('replaces legacy std18 records cleanly without duplicates and preserves them across device reset', async () => {
    const testDb = new SpiceUpUkDB(`test-db-${Date.now()}`);

    await updateAppSettings(
      {
        onboarded: true,
        theme: 'light',
        scriptUrl: 'https://script.google.com/macros/s/example/exec',
        passcode: 'secret-pass',
        activeProfileId: 'partner_b',
      },
      testDb,
    );
    await updateUserProfile('partner_b', { displayName: 'BiscuitTester' }, testDb);
    await toggleStudyGuideSectionRead('partner_b', 'sg-ch1-principles', true, testDb);
    await recordSmartQuestionReview(
      'partner_b',
      {
        id: 'q-ex01-02',
        chapterId: 'ch1',
        subtopicId: 'ch1-citizenship',
        type: 'single',
        prompt: 'How many questions are in the test?',
        options: ['18', '20', '24', '30'],
        correctIndices: [2],
        explanation: '24 questions.',
      },
      'good',
      true,
      testDb,
    );

    // Legacy un-numbered std18 record + user custom card
    await testDb.customContent.put({
      itemId: 'std18-q-ex01-legacyhash',
      kind: 'question',
      chapterId: 'ch1',
      subtopicId: 'ch1-principles',
      payloadJson: '{}',
      active: true,
      updatedAt: '2026-11-17T00:00:00.000Z',
    });
    await saveImportedCustomRecords(
      [
        {
          itemId: 'custom-fc-1',
          kind: 'flashcard',
          chapterId: 'ch2',
          subtopicId: 'ch2-nations',
          payloadJson: '{}',
          active: true,
          updatedAt: '2026-11-17T00:00:00.000Z',
        },
      ],
      testDb,
    );

    // Re-hydrating numbered std18 records removes legacy std18 keys without touching custom-fc-1
    await cacheLocalStandardPackRecords(
      [
        {
          itemId: 'std18-q-ex01-01-newhash',
          kind: 'question',
          chapterId: 'ch1',
          subtopicId: 'ch1-principles',
          payloadJson: '{}',
          active: true,
          updatedAt: '2026-11-17T01:00:00.000Z',
        },
      ],
      testDb,
    );

    const beforeResetKeys = await testDb.customContent.toCollection().primaryKeys();
    expect(beforeResetKeys).toEqual(['custom-fc-1', 'std18-q-ex01-01-newhash']);
    expect(await testDb.srsProgress.count()).toBe(1);
    expect(await testDb.syncOutbox.count()).toBeGreaterThan(0);

    // Execute full local device reset
    await resetLocalDeviceData(testDb);

    const cfgAfter = await testDb.appConfig.get('app');
    expect(cfgAfter?.onboarded).toBe(false);
    expect(cfgAfter?.scriptUrl).toBe('');
    expect(cfgAfter?.passcode).toBe('');
    expect(cfgAfter?.theme).toBe('light');
    expect(cfgAfter?.standardPackHydrated).toBe(true);
    expect(await testDb.srsProgress.count()).toBe(0);
    expect(await testDb.dailyActivity.count()).toBe(0);
    expect(await testDb.syncOutbox.count()).toBe(0);

    // Standard 18 cached exams stay offline-ready while custom user imports are wiped
    const afterResetKeys = await testDb.customContent.toCollection().primaryKeys();
    expect(afterResetKeys).toEqual(['std18-q-ex01-01-newhash']);

    await testDb.delete();
  });
});
