import { defineConfig } from 'vitepress'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { zoomablePlugin } from './theme/markdown-plugin-zoomable'

// Production origin, shared by the sitemap, canonical tags and social cards.
const SITE_ORIGIN = 'https://docs.fluentaffiliate.com'

/**
 * Per-page link-preview cards.
 *
 * `scripts/generate-featured-images.mjs` renders a branded 1200x630 PNG carrying each
 * page's own title into `docs/public/images/featured/<section>--<slug>.png`. That folder
 * is the configured publicDir, so the card is served at `/images/featured/<name>`.
 *
 * NAMING RULE — duplicated (not imported) from that script's buildNameParts(); keep the
 * two in sync if it ever changes. The source folder is `docs/` but `rewrites` serves it at
 * `/guide/...`, so `relativePath` arrives here as the rewritten path
 * `guide/<section>/<slug>.md` (`filePath` is the real `docs/...` path), and the card folds
 * that into `<section>--<slug>.png`. The home page (`index.md`) uses `index.png`.
 *
 * Anything without a generated card falls back to `default.png`, which the generator also
 * emits — so a shared link is never left with no preview at all.
 */
const FEATURED_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'docs',
  'public',
  'images',
  'featured'
)

function featuredImageFor(relativePath: string): string {
  const parts = relativePath.replace(/\.md$/, '').split('/')
  const name = parts[0] === 'guide' && parts.length > 2
    ? `${parts[1]}--${parts[parts.length - 1]}.png`
    : `${parts[parts.length - 1]}.png`

  const file = existsSync(join(FEATURED_DIR, name)) ? name : 'default.png'
  return `${SITE_ORIGIN}/images/featured/${file}`
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // Source folder is `docs/`; keep serving it at `/guide/...` so no public URL changes.
  rewrites: {
    'docs/:rest*': 'guide/:rest*'
  },
  title: 'FluentAffiliate Documentation',
  description: 'Complete documentation for FluentAffiliate WordPress plugin. Learn how to set up, manage, and optimize your affiliate program with step-by-step guides, integrations, and best practices.',
  lang: 'en-US',
  lastUpdated: false,
  cleanUrls: true,
  sitemap: {
    hostname: SITE_ORIGIN
  },
  
  head: [
    // Google Analytics GA4
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-LP3H0X2CB8' }],
    ['script', {}, "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-LP3H0X2CB8');"],

    ['link', { rel: 'icon', type: 'image/png', href: '/images/brand/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#2C6AE2' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    
    // SEO Meta Tags
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'author', content: 'FluentAffiliate' }],
    ['meta', { name: 'keywords', content: 'FluentAffiliate, WordPress, affiliate marketing, affiliate management, WordPress plugin, documentation' }],
    
    // Open Graph / Twitter values that never vary per page. The per-page ones —
    // og:title, og:description, og:url, og:image and the canonical — are built in
    // `transformHead` below. Do NOT add og:image or the canonical back here:
    // scrapers take the first tag they find, so a static one would shadow every
    // per-page card, and a static canonical would point every page at the homepage.
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'FluentAffiliate Documentation' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],

    // Twitter Card Meta Tags
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@FluentAffiliate' }],
    ['meta', { name: 'twitter:creator', content: '@FluentAffiliate' }]
  ],

  /**
   * VitePress emits none of these on its own: a canonical URL, or the Open Graph /
   * Twitter values that differ per page. Without them every page shared a single
   * site-wide preview, and every page claimed the homepage as its canonical.
   */
  transformHead({ pageData, title, description }) {
    // The 404 page is reachable at every bad URL, so it must not claim a canonical
    // of its own or be shared as a card.
    if (pageData.relativePath === '404.md') return []

    const path = pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    const url = `${SITE_ORIGIN}/${path}`
    const image = featuredImageFor(pageData.relativePath)

    return [
      ['link', { rel: 'canonical', href: url }],

      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:image', content: image }],
      ['meta', { property: 'og:image:alt', content: title }],

      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: image }],
      ['meta', { name: 'twitter:image:alt', content: title }]
    ]
  },
  
  vite: {
    publicDir: 'docs/public',
  },

  markdown: {
    config: (md) => {
      md.use(zoomablePlugin)
    }
  },

  themeConfig: {
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Search Documentation',
            buttonAriaLabel: 'Search Documentation'
          },
          modal: {
            noResultsText: 'No results for',
            resetButtonTitle: 'Reset search',
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate',
              closeText: 'to close'
            }
          }
        }
      }
    },
    logo: {
      dark: '/images/brand/main_logo_inverted.png',
      light: '/images/brand/main_logo.png',
    },
  
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/guide/getting-started/what-is-fluentaffiliate' },
      { text: 'Website', link: 'https://fluentaffiliate.com/' },
      { text: 'Changelog', link: '/guide/changelog/changelog' }
    ],
    outline: [2, 3],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'What is FluentAffiliate?', link: '/guide/getting-started/what-is-fluentaffiliate' },
            { text: 'Installation & Activation', link: '/guide/getting-started/installation-activation-licensing' },
            { text: 'Onboarding & Setup', link: '/guide/getting-started/onboarding-setup' },
            { text: 'Fluent Affiliate Glossary', link: '/guide/getting-started/fluent-affiliate-glossary' }
          ]
        },
        {
          text: 'Admin Portal',
          items: [
            { text: 'Dashboard Overview', link: '/guide/admin-portal/admin-dashboard-overview' },
            { text: 'Managing Affiliates', link: '/guide/admin-portal/managing-affiliates' },
            { text: 'Managing Referrals', link: '/guide/admin-portal/managing-referrals' },
            { text: 'Payout Management', link: '/guide/admin-portal/payout-management' },
            { text: 'Managing Visits', link: '/guide/admin-portal/managing-visits' }
          ]
        },
        {
          text: 'Affiliate Portal',
          items: [
            { text: 'How to Register', link: '/guide/affiliate-portal/how-to-register-as-an-affiliate' },
            { text: 'Dashboard Overview', link: '/guide/affiliate-portal/affiliate-dashboard-overview' },
            { text: 'Generating Links', link: '/guide/affiliate-portal/generating-affiliate-links' },
            { text: 'Checking Visits', link: '/guide/affiliate-portal/checking-visits' },
            { text: 'Tracking Referrals', link: '/guide/affiliate-portal/tracking-referrals' },
            { text: 'Payouts', link: '/guide/affiliate-portal/payouts' },
            { text: 'Update your Settings', link: '/guide/affiliate-portal/update-your-settings' }
          ]
        },
        {
          text: 'Integrations',
          items: [
            { text: 'Overview', link: '/guide/integrations/integrations' },
            {
              text: 'E-Commerce',
              collapsed: true,
              items: [
                { text: 'FluentCart', link: '/guide/integrations/fluentcart-integration-with-fluentaffiliate' },
                { text: 'WooCommerce', link: '/guide/integrations/woocommerce-integration-with-fluentaffiliate' },
                { text: 'Easy Digital Downloads', link: '/guide/integrations/easy-digital-downloads-integration-with-fluentaffiliate' },
                { text: 'SureCart', link: '/guide/integrations/surecart-integration-with-fluentaffiliate' },
                { text: 'Voxel', link: '/guide/integrations/voxel-integration-with-fluentaffiliate' },
                { text: 'EasyCart', link: '/guide/integrations/easycart-integration-with-fluentaffiliate' }
              ]
            },
            {
              text: 'LMS & Membership',
              collapsed: true,
              items: [
                { text: 'TutorLMS', link: '/guide/integrations/tutorlms-integration-with-fluentaffiliate' },
                { text: 'MemberPress', link: '/guide/integrations/memberpress-integration-with-fluentaffiliate' },
                { text: 'ProfilePress', link: '/guide/integrations/profilepress-integration-with-fluentaffiliate' },
                { text: 'LifterLMS', link: '/guide/integrations/lifterlms-integration-with-fluentaffiliate' },
                { text: 'Paid Membership Pro', link: '/guide/integrations/paid-memberships-pro-integration-with-fluentaffiliate' }
              ]
            },
            {
              text: 'Forms',
              collapsed: true,
              items: [
                { text: 'Fluent Forms', link: '/guide/integrations/fluentforms-integration-with-fluentaffiliate' },
                { text: 'Formidable', link: '/guide/integrations/formidable-integration-with-fluentaffiliate' }
              ]
            },
            {
              text: 'Payment',
              collapsed: true,
              items: [
                { text: 'GiveWP', link: '/guide/integrations/givewp-integration-with-fluentaffiliate' },
                { text: 'Paymattic', link: '/guide/integrations/paymattic-integration-with-fluentaffiliate' }
              ]
            },
            {
              text: 'Booking',
              collapsed: true,
              items: [
                { text: 'Fluent Booking', link: '/guide/integrations/fluentbooking-integration-with-fluentaffiliate' }
              ]
            },
            {
              text: 'CRM',
              collapsed: true,
              items: [
                { text: 'FluentCRM', link: '/guide/integrations/fluentcrm-integration-with-fluenaffiliate' }
              ]
            },
            {
              text: 'Security & Spam',
              collapsed: true,
              items: [
                { text: 'Google reCAPTCHA', link: '/guide/integrations/google-recaptcha-integration-with-fluentaffiliate' }
              ]
            }
          ]
        },
        {
          text: 'Settings & Customization',
          items: [
            { text: 'Referral Settings', link: '/guide/settings-and-customization/referral-settings' },
            { text: 'Group Settings', link: '/guide/settings-and-customization/group-settings' },
            { text: 'PayPal Payouts', link: '/guide/settings-and-customization/paypal-payouts' },
            { 
              text: 'Email Settings',
              collapsed: true,
              items:[
                 {text: 'Mail Settings', link: '/guide/settings-and-customization/email-settings' },
                 {text: 'Notificationn Settings', link: '/guide/settings-and-customization/notification-settings' }
              ]
            },
            {
              text: 'Registration Settings',
              collapsed: true,
              items: [
                { text: 'Registration Fields', link: '/guide/settings-and-customization/registration-settings' },
                { text: 'Captcha', link: '/guide/settings-and-customization/captcha-settings' }
              ]
            },
            { text: 'Permission Management', link: '/guide/settings-and-customization/permission-management' },
            {
              text: 'Migration Settings',
              collapsed: true,
              items: [
                { text: 'AffiliateWP Migration', link: '/guide/settings-and-customization/affiliatewp-migration' },
                { text: 'Affiliate Manager Migration', link: '/guide/settings-and-customization/affiliate-manager-migration' },
                { text: 'Solid Affiliate Migration', link: '/guide/settings-and-customization/solid-affiliate-migration' },
                { text: 'SliceWP Migration', link: '/guide/settings-and-customization/slicewp-migration' },
                { text: 'Ultimate Affiliate Migration', link: '/guide/settings-and-customization/ultimate-affiliate-migration' },
              ]
            },
            { text: 'Multi-Domain Management', link: '/guide/settings-and-customization/multi-domain-management' }
          ]
        },
        {
          text: 'Miscellaneous',
          items: [
            { text: 'Affiliate Profile', link: '/guide/miscellaneous/affiliate-profile' },
            { text: 'Affiliate Landing Page', link: '/guide/miscellaneous/affiliate-landing-page' },
            { text: 'Social Share for Affiliates', link: '/guide/miscellaneous/social-share' },
            { text: 'Non-Integrated Referrals', link: '/guide/miscellaneous/non-integrated-referrals' },
            { text: 'Promo Materials', link: '/guide/miscellaneous/promo-materials' }
          ]
        },
        {
          text: 'Troubleshooting & Support',
          items: [
            { text: 'How to Get Support', link: '/guide/troubleshooting-and-support/how-to-get-support' }
          ]
        },
        {
          text: 'Changelog',
        items: [
            { text: 'Changelogs', link: '/guide/changelog/changelog' }
        ]
      }
      ]
    },


    footer: {
      copyright: 'Copyright © 2026 FluentAffiliate'
    },

  }
})
