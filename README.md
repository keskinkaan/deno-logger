# @kinbay/logger

[![JSR](https://jsr.io/badges/@kinbay/logger)](https://jsr.io/@kinbay/logger)
[![JSR Score](https://jsr.io/badges/@kinbay/logger/score)](https://jsr.io/@kinbay/logger)
[![CI](https://github.com/keskinkaan/deno-logger/actions/workflows/ci.yml/badge.svg)](https://github.com/keskinkaan/deno-logger/actions/workflows/ci.yml)
[![GitHub](https://img.shields.io/github/license/keskinkaan/deno-logger?color=blue)](https://github.com/keskinkaan/deno-logger/blob/dev/LICENSE)

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

```sh
deno add jsr:@kinbay/logger
```

Add the following to your `deno.json` file:

```json
{
	"imports": {
		"@logger": "jsr:@kinbay/logger"
	}
}
```

## Usage

```typescript
import { logger } from '@logger';

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
import { logger } from '@logger';

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

This project welcomes contributions and suggestions. Here's how you can help:

### Development

1. Fork the repository

2. Create your feature branch:

```sh
git checkout -b feature/amazing-feature
```

3. Run tests to ensure everything works:

```sh
deno task test
```

4. Set up pre-commit hook for code formatting:

```sh
# Copy pre-commit hook
cp hooks/pre-commit .git/hooks/
chmod +x .git/hooks/pre-commit
```

5. Make your changes and ensure:

   - Code follows the existing style
   - Tests pass (`deno task test`)
   - Types are correct (`deno task check`)
   - Code is formatted (`deno task prettify`)

6. Commit your changes:

```sh
git commit -m 'feat: add some amazing feature'
```

7. Push to the branch:

```sh
git push origin feature/amazing-feature
```

8. Open a Pull Request

### Bug Reports

Found a bug? Please open an issue with:

- Clear description of the bug
- Steps to reproduce with code example
- Expected vs actual behavior
- Environment details (Deno version, OS, package version)

## License

MIT © [Kaan Keskin](LICENSE)
