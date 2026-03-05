import type { MediaAsset, NavItem, ActionLink } from './atoms';

export interface SocialLink {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'github' | 'custom';
  url: string;
  iconOverride?: string;
}

export interface SiteIdentity {
  siteName: string;
  logoLight?: MediaAsset;
  logoDark?: MediaAsset; // For automatic theme switching
  favicon?: MediaAsset;
}

export interface GlobalHeader {
  navigation: NavItem[];
  callToAction?: ActionLink;
  isSticky: boolean;
  themeOverride?: import('./atoms').ThemeColor;
}

export interface GlobalFooter {
  columns: Array<{
    title: string;
    links: NavItem[];
  }>;
  socialLinks: SocialLink[];
  legalText: string;
  bottomLinks: NavItem[]; // Privacy Policy, Terms, etc.
  themeOverride?: import('./atoms').ThemeColor;
}

// The master global payload fetched once per page request
export interface GlobalSettings {
  identity: SiteIdentity;
  header: GlobalHeader;
  footer: GlobalFooter;
  defaultTheme: string; // Maps to DaisyUI themes
}

export interface ThemeStructure {
  radiusBox: string; // e.g., '0.5rem', '1rem'
  radiusField: string; // e.g., '0.25rem', '9999px'
  radiusSelector: string;
  borderSize: string; // e.g., '1px', '2px'
  depth: '0' | '1';
  noise: '0' | '1';
}

export interface ThemeFonts {
  sans: string;
  heading: string;
}

export interface ThemeConfig {
  fonts: ThemeFonts;
  structure: ThemeStructure;
}

export interface GlobalTheme extends ThemeConfig {
  defaultTheme: string;
}