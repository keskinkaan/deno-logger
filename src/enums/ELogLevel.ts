/**
 * Enum for log levels used in the logger
 * @enum {string}
 * @readonly
 * @description Defines the available log levels for messages
 */
export const ELogLevel = {
	/** Critical errors and exceptions */
	ERROR: 'ERROR',
	/** Warning messages */
	WARN: 'WARN',
	/** Successful operations */
	SUCCESS: 'SUCCESS',
	/** General information */
	INFO: 'INFO',
	/** Detailed debug information */
	DEBUG: 'DEBUG',
} as const;
