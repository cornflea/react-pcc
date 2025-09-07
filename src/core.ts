import * as fs from 'fs';
import * as path from 'path';
import fetch from 'npm-registry-fetch';
import * as semver from 'semver';

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

interface PackageVersion {
  peerDependencies?: Record<string, string>;
}

interface PackageInfo {
  versions: Record<string, PackageVersion>;
}

interface CompatibleVersionResult {
  reactVersion: string;
  compatibleVersion: string | null;
}

export async function getInstalledReactVersion(): Promise<string> {
  const pkgPath = path.join(process.cwd(), "package.json");
  const pkg: PackageJson = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

  const reactVersion =
    (pkg.dependencies && pkg.dependencies.react) ||
    (pkg.devDependencies && pkg.devDependencies.react);

  if (!reactVersion) throw new Error("React is not installed in this project");

  const minVersion = semver.minVersion(reactVersion);
  if (!minVersion) throw new Error("Invalid React version format");
  
  return minVersion.version;
}

export async function getPackageInfo(packageName: string): Promise<PackageInfo> {
  try {
    // Ensure proper URL encoding for scoped packages and special characters
    const encodedPackageName = encodeURIComponent(packageName);
    return await fetch.json(`/${encodedPackageName}`) as PackageInfo;
  } catch (error: any) {
    // Provide more detailed error information
    if (error.code === 'E404') {
      throw new Error(`Package "${packageName}" not found in npm registry.`);
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      throw new Error(`Network error: Unable to connect to npm registry. Please check your internet connection.`);
    } else if (error.status === 405) {
      throw new Error(`Invalid package name "${packageName}". Package names must follow npm naming rules.`);
    } else {
      throw new Error(`Failed to fetch package "${packageName}": ${error.message}`);
    }
  }
}

export async function getCompatibleVersion(packageName: string, userInput: string): Promise<CompatibleVersionResult> {
  const reactVersion = await getInstalledReactVersion();
  const pkgInfo = await getPackageInfo(packageName);

  const versions = Object.keys(pkgInfo.versions)
    .filter((v) => {
      const peerDeps = pkgInfo.versions[v].peerDependencies || {};
      return peerDeps.react && semver.satisfies(reactVersion, peerDeps.react);
    })
    .sort(semver.rcompare); // sort descending (latest first)

  if (versions.length === 0) {
    return { reactVersion, compatibleVersion: null };
  }

  let index: number;
  if (userInput === "latest") {
    index = 0;
  } else if (!isNaN(Number(userInput))) {
    index = parseInt(userInput, 10) + 1; // shift index (0 => 2nd latest)
  } else {
    index = 0; // default to latest
  }

  if (index >= versions.length) {
    index = versions.length - 1; // fallback to very first compatible
  }

  return {
    reactVersion,
    compatibleVersion: versions[index]
  };
}
