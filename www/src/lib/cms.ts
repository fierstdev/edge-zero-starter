const DEFAULT_CMS_URL = 'http://localhost:3000';
const DEFAULT_CMS_TIMEOUT_MS = 2500;
const DEFAULT_GLOBAL_CACHE_TTL_MS = import.meta.env.DEV ? 0 : 30000;
const DEFAULT_PAGE_CACHE_TTL_MS = import.meta.env.DEV ? 0 : 15000;
const parsedTimeout = Number(import.meta.env.PUBLIC_CMS_TIMEOUT_MS);
const parsedGlobalTtl = Number(import.meta.env.PUBLIC_CMS_GLOBAL_CACHE_TTL_MS);
const parsedPageTtl = Number(import.meta.env.PUBLIC_CMS_PAGE_CACHE_TTL_MS);
const CMS_TIMEOUT_MS =
  Number.isFinite(parsedTimeout) && parsedTimeout > 0 ? parsedTimeout : DEFAULT_CMS_TIMEOUT_MS;
const GLOBAL_CACHE_TTL_MS =
  Number.isFinite(parsedGlobalTtl) && parsedGlobalTtl >= 0 ? parsedGlobalTtl : DEFAULT_GLOBAL_CACHE_TTL_MS;
const PAGE_CACHE_TTL_MS =
  Number.isFinite(parsedPageTtl) && parsedPageTtl >= 0 ? parsedPageTtl : DEFAULT_PAGE_CACHE_TTL_MS;

type CacheEntry<T> = {
  expiresAt: number;
  value: T | null;
};

const globalCache = new Map<string, CacheEntry<any>>();
const globalInFlight = new Map<string, Promise<any>>();
const pageCache = new Map<string, CacheEntry<any>>();
const pageInFlight = new Map<string, Promise<any>>();

function getCmsBaseUrl(): string {
  const rawUrl =
    import.meta.env.PUBLIC_CMS_URL ||
    import.meta.env.PUBLIC_API_URL ||
    DEFAULT_CMS_URL;

  return rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;
}

export function resolveCmsUrl(pathOrUrl: string | undefined): string | undefined {
  if (!pathOrUrl) return undefined;

  if (
    pathOrUrl.startsWith('http://') ||
    pathOrUrl.startsWith('https://') ||
    pathOrUrl.startsWith('data:')
  ) {
    return pathOrUrl;
  }

  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${getCmsBaseUrl()}${normalizedPath}`;
}

async function fetchCmsJson<T>(pathname: string): Promise<T | null> {
  const url = resolveCmsUrl(pathname);

  if (!url) return null;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CMS_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`[Edge Zero starter/www] CMS request failed: ${response.status} ${url}`);
      return null;
    }

    return (await response.json()) as T;
  } catch (error: any) {
    if (error?.name === 'AbortError') {
      console.warn(`[Edge Zero starter/www] CMS request timed out after ${CMS_TIMEOUT_MS}ms: ${url}`);
      return null;
    }

    console.error(`[Edge Zero starter/www] CMS request threw for ${url}:`, error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchGlobal<T = any>(slug: string, depth = 1): Promise<T | null> {
  const cacheKey = `${slug}:${depth}`;
  const shouldCacheGlobals = GLOBAL_CACHE_TTL_MS > 0;

  if (shouldCacheGlobals) {
    const now = Date.now();
    const cached = globalCache.get(cacheKey);

    if (cached && cached.expiresAt > now) {
      return cached.value as T | null;
    }
    if (cached) {
      globalCache.delete(cacheKey);
    }
  }

  const inFlight = globalInFlight.get(cacheKey);
  if (inFlight) {
    return inFlight as Promise<T | null>;
  }

  const request = fetchCmsJson<T>(`/api/globals/${slug}?depth=${depth}`)
    .then((value) => {
      if (shouldCacheGlobals) {
        globalCache.set(cacheKey, {
          expiresAt: Date.now() + GLOBAL_CACHE_TTL_MS,
          value,
        });
      } else {
        globalCache.delete(cacheKey);
      }
      return value;
    })
    .finally(() => {
      globalInFlight.delete(cacheKey);
    });

  globalInFlight.set(cacheKey, request);
  return request;
}

export type GlobalBundle = {
  theme: any | null;
  header: any | null;
  identity: any | null;
  footer: any | null;
};

export async function fetchGlobalBundle(): Promise<GlobalBundle> {
  const [theme, header, identity, footer] = await Promise.all([
    fetchGlobal('theme'),
    fetchGlobal('header'),
    fetchGlobal('identity'),
    fetchGlobal('footer'),
  ]);

  return {
    theme,
    header,
    identity,
    footer,
  };
}

export async function fetchPageBySlug<T = any>(slug: string): Promise<T | null> {
  const encodedSlug = encodeURIComponent(slug);
  const shouldCachePages = PAGE_CACHE_TTL_MS > 0;

  if (shouldCachePages) {
    const now = Date.now();
    const cached = pageCache.get(encodedSlug);
    if (cached && cached.expiresAt > now) {
      return cached.value as T | null;
    }
    if (cached) {
      pageCache.delete(encodedSlug);
    }
  }

  const inFlight = pageInFlight.get(encodedSlug);
  if (inFlight) {
    return inFlight as Promise<T | null>;
  }

  const request = fetchCmsJson<{ docs?: T[] }>(
    `/api/pages?where[slug][equals]=${encodedSlug}&depth=2&limit=1`,
  )
    .then((result) => {
      const value = result?.docs?.[0] ?? null;
      if (shouldCachePages) {
        pageCache.set(encodedSlug, {
          expiresAt: Date.now() + PAGE_CACHE_TTL_MS,
          value,
        });
      } else {
        pageCache.delete(encodedSlug);
      }
      return value;
    })
    .finally(() => {
      pageInFlight.delete(encodedSlug);
    });

  pageInFlight.set(encodedSlug, request);
  return request;
}
