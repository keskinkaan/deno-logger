import type { TLogLevel, TLogState } from './types/mod.ts';
import { ELogLevel, ELogState } from './enums/mod.ts';

export class Logger {
	static #instance: Logger;
	#logState: number;
	#nameSpace = 'APP';
	#logLevel: TLogLevel = ELogLevel.INFO;
	#message: unknown = '';
	#consoleText: string | null = null;
	// colors
	#color: string = 'color: SkyBlue';
	#colorSlateGray: string = 'color: SlateGrey';
	#colorWhite: string = 'color: white';

	private constructor() {
		this.#logState = ELogState.Debug;
	}

	public static getInstance(): Logger {
		if (!Logger.#instance) {
			Logger.#instance = new Logger();
		}
		return Logger.#instance;
	}

	public setLogLevel(logState: TLogState): void {
		this.#logState = logState;
	}

	#isDeno(): boolean {
		try {
			return Deno.osRelease() !== 'deno';
		} catch {
			return false;
		}
	}

	#fd(): string {
		const dt = new Date();
		return `${String(dt.getHours()).padStart(2, '0')}:${
			String(
				dt.getMinutes(),
			).padStart(2, '0')
		}:${String(dt.getSeconds()).padStart(2, '0')}.${
			String(
				dt.getMilliseconds(),
			).padStart(3, '0')
		}`;
	}

	#setLog(msg: unknown, consoleText: string | null) {
		this.#message = msg instanceof Error
			? `${msg.message}\n ${msg.stack}`
			: typeof msg === 'object'
			? JSON.stringify(msg, null, 2)
			: msg;

		if (consoleText !== null) {
			console.log(`${consoleText} ${this.#message as string}`);
		} else {
			if (
				typeof this.#message === 'string' ||
				typeof this.#message === 'number' ||
				typeof this.#message === 'boolean'
			) {
				console.log(
					`[%c${this.#logLevel}%c][%c${this.#fd()}%c][%c${this.#nameSpace}%c] ${this.#message}`,
					this.#color,
					this.#colorWhite,
					this.#colorSlateGray,
					this.#colorWhite,
					this.#color,
					this.#colorWhite,
				);
			} else {
				console.log(
					`[%c${this.#logLevel}%c][%c${this.#fd()}%c][%c${this.#nameSpace}%c]`,
					this.#color,
					this.#colorWhite,
					this.#colorSlateGray,
					this.#colorWhite,
					this.#color,
					this.#colorWhite,
					this.#message,
				);
			}
		}
	}

	public log(
		msg: unknown,
		logLevel: TLogLevel = ELogLevel.INFO,
		nameSpace = 'APP',
	) {
		this.#nameSpace = nameSpace;

		switch (logLevel) {
			case ELogLevel.ERROR:
				if (this.#logState >= ELogState.Error) {
					this.#logLevel = ELogLevel.ERROR;
					if (this.#isDeno()) {
						this.#consoleText =
							`[\u001b[38;5;214mWarn\u001b[0m][\u001b[38;5;247m${this.#fd()}\u001b[0m][\u001b[38;5;214m${nameSpace}\u001b[0m]`;
					} else {
						this.#consoleText = null;
						this.#color = 'color: GoldenRod';
					}
					this.#setLog(msg, this.#consoleText);
				}
				break;
			case ELogLevel.WARN:
				if (this.#logState >= ELogState.Warn) {
					this.#logLevel = ELogLevel.WARN;
					if (this.#isDeno()) {
						this.#consoleText =
							`[\u001b[38;5;214mWarn\u001b[0m][\u001b[38;5;247m${this.#fd()}\u001b[0m][\u001b[38;5;214m${nameSpace}\u001b[0m]`;
					} else {
						this.#consoleText = null;
						this.#color = 'color: GoldenRod';
					}
					this.#setLog(msg, this.#consoleText);
				}
				break;
			case ELogLevel.INFO:
				if (this.#logState >= ELogState.Info) {
					this.#logLevel = ELogLevel.INFO;
					if (this.#isDeno()) {
						this.#consoleText =
							`[\u001b[38;5;75mInfo\u001b[0m][\u001b[38;5;247m${this.#fd()}\u001b[0m][\u001b[38;5;75m${nameSpace}\u001b[0m]`;
					} else {
						this.#consoleText = null;
						this.#color = 'color: SkyBlue';
					}
					this.#setLog(msg, this.#consoleText);
				}
				break;
			case ELogLevel.SUCCESS:
				if (this.#logState >= ELogState.Success) {
					this.#logLevel = ELogLevel.SUCCESS;
					if (this.#isDeno()) {
						this.#consoleText =
							`[\u001b[38;5;49mSuccess\u001b[0m][\u001b[38;5;247m${this.#fd()}\u001b[0m][\u001b[38;5;49m${nameSpace}\u001b[0m]`;
					} else {
						this.#consoleText = null;
						this.#color = 'color: SpringGreen';
					}
					this.#setLog(msg, this.#consoleText);
				}
				break;
			case ELogLevel.DEBUG:
				if (this.#logState >= ELogState.Debug) {
					this.#logLevel = ELogLevel.DEBUG;
					if (this.#isDeno()) {
						this.#consoleText =
							`[\u001b[38;5;33mDebug\u001b[0m][\u001b[38;5;247m${this.#fd()}\u001b[0m][\u001b[38;5;33m${nameSpace}\u001b[0m]`;
					} else {
						this.#consoleText = null;
						this.#color = 'color: violet';
					}
					this.#setLog(msg, this.#consoleText);
				}
				break;
		}
	}
}

export const logger: Logger = Logger.getInstance();
