[![CI/CD](https://github.com/cornflea/react-pcc/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/cornflea/react-pcc/actions/workflows/ci-cd.yml)

# @cornflea/react-pcc

A CLI utility to check which version of a package is compatible with the React version in your project.

## Features
- Checks compatibility of npm packages with your project's React version
- Supports scoped packages (e.g., `@mui/material`, `@testing-library/react`)
- Simple CLI usage
- Fast and lightweight
- Built with TypeScript for better reliability and type safety

## Installation

```bash
npm install -g @cornflea/react-pcc
```

## Usage

```bash
react-pcc <package-name>
```

### Options
- `--help`    Show help information
- `--version` Show version number
- `--debug`   Show debug information for troubleshooting

## Examples

```bash
# Regular package
react-pcc zustand

# Scoped package
react-pcc @mui/material

# TypeScript types
react-pcc @types/react

# With debug information
react-pcc @emotion/react --debug
```

## Scoped Packages

This tool fully supports scoped packages (packages starting with `@`). When using scoped packages:

- Always include the complete package name: `@scope/package-name`
- Use quotes if your shell requires them: `"@mui/material"`
- The tool automatically handles URL encoding for special characters

### Common Issues with Scoped Packages

If you encounter issues with scoped packages, try these troubleshooting steps:

1. **Use quotes around the package name:**
   ```bash
   react-pcc "@mui/material"
   ```

2. **Check for typos in the scope or package name:**
   ```bash
   # ❌ Incorrect
   react-pcc @mui
   
   # ✅ Correct
   react-pcc @mui/material
   ```

3. **Use debug mode to see what's being processed:**
   ```bash
   react-pcc @mui/material --debug
   ```

4. **Verify the package exists on npm:**
   Visit `https://www.npmjs.com/package/@scope/package-name` to confirm the package exists.

## How It Works

1. Reads your project's `package.json` to find the React version
2. Fetches package information from npm registry
3. Finds versions that are compatible with your React version by checking `peerDependencies`
4. Returns the latest compatible version

## Development

This project is built with TypeScript and includes modern development tooling.

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Setup
```bash
git clone https://github.com/cornflea/react-pcc.git
cd react-pcc
npm install
```

### Building
```bash
# Build once
npm run build

# Build and watch for changes
npm run build:watch
```

### Testing
```bash
npm test
```

### Local Development
```bash
# Build and test the CLI locally
npm run build
node dist/index.js <package-name>
```

## Publishing

This package uses GitHub Actions for automated CI/CD:

1. **Continuous Integration**: Runs on every push and pull request
   - Tests on Node.js 16.x, 18.x, and 20.x
   - Builds the TypeScript code
   - Runs tests

2. **Automated Publishing**: Publishes to npm when a GitHub release is created
   - Requires `NPM_TOKEN` secret to be set in GitHub repository settings

### Manual Publishing
```bash
npm run prepublishOnly  # Cleans and builds
npm publish
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate and ensure TypeScript compilation passes.

## License
MIT
