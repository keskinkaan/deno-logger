# @kinbay/logger

A simple and lightweight logger for Deno and Browser applications with colorful output.

## Features

- 🦕 Cross-platform support (Deno and Browser)
- 🎨 Adaptive colorful output (terminal colors in Deno, CSS colors in browser)
- 🔄 Singleton pattern for consistent logging
- 📊 Five log levels (DEBUG, INFO, SUCCESS, WARN, ERROR)
- ⚙️ Configurable log states
- 🏷️ Namespace support
- 💡 Easy to use API

## Installation

```typescript
import { Logger } from 'jsr:@kinbay/logger';
```

## Usage

```typescript
import { Logger } from 'jsr:@kinbay/logger';

// Get logger instance
const logger = Logger.getInstance();

// Basic logging with different levels
logger.log('Starting application...', 'INFO', 'APP');
logger.log('Operation successful!', 'SUCCESS', 'DATABASE');
logger.log('Debug information', 'DEBUG', 'SYSTEM');
logger.log('Warning state', 'WARN', 'AUTH');
logger.log('Error occurred', 'ERROR', 'API');

// Logging objects
logger.log({ user: 'john', id: 123 }, 'INFO', 'USER');

// Logging errors with stack trace
try {
	throw new Error('Database connection failed');
} catch (error) {
	logger.log(error, 'ERROR', 'DATABASE');
}
```

## Log Levels

Available log levels (ELogLevel):

- `ERROR` - Critical errors and exceptions
- `WARN` - Warning messages
- `SUCCESS` - Successful operations
- `INFO` - General information
- `DEBUG` - Detailed debug information

## Log States

Log states (ELogState) control which messages are displayed:

- `Silent: 0` - No logs
- `Error: 1` - Only errors
- `Warn: 2` - Errors and warnings
- `Info: 3` - Errors, warnings, and info
- `Success: 4` - All except debug
- `Debug: 5` - All messages

## Configuration

Set the minimum log state to control output:

```typescript
const logger = Logger.getInstance();
logger.setLogLevel(3); // Show INFO and above
```

## Output Format

Messages are formatted as:

```
[LEVEL][TIMESTAMP][NAMESPACE] message
```

Example:

```
[INFO][12:34:56.789][APP] Starting application...
```

## Platform Specific Behavior

### Deno

- Uses terminal color codes
- Full timestamp support
- Native console formatting

### Browser

- Uses CSS colors
- Full timestamp support
- Browser-friendly console output

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details
