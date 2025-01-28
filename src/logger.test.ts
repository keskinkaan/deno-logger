import { assertEquals } from 'jsr:@std/assert@^1.0.11';
import { logger } from './logger.ts';

// Test setup for console logging
let originalConsoleLog: typeof console.log;
let logCalls: unknown[][] = [];

function mockConsoleLog(...args: unknown[]) {
	logCalls.push(args);
}

Deno.test('Logger functionality tests', async (t) => {
	// Setup before each test
	function setup() {
		originalConsoleLog = console.log;
		console.log = mockConsoleLog;
		logCalls = [];
	}

	// Cleanup after each test
	function cleanup() {
		console.log = originalConsoleLog;
		logCalls = [];
	}

	await t.step('should log a message with INFO level by default', () => {
		setup();
		logger.log('Test message');
		assertEquals(logCalls.length, 1);
		cleanup();
	});

	await t.step('should log a message with specified namespace', () => {
		setup();
		const namespace = 'CustomNamespace';
		logger.log('Test message', 'ERROR', namespace);
		assertEquals(logCalls.length, 1);
		const output = logCalls[0]?.join(' ') ?? '';
		assertEquals(output.includes(namespace), true);
		cleanup();
	});

	await t.step('should log an object message correctly', () => {
		setup();
		const testObj = { key: 'value' };
		logger.log(testObj, 'DEBUG');
		assertEquals(logCalls.length, 1);
		const output = logCalls[0]?.join(' ') ?? '';
		assertEquals(output.includes(JSON.stringify(testObj, null, 2)), true);
		cleanup();
	});

	await t.step('should log an Error message with stack trace', () => {
		setup();
		const error = new Error('Test error');
		logger.log(error, 'ERROR');
		assertEquals(logCalls.length, 1);
		const output = logCalls[0]?.join(' ') ?? '';
		assertEquals(output.includes('Test error'), true);
		assertEquals(output.includes('Error:'), true);
		cleanup();
	});

	await t.step('should respect log levels and states', async (t) => {
		await t.step('should not log DEBUG when state is SUCCESS', () => {
			setup();
			logger.setLogLevel(4); // SUCCESS state
			logger.log('Test message', 'DEBUG');
			assertEquals(logCalls.length, 0);
			cleanup();
		});

		await t.step('should not log INFO when state is WARN', () => {
			setup();
			logger.setLogLevel(2); // WARN state
			logger.log('Test message', 'INFO');
			assertEquals(logCalls.length, 0);
			cleanup();
		});

		await t.step('should log ERROR when state is ERROR', () => {
			setup();
			logger.setLogLevel(1); // ERROR state
			logger.log('Test message', 'ERROR');
			assertEquals(logCalls.length, 1);
			cleanup();
		});
	});

	await t.step('should log all levels when in DEBUG state', () => {
		setup();
		logger.setLogLevel(5); // DEBUG state
		logger.log('Debug message', 'DEBUG');
		logger.log('Info message', 'INFO');
		logger.log('Success message', 'SUCCESS');
		logger.log('Warn message', 'WARN');
		logger.log('Error message', 'ERROR');
		assertEquals(logCalls.length, 5);
		cleanup();
	});
});
