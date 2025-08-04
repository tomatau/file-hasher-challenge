# File Hasher Challenge

A React application that:

1. accepts a user supplied file
2. spins up a web worker to hash the file in 64mb chunks using wasm
3. displays the resulting sha-256 hash

## Getting set-up

- Install Bun version **v1.2.18**
- `bun install`

## Commands

### Develop

```bash
bun run dev
```

Spins up vite using Bun with hot-reload on the application

### Build

```
bun run build
```

Builds the assets into the `/dist` directory

### Preview

```
bun run preview
```

Spins up a preview server for the `/dist` directory

### Testing

Run the functional tests. These load the whole app to test user focused features

```bash
bun run test:func
# or, for a UI
bun run test:func:ui
```

Run the unit tests with Bun

```bash
bun run test:unit
```

### Lint

```bash
bun run lint
```
