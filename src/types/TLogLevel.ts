import type { TOV } from './TTypeOfValues.ts';
import { ELogLevel } from '../enums/mod.ts';

export type TLogLevel = TOV<typeof ELogLevel>;
