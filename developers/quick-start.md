# Quick Start Guide
### Get started with FluentAffiliate development in minutes
<hr/>
<Badge type="tip" vertical="top" text="FluentAffiliate Core" /> <Badge type="warning" vertical="top" text="Beginner" />

This guide will help you get started with FluentAffiliate development, from setting up your environment to implementing your first hooks.

## Prerequisites

Before you begin, ensure you have:

- **WordPress 5.0+** with FluentAffiliate installed
- **PHP 7.4+** (PHP 8.0+ recommended)
- **Basic PHP knowledge** and familiarity with WordPress hooks
- **Code editor** (VS Code, PhpStorm, etc.)

## Development Environment Setup

### 1. Enable Debug Mode

Add these lines to your `wp-config.php` file:

```php
// Enable WordPress debug mode
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);

// Enable script debugging
define('SCRIPT_DEBUG', true);
```

### 2. Create Development Plugin

Create a custom plugin for your FluentAffiliate customizations:

```php
<?php
/**
 * Plugin Name: FluentAffiliate Custom
 * Description: Custom FluentAffiliate functionality
 * Version: 1.0.0
 * Author: Your Name
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Check if FluentAffiliate is active
if (!function_exists('fluentAffiliate')) {
    add_action('admin_notices', function() {
        echo '<div class="notice notice-error"><p>FluentAffiliate is required for this plugin to work.</p></div>';
    });
    return;
}

// Your custom code goes here
```

## Your First Hook Implementation

Let's implement a simple hook to get familiar with the system:

### Example 1: Welcome Email for New Affiliates

```php
add_action('fluent_affiliate/affiliate_created', function($affiliate, $user) {
    // Send custom welcome email
    $subject = 'Welcome to Our Affiliate Program!';
    $message = "Hi {$user->display_name},\n\n";
    $message .= "Welcome to our affiliate program! Your affiliate ID is: {$affiliate->id}\n\n";
    $message .= "Best regards,\nThe Team";
    
    wp_mail($affiliate->payment_email, $subject, $message);
    
    // Log the action
    error_log("Welcome email sent to affiliate: {$affiliate->id}");
}, 10, 2);
```

### Example 2: Custom Portal Menu Item

```php
add_filter('fluent_affiliate/portal_menu_items', function($menuItems) {
    // Add custom menu item
    $menuItems['training'] = [
        'title' => 'Training Center',
        'url' => '/affiliate-training',
        'icon' => 'graduation-cap',
        'permission' => 'read'
    ];
    
    return $menuItems;
});
```

### Example 3: Referral Notification to Slack

```php
add_action('fluent_affiliate/referral_created', function($referral) {
    // Send Slack notification
    $webhook_url = 'YOUR_SLACK_WEBHOOK_URL';
    
    $message = [
        'text' => "New referral created!",
        'attachments' => [
            [
                'color' => 'good',
                'fields' => [
                    [
                        'title' => 'Affiliate ID',
                        'value' => $referral->affiliate_id,
                        'short' => true
                    ],
                    [
                        'title' => 'Amount',
                        'value' => '$' . number_format($referral->amount, 2),
                        'short' => true
                    ]
                ]
            ]
        ]
    ];
    
    wp_remote_post($webhook_url, [
        'body' => json_encode($message),
        'headers' => ['Content-Type' => 'application/json']
    ]);
});
```

## Understanding Hook Parameters

### Action Hooks
Action hooks execute code at specific points. They don't return values:

```php
add_action('hook_name', function($param1, $param2) {
    // Execute your code
    // No return value needed
}, 10, 2); // Priority 10, accepts 2 parameters
```

### Filter Hooks
Filter hooks modify data and must return a value:

```php
add_filter('filter_name', function($value, $param1) {
    // Modify $value
    $value['custom_field'] = 'custom_data';
    
    return $value; // Always return the modified value
}, 10, 2);
```

## Best Practices

### 1. Use Proper Priority
```php
// Early execution (before other plugins)
add_action('fluent_affiliate/affiliate_created', 'my_function', 5);

// Default execution
add_action('fluent_affiliate/affiliate_created', 'my_function', 10);

// Late execution (after other plugins)
add_action('fluent_affiliate/affiliate_created', 'my_function', 20);
```

### 2. Always Validate Data
```php
add_action('fluent_affiliate/affiliate_created', function($affiliate, $user) {
    // Check if objects exist
    if (!$affiliate || !$user) {
        return;
    }
    
    // Validate required fields
    if (empty($affiliate->payment_email)) {
        error_log('Affiliate created without payment email');
        return;
    }
    
    // Your code here
});
```

### 3. Handle Errors Gracefully
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

## Testing Your Implementation

### 1. Enable Debug Logging
```php
add_action('fluent_affiliate/affiliate_created', function($affiliate, $user) {
    error_log('Hook fired: affiliate_created for ID ' . $affiliate->id);
    // Your code here
});
```

### 2. Test with Different Scenarios
- Create test affiliates
- Generate test referrals
- Test with different affiliate statuses
- Verify error handling

## Next Steps

Now that you have the basics:

1. **[Explore All Hooks](/developers/hooks/)** - Browse the complete hooks documentation
2. **[Action Hooks](/developers/hooks/actions/)** - Learn about all available action hooks
3. **[Filter Hooks](/developers/hooks/filters/)** - Discover filter hooks for customization

---

**Ready to dive deeper?** Check out our [complete hooks documentation](/developers/hooks/) for advanced implementations and all available hooks.
