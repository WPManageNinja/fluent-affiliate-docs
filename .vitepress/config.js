export default {
  title: ' ',
  description: 'Documentation for FluentAffiliate WordPress Plugin',
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
      { text: 'Getting Started', link: '/guide/getting-started/what-is-fluentaffiliate' },
      { text: 'Admin Guide', link: '/guide/admin-portal/admin-dashboard-overview' },
      { text: 'Affiliate Guide', link: '/guide/affiliate-portal/affiliate-dashboard-overview' },
      { text: 'Integrations', link: '/guide/integrations/integrations' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'What is FluentAffiliate?', link: '/guide/getting-started/what-is-fluentaffiliate' },
            { text: 'Installation & Activation', link: '/guide/getting-started/installation-activation-licensing' },
            { text: 'Initial Setup', link: '/guide/getting-started/onboarding-setup' }
          ]
        },
        {
          text: 'Admin Portal',
          collapsed: true,
          items: [
            { text: 'Dashboard Overview', link: '/guide/admin-portal/admin-dashboard-overview' },
            { text: 'Managing Affiliates', link: '/guide/admin-portal/managing-affiliates' },
            { text: 'Managing Referrals', link: '/guide/admin-portal/managing-referrals' },
            { text: 'Payout Management', link: '/guide/admin-portal/payout-management' }
          ]
        },
        {
          text: 'Affiliate Portal',
          collapsed: true,
          items: [
            { text: 'Dashboard Overview', link: '/guide/affiliate-portal/affiliate-dashboard-overview' },
            { text: 'Registration Process', link: '/guide/affiliate-portal/how-to-register-as-an-affiliate' },
            { text: 'Generating Links', link: '/guide/affiliate-portal/generating-affiliate-links' },
            { text: 'Tracking Referrals', link: '/guide/affiliate-portal/tracking-referrals' },
            { text: 'Checking Visits', link: '/guide/affiliate-portal/checking-visits' },
            { text: 'Managing Payouts', link: '/guide/affiliate-portal/payouts' },
            { text: 'Profile Settings', link: '/guide/affiliate-portal/updating-profile-notification-settings' }
          ]
        },
        {
          text: 'Integrations',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/guide/integrations/integrations' },
            {
              text: 'E-Commerce',
              collapsed: true,
              items: [
                { text: 'WooCommerce', link: '/guide/integrations/woocommerce-integration-with-fluentaffiliate' },
                { text: 'Easy Digital Downloads', link: '/guide/integrations/easy-digital-downloads-integration-with-fluentaffiliate' },
                { text: 'SureCart', link: '/guide/integrations/surecart-integration-with-fluentaffiliate' },
                { text: 'EasyCart', link: '/guide/integrations/easycart-integration-with-fluentaffiliate' }
              ]
            },
            {
              text: 'LMS & Membership',
              collapsed: true,
              items: [
                { text: 'LearnDash', link: '/guide/integrations/learndash-integration-with-fluentaffiliate' },
                { text: 'MemberPress', link: '/guide/integrations/memberpress-integration-with-fluentaffiliate' }
              ]
            },
            {
              text: 'Forms & CRM',
              collapsed: true,
              items: [
                { text: 'Fluent Forms', link: '/guide/integrations/fluentforms-integration-with-fluentaffiliate' },
                { text: 'FluentCRM', link: '/guide/integrations/fluentcrm-integration-with-fluenaffiliate' },
                { text: 'Formidable', link: '/guide/integrations/formidable-integration-with-fluentaffiliate' }
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
          collapsed: true,
          items: [
            { text: 'General Settings', link: '/guide/settings-and-customization/general-settings' },
            { text: 'Email Settings', link: '/guide/settings-and-customization/email-settings' },
            { text: 'Referral Settings', link: '/guide/settings-and-customization/referral-settings' },
            { text: 'Group Settings', link: '/guide/settings-and-customization/group-settings' },
            { text: 'Multi-Domain Management', link: '/guide/settings-and-customization/multi-domain-management' },
            { text: 'Migrator Settings', link: '/guide/settings-and-customization/migrator-settings' }
          ]
        },
        {
          text: 'Miscellaneous',
          collapsed: true,
          items: [
            { text: 'Affiliate Profile', link: '/guide/miscellaneous/affiliate-profile' }
          ]
        },
        {
          text: 'Troubleshooting & Support',
          collapsed: true,
          items: [
            { text: 'How to Get Support', link: '/guide/troubleshooting-and-support/how-to-get-support' }
          ]
        },
      ]
    }
  }
} 