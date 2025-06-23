import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'FluentAffiliate Documentation',
  description: 'Complete documentation for FluentAffiliate WordPress plugin',
  lang: 'en-US',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  themeConfig: {
    logo: '/logo.png',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started/what-is-fluentaffiliate' },
      { text: 'Changelog', link: '/guide/changelog/changelog' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'What is FluentAffiliate?', link: '/guide/getting-started/what-is-fluentaffiliate' },
            { text: 'Installation & Activation', link: '/guide/getting-started/installation-activation-licensing' },
            { text: 'Onboarding & Setup', link: '/guide/getting-started/onboarding-setup' },
            { text: 'Key Features Overview', link: '/guide/getting-started/key-features-overview' }
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
            { text: 'Profile & Settings', link: '/guide/affiliate-portal/updating-profile-notification-settings' }
          ]
        },
        {
          text: 'Integrations',
          items: [
            { text: 'Overview', link: '/guide/integrations/integrations' },
            { text: 'WooCommerce', link: '/guide/integrations/woocommerce-integration-with-fluentaffiliate' },
            { text: 'Easy Digital Downloads', link: '/guide/integrations/easy-digital-downloads-integration-with-fluentaffiliate' },
            { text: 'EasyCart', link: '/guide/integrations/easycart-integration-with-fluentaffiliate' },
            { text: 'FluentBooking', link: '/guide/integrations/fluentbooking-integration-with-fluentaffiliate' },
            { text: 'FluentCRM', link: '/guide/integrations/fluentcrm-integration-with-fluenaffiliate' },
            { text: 'Fluent Forms', link: '/guide/integrations/fluentforms-integration-with-fluentaffiliate' },
            { text: 'Formidable Forms', link: '/guide/integrations/formidable-integration-with-fluentaffiliate' },
            { text: 'LearnDash', link: '/guide/integrations/learndash-integration-with-fluentaffiliate' },
            { text: 'MemberPress', link: '/guide/integrations/memberpress-integration-with-fluentaffiliate' },
            { text: 'SureCart', link: '/guide/integrations/surecart-integration-with-fluentaffiliate' }
          ]
        },
        {
          text: 'Settings & Customization',
          items: [
            { text: 'General Settings', link: '/guide/settings-and-customization/general-settings' },
            { text: 'Group Settings', link: '/guide/settings-and-customization/group-settings' },
            { text: 'Referral Settings', link: '/guide/settings-and-customization/referral-settings' },
            { text: 'Email Settings', link: '/guide/settings-and-customization/email-settings' },
            { text: 'Migrator Settings', link: '/guide/settings-and-customization/migrator-settings' },
            { text: 'Multi-Domain Management', link: '/guide/settings-and-customization/multi-domain-management' }
          ]
        },
        {
          text: 'Changelog',
          items: [
            { text: 'Release Notes', link: '/guide/changelog/changelog' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fluentcrm/fluent-affiliate' }
    ],

    footer: {
      message: 'Released under the GPL License.',
      copyright: 'Copyright © 2023-present FluentAffiliate'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/fluentcrm/fluent-affiliate/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
