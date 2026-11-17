/**
 * Offline-First Sync Service & Private QR Pairing Codec.
 *
 * Security & Privacy Design:
 * - Zero URLs, passcodes, or personal names exist in source code.
 * - Pairing payload `{ scriptUrl, passcode, partnerNames }` is encoded into `#pair=<base64url>`
 *   so scanning a QR code opens the app, saves credentials locally into IndexedDB, and immediately
 *   strips the hash from browser history.
 * - Uses `Content-Type: text/plain;charset=utf-8` so Google Apps Script Web Apps accept the POST
 *   without failing on CORS preflight (`OPTIONS`).
 */

import type {
  ProfileId,
  SyncOutboxItem,
  SyncTableName,
  UserProfile,
} from '../types/domain';

export interface PairingPayload {
  readonly v: 1;
  readonly scriptUrl: string;
  readonly passcode: string;
  readonly partnerAName?: string;
  readonly partnerBName?: string;
  readonly suggestedProfile?: ProfileId;
}

export function encodePairingPayload(payload: PairingPayload): string {
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodePairingPayload(encoded: string): PairingPayload | null {
  try {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4));
    const binary = atob(base64 + pad);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const parsed = JSON.parse(new TextDecoder().decode(bytes)) as Partial<PairingPayload>;
    if (
      parsed.v === 1 &&
      typeof parsed.scriptUrl === 'string' &&
      parsed.scriptUrl.startsWith('https://') &&
      typeof parsed.passcode === 'string'
    ) {
      return parsed as PairingPayload;
    }
    return null;
  } catch {
    return null;
  }
}

export function buildPairingUrl(baseUrl: string, payload: PairingPayload): string {
  const cleanBase = baseUrl.split('#')[0]!;
  return `${cleanBase}#pair=${encodePairingPayload(payload)}`;
}

export function extractPairingPayloadFromHash(hash: string): PairingPayload | null {
  if (!hash || !hash.includes('pair=')) return null;
  const cleaned = hash.replace(/^#/, '');
  const params = new URLSearchParams(cleaned);
  const token = params.get('pair');
  if (!token) return null;
  return decodePairingPayload(token);
}

/**
 * Deduplicates outbox mutations by `(table, recordKey)`, keeping only the newest `updatedAt` per record
 * before sending over the wire (saves bandwidth when coming out of a long Tube journey!).
 */
export function compactOutboxMutations(items: readonly SyncOutboxItem[]): SyncOutboxItem[] {
  const map = new Map<string, SyncOutboxItem>();
  for (const item of items) {
    const composite = `${item.table}::${item.recordKey}`;
    const existing = map.get(composite);
    if (!existing || item.updatedAt >= existing.updatedAt) {
      map.set(composite, item);
    }
  }
  return Array.from(map.values());
}

/**
 * Last-Write-Wins (LWW) comparator using ISO-8601 `updatedAt` timestamps.
 * Returns true if `incoming` should overwrite `local`.
 */
export function shouldAcceptIncomingRecord(
  localUpdatedAt: string | undefined,
  incomingUpdatedAt: string | undefined,
): boolean {
  if (!incomingUpdatedAt) return false;
  if (!localUpdatedAt) return true;
  return incomingUpdatedAt >= localUpdatedAt;
}

export interface SyncRemoteRecord {
  readonly table: SyncTableName;
  readonly recordKey: string;
  readonly payload: Record<string, unknown>;
  readonly updatedAt: string;
}

export interface SyncRequestPayload {
  readonly passcode: string;
  readonly profileId: ProfileId;
  readonly profile: UserProfile;
  readonly since: string | null;
  readonly mutations: readonly {
    table: SyncTableName;
    recordKey: string;
    updatedAt: string;
    payload: Record<string, unknown>;
  }[];
}

export interface SyncResponsePayload {
  readonly ok: boolean;
  readonly error?: string;
  readonly serverTime: string;
  readonly updates: readonly SyncRemoteRecord[];
}

export type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

/**
 * Sends compacted mutations to the private Google Apps Script Web App and returns delta updates.
 */
export async function exchangeWithAppsScript(
  scriptUrl: string,
  requestBody: SyncRequestPayload,
  fetchImpl: FetchLike = fetch,
): Promise<SyncResponsePayload> {
  if (!scriptUrl || !scriptUrl.startsWith('https://')) {
    throw new Error('Sync endpoint URL must start with https://');
  }

  const response = await fetchImpl(scriptUrl, {
    method: 'POST',
    // Crucial: text/plain avoids CORS OPTIONS preflight which Google Apps Script rejects
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(requestBody),
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`Sync HTTP error: ${response.status}`);
  }

  const json = (await response.json()) as SyncResponsePayload;
  if (!json.ok) {
    throw new Error(json.error || 'Apps Script returned ok=false');
  }

  return json;
}
