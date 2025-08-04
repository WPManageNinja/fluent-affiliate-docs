import { defineConfig } from 'vitepress'
import { zoomablePlugin } from './theme/markdown-plugin-zoomable'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: ' ',
  description: 'Complete documentation for FluentAffiliate WordPress plugin',
  lang: 'en-US',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/../guide/public/images/brand/FluentAffiliate-Logo.webp' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

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
      dark: '/../guide/public/images/brand/main_logo_inverted.png',
      light: '/../guide/public/images/brand/main_logo.png',
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started/what-is-fluentaffiliate' },
      { text: 'Developers', link: '/developers/' },
      { text: 'Website', link: 'https://fluentaffiliate.com/' },
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
          ]
        },
        {
          text: 'Admin Portal',
          items: [
            { text: 'Dashboard Overview', link: '/guide/admin-portal/admin-dashboard-overview' },
            { text: 'Managing Affiliates', link: '/guide/admin-portal/managing-affiliates' },
            { text: 'Managing Referrals', link: '/guide/admin-portal/managing-referrals' },
            { text: 'Payout Management', link: '/guide/admin-portal/payout-management' }
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
                { text: 'WooCommerce', link: '/guide/integrations/woocommerce-integration-with-fluentaffiliate' },
                { text: 'Easy Digital Downloads', link: '/guide/integrations/easy-digital-downloads-integration-with-fluentaffiliate' },
                { text: 'SureCart', link: '/guide/integrations/surecart-integration-with-fluentaffiliate' },
                { text: 'Voxel', link: '/guide/integrations/voxel-integration-with-fluentaffiliate' }

              ]
            },
            {
              text: 'LMS & Membership',
              collapsed: true,
              items: [
                { text: 'MemberPress', link: '/guide/integrations/memberpress-integration-with-fluentaffiliate' },
                { text: 'LifterLMS', link: '/guide/integrations/lifterlms-integration-with-fluentaffiliate' },
                { text: 'Paid Membership Pro', link: '/guide/integrations/paid-memberships-pro-integration-with-fluentaffiliate' }
              ]
            },
            {
              text: 'Forms',
              collapsed: true,
              items: [
                { text: 'Fluent Forms', link: '/guide/integrations/fluentforms-integration-with-fluentaffiliate' }
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
            }
          ]
        },
        {
          text: 'Settings & Customization',
          items: [
            { text: 'Referral Settings', link: '/guide/settings-and-customization/referral-settings' },
            { text: 'Group Settings', link: '/guide/settings-and-customization/group-settings' },
            {
              text: 'Email Settings',
              collapsed: true,
              items:[
                 {text: 'Mail Settings', link: '/guide/settings-and-customization/email-settings' },
                 {text: 'Notificationn Settings', link: '/guide/settings-and-customization/notification-settings' }
              ]
            },
            { text: 'Registration Settings', link: '/guide/settings-and-customization/registration-settings' },
            { text: 'Migrator Settings', link: '/guide/settings-and-customization/migrator-settings' },
            { text: 'Multi-Domain Management', link: '/guide/settings-and-customization/multi-domain-management' }
          ]
        },
        {
          text: 'Miscellaneous',
          items: [
            { text: 'Affiliate Profile', link: '/guide/miscellaneous/affiliate-profile' }
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
      },

      ],

      '/developers/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview', link: '/developers/' },
            { text: 'Developer Guide', link: '/developers/getting-started/' },
            { text: 'Quick Start', link: '/developers/quick-start' }
          ]
        },
        {
          text: 'Database',
          items: [
            { text: 'Database Schema', link: '/developers/database/' },
            { text: 'Database Models', link: '/developers/database/models/' },
            { text: 'Query Builder', link: '/developers/database/query-builder' }
          ]
        },
        {
          text: 'Database Models',
          items: [
            { text: 'Affiliate Model', link: '/developers/database/models/affiliate/' },
            { text: 'Referral Model', link: '/developers/database/models/referral/' },
            { text: 'Customer Model', link: '/developers/database/models/customer/' },
            { text: 'Visit Model', link: '/developers/database/models/visit/' },
            { text: 'Payout Model', link: '/developers/database/models/payout/' },
            { text: 'Transaction Model', link: '/developers/database/models/transaction/' },
            { text: 'AffiliateGroup Model', link: '/developers/database/models/affiliate-group/' },
            { text: 'Meta Model', link: '/developers/database/models/meta/' }
          ]
        },
        {
          text: 'Developer Tools',
          items: [
            { text: 'Global Functions', link: '/developers/global-functions/' },
            { text: 'Helper Classes', link: '/developers/helpers/' }
          ]
        },
        {
          text: 'Hooks System',
          items: [
            { text: 'Overview', link: '/developers/hooks/' },
            { text: 'Action Hooks', link: '/developers/hooks/actions/' },
            { text: 'Filter Hooks', link: '/developers/hooks/filters/' }
          ]
        },
        {
          text: 'API',
          items: [
            { text: 'REST API', link: '/developers/api/' },
            { text: 'Authentication', link: '/developers/api/authentication/' },
            { text: 'Endpoints', link: '/developers/api/endpoints/' }
          ]
        },
        {
          text: 'Code Examples',
          items: [
            { text: 'Overview', link: '/developers/examples/' },
            { text: 'Integration Examples', link: '/developers/examples/integrations/' },
            { text: 'Portal Customization', link: '/developers/examples/portal/' },
            { text: 'Workflow Examples', link: '/developers/examples/workflows/' }
          ]
        },
        {
          text: 'Action Hooks',
          collapsed: true,
          items: [
            { text: 'Affiliate', link: '/developers/hooks/actions/affiliate/' },
            { text: 'Referrals', link: '/developers/hooks/actions/referrals/' },
            { text: 'Transactions', link: '/developers/hooks/actions/transactions/' },
            { text: 'Payouts', link: '/developers/hooks/actions/payouts/' },
            { text: 'Groups', link: '/developers/hooks/actions/groups/' },
            { text: 'Integrations', link: '/developers/hooks/actions/integrations/' },
            { text: 'Authentication', link: '/developers/hooks/actions/auth/' },
            { text: 'Portal', link: '/developers/hooks/actions/portal/' },
            { text: 'Admin', link: '/developers/hooks/actions/admin/' }
          ]
        },
        {
          text: 'Filter Hooks',
          collapsed: true,
          items: [
            { text: 'Configuration', link: '/developers/hooks/filters/configuration/' },
            { text: 'Portal & UI', link: '/developers/hooks/filters/portal/' },
            { text: 'Authentication', link: '/developers/hooks/filters/authentication/' },
            { text: 'Tracking', link: '/developers/hooks/filters/tracking/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fluentcrm/fluent-affiliate' }
    ],

    footer: {
      message: 'Released under the GPL License.',
      copyright: 'Copyright © 2025-present FluentAffiliate'
    },



    editLink: {
      pattern: 'https://github.com/fluentcrm/fluent-affiliate/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
