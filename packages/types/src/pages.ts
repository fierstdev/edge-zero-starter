import type { PageBlock } from './blocks';
import type { MediaAsset } from './atoms';

export interface SEOData {
  title: string;
  description: string;
  ogImage?: MediaAsset;
  canonicalUrl?: string; // For avoiding duplicate content penalties
  noIndex: boolean;
  noFollow: boolean;
  structuredData?: any; // Optional JSON-LD schema payload injected into the <head>
}

export interface PageBlueprint {
  id: string;
  slug: string;
  title: string; // Internal CMS title
  status: 'draft' | 'published' | 'archived';
  publishedAt: string;
  themeOverride?: string;
  seo: SEOData;
  blocks: PageBlock[];
}

// Handles Edge middleware routing
export interface EdgeRedirect {
  id: string;
  sourcePath: string; // e.g., "/old-services"
  destinationUrl: string; // e.g., "/services"
  permanent: boolean; // 301 vs 302
}