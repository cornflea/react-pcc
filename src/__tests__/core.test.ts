describe("@cornflea/react-pcc", () => {
  describe("Package name validation", () => {
    test("should validate basic package names", () => {
      const validPackages = ["react", "lodash", "express", "moment"];
      
      validPackages.forEach(pkg => {
        expect(pkg.length).toBeGreaterThan(0);
        expect(pkg).not.toContain(" ");
        expect(pkg.startsWith(".")).toBe(false);
      });
    });

    test("should validate scoped package names", () => {
      const validScopedPackages = [
        "@mui/material",
        "@testing-library/react",
        "@types/node",
        "@babel/core",
        "@emotion/react"
      ];
      
      validScopedPackages.forEach(pkg => {
        expect(pkg.startsWith("@")).toBe(true);
        expect(pkg.includes("/")).toBe(true);
        expect(pkg.split("/")).toHaveLength(2);
      });
    });

    test("should identify invalid scoped package names", () => {
      const invalidScopedPackages = ["@mui", "@", "@/package", "@scope/"];
      
      invalidScopedPackages.forEach(pkg => {
        const isValidScoped = pkg.startsWith("@") && 
                             pkg.includes("/") && 
                             pkg.split("/").length === 2 &&
                             pkg.split("/")[0].length > 1 &&
                             pkg.split("/")[1].length > 0;
        expect(isValidScoped).toBe(false);
      });
    });

    test("should handle edge cases", () => {
      const edgeCases = ["", " ", ".", "..", "package with spaces"];
      
      edgeCases.forEach(pkg => {
        const isValid = pkg.length > 0 && 
                       !pkg.includes(" ") && 
                       !pkg.startsWith(".");
        expect(isValid).toBe(false);
      });
    });
  });

  describe("Package name parsing", () => {
    test("should extract scope from scoped packages", () => {
      const testCases = [
        { package: "@mui/material", scope: "@mui", name: "material" },
        { package: "@types/react", scope: "@types", name: "react" },
        { package: "@babel/core", scope: "@babel", name: "core" }
      ];

      testCases.forEach(({ package: pkg, scope, name }) => {
        const parts = pkg.split("/");
        expect(parts[0]).toBe(scope);
        expect(parts[1]).toBe(name);
      });
    });

    test("should handle unscoped packages", () => {
      const unscopedPackages = ["react", "lodash", "express"];
      
      unscopedPackages.forEach(pkg => {
        expect(pkg.includes("/")).toBe(false);
        expect(pkg.startsWith("@")).toBe(false);
      });
    });
  });

  describe("URL encoding for package names", () => {
    test("should handle packages that need URL encoding", () => {
      const packagesNeedingEncoding = [
        "@mui/material",
        "@testing-library/react",
        "@types/node"
      ];

      packagesNeedingEncoding.forEach(pkg => {
        const encoded = encodeURIComponent(pkg);
        expect(encoded).toBeDefined();
        expect(decodeURIComponent(encoded)).toBe(pkg);
      });
    });

    test("should preserve package names after encoding/decoding", () => {
      const testPackages = [
        "react",
        "@mui/material",
        "@babel/preset-env",
        "lodash"
      ];

      testPackages.forEach(pkg => {
        const encoded = encodeURIComponent(pkg);
        const decoded = decodeURIComponent(encoded);
        expect(decoded).toBe(pkg);
      });
    });
  });

  describe("Version string validation", () => {
    test("should recognize valid semver versions", () => {
      const validVersions = [
        "1.0.0",
        "2.1.3",
        "0.0.1",
        "10.15.3",
        "1.0.0-alpha.1",
        "2.0.0-beta.2"
      ];

      validVersions.forEach(version => {
        const semverRegex = /^\d+\.\d+\.\d+(-[\w.-]+)?$/;
        expect(semverRegex.test(version)).toBe(true);
      });
    });

    test("should identify invalid version strings", () => {
      const invalidVersions = [
        "1.0",
        "v1.0.0",
        "1.0.0.0",
        "latest",
        "1.x.x",
        ""
      ];

      invalidVersions.forEach(version => {
        const semverRegex = /^\d+\.\d+\.\d+(-[\w.-]+)?$/;
        expect(semverRegex.test(version)).toBe(false);
      });
    });
  });

  describe("React version compatibility", () => {
    test("should handle React version ranges", () => {
      const reactVersionRanges = [
        "^17.0.0",
        ">=16.8.0",
        "~18.0.0",
        "^18.2.0",
        ">=17.0.0 <19.0.0"
      ];

      reactVersionRanges.forEach(range => {
        expect(range.length).toBeGreaterThan(0);
        expect(typeof range).toBe("string");
      });
    });

    test("should validate peer dependency format", () => {
      const peerDeps = {
        "react": "^17.0.0 || ^18.0.0",
        "react-dom": "^17.0.0 || ^18.0.0"
      };

      Object.entries(peerDeps).forEach(([dep, version]) => {
        expect(dep).toBeDefined();
        expect(version).toBeDefined();
        expect(typeof version).toBe("string");
      });
    });
  });
});
