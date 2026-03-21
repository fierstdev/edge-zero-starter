// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors

type StarterPageData = {
  title: string
  seo: {
    title: string
    description: string
    canonicalUrl: string
  }
  blocks: any[]
}

function buildDashboardUrls(dashboardUrl: string) {
  const normalized = dashboardUrl.trim().replace(/\/+$/, '') || 'https://dashboard.edgezero.dev'
  return {
    dashboardHome: `${normalized}/`,
    login: `${normalized}/auth/login?redirect=/`,
    signup: `${normalized}/auth/signup?redirect=/`,
  }
}

export function buildDefaultHomePage(dashboardUrl: string): StarterPageData {
  const urls = buildDashboardUrls(dashboardUrl)

  return {
    title: 'Edge Zero | Build Visually. Ship Native Code.',
    seo: {
      title: 'Edge Zero | Build Visually. Ship Native Code.',
      description:
        'Edge Zero is the edge-native platform for teams that need visual editing, code-first flexibility, and high Lighthouse performance.',
      canonicalUrl: 'https://edgezero.dev/',
    },
    blocks: [
      {
        blockType: 'hero',
        anchorId: 'hero',
        variant: 'cinematic',
        badge: {
          label: 'Edge-Native Marketing Platform',
          color: 'success',
          size: 'md',
        },
        headline: 'Build Visually. Ship Native Code.',
        subheading:
          'Edge Zero gives developers full control of components while content teams edit visually. Launch modern, high-performance pages on Astro, Payload, and Cloudflare without the handoff tax.',
        primaryAction: {
          label: 'Start Free',
          url: urls.signup,
          target: '_self',
          style: 'primary',
          size: 'lg',
        },
        secondaryAction: {
          label: 'Open Dashboard',
          url: urls.dashboardHome,
          target: '_self',
          style: 'outline',
          size: 'lg',
        },
        highlights: [
          {
            value: '95+',
            label: 'Lighthouse score target',
          },
          {
            value: '<60s',
            label: 'Starter to first deploy',
          },
          {
            value: '1',
            label: 'Source of truth for blocks',
          },
        ],
        panelEyebrow: 'Platform Status',
        panelStatusText: 'Production-ready on the edge',
        cinematicToneMode: 'dark',
      },
      {
        blockType: 'features',
        anchorId: 'platform',
        variant: 'spotlight',
        badge: {
          label: 'Why Edge Zero',
          color: 'primary',
          size: 'md',
        },
        heading: 'Everything needed to launch serious marketing websites',
        subheading:
          'Build and ship with modern frontend ergonomics while giving non-technical teams a publishing workflow they can use confidently.',
        spotlightMediaPosition: 'right',
        features: [
          {
            title: 'Code-First Blocks',
            description:
              'Author components in .ez.astro and keep schema, rendering, and content model synchronized with a single source of truth.',
            icon: { type: 'lucide', value: 'blocks' },
            action: {
              label: 'Read block docs',
              url: '/#platform',
              target: '_self',
              style: 'outline',
              size: 'sm',
            },
          },
          {
            title: 'Editor UX That Clients Like',
            description:
              'Variant-aware fields keep forms focused so editors only see what applies to the selected design.',
            icon: { type: 'lucide', value: 'layout-dashboard' },
          },
          {
            title: 'Edge-Native Performance',
            description:
              'Astro output plus Cloudflare delivery gives you fast pages, strong Core Web Vitals, and repeatable Lighthouse quality.',
            icon: { type: 'lucide', value: 'zap' },
          },
          {
            title: 'Built-In Form Capture',
            description:
              'Contact submissions store in Payload and can optionally trigger email notifications through Resend.',
            icon: { type: 'lucide', value: 'mail-check' },
          },
        ],
      },
      {
        blockType: 'stats',
        anchorId: 'results',
        variant: 'spotlight',
        heading: 'Performance that compounds over time',
        subheading:
          'Edge Zero treats speed, accessibility, and maintainability as product features, not post-launch cleanup.',
        spotlightLabel: 'Edge Zero Outcomes',
        items: [
          {
            label: 'Lighthouse target',
            value: '95+',
            description: 'Optimized production builds by default.',
          },
          {
            label: 'First setup time',
            value: '<60s',
            description: 'Starter scaffold to running workspace.',
          },
          {
            label: 'Source of truth',
            value: '1 file',
            description: '.ez.astro drives schema and rendering.',
          },
          {
            label: 'CMS confidence',
            value: 'High',
            description: 'Variant-aware forms reduce editor mistakes.',
          },
        ],
      },
      {
        blockType: 'testimonials',
        anchorId: 'testimonials',
        variant: 'featured',
        badge: {
          label: 'Customer Stories',
          color: 'accent',
          size: 'md',
        },
        heading: 'Teams launch faster with fewer handoffs',
        subheading:
          'Edge Zero helps technical teams stay in control while giving marketing stakeholders a CMS workflow they can trust.',
        featuredEyebrow: 'Recent Launch Feedback',
        testimonials: [
          {
            quote:
              'Edge Zero eliminated the back-and-forth between our dev team and content team. We shipped a full rebrand in two weeks.',
            authorName: 'Amelia Brooks',
            authorRole: 'Creative Director',
            authorCompany: 'Northline Studio',
            rating: 5,
          },
          {
            quote:
              'Variant-based blocks are the biggest win. Editors are no longer overwhelmed and our QA passes are faster.',
            authorName: 'Carlos Medina',
            authorRole: 'Lead Engineer',
            authorCompany: 'Atlas Commerce',
            rating: 5,
          },
          {
            quote:
              'We needed enterprise polish without giving up code quality. Edge Zero gave us both.',
            authorName: 'Priya Raman',
            authorRole: 'Head of Digital',
            authorCompany: 'Summit Health Group',
            rating: 5,
          },
          {
            quote:
              'Lighthouse scores were a board-level KPI for us. Edge Zero made that a repeatable process.',
            authorName: 'Jonah Lee',
            authorRole: 'VP Product',
            authorCompany: 'Drift Labs',
            rating: 5,
          },
        ],
      },
      {
        blockType: 'pricing',
        anchorId: 'pricing',
        variant: 'cards',
        badge: {
          label: 'Pricing',
          color: 'secondary',
          size: 'md',
        },
        heading: 'Choose the plan that matches your delivery model',
        subheading: 'Start free, then upgrade when your team and publishing needs grow.',
        billingNote: 'Monthly pricing shown. Usage pricing applies to managed-hosting plans.',
        plans: [
          {
            name: 'Free',
            price: '$0',
            billingPeriod: '/month',
            description: 'Best for validating your first Edge Zero project.',
            features: [
              { item: 'Up to 3 active projects', included: true },
              { item: 'Core starter block system', included: true },
              { item: 'Self-hostable architecture', included: true },
              { item: 'Managed usage metering', included: false },
            ],
            action: {
              label: 'Create Free Account',
              url: urls.signup,
              target: '_self',
              style: 'outline',
              size: 'md',
            },
          },
          {
            name: 'Pro',
            price: '$49',
            billingPeriod: '/month',
            planBadge: 'Most Popular',
            isHighlighted: true,
            description: 'For freelancers and small teams shipping client websites.',
            features: [
              { item: 'Unlimited websites', included: true },
              { item: 'Managed Cloudflare provisioning', included: true },
              { item: 'Stripe-backed pooled metering', included: true },
              { item: 'Priority support', included: true },
            ],
            action: {
              label: 'Upgrade to Pro',
              url: urls.login,
              target: '_self',
              style: 'primary',
              size: 'md',
            },
          },
          {
            name: 'Agency',
            price: 'Custom',
            billingPeriod: '',
            description: 'For agencies running many clients and custom orchestration policies.',
            features: [
              { item: 'Everything in Pro', included: true },
              { item: 'Advanced org controls', included: true },
              { item: 'Expanded support and onboarding', included: true },
            ],
            action: {
              label: 'Talk to Sales',
              url: '/#contact',
              target: '_self',
              style: 'outline',
              size: 'md',
            },
          },
        ],
      },
      {
        blockType: 'faq',
        anchorId: 'faq',
        variant: 'two-column',
        heading: 'Frequently asked questions',
        subheading: 'Straight answers for teams evaluating Edge Zero.',
        items: [
          {
            question: 'Do we own our code and project setup?',
            answer:
              'Yes. Edge Zero keeps your block definitions, frontend code, and project structure in your own repository.',
            isOpenByDefault: true,
          },
          {
            question: 'Can we use our existing design system and components?',
            answer:
              'Yes. Edge Zero is designed for code-first block authoring, so teams can adapt existing component systems.',
          },
          {
            question: 'Is there a working contact form flow out of the box?',
            answer:
              'Yes. The starter includes submission persistence and optional email notifications with configurable recipients.',
          },
          {
            question: 'Can non-technical users edit pages safely?',
            answer:
              'Yes. Variant-aware fields reduce CMS clutter and expose only the controls relevant to each chosen design.',
          },
          {
            question: 'How does Edge Zero support Lighthouse and Core Web Vitals?',
            answer:
              'The architecture prioritizes static output, lean runtime behavior, responsive media, and accessibility-first block patterns.',
          },
          {
            question: 'Can agencies manage multiple client sites from one workflow?',
            answer:
              'Yes. The hub-and-spoke model and control-plane APIs are designed for multi-client orchestration and billing.',
          },
        ],
      },
      {
        blockType: 'cta',
        anchorId: 'get-started',
        variant: 'split-panel',
        badge: {
          label: 'Build with Confidence',
          color: 'success',
          size: 'md',
        },
        heading: 'Launch your first edge-native project today',
        subheading:
          'Create your account, provision infrastructure, and deploy with a streamlined workflow built for real delivery teams.',
        primaryAction: {
          label: 'Create Free Account',
          url: urls.signup,
          target: '_self',
          style: 'primary',
          size: 'lg',
        },
        secondaryAction: {
          label: 'Sign In',
          url: urls.login,
          target: '_self',
          style: 'outline',
          size: 'lg',
        },
        panelTitle: 'What you can ship this week',
        panelItems: [
          { item: 'A full marketing site with variant-driven blocks' },
          { item: 'A secured dashboard with org/project controls' },
          { item: 'Managed deploy flow wired to Cloudflare resources' },
          { item: 'Contact forms with optional email notifications' },
        ],
        finePrint: 'Need enterprise support? Contact our team through the form below.',
      },
      {
        blockType: 'contact-form',
        anchorId: 'contact',
        variant: 'split',
        badge: {
          label: 'Contact',
          color: 'primary',
          size: 'md',
        },
        heading: 'Talk to the Edge Zero team',
        subheading:
          'Share your use case and we will help you choose the right rollout path for your team.',
        showContactDetails: true,
        detailsHeading: 'Contact details',
        emailLabel: 'Email',
        email: 'hello@edgezero.dev',
        phoneLabel: 'Phone',
        phone: '+1 (503) 555-0199',
        addressLabel: 'Location',
        address: 'Portland, Oregon\nUnited States',
        formTitle: 'Send us a message',
        nameLabel: 'Name',
        emailFieldLabel: 'Work email',
        messageLabel: 'How can we help?',
        includeCompanyField: true,
        companyFieldLabel: 'Company',
        includePhoneField: true,
        phoneFieldLabel: 'Phone',
        includeSubjectField: true,
        subjectFieldLabel: 'Subject',
        submitLabel: 'Send message',
        consentText: 'I agree to be contacted about this inquiry.',
        successMessage: 'Thanks for reaching out. We will reply shortly.',
        errorMessage: 'Something went wrong. Please try again in a moment.',
        endpoint: '/api/contact-form',
      },
    ],
  }
}
