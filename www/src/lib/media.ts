import { resolveCmsUrl } from './cms';

type MediaSizeLike = {
  url?: string | null;
  width?: number | null;
  height?: number | null;
};

type MediaLike = {
  url?: string | null;
  width?: number | null;
  height?: number | null;
  sizes?: Record<string, MediaSizeLike | undefined> | null;
};

function normalizeMediaPath(pathOrUrl: string | null | undefined): string | undefined {
  if (!pathOrUrl) return undefined;
  return resolveCmsUrl(pathOrUrl);
}

function normalizeMediaDimension(value: unknown): number | undefined {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

export function resolveMediaUrl(
  mediaOrUrl: string | MediaLike | null | undefined,
  preferredSizes: string[] = [],
): string | undefined {
  if (!mediaOrUrl) return undefined;

  if (typeof mediaOrUrl === 'string') {
    return normalizeMediaPath(mediaOrUrl);
  }

  if (Array.isArray(preferredSizes) && preferredSizes.length > 0) {
    for (const sizeName of preferredSizes) {
      const sizedUrl = normalizeMediaPath(mediaOrUrl.sizes?.[sizeName]?.url);
      if (sizedUrl) return sizedUrl;
    }
  }

  return normalizeMediaPath(mediaOrUrl.url);
}

export function resolveMediaSrcSet(
  mediaOrUrl: string | MediaLike | null | undefined,
  preferredSizes: string[] = [],
): string | undefined {
  if (!mediaOrUrl || typeof mediaOrUrl === 'string') return undefined;

  const candidates: Array<{ url: string; width: number }> = [];
  const seen = new Set<string>();

  for (const sizeName of preferredSizes) {
    const size = mediaOrUrl.sizes?.[sizeName];
    const sizedUrl = normalizeMediaPath(size?.url);
    const sizedWidth = normalizeMediaDimension(size?.width);
    if (!sizedUrl || !sizedWidth) continue;
    if (seen.has(sizedUrl)) continue;
    candidates.push({ url: sizedUrl, width: sizedWidth });
    seen.add(sizedUrl);
  }

  const originalUrl = normalizeMediaPath(mediaOrUrl.url);
  const originalWidth = normalizeMediaDimension(mediaOrUrl.width);
  if (originalUrl && originalWidth && !seen.has(originalUrl)) {
    candidates.push({ url: originalUrl, width: originalWidth });
  }

  if (candidates.length < 2) return undefined;

  candidates.sort((a, b) => a.width - b.width);
  return candidates.map((candidate) => `${candidate.url} ${candidate.width}w`).join(', ');
}

export function resolveMediaDimensions(
  mediaOrUrl: string | MediaLike | null | undefined,
  preferredSizes: string[] = [],
): { width?: number; height?: number } {
  if (!mediaOrUrl || typeof mediaOrUrl === 'string') return {};

  for (const sizeName of preferredSizes) {
    const size = mediaOrUrl.sizes?.[sizeName];
    const width = normalizeMediaDimension(size?.width);
    const height = normalizeMediaDimension(size?.height);
    if (width || height) {
      return { width, height };
    }
  }

  return {
    width: normalizeMediaDimension(mediaOrUrl.width),
    height: normalizeMediaDimension(mediaOrUrl.height),
  };
}
