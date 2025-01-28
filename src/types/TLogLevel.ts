import type { TOV } from './TTypeOfValues.ts';
import type { ELogLevel } from '../enums/mod.ts';

export type TLogLevel = TOV<typeof ELogLevel>;
