/**
 * Enum for log states that control message filtering
 * @enum {number}
 * @readonly
 * @description Defines the log states that determine which messages are displayed
 */
export const ELogState = {
	/** Disable all logging */
	Silent: 0,
	/** Show only error messages */
	Error: 1,
	/** Show errors and warnings */
	Warn: 2,
	/** Show errors, warnings, and info */
	Info: 3,
	/** Show all except debug messages */
	Success: 4,
	/** Show all messages */
	Debug: 5,
} as const;
