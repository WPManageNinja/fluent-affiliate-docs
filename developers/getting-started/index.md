# FluentAffiliate Developer Guide

FluentAffiliate Core Complete Guide

Welcome to the complete developer guide for **FluentAffiliate** - the self-hosted affiliate marketing plugin for WordPress. This comprehensive guide will take you from understanding the basics to building sophisticated integrations and custom functionality.

## What is FluentAffiliate?

FluentAffiliate is a **Self-Hosted Affiliate Marketing Plugin** for WordPress that helps businesses manage their affiliate programs, track referrals, and process payouts. Unlike cloud-based solutions, FluentAffiliate runs entirely on your WordPress site, ensuring data privacy, unlimited affiliates, and no monthly fees.

## Why Extend FluentAffiliate?

FluentAffiliate is designed to be highly extensible, allowing developers to customize and extend its functionality far beyond what the plugin offers out-of-the-box. Whether you're a business owner looking to customize your affiliate program or a developer hired to create specific integrations, FluentAffiliate provides the tools you need.

### 🔧 **Built for Customization**

- **Extensive hook system** - 53+ action and filter hooks for custom functionality
- **Modular architecture** - Clean separation allows safe modifications and additions
- **RESTful API** - Complete programmatic access to all affiliate data and functions
- **WordPress-native** - Follows WordPress coding standards and best practices

### 🏗️ **Flexible Extension Points**

- **Custom affiliate workflows** - Create triggers, actions, and automations for unique processes
- **Third-party integrations** - Connect with external services and platforms
- **Custom portal sections** - Add specialized data views and functionality
- **API extensions** - Build custom endpoints for mobile apps or external systems

### 💼 **Business Benefits**

- **No vendor lock-in** - Your customizations stay with you, not dependent on external services
- **Unlimited scalability** - Extend functionality as your business needs grow
- **Cost-effective** - One-time development instead of ongoing SaaS fees
- **Complete control** - Modify any aspect to match your specific business processes

## FluentAffiliate Versions

### FluentAffiliate Core (Free)

The free version includes powerful core functionalities:

- ✅ **Affiliate Management** - Unlimited affiliates and custom fields
- ✅ **Referral Tracking** - Comprehensive referral monitoring
- ✅ **Basic Payouts** - Manual payout processing
- ✅ **Portal Access** - Affiliate dashboard and tools
- ✅ **Integration Support** - Works with popular plugins
- ✅ **WooCommerce Integration** - Basic e-commerce tracking
- ✅ **Developer API** - Full access to hooks and REST API

### FluentAffiliate Pro (Premium)

The premium version adds advanced marketing features:

- 🚀 **Advanced Automations** - Complex multi-step workflows
- 🚀 **Smart Payouts** - Automated payout processing
- 🚀 **Advanced Tracking** - Multi-tier and performance tracking
- 🚀 **Deep Integrations** - 15+ third-party integrations
- 🚀 **Revenue Analytics** - Advanced reporting and analytics
- 🚀 **Custom Commissions** - Flexible commission structures
- 🚀 **Advanced Portal** - Enhanced affiliate dashboard

## Core Development Concepts

### 📊 **Data Architecture**

FluentAffiliate follows WordPress conventions with a clean, normalized database structure:

**Core Tables & Relationships:**

- **👥 Affiliates** (`fa_affiliates`) - Central hub for all affiliate data
  - Stores affiliate information, status, commission rates
  - Links to all referrals, payouts, and activities
- **📈 Referrals** (`fa_referrals`) - Track all referral activities
  - Commission tracking, conversion data, status management
  - Links to affiliates and original transactions
- **💰 Transactions** (`fa_transactions`) - Financial transaction records
  - Payout processing, commission calculations
  - Links to referrals and affiliate accounts
- **👥 Groups** (`fa_groups`) - Organize affiliates into categories
  - Commission tiers, access levels, special programs
  - Many-to-many relationship with affiliates
- **🔗 Tracking** (`fa_url_metrics`) - URL and click tracking
  - Performance analytics, conversion tracking
  - Attribution and referral source data

### 🔄 **Affiliate Workflow**

The three-component affiliate system:

1. **Registration** - Affiliate signup and approval process
2. **Tracking** - Link generation, click tracking, and conversion monitoring
3. **Payouts** - Commission calculation and payment processing

### 🔌 **Extension Points**

Multiple ways to extend FluentAffiliate:

- **WordPress Hooks** - 53+ actions and filters for custom functionality
- **REST API** - Complete programmatic access to all features
- **Portal Customization** - Add custom dashboard widgets and pages
- **Integration Modules** - Connect with external platforms and services
- **Custom Tracking** - Implement specialized tracking methods

## Directory Structure

Understanding FluentAffiliate's organized codebase:

```
fluent-affiliate/
├── app/                    # Core application logic
│   ├── Api/               # REST API endpoints and utilities
│   ├── Functions/         # Global helper functions
│   ├── Hooks/            # WordPress action/filter handlers
│   ├── Http/             # Request handling and routing
│   │   ├── Controllers/   # API and admin controllers
│   │   ├── Policies/     # Permission and access control
│   │   └── routes.php    # Route definitions
│   ├── Models/           # Database models and relationships
│   │   ├── Affiliate.php # Affiliate model
│   │   ├── Referral.php  # Referral tracking model
│   │   ├── Transaction.php # Transaction model
│   │   └── ...          # Additional models
│   ├── Services/         # Business logic and services
│   │   ├── Integrations/ # Third-party integration services
│   │   ├── Tracking/    # Tracking and analytics services
│   │   └── Helper.php   # Core helper utilities
│   └── views/           # PHP template files
│
├── assets/              # Frontend assets
│   ├── admin/          # Admin interface assets
│   ├── public/         # Public-facing assets
│   └── images/         # Image resources
│
├── boot/               # Plugin initialization
├── config/             # Configuration files
├── database/           # Database migrations and schema
│   ├── migrations/     # Database migration files
│   └── DBMigrator.php # Migration handler
│
└── fluent-affiliate.php # Plugin entry point
```

## Development Environment Setup

### Prerequisites

- **WordPress 5.0+** - Modern WordPress installation
- **PHP 7.4+** - Recent PHP version with required extensions
- **MySQL 5.6+** - Database with InnoDB support
- **Basic WordPress Development** - Understanding of hooks, plugins, and themes

### Development Tools

- **Code Editor** - VS Code, PhpStorm, or your preferred editor
- **Local Environment** - Laravel Herd, XAMPP, WAMP, or Docker
- **Version Control** - Git for tracking changes (optional but recommended)
- **API Testing** - Postman or Insomnia for REST API development

### Getting Started Checklist

1. **📖 Read the Fundamentals**
   - [ ] Understand the [database schema](/developers/database/)
   - [ ] Review [core models](/developers/database/models/)
   - [ ] Explore [global functions](/developers/global-functions/)

2. **🔍 Explore the Hooks**
   - [ ] Browse [action hooks](/developers/hooks/actions/)
   - [ ] Study [filter hooks](/developers/hooks/filters/)
   - [ ] Try [helper classes](/developers/helpers/)

3. **🏗️ Build Your First Extension**
   - [ ] Create a [custom affiliate workflow](/developers/examples/workflows/)
   - [ ] Build a [custom integration](/developers/examples/integrations/)
   - [ ] Add a [portal widget](/developers/examples/portal/)

4. **🌐 API Integration**
   - [ ] Set up [REST API access](/developers/api/authentication/)
   - [ ] Test [affiliate management](/developers/api/affiliates/)
   - [ ] Explore [webhook integration](/developers/api/webhooks/)

## Community & Support

### 📚 **Learning Resources**

- **[Official Documentation](https://fluentaffiliate.com/docs/)** - User guides and tutorials
- **[Developer Hooks Reference](/developers/hooks/)** - Complete hook documentation
- **[REST API Documentation](/developers/api/)** - Comprehensive API guide
- **[Developer Changelog](/developers/changelog/)** - Latest updates and breaking changes

### 💬 **Community**

- **[WPManageNinja Community](https://community.wpmanageninja.com/)** - Official community
- **[Facebook Community](https://www.facebook.com/groups/fluentaffiliate)** - Active user discussions
- **[Official Support](https://wpmanageninja.com/support-tickets/)** - Technical support

### 🚀 **Next Steps**

Ready to start building? Choose your path:

- **[Quick Start Guide](/developers/quick-start/)** - Get coding in minutes
- **[Hook Integration](/developers/hooks/)** - Leverage WordPress hooks
- **[Database Deep Dive](/developers/database/)** - Master the data structure
- **[API Development](/developers/api/)** - Build external integrations

---

*Ready to transform your affiliate marketing with custom development? Let's build something amazing together!*
