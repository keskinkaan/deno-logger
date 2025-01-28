import type { TOV } from './TTypeOfValues.ts';
import type { ELogLevel } from '../enums/mod.ts';

/**
 * Type representing valid log levels
 * @type {TOV<typeof ELogLevel>}
 * @description Union type of all possible log level values
 */
export type TLogLevel = TOV<typeof ELogLevel>;
