#!/usr/bin/env node
import { getCompatibleVersion } from "./core";
import * as pkg from "../package.json";

const args = process.argv.slice(2);
const isDebug = args.includes("--debug");

// Filter out flags from package name
const packageNameArgs = args.filter(arg => !arg.startsWith("--"));

if (args.length === 0 || args.includes("--help")) {
  console.log(`\nUsage: react-pcc <package-name> [options]\n\nOptions:\n  --help     Show help information\n  --version  Show version number\n  --debug    Show debug information\n`);
  process.exit(0);
}

if (args.includes("--version")) {
  console.log(pkg.version);
  process.exit(0);
}

const pkgName = packageNameArgs[0];

if (!pkgName || pkgName.startsWith("--")) {
  console.error("Usage: react-pcc <package-name>\nTry --help for more information.");
  process.exit(1);
}

// Basic validation for package names
if (pkgName.length === 0) {
  console.error("Error: Package name cannot be empty.");
  process.exit(1);
}

// Check for common issues with scoped packages
if (pkgName.startsWith("@") && !pkgName.includes("/")) {
  console.error("Error: Scoped package names must include a slash (e.g., @scope/package-name).");
  process.exit(1);
}

if (isDebug) {
  console.log(`Debug: Package name received: "${pkgName}"`);
  console.log(`Debug: URL encoded name: "${encodeURIComponent(pkgName)}"`);
  console.log(`Debug: Is scoped package: ${pkgName.startsWith("@")}`);
}

getCompatibleVersion(pkgName, "latest")
  .then(({ reactVersion, compatibleVersion }) => {
    console.log(`React version in project: ${reactVersion}`);
    if (!compatibleVersion) {
      console.log(`❌ No compatible version of ${pkgName} found for React ${reactVersion}`);
    } else {
      console.log(
        `✅ Compatible version of ${pkgName} for React ${reactVersion}: ${compatibleVersion}`
      );
    }
  })
  .catch((err: Error) => {
    console.error("Error:", err.message);
  });
