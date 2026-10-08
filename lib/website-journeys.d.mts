/** An immutable equipment choice and its Russian short enquiry greeting. */
export interface EquipmentChoice {
  readonly id: 'mini-excavator' | 'loader' | 'breaker' | 'tractor' | 'advice';
  readonly label: string;
  readonly greeting: string;
}

/** Immutable choices in the contract's prescribed order. */
export declare const equipmentChoices: readonly EquipmentChoice[];

/** Immutable make/model groups; labels are exact supplied catalogue categories. */
export interface MopedGroup {
  readonly brand: 'Honda' | 'Yamaha' | 'Suzuki';
  readonly models: readonly string[];
}
export declare const mopedGroups: readonly MopedGroup[];

export interface EquipmentAnswers {
  readonly work?: unknown;
  readonly timing?: unknown;
  readonly access?: unknown;
}

export interface EquipmentMessageOptions {
  /** Canonical input is a choice ID; an object with a string id is accepted for compatibility. */
  readonly equipment?: string | { readonly id?: unknown } | null;
  readonly answers?: EquipmentAnswers | null;
}

/** Generate the Russian greeting and nonblank string answers; trims only answer edges. */
export declare function createEquipmentMessage(options?: EquipmentMessageOptions): string;

export interface ResolveEquipmentMessageOptions extends EquipmentMessageOptions {
  /** Any string, including '', is authoritative until explicitly reset with null. */
  readonly manualMessage?: string | null;
}

/** Return manualMessage when it is a string; null/omitted regenerates from current state. */
export declare function resolveEquipmentMessage(options?: ResolveEquipmentMessageOptions): string;

/** Create an enquiry only for an exact brand and model label in mopedGroups. */
export declare function createMopedModelMessage(brand: string, model: string): string;

/**
 * Format a source-specific enquiry for a credential-free HTTPS Instagram /p/ or /reel/ permalink.
 * The supplied URL is preserved byte-for-byte; no media fetch or identity verification occurs.
 * @throws TypeError unless the entire input is an exact HTTPS instagram.com or www.instagram.com
 * /p/<shortcode>/ or /reel/<shortcode>/ URL with an ASCII letter, digit, underscore, or hyphen shortcode.
 * One optional username segment before p/reel may contain ASCII letters, digits, underscores and dots,
 * and must contain at least one letter, digit or underscore (dot-only usernames are invalid).
 * Whitespace, escapes, dot segments, credentials, ports, query, and hash are rejected.
 */
export declare function createMopedSourceMessage(sourceUrl: string): string;
