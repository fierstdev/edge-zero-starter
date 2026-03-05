import type { CollectionConfig } from 'payload'

// Import blocks from their modular folders to keep the architecture clean
import { HeroBlock } from '../blocks/core/Hero/schema'
import { FeatureGridBlock } from '../blocks/core/FeatureGrid/schema'
import { TestimonialBlock } from './../blocks/trust/Testimonial/schema'
import { PricingBlock } from '@/blocks/conversion/Pricing/schema'
import { ServicesBlock } from '@/blocks/core/Services/schema'
import { ContactBlock } from '@/blocks/conversion/Contact/schema'
import { ValuePropositionBlock } from '@/blocks/core/ValueProposition/schema'
import { AboutBlock } from '@/blocks/core/About/schema'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    // --- 1. CORE PAGE DATA ---
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal reference title for this page (e.g., "Home Page").',
      }
    },
    
    // --- 2. THE PAGE BUILDER ---
    {
      name: 'blocks',
      type: 'blocks',
      required: true,
      blocks: [
        HeroBlock,
        FeatureGridBlock,
        TestimonialBlock,
        PricingBlock,  
        ServicesBlock,
        ContactBlock,
        ValuePropositionBlock,
        AboutBlock,
        // Future blocks get registered here
      ],
    },

    // --- 3. SIDEBAR: ROUTING & SEO ---
    // Moving these to the sidebar keeps the main editing window focused on content
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'The URL path. Use "home" for the root index (/).',
      },
    },
    {
      name: 'seo',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'The title tag shown in search engines and browser tabs.',
          }
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'The meta description shown in search engine results.',
          }
        }
      ]
    }
  ],
}