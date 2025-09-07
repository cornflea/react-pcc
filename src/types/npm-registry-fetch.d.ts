declare module 'npm-registry-fetch' {
  interface FetchOptions {
    registry?: string;
    cache?: string;
    timeout?: number;
    'user-agent'?: string;
    [key: string]: any;
  }

  interface NPMRegistryFetch {
    (url: string, options?: FetchOptions): Promise<Response>;
    json(url: string, options?: FetchOptions): Promise<any>;
  }

  const fetch: NPMRegistryFetch;
  export = fetch;
}
