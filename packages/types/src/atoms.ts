export type ThemeColor = 
  | 'primary' | 'secondary' | 'accent' | 'neutral' 
  | 'base-100' | 'base-200' | 'base-300' 
  | 'info' | 'success' | 'warning' | 'error'
  | 'ghost' | 'transparent';

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Alignment = 'left' | 'center' | 'right';
export type Spacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface ActionLink {
  id: string;
  label: string;
  url: string; // Can be absolute (https://), relative (/about), or anchor (#contact)
  target: '_blank' | '_self';
  style: ThemeColor | 'outline' | 'link';
  size?: ComponentSize;
  iconName?: string; 
  iconPosition?: 'left' | 'right';
}

// Handles dropdown menus in headers/footers
export interface NavItem extends Omit<ActionLink, 'style' | 'size'> {
  children?: NavItem[]; // Optional nested sub-links
}

export interface MediaAsset {
  id: string;
  url: string; // Cloudflare R2 URL
  altText: string;
  width?: number;
  height?: number;
  mimeType?: string;
  blurhash?: string; // For instant loading states
  focalPointX?: number; // 0-100 percentage for object-position
  focalPointY?: number;
}

export interface IconAsset {
  type: 'lucide' | 'svg-string' | 'image';
  value: string; // Lucide name, raw SVG string, or R2 URL
}

export interface Badge {
  label: string;
  color: ThemeColor;
  size?: ComponentSize;
  isOutline?: boolean;
}

// Represents Payload's Lexical Rich Text JSON tree
export interface RichTextNode {
  type: string;
  version: number;
  [k: string]: any; 
}

export interface RichTextAsset {
  root: {
    children: RichTextNode[];
    direction: 'ltr' | 'rtl' | null;
    format: string;
    indent: number;
    type: string;
    version: number;
  };
}