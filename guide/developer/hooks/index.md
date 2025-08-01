# FluentAffiliate Hooks
### Comprehensive documentation for all FluentAffiliate action and filter hooks
<hr/>
<Badge type="tip" vertical="top" text="FluentAffiliate Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

FluentAffiliate provides a comprehensive hook system that allows developers to customize functionality, integrate with external systems, and extend the plugin's capabilities without modifying core files.

## Hook Types

### [Action Hooks](/guide/developer/hooks/actions/)
Action hooks allow you to execute custom code at specific points in FluentAffiliate's execution. They're perfect for:
- Sending notifications when events occur
- Integrating with external systems
- Logging and analytics
- Custom validation and processing

### [Filter Hooks](/guide/developer/hooks/filters/)
Filter hooks allow you to modify data as it passes through FluentAffiliate. They're ideal for:
- Customizing configuration settings
- Modifying user interface elements
- Changing default behaviors
- Adding custom data to existing structures

## Quick Navigation

### Action Hooks (28 hooks across 8 modules)
- **[Affiliate Module](/guide/developer/hooks/actions/affiliate/)** - 7 hooks for affiliate lifecycle management
- **[Referral Module](/guide/developer/hooks/actions/referrals/)** - 6 hooks for referral tracking
- **[Transaction Module](/guide/developer/hooks/actions/transactions/)** - 6 hooks for payment processing
- **[Group Module](/guide/developer/hooks/actions/groups/)** - 3 hooks for group management
- **[Integration Module](/guide/developer/hooks/actions/integrations/)** - 1 hook for third-party plugins
- **[Auth Module](/guide/developer/hooks/actions/auth/)** - 2 hooks for authentication
- **[Portal Module](/guide/developer/hooks/actions/portal/)** - 1 hook for email templates
- **[Admin Module](/guide/developer/hooks/actions/admin/)** - 2 hooks for admin interface

### Filter Hooks (25+ hooks across 4 modules)
- **[Configuration & Settings](/guide/developer/hooks/filters/configuration/)** - 11 hooks for system configuration
- **[Portal & UI](/guide/developer/hooks/filters/portal/)** - 7 hooks for interface customization
- **[Authentication](/guide/developer/hooks/filters/authentication/)** - 6 hooks for auth workflows
- **[Tracking & Analytics](/guide/developer/hooks/filters/tracking/)** - 2 hooks for tracking configuration

## Most Commonly Used Hooks

### Action Hooks
1. **`fluent_affiliate/affiliate_created`** - Welcome new affiliates
2. **`fluent_affiliate/affiliate_status_to_active`** - Handle affiliate approvals
3. **`fluent_affiliate/referral_created`** - Track successful referrals
4. **`fluent_affiliate/payout/transaction/transaction_updated_to_paid`** - Handle payments

### Filter Hooks
1. **`fluent_affiliate/portal_menu_items`** - Customize portal navigation
2. **`fluent_affiliate/auth/auto_approve_affiliates`** - Control affiliate approval
3. **`fluent_affiliate/affiliate_widgets`** - Add custom dashboard widgets
4. **`fluent_affiliate/get_currencies`** - Modify available currencies

## Hook Usage Patterns

### Action Hook Pattern
```php
add_action('fluent_affiliate/hook_name', function($param1, $param2) {
    // Execute custom code
    // No return value needed
}, 10, 2);
```

### Filter Hook Pattern
```php
add_filter('fluent_affiliate/filter_name', function($value, $param1) {
    // Modify $value
    return $modified_value;
}, 10, 2);
```

## Hook Naming Conventions

### Action Hooks
- **Lifecycle:** `fluent_affiliate/{module}_{action}`
- **Status Changes:** `fluent_affiliate/{module}_status_to_{status}`
- **Deletion:** `fluent_affiliate/{action}_{module}` or `fluent_affiliate/{module}/{action}`

### Filter Hooks
- **Configuration:** `fluent_affiliate/get_{setting}` or `fluent_affiliate/update_{setting}`
- **UI Elements:** `fluent_affiliate/{module}_{element}`
- **Authentication:** `fluent_affiliate/auth/{feature}`
- **URLs:** `fluent_affiliate/{type}_url`

## Best Practices

### 1. Use Appropriate Priority
```php
// Early execution (before other plugins)
add_action('fluent_affiliate/affiliate_created', 'my_function', 5);

// Default execution
add_action('fluent_affiliate/affiliate_created', 'my_function', 10);

// Late execution (after other plugins)
add_action('fluent_affiliate/affiliate_created', 'my_function', 20);
```

### 2. Always Return Values in Filters
```php
// ✅ Correct - Always return a value
add_filter('fluent_affiliate/get_currencies', function($currencies) {
    $currencies['BTC'] = 'Bitcoin';
    return $currencies; // Always return
});

// ❌ Incorrect - Missing return statement
add_filter('fluent_affiliate/get_currencies', function($currencies) {
    $currencies['BTC'] = 'Bitcoin';
    // Missing return - will break the filter chain
});
```

### 3. Check Parameter Existence
```php
add_action('fluent_affiliate/affiliate_created', function($affiliate, $user) {
    // Check if objects exist before using them
    if (!$affiliate || !$user) {
        return;
    }
    
    // Safe to use $affiliate and $user
    $affiliate_id = $affiliate->id;
    $user_email = $user->user_email;
}, 10, 2);
```

### 4. Use Proper Error Handling
```php
add_action('fluent_affiliate/referral_created', function($referral) {
    try {
        // Your custom code
        send_external_notification($referral);
    } catch (Exception $e) {
        // Log error instead of breaking the flow
        error_log('FluentAffiliate hook error: ' . $e->getMessage());
    }
});
```

## Integration Examples

### External CRM Integration
```php
// Sync new affiliates with CRM
add_action('fluent_affiliate/affiliate_created', function($affiliate, $user) {
    $crm_data = [
        'name' => $user->display_name,
        'email' => $affiliate->payment_email,
        'type' => 'affiliate',
        'commission_rate' => $affiliate->rate
    ];
    
    sync_with_crm($crm_data);
}, 10, 2);
```

### Custom Analytics
```php
// Track referrals in custom analytics
add_action('fluent_affiliate/referral_created', function($referral) {
    track_custom_event('referral_created', [
        'affiliate_id' => $referral->affiliate_id,
        'amount' => $referral->amount,
        'provider' => $referral->provider
    ]);
});
```

### Portal Customization
```php
// Add custom portal menu items
add_filter('fluent_affiliate/portal_menu_items', function($items) {
    $items['training'] = [
        'title' => 'Training Center',
        'url' => '/affiliate-training',
        'icon' => 'graduation-cap'
    ];
    
    return $items;
});
```

This comprehensive hook system makes FluentAffiliate highly extensible and customizable for any affiliate marketing workflow or integration requirement.
