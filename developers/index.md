---
layout: home

hero:
  name: "FluentAffiliate"
  text: "Developer Documentation"
  tagline: "Build powerful affiliate marketing solutions with comprehensive developer tools, hooks, and APIs"
  image:
    src: /developers/public/developer-docs-hero-image.png
    alt: FluentAffiliate Developer Documentation
  actions:
    - theme: brand
      text: Get Started
      link: /developers/quick-start
    - theme: alt
      text: Explore Hooks
      link: /developers/hooks/

features:
  - icon: 🎣
    title: Hooks System
    details: 53+ action and filter hooks for complete customization of affiliate workflows, referral tracking, and payout processing
    link: /developers/hooks/
    linkText: Explore Hooks →
  
  - icon: ⚡
    title: Action Hooks
    details: 28 action hooks across 8 modules for affiliate lifecycle, referrals, transactions, and integrations
    link: /developers/hooks/actions/
    linkText: View Actions →
  
  - icon: 🔧
    title: Filter Hooks
    details: 25+ filter hooks for customizing configuration, portal UI, authentication, and tracking behavior
    link: /developers/hooks/filters/
    linkText: View Filters →
  
  - icon: 📚
    title: API Reference
    details: RESTful API documentation for external integrations and custom applications
    link: /developers/api/
    linkText: Coming Soon
  
  - icon: 🛠️
    title: SDK & Tools
    details: PHP SDK, testing utilities, and development tools for FluentAffiliate integration
    link: /developers/sdk/
    linkText: Coming Soon
  
  - icon: 💡
    title: Code Examples
    details: Real-world implementation examples, integration patterns, and best practices
    link: /developers/examples/
    linkText: Coming Soon
---

## Quick Overview

FluentAffiliate provides a comprehensive developer ecosystem for building custom affiliate marketing solutions. Whether you're extending functionality, integrating with external systems, or building custom workflows, our developer tools have you covered.

### 🚀 **What You Can Build**

- **Custom Affiliate Workflows** - Extend affiliate lifecycle with action hooks
- **External Integrations** - Connect with CRMs, email platforms, and analytics tools  
- **Custom Portal Features** - Modify the affiliate portal UI and functionality
- **Payment Integrations** - Build custom payout methods and transaction processing
- **Analytics & Reporting** - Create custom tracking and reporting solutions

### 📖 **Documentation Sections**

#### [Hooks System](/developers/hooks/)
Complete documentation for FluentAffiliate's hook system with 53+ hooks across all modules.

- **[Action Hooks](/developers/hooks/actions/)** - Execute code at specific points in FluentAffiliate
- **[Filter Hooks](/developers/hooks/filters/)** - Modify data and customize behavior

#### API Reference *(Coming Soon)*
RESTful API documentation for external integrations and headless implementations.

#### SDK Documentation *(Coming Soon)*
PHP SDK and development tools for streamlined FluentAffiliate integration.

#### Code Examples *(Coming Soon)*
Real-world examples and implementation patterns for common use cases.

---

### 🎯 **Popular Use Cases**

<div class="use-cases">

**E-commerce Integration**
```php
// Track WooCommerce orders as referrals
add_action('fluent_affiliate/referral_created', function($referral) {
    sync_with_analytics($referral);
});
```

**Custom Notifications**
```php
// Send Slack notifications for new affiliates
add_action('fluent_affiliate/affiliate_created', function($affiliate) {
    send_slack_notification("New affiliate: {$affiliate->name}");
});
```

**Portal Customization**
```php
// Add custom dashboard widgets
add_filter('fluent_affiliate/affiliate_widgets', function($widgets) {
    $widgets['custom_analytics'] = [
        'title' => 'Custom Analytics',
        'component' => 'CustomAnalyticsWidget'
    ];
    return $widgets;
});
```

</div>

---

### 🔗 **Quick Links**

- **[Getting Started](/developers/quick-start)** - Set up your development environment
- **[Hook Reference](/developers/hooks/)** - Complete hooks documentation  
- **[GitHub Repository](https://github.com/WPManageNinja/fluent-affiliate)** - Source code and issues
- **[Community Forum](https://fluentaffiliate.com/community)** - Get help and share ideas

<style>
.use-cases {
  margin: 2rem 0;
}

.use-cases h4 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand-1);
}

.use-cases pre {
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}
</style>
