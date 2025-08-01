# FluentAffiliate Action Hooks
### FluentAffiliate provides comprehensive action hooks that allow developers to customize affiliate management functionality and extend the plugin with new features.
<hr/>
<Badge type="tip" vertical="top" text="FluentAffiliate Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

FluentAffiliate has many powerful action hooks that let developers change default settings, customize affiliate workflows, and extend the plugin with new functionality. These hooks provide deep integration points throughout the affiliate management lifecycle.

## What are Action Hooks

Action hooks are used to run custom code when certain events occur in FluentAffiliate. They allow you to execute your own functions at specific points during affiliate operations, such as when an affiliate is created, updated, or when referrals are processed.

## Available Action Hook Modules

### [Affiliate Module](/developers/hooks/actions/affiliate/)
<hr />

**Lifecycle Hooks:**
- [`fluent_affiliate/affiliate_created`](/developers/hooks/actions/affiliate/#fluent_affiliate_affiliate_created)
- [`fluent_affiliate/affiliate_updated`](/developers/hooks/actions/affiliate/#fluent_affiliate_affiliate_updated)
- [`fluent_affiliate/before_delete_affiliate`](/developers/hooks/actions/affiliate/#fluent_affiliate_before_delete_affiliate)
- [`fluent_affiliate/after_delete_affiliate`](/developers/hooks/actions/affiliate/#fluent_affiliate_after_delete_affiliate)

**Status Change Hooks:**
- [`fluent_affiliate/affiliate_status_to_active`](/developers/hooks/actions/affiliate/#fluent_affiliate_affiliate_status_to_active)
- [`fluent_affiliate/affiliate_status_to_pending`](/developers/hooks/actions/affiliate/#fluent_affiliate_affiliate_status_to_pending)
- [`fluent_affiliate/affiliate_status_to_inactive`](/developers/hooks/actions/affiliate/#fluent_affiliate_affiliate_status_to_inactive)

### [Referral Module](/developers/hooks/actions/referrals/)
<hr />

**Lifecycle Hooks:**
- [`fluent_affiliate/referral_created`](/developers/hooks/actions/referrals/#fluent_affiliate_referral_created)
- [`fluent_affiliate/referral_marked_unpaid`](/developers/hooks/actions/referrals/#fluent_affiliate_referral_marked_unpaid)
- [`fluent_affiliate/referral_marked_rejected`](/developers/hooks/actions/referrals/#fluent_affiliate_referral_marked_rejected)
- [`fluent_affiliate/referral/before_delete`](/developers/hooks/actions/referrals/#fluent_affiliate_referral_before_delete)
- [`fluent_affiliate/referral/deleted`](/developers/hooks/actions/referrals/#fluent_affiliate_referral_deleted)

**Notification Hooks:**
- [`fluent_affiliate/send_new_referral_notification`](/developers/hooks/actions/referrals/#fluent_affiliate_send_new_referral_notification)

### [Payout Module](/developers/hooks/actions/payouts/)
<hr />

**Payout Lifecycle Hooks:**
- *Coming Soon* - Payout-specific hooks not yet implemented

### [Transaction Module](/developers/hooks/actions/transactions/)
<hr />

**Transaction Status Hooks:**
- [`fluent_affiliate/payout/transaction/transaction_updated_to_paid`](/developers/hooks/actions/transactions/#fluent_affiliate_payout_transaction_transaction_updated_to_paid)
- [`fluent_affiliate/payout/transaction/transaction_updated_to_processing`](/developers/hooks/actions/transactions/#fluent_affiliate_payout_transaction_transaction_updated_to_processing)
- [`fluent_affiliate/payout/transaction/transaction_updated_to_failed`](/developers/hooks/actions/transactions/#fluent_affiliate_payout_transaction_transaction_updated_to_failed)
- [`fluent_affiliate/payout/transaction/transaction_updated_to_{status}`](/developers/hooks/actions/transactions/#fluent_affiliate_payout_transaction_transaction_updated_to_status) (Dynamic pattern)

**Transaction Deletion Hooks:**
- [`fluent_affiliate/payout/transaction/deleting`](/developers/hooks/actions/transactions/#fluent_affiliate_payout_transaction_deleting)
- [`fluent_affiliate/payout/transaction/deleted`](/developers/hooks/actions/transactions/#fluent_affiliate_payout_transaction_deleted)

### [Authentication Module](/developers/hooks/actions/auth/)
<hr />

**Form Rendering Hooks:**
- [`fluent_affiliate/render_login_form`](/developers/hooks/actions/auth/#fluent_affiliate_render_login_form)
- [`fluent_affiliate/render_signup_form`](/developers/hooks/actions/auth/#fluent_affiliate_render_signup_form)

### [Portal Module](/developers/hooks/actions/portal/)
<hr />

**Email Template Hooks:**
- [`fluent_affiliate/email_head`](/developers/hooks/actions/portal/#fluent_affiliate_email_head)

### [Group Module](/developers/hooks/actions/groups/)
<hr />

**Group Management Hooks:**
- [`fluent_affiliate/before_create_affiliate_group`](/developers/hooks/actions/groups/#fluent_affiliate_before_create_affiliate_group)
- [`fluent_affiliate/before_delete_affiliate_group`](/developers/hooks/actions/groups/#fluent_affiliate_before_delete_affiliate_group)
- [`fluent_affiliate/after_delete_affiliate_group`](/developers/hooks/actions/groups/#fluent_affiliate_after_delete_affiliate_group)

### [Integration Module](/developers/hooks/actions/integrations/)
<hr />

**Third-Party Plugin Hooks:**
- [`fluent_affiliate/affiliate_created_via_fluent_form`](/developers/hooks/actions/integrations/#fluent_affiliate_affiliate_created_via_fluent_form)
- *Coming Soon* - Additional plugin integration hooks

### [Admin Module](/developers/hooks/actions/admin/)
<hr />

**Admin Interface Hooks:**
- [`fluent_affilate/rendering_admin_app`](/developers/hooks/actions/admin/#fluent_affilate_rendering_admin_app)
- [`fluent-affiliate_loading_app`](/developers/hooks/actions/admin/#fluent-affiliate_loading_app)

## Quick Reference

### Most Commonly Used Hooks:
1. `fluent_affiliate/affiliate_created` - Welcome new affiliates
2. `fluent_affiliate/affiliate_status_to_active` - Handle affiliate approvals
3. `fluent_affiliate/referral_created` - Track new referrals
4. `fluent_affiliate/payout/transaction/transaction_updated_to_paid` - Handle payments

### Hook Naming Patterns:
- **Affiliate:** `fluent_affiliate/affiliate_{action}`
- **Referrals:** `fluent_affiliate/referral_{action}`
- **Transactions:** `fluent_affiliate/payout/transaction/{action}`
- **Groups:** `fluent_affiliate/{action}_affiliate_group`
- **Status Changes:** `fluent_affiliate/{module}_status_to_{status}`

### Module Summary:
- **8 Modules** with **28 total action hooks**
- **Model-aligned structure** for better organization
- **Complete lifecycle coverage** for core entities
- **Coming Soon** indicators for missing hooks

All hooks provide detailed object data and contextual information, making it easy to integrate with external systems, send notifications, perform validation, and customize workflows across all FluentAffiliate modules.
