import type { TLogLevel, TLogState } from './types/mod.ts';
import { ELogLevel, ELogState } from './enums/mod.ts';

/**
 * Logger class for providing consistent logging functionality across Deno and Browser environments.
 * @class
 * @description A singleton logger class that provides colored logging with different levels and states
 * @example
 * ```ts
 * const logger = Logger.getInstance();
 * logger.log("Hello world", "INFO", "APP");
 * ```
 */
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

	/**
	 * Private constructor to enforce singleton pattern
	 * @private
	 */
	private constructor() {
		this.#logState = ELogState.Debug;
	}

	/**
	 * Gets the singleton instance of the Logger
	 * @returns {Logger} The singleton Logger instance
	 * @example
	 * ```ts
	 * const logger = Logger.getInstance();
	 * ```
	 */
	public static getInstance(): Logger {
		if (!Logger.#instance) {
			Logger.#instance = new Logger();
		}
		return Logger.#instance;
	}

	/**
	 * Sets the minimum log level for filtering messages
	 * @param {TLogState} logState - The minimum log state to display
	 * @example
	 * ```ts
	 * logger.setLogLevel(3); // Show INFO and above only
	 * ```
	 */
	public setLogLevel(logState: TLogState): void {
		this.#logState = logState;
	}

	/**
	 * Checks if the code is running in Deno environment
	 * @private
	 * @returns {boolean} True if running in Deno, false otherwise
	 */
	#isDeno(): boolean {
		try {
			return Deno.osRelease() !== 'deno';
		} catch {
			return false;
		}
	}

	/**
	 * Formats current timestamp for log messages
	 * @private
	 * @returns {string} Formatted timestamp string (HH:mm:ss.SSS)
	 */
	#fd(): string {
		const dt = new Date();
		return `${String(dt.getHours()).padStart(2, '0')}:${String(
			dt.getMinutes()
		).padStart(2, '0')}:${String(dt.getSeconds()).padStart(2, '0')}.${String(
			dt.getMilliseconds()
		).padStart(3, '0')}`;
	}

	/**
	 * Internal method to format and display log messages
	 * @private
	 * @param {unknown} msg - The message to log
	 * @param {string | null} consoleText - Optional console text for Deno environment
	 */
	#setLog(msg: unknown, consoleText: string | null) {
		this.#message =
			msg instanceof Error
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
					`[%c${this.#logLevel}%c][%c${this.#fd()}%c][%c${this.#nameSpace}%c] ${
						this.#message
					}`,
					this.#color,
					this.#colorWhite,
					this.#colorSlateGray,
					this.#colorWhite,
					this.#color,
					this.#colorWhite
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
					this.#message
				);
			}
		}
	}

	/**
	 * Main logging method with support for different levels and namespaces
	 * @param {unknown} msg - The message or object to log
	 * @param {TLogLevel} [logLevel=ELogLevel.INFO] - The log level
	 * @param {string} [nameSpace='APP'] - The namespace for the log
	 * @example
	 * ```ts
	 * logger.log("Operation completed", "SUCCESS", "DATABASE");
	 * logger.log({ user: "john" }, "INFO", "AUTH");
	 * logger.log(new Error("Failed"), "ERROR", "API");
	 * ```
	 */
	public log(
		msg: unknown,
		logLevel: TLogLevel = ELogLevel.INFO,
		nameSpace = 'APP'
	) {
		this.#nameSpace = nameSpace;

		switch (logLevel) {
			case ELogLevel.ERROR:
				if (this.#logState >= ELogState.Error) {
					this.#logLevel = ELogLevel.ERROR;
					if (this.#isDeno()) {
						this.#consoleText = `[\u001b[38;5;214mWarn\u001b[0m][\u001b[38;5;247m${this.#fd()}\u001b[0m][\u001b[38;5;214m${nameSpace}\u001b[0m]`;
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
						this.#consoleText = `[\u001b[38;5;214mWarn\u001b[0m][\u001b[38;5;247m${this.#fd()}\u001b[0m][\u001b[38;5;214m${nameSpace}\u001b[0m]`;
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
						this.#consoleText = `[\u001b[38;5;75mInfo\u001b[0m][\u001b[38;5;247m${this.#fd()}\u001b[0m][\u001b[38;5;75m${nameSpace}\u001b[0m]`;
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
						this.#consoleText = `[\u001b[38;5;49mSuccess\u001b[0m][\u001b[38;5;247m${this.#fd()}\u001b[0m][\u001b[38;5;49m${nameSpace}\u001b[0m]`;
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
						this.#consoleText = `[\u001b[38;5;33mDebug\u001b[0m][\u001b[38;5;247m${this.#fd()}\u001b[0m][\u001b[38;5;33m${nameSpace}\u001b[0m]`;
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

/**
 * Pre-initialized singleton instance of the Logger
 * @const {Logger}
 */
export const logger: Logger = Logger.getInstance();
