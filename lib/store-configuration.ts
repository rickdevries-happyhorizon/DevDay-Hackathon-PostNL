/** PostNL in-store handoff configuration (saved locally for demo). */

export const STORE_BARCODE_PREFIX = "3SPOSTNL";

export const SAVE_CONFIGURATION_MESSAGE =
  "Sla mijn huidige configuratie op voor in de winkel";

const DRAFT_KEY = "postnl-conversation-draft";

export type StoreFieldStatus = "confirmed" | "estimated" | "missing";

export interface StoreConfigurationField {
  label: string;
  value?: string;
  status: StoreFieldStatus;
}

export interface StoreConfiguration {
  barcode: string;
  reason: string;
  summary?: string;
  fields: StoreConfigurationField[];
  pendingQuestions?: string[];
}

export interface SavedStoreConfiguration extends StoreConfiguration {
  savedAt: string;
}

const LATEST_KEY = "postnl-store-config-latest";

export function storeConfigStorageKey(barcode: string): string {
  return `postnl-store-config-${barcode}`;
}

export function saveStoreConfiguration(config: StoreConfiguration): SavedStoreConfiguration {
  const payload: SavedStoreConfiguration = {
    ...config,
    savedAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(storeConfigStorageKey(config.barcode), JSON.stringify(payload));
    localStorage.setItem(LATEST_KEY, JSON.stringify(payload));
  }

  return payload;
}

export function loadLatestStoreConfiguration(): SavedStoreConfiguration | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(LATEST_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SavedStoreConfiguration;
  } catch {
    return null;
  }
}

export function generateStoreBarcode(): string {
  const digits = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 10).toString(),
  ).join("");
  return `${STORE_BARCODE_PREFIX}${digits}`;
}

export interface ConversationDraft {
  messages: Array<{ role: string; content: string }>;
  savedAt: string;
}

export function saveConversationDraft(
  messages: Array<{ role: string; content: string }>,
): ConversationDraft {
  const payload: ConversationDraft = {
    messages,
    savedAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
  }

  return payload;
}

export function loadConversationDraft(): ConversationDraft | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(DRAFT_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ConversationDraft;
  } catch {
    return null;
  }
}

export function isValidStoreBarcode(barcode: string): boolean {
  return /^3SPOSTNL\d{10}$/.test(barcode);
}

export const STORE_FIELD_STATUS_LABELS: Record<StoreFieldStatus, string> = {
  confirmed: "Bevestigd",
  estimated: "Geschat",
  missing: "Nog invullen",
};
