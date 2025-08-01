# FluentAffiliate Filter Hooks
### FluentAffiliate provides comprehensive filter hooks that allow developers to modify data, customize behavior, and extend functionality throughout the plugin.
<hr/>
<Badge type="tip" vertical="top" text="FluentAffiliate Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

Filter hooks allow you to modify data as it passes through FluentAffiliate. Unlike action hooks that execute code at specific points, filter hooks let you change values, add data, or customize behavior before it's used by the plugin.

## What are Filter Hooks

Filter hooks are used to modify data in FluentAffiliate. They allow you to intercept values, modify them, and return the modified data back to the plugin. This enables powerful customizations without modifying core plugin files.

## Available Filter Hook Modules

### [Configuration & Settings](/developers/hooks/filters/configuration/)
<hr />

**Currency & Localization:**
- [`fluent_affiliate/get_currencies`](/developers/hooks/filters/configuration/#fluent_affiliate_get_currencies)
- [`fluent_affiliate/currency_symbols`](/developers/hooks/filters/configuration/#fluent_affiliate_currency_symbols)

**Plugin Configuration:**
- [`fluent_affiliate/get_referral_config`](/developers/hooks/filters/configuration/#fluent_affiliate_get_referral_config)
- [`fluent_affiliate/update_referral_config`](/developers/hooks/filters/configuration/#fluent_affiliate_update_referral_config)
- [`fluent_affiliate/get_email_config`](/developers/hooks/filters/configuration/#fluent_affiliate_get_email_config)
- [`fluent_affiliate/update_email_config`](/developers/hooks/filters/configuration/#fluent_affiliate_update_email_config)

**URL & Path Configuration:**
- [`fluent_affiliate/admin_url`](/developers/hooks/filters/configuration/#fluent_affiliate_admin_url)
- [`fluent_affiliate/portal_page_url`](/developers/hooks/filters/configuration/#fluent_affiliate_portal_page_url)
- [`fluent_affiliate_base_url`](/developers/hooks/filters/configuration/#fluent_affiliate_base_url)

**System Settings:**
- [`fluent_affiliate/max_execution_time`](/developers/hooks/filters/configuration/#fluent_affiliate_max_execution_time)
- [`fluent_affiliate/user_ip`](/developers/hooks/filters/configuration/#fluent_affiliate_user_ip)

### [Portal & UI](/developers/hooks/filters/portal/)
<hr />

**Portal Navigation:**
- [`fluent_affiliate/portal_menu_items`](/developers/hooks/filters/portal/#fluent_affiliate_portal_menu_items)
- [`fluent_affiliate/top_menu_items`](/developers/hooks/filters/portal/#fluent_affiliate_top_menu_items)
- [`fluent_affiliate/settings_menu_items`](/developers/hooks/filters/portal/#fluent_affiliate_settings_menu_items)

**Dashboard Widgets:**
- [`fluent_affiliate/affiliate_widgets`](/developers/hooks/filters/portal/#fluent_affiliate_affiliate_widgets)

**Portal Messages:**
- [`fluent_affiliate/portal/pending_message`](/developers/hooks/filters/portal/#fluent_affiliate_portal_pending_message)
- [`fluent_affiliate/portal/inactive_message`](/developers/hooks/filters/portal/#fluent_affiliate_portal_inactive_message)
- [`fluent_affiliate/portal/additional_sites`](/developers/hooks/filters/portal/#fluent_affiliate_portal_additional_sites)

### [Authentication](/developers/hooks/filters/authentication/)
<hr />

**Redirect URLs:**
- [`fluent_affiliate/auth/after_login_redirect_url`](/developers/hooks/filters/authentication/#fluent_affiliate_auth_after_login_redirect_url)
- [`fluent_affiliate/auth/after_signup_redirect_url`](/developers/hooks/filters/authentication/#fluent_affiliate_auth_after_signup_redirect_url)
- [`fluent_affiliate/auth/lost_password_url`](/developers/hooks/filters/authentication/#fluent_affiliate_auth_lost_password_url)

**Registration & Approval:**
- [`fluent_affiliate/auth/signup_fields`](/developers/hooks/filters/authentication/#fluent_affiliate_auth_signup_fields)
- [`fluent_affiliate/auth/auto_approve_affiliates`](/developers/hooks/filters/authentication/#fluent_affiliate_auth_auto_approve_affiliates)
- [`fluent_affiliate/reserved_usernames`](/developers/hooks/filters/authentication/#fluent_affiliate_reserved_usernames)

**Terms & Policies:**
- [`fluent_affiliate/terms_policy_url`](/developers/hooks/filters/authentication/#fluent_affiliate_terms_policy_url)

### [Tracking & Analytics](/developers/hooks/filters/tracking/)
<hr />

**Tracking Configuration:**
- [`fluent_affiliate/will_load_tracker_js`](/developers/hooks/filters/tracking/#fluent_affiliate_will_load_tracker_js)
- [`fluent_affiliate_tracker_vars`](/developers/hooks/filters/tracking/#fluent_affiliate_tracker_vars)

## Quick Reference

### Most Commonly Used Filters:
1. `fluent_affiliate/portal_menu_items` - Customize portal navigation
2. `fluent_affiliate/auth/auto_approve_affiliates` - Control affiliate approval
3. `fluent_affiliate/affiliate_widgets` - Add custom dashboard widgets
4. `fluent_affiliate/get_currencies` - Modify available currencies

### Filter Naming Patterns:
- **Configuration:** `fluent_affiliate/get_{setting}` or `fluent_affiliate/update_{setting}`
- **Portal:** `fluent_affiliate/portal/{element}`
- **Authentication:** `fluent_affiliate/auth/{feature}`
- **URLs:** `fluent_affiliate/{type}_url`

### Filter Usage Pattern:
```php
add_filter('fluent_affiliate/filter_name', function($value, $param1, $param2) {
    // Modify $value
    return $modified_value;
}, 10, 3);
```

All filter hooks provide opportunities to customize FluentAffiliate's behavior, modify data structures, and extend functionality without touching core plugin files.
