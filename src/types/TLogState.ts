import type { TOV } from './TTypeOfValues.ts';
import type { ELogState } from '../enums/ELogState.ts';

/**
 * Type representing valid log states
 * @type {TOV<typeof ELogState>}
 * @description Union type of all possible log state values
 */
export type TLogState = TOV<typeof ELogState>;
