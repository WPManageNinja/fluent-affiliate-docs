---
title: Changelog
description: View the complete FluentAffiliate changelog. Track plugin updates, new features, bug fixes, and improvements across all versions of the WordPress affiliate management plugin.
---

# Changelog
Stay updated with the latest improvements, new features, bug fixes, and performance enhancements in FluentAffiliate.

## FluentAffiliate v1.6.01
*Released on Aug 10, 2026*

- Improved: reCAPTCHA Keys Validated Automatically on Save
- Fixed: Affiliate Registration and Login Forms in Production Builds
- Fixed: Affiliate Portal Not Loading With Cookie Consent Blockers


## FluentAffiliate v1.6.0
*Released on Aug 03, 2026*

::::: code-group

```markdown [✨ Newly Added]
• Adds Captcha Protection on Affiliate Registration
• Adds Custom Affiliate Registration Fields
• Adds Admin Menu Title Filter Hook
• Adds Manage CRM Tags and Lists From Affiliate Profile
• Adds Creatives Migration from Solid Affiliate
```

```markdown [🐞 Bug fixes]
• Fixes Manual Referral Amounts Losing a Cent
• Fixes Cart Manual Order Credited to the Admin's Cookie Affiliate
• Fixes Group Commission Rate Disagreement Between Checkout and Admin
• Fixes Payout Transactions Hardcoded to USD
• Fixes Referrals Stranded in Processing Status
• Fixes Per Transaction Referral Count Counting the Whole Payout
• Fixes Division by Zero on Zero Total Refund
• Fixes Tracker Dropping the Referrer on Every Visit
• Fixes Referral Links Breaking When the Link Format Changed
• Fixes Checkout Fatal Error When an Affiliate's User Was Deleted
• Fixes Affiliate List Filters Lost to Sanitization
• Fixes Group Options Endpoint Unreachable for Managers
• Fixes Custom Notification Email Subjects Being Ignored
• Fixes Manual Referral Firing the Unpaid Hook for Every Status
• Fixes Solid Affiliate Group, Rate Type, and Product Migration
```

```markdown [🚀 Improvements]
• Improves Dark Mode Palette, Contrast, and Admin Styles
• Improves Referral and Payout Transaction Table Indexes
• Improves Bounded Payout Export and Reconciliation Query Budgets
• Improves Batched Lookups and Failure Handling in Data Migration
• Improves Output Escaping and Input Sanitization Compliance
• Improves Security by Gating Report Endpoints Behind Permission Checks
• Improves Security by Validating Proxy-Supplied IP Headers
• Improves Security by Escaping Redirect URL in Auth Success Markup
```

:::::

## FluentAffiliate v1.5.0
*Released on Jun 22, 2026*

::::: code-group

```markdown [✨ Newly Added]
• Adds Lifetime Commissions
• Adds Ultimate Affiliate Data Migration
```

```markdown [🐞 Bug fixes]
• Fixes CSRF on Manual Update-Check Trigger
• Fixes Doubled FluentCart Commission on Setup Fee
• Fixes Self-Referral Not Blocked When Disabled
• Fixes Duplicate Customers and Payouts on Migration Re-Run
• Fixes Earnings Recount and Payout Totals During Migration
• Fixes Null Check After Referral Recording in Integrations
• Fixes Dark Mode Background Leaking to All Admin Pages
• Fixes FluentCRM Manage Button URL in Features & Addons
```

```markdown [🚀 Improvements]
• Improves Migration Performance and Memory Use on Large Datasets
• Improves Affiliate Portal Sidebar and Body Equal Height
• Improves Security with Hardened Input Sanitization and v-html XSS Sinks in Admin and Portal
```

:::::

## FluentAffiliate v1.4.0
*Released on Apr 10, 2026*

::::: code-group

```markdown [✨ Newly Added]
• Adds SliceWP Migration
• Adds Commission on WooCommerce Subscription Renewal
• Adds Subscription Renewal Commission Rates Per Product/Category
• Adds CSV Export for Affiliates, Referrals, and Visits
• Adds Social Media Share for Affiliates in the Affiliate Portal
• Adds QR Code Settings for Affiliate Portal
• Adds Recommended Plugins and Add-ons Section
```

```markdown [🐞 Bug fixes]
• Fixes Visits Filter Not Working
• Fixes Payout Currency Symbol Display
• Fixes FluentBooking Product Selector Issue
• Fixes ProfilePress Integration Issue
• Fixes EDD Coupon Affiliate Lookup Issue
• Fixes PMPro Integration Ignoring Disabled Connector State
• Fixes Renewal Rate Not Accepting Decimal Values
• Fixes WooCommerce Renewal Commission Note
• Fixes Affiliate Commission on Conversion Script
• Fixes Individual Integration Settings Issue
• Fixes Network Activation Skipping Pro Migrations on Multisite Child Sites
• Fixes Infinite Loop in Username Generation
```

```markdown [🚀 Improvements]
• Improves Creatives Now Included in Data Migration
• Improves Security with Hardened Nonce Verification on AJAX Actions
```

:::::

## FluentAffiliate v1.3.0
*Released on Feb 03, 2026*

::::: code-group

```markdown [✨ Newly Added]
• Adds Bank Details Payout Method
• Adds Decimal Number Support in Manual Referral
• Adds Affiliate Commission on Subscription
• Adds Dynamic Affiliate QR Code
```

```markdown [🐞 Bug fixes]
• Fixes Login Option Showing for Logged-in User
• Fixes Issue with Tutor LMS Integration
• Fixes Affiliate Manager Migration Issue
• Fixes Data Unserialization Issue
```

:::::

## FluentAffiliate v1.2.0
*Released on Oct 28, 2025*

::::: code-group

```markdown [✨ Newly Added]
• Adds Integration with TutorLMS
• Adds ProfilePress Pro Integration
• Adds RTL (Right-to-Left) Compatibility
• Adds Solid Affiliate Migration
• Adds Affiliate Manager Migration
```

```markdown [🐞 Bug fixes]
• Fixes Payment Email Validation
```

```markdown [🚀 Improvements]
• Improves UI-UX
```

:::::

## FluentAffiliate v1.1.0
*Released on Sep 16, 2025*

::::: code-group

```markdown [✨ Newly Added]
• Adds Affiliate Creative Module
• Adds Affiliate ID in Affiliates Listing
• Adds Affiliate ID Support in Affiliate Searching
• Adds Pagination Jump-to-Page Option
• Adds Missing Translation Strings
```

```markdown [🐞 Bug fixes]
• Fixes Money Formatting Issue in Email Notifications
• Fixes Registration Fields Not Updating Issue
• Fixes Standard Commission Amount Incorrectly Applied as Percentage
• Fixes Affiliate Registration Issue with Fluentform
• Fixes Commission Rate Not Allowing Zero
```

```markdown [🚀 Improvements]
• Improves Affiliate and Referral Linking
• Improves Menu Capability for Permission Management
```

:::::

## FluentAffiliate v1.0.2
*Released on Sep 03, 2025*

::::: code-group

```markdown [✨ Newly Added]
• Adds Permission Management
• Adds Integration with FluentCRM
• Adds Custom Html Block Support in Customer Portal
• Adds Missing Translation String
```

```markdown [🐞 Bug fixes]
• Fixes Email Content Update Issue
• Fixes Referral Settings Issue with Multisite
• Fixes Website Link is Not Showing in Email Notification
```

:::::

## FluentAffiliate v1.0.1
*Released on Aug 28, 2025*

::::: code-group

```markdown [✨ Newly Added]
• Adds Multi-site Support
• Adds WP CLI Support to Migrate from AffiliateWP
```

```markdown [🐞 Bug fixes]
• Fixes Registration Form Bugs
• Fixes Minor Bugs
```

```markdown [🚀 Improvements]
• Improves Overall Performance
```

:::::

## FluentAffiliate v1.0.0
*Released on Aug 26, 2025*

::::: code-group

```markdown [🎉 Initial Release]
• Hello World!
• The first release of FluentAffiliate is here!
```

:::::
