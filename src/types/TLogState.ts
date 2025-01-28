import type { TOV } from './TTypeOfValues.ts';
import { ELogState } from '../enums/ELogState.ts';

export type TLogState = TOV<typeof ELogState>;
