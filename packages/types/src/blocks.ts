import type { ActionLink, MediaAsset, IconAsset, RichTextAsset, Alignment, Spacing, Badge } from './atoms';

/* 
 * The Block Registry Pattern
 * 
 * To extend Edge Zero with your own custom blocks, or to activate Pro blocks, 
 * you can use TypeScript's module augmentation feature in your own project.
 * 
 * Example:
 * declare module '@edge-zero/types' {
 *   interface BlockRegistry {
 *     MyCustomBlock: MyCustomBlock;
 *   }
 * }
 */
export interface BlockRegistry {
  HeroBlock: HeroBlock;
  FeatureGridBlock: FeatureGridBlock;
  ContentBlock: ContentBlock;
  AccordionBlock: AccordionBlock;
  TestimonialBlock: TestimonialBlock;
  CallToActionBlock: CallToActionBlock;
  LogoCloudBlock: LogoCloudBlock;
  PricingBlock: PricingBlock;
  ContactBlock: ContactBlock;
  ServicesBlock: ServicesBlock;
  ValuePropositionBlock: ValuePropositionBlock;
  AboutBlock: AboutBlock;
  
}

export type BlockType = keyof BlockRegistry;

export interface BaseBlock {
  id: string; // Unique Payload ID
  blockType: BlockType;
  variant?: string; // High-level layout controller
  anchorId?: string; // For hash routing (e.g., id="features")
  themeOverride?: string; // DaisyUI theme override for this specific section
  paddingTop?: Spacing;
  paddingBottom?: Spacing;
}

export interface HeroBlock extends BaseBlock {
  blockType: 'HeroBlock';
  badge?: Badge;
  heading: string;
  subheading?: string;
  richText?: RichTextAsset; // Optional longer copy
  alignment: Alignment;
  actions: ActionLink[];
  media?: MediaAsset; // Image or Video R2 URL
  mediaPosition?: 'left' | 'right' | 'background' | 'bottom';
}

export interface FeatureGridBlock extends BaseBlock {
  blockType: 'FeatureGridBlock';
  heading?: string;
  subheading?: string;
  alignment: Alignment;
  columns: 2 | 3 | 4;
  features: Array<{
    id: string;
    icon?: IconAsset;
    title: string;
    description: string;
    link?: ActionLink;
  }>;
}

export interface ContentBlock extends BaseBlock {
  blockType: 'ContentBlock';
  layout: 'standard' | 'narrow' | 'split-left' | 'split-right';
  content: RichTextAsset;
  media?: MediaAsset; // Used if layout is split
}

export interface AccordionBlock extends BaseBlock {
  blockType: 'AccordionBlock';
  heading?: string;
  subheading?: string;
  items: Array<{
    id: string;
    question: string;
    answer: RichTextAsset;
    isOpenByDefault?: boolean;
  }>;
}

export interface TestimonialBlock extends BaseBlock {
  blockType: 'TestimonialBlock';
  heading?: string;
  layout: 'grid' | 'slider' | 'featured';
  testimonials: Array<{
    id: string;
    quote: string;
    authorName: string;
    authorRole?: string;
    authorCompany?: string;
    authorImage?: MediaAsset;
    rating?: 1 | 2 | 3 | 4 | 5;
  }>;
}

export interface CallToActionBlock extends BaseBlock {
  blockType: 'CallToActionBlock';
  heading: string;
  subheading?: string;
  actions: ActionLink[];
  backgroundImage?: MediaAsset;
}

export interface LogoCloudBlock extends BaseBlock {
  blockType: 'LogoCloudBlock';
  heading?: string;
  logos: Array<{
    id: string;
    media: MediaAsset;
    link?: string;
  }>;
}

export interface PricingBlock extends BaseBlock {
  blockType: 'PricingBlock';
  heading?: string;
  subheading?: string;
  tiers: Array<{
    id: string;
    name: string;
    price: string;
    billingPeriod?: string;
    description?: string;
    features: string[]; // List of included features
    isHighlighted?: boolean; // E.g., "Most Popular"
    badge?: Badge;
    action: ActionLink;
  }>;
}

export interface ContactBlock extends BaseBlock {
  blockType: 'ContactBlock';
  heading: string;
  subheading?: string;
  email?: string;
  phone?: string;
  address?: string;
  showForm?: boolean;
}

export interface ServicesBlock extends BaseBlock {
  blockType: 'ServicesBlock';
  heading?: string;
  subheading?: string;
  services: Array<{
    id: string;
    title: string;
    description: string;
    icon?: IconAsset;
    media?: MediaAsset;
    price?: string;
    link?: ActionLink;
  }>;
}

export interface ValuePropositionBlock extends BaseBlock {
  blockType: 'ValuePropositionBlock';
  heading: string;
  subheading?: string;
  propositions: Array<{
    id: string;
    title: string;
    description: string;
    icon?: IconAsset;
  }>;
}

export interface AboutBlock extends BaseBlock {
  blockType: 'AboutBlock';
  heading: string;
  content: RichTextAsset;
  media?: MediaAsset;
  mediaPosition?: 'left' | 'right';
}


// The Master Union Type (derived from Registry)
export type PageBlock = BlockRegistry[keyof BlockRegistry];