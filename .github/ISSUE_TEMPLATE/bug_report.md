---
name: Bug Report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''
---

## Bug Description

A clear and concise description of the bug.

## Steps to Reproduce

1. Import module '...'
2. Configure with '...'
3. Run code '...'
4. See error

## Expected Behavior

A clear description of what you expected to happen.

## Actual Behavior

A clear description of what actually happened.

## Code Example

```typescript
import { logger } from '@kinbay/logger';

// Show INFO and above
logger.setLogLevel(3);

// Show where the error occurs
logger.log('Starting application...', 'INFO', 'APP');
logger.log('Operation successful!', 'SUCCESS', 'DATABASE');
logger.log('Debug information', 'DEBUG', 'SYSTEM');
logger.log('Warning state', 'WARN', 'AUTH');
logger.log('Error occurred', 'ERROR', 'API');

logger.log({ user: 'john', id: 123 }, 'INFO', 'USER');

try {
	throw new Error('Database connection failed');
} catch (error) {
	logger.log(error, 'ERROR', 'DATABASE');
}
```

## Environment

- Deno version: [e.g. 1.0.0]
- OS: [e.g. macOS 10.15.4]
- Package version: [e.g. 1.0.0]

## Additional Context

Add any other context about the problem here.
