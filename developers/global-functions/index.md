# Global Functions

FluentAffiliate Core Beginner

FluentAffiliate provides a comprehensive set of global functions that make it easy to interact with affiliate data, perform common operations, and integrate with the plugin's core functionality.

## Overview

Global functions in FluentAffiliate are designed to provide simple, consistent access to common operations without requiring deep knowledge of the underlying models and classes. These functions are available throughout your WordPress installation once FluentAffiliate is active.

### 🎯 **Function Categories**

| Category | Purpose | Examples |
|----------|---------|----------|
| **Core Access** | Plugin instance and configuration | `fluentAffiliate()`, `fluentAffiliateApi()` |
| **Affiliate Management** | Create, update, find affiliates | `fa_get_affiliate()`, `fa_create_affiliate()` |
| **Referral Operations** | Track and manage referrals | `fa_create_referral()`, `fa_get_referrals()` |
| **Commission Calculations** | Calculate commissions and rates | `fa_calculate_commission()`, `fa_get_commission_rate()` |
| **URL Generation** | Create affiliate links | `fa_get_affiliate_url()`, `fa_generate_link()` |
| **Utilities** | Helper functions and formatting | `fa_format_currency()`, `fa_get_settings()` |

## Core Access Functions

### 🔧 **fluentAffiliate()**

Returns the main FluentAffiliate plugin instance.

**Syntax:**
```php
fluentAffiliate($module = null)
```

**Parameters:**
- `$module` (string, optional) - Specific module to access

**Returns:** Plugin instance or specific module

**Usage:**
```php
// Get main plugin instance
$plugin = fluentAffiliate();

// Access specific modules
$affiliateModule = fluentAffiliate('affiliates');
$referralModule = fluentAffiliate('referrals');
```

### 🔧 **fluentAffiliateApi()**

Provides access to FluentAffiliate's API layer for programmatic operations.

**Syntax:**
```php
fluentAffiliateApi($resource = null)
```

**Parameters:**
- `$resource` (string, optional) - Specific API resource

**Returns:** API instance or specific resource handler

**Usage:**
```php
// Get API instance
$api = fluentAffiliateApi();

// Access specific resources
$affiliatesApi = fluentAffiliateApi('affiliates');
$referralsApi = fluentAffiliateApi('referrals');
```

## Affiliate Management Functions

### 👥 **fa_get_affiliate()**

Retrieve an affiliate by various criteria.

**Syntax:**
```php
fa_get_affiliate($identifier, $by = 'id')
```

**Parameters:**
- `$identifier` (mixed) - Affiliate identifier
- `$by` (string) - Search criteria: 'id', 'user_id', 'email'

**Returns:** Affiliate object or null

**Usage:**
```php
// Get by affiliate ID
$affiliate = fa_get_affiliate(123);

// Get by WordPress user ID
$affiliate = fa_get_affiliate(456, 'user_id');

// Get by email
$affiliate = fa_get_affiliate('affiliate@example.com', 'email');
```

### 👥 **fa_create_affiliate()**

Create a new affiliate record.

**Syntax:**
```php
fa_create_affiliate($data)
```

**Parameters:**
- `$data` (array) - Affiliate data

**Returns:** Affiliate object or WP_Error

**Usage:**
```php
$affiliate = fa_create_affiliate([
    'user_id' => 123,
    'email' => 'new@example.com',
    'first_name' => 'John',
    'last_name' => 'Doe',
    'status' => 'pending',
    'commission_rate' => 10.00
]);

if (is_wp_error($affiliate)) {
    // Handle error
    echo $affiliate->get_error_message();
} else {
    // Success
    echo "Affiliate created with ID: " . $affiliate->id;
}
```

### 👥 **fa_update_affiliate()**

Update an existing affiliate.

**Syntax:**
```php
fa_update_affiliate($affiliate_id, $data)
```

**Parameters:**
- `$affiliate_id` (int) - Affiliate ID
- `$data` (array) - Update data

**Returns:** Boolean success status

**Usage:**
```php
$updated = fa_update_affiliate(123, [
    'status' => 'active',
    'commission_rate' => 15.00
]);

if ($updated) {
    echo "Affiliate updated successfully";
}
```

## Referral Operations

### 📈 **fa_create_referral()**

Create a new referral record.

**Syntax:**
```php
fa_create_referral($data)
```

**Parameters:**
- `$data` (array) - Referral data

**Returns:** Referral object or WP_Error

**Usage:**
```php
$referral = fa_create_referral([
    'affiliate_id' => 123,
    'order_id' => 'WC-12345',
    'order_total' => 100.00,
    'commission_amount' => 10.00,
    'type' => 'sale',
    'origin' => 'woocommerce',
    'status' => 'pending'
]);

if (!is_wp_error($referral)) {
    echo "Referral created: " . $referral->id;
}
```

### 📈 **fa_get_referrals()**

Retrieve referrals with optional filtering.

**Syntax:**
```php
fa_get_referrals($args = [])
```

**Parameters:**
- `$args` (array) - Query arguments

**Returns:** Array of referral objects

**Usage:**
```php
// Get all referrals for an affiliate
$referrals = fa_get_referrals([
    'affiliate_id' => 123,
    'status' => 'approved'
]);

// Get recent referrals
$recent = fa_get_referrals([
    'limit' => 10,
    'orderby' => 'created_at',
    'order' => 'DESC'
]);
```

### 📈 **fa_approve_referral()**

Approve a pending referral.

**Syntax:**
```php
fa_approve_referral($referral_id)
```

**Parameters:**
- `$referral_id` (int) - Referral ID

**Returns:** Boolean success status

**Usage:**
```php
$approved = fa_approve_referral(456);
if ($approved) {
    echo "Referral approved";
}
```

## Commission Calculations

### 💰 **fa_calculate_commission()**

Calculate commission amount based on order total and rate.

**Syntax:**
```php
fa_calculate_commission($order_total, $rate, $type = 'percentage')
```

**Parameters:**
- `$order_total` (float) - Order total amount
- `$rate` (float) - Commission rate
- `$type` (string) - 'percentage' or 'fixed'

**Returns:** Calculated commission amount

**Usage:**
```php
// Calculate 10% commission
$commission = fa_calculate_commission(100.00, 10.00, 'percentage');
// Returns: 10.00

// Calculate fixed commission
$commission = fa_calculate_commission(100.00, 5.00, 'fixed');
// Returns: 5.00
```

### 💰 **fa_get_commission_rate()**

Get the effective commission rate for an affiliate.

**Syntax:**
```php
fa_get_commission_rate($affiliate_id, $context = [])
```

**Parameters:**
- `$affiliate_id` (int) - Affiliate ID
- `$context` (array) - Additional context for rate calculation

**Returns:** Commission rate and type

**Usage:**
```php
$rate_info = fa_get_commission_rate(123);
// Returns: ['rate' => 10.00, 'type' => 'percentage']

// With context for specific product
$rate_info = fa_get_commission_rate(123, [
    'product_id' => 456,
    'order_total' => 100.00
]);
```

## URL Generation

### 🔗 **fa_get_affiliate_url()**

Generate an affiliate tracking URL.

**Syntax:**
```php
fa_get_affiliate_url($url, $affiliate_id, $args = [])
```

**Parameters:**
- `$url` (string) - Target URL
- `$affiliate_id` (int) - Affiliate ID
- `$args` (array) - Additional parameters

**Returns:** Affiliate tracking URL

**Usage:**
```php
// Basic affiliate URL
$affiliate_url = fa_get_affiliate_url(
    'https://example.com/product',
    123
);
// Returns: https://example.com/product?fa_ref=123

// With custom parameters
$affiliate_url = fa_get_affiliate_url(
    'https://example.com/product',
    123,
    ['campaign' => 'summer2024']
);
```

### 🔗 **fa_generate_link()**

Generate a formatted affiliate link with optional pretty URLs.

**Syntax:**
```php
fa_generate_link($affiliate_id, $target_url = '', $args = [])
```

**Parameters:**
- `$affiliate_id` (int) - Affiliate ID
- `$target_url` (string) - Target URL (optional)
- `$args` (array) - Link generation options

**Returns:** Generated affiliate link

**Usage:**
```php
// Generate link to homepage
$link = fa_generate_link(123);

// Generate link to specific page
$link = fa_generate_link(123, '/products/special-offer');

// With pretty URLs enabled
$link = fa_generate_link(123, '/products', [
    'pretty' => true,
    'campaign' => 'email'
]);
```

## Utility Functions

### 🛠️ **fa_format_currency()**

Format currency amounts according to plugin settings.

**Syntax:**
```php
fa_format_currency($amount, $currency = null)
```

**Parameters:**
- `$amount` (float) - Amount to format
- `$currency` (string) - Currency code (optional)

**Returns:** Formatted currency string

**Usage:**
```php
// Format with default currency
$formatted = fa_format_currency(123.45);
// Returns: "$123.45"

// Format with specific currency
$formatted = fa_format_currency(123.45, 'EUR');
// Returns: "€123.45"
```

### 🛠️ **fa_get_settings()**

Retrieve plugin settings or specific setting values.

**Syntax:**
```php
fa_get_settings($key = null, $default = null)
```

**Parameters:**
- `$key` (string) - Specific setting key (optional)
- `$default` (mixed) - Default value if setting not found

**Returns:** Settings array or specific value

**Usage:**
```php
// Get all settings
$settings = fa_get_settings();

// Get specific setting
$commission_rate = fa_get_settings('default_commission_rate', 10.00);

// Get nested setting
$email_settings = fa_get_settings('email.notifications', []);
```

### 🛠️ **fa_is_affiliate()**

Check if a user is an affiliate.

**Syntax:**
```php
fa_is_affiliate($user_id = null)
```

**Parameters:**
- `$user_id` (int) - WordPress user ID (optional, defaults to current user)

**Returns:** Boolean or affiliate object

**Usage:**
```php
// Check current user
if (fa_is_affiliate()) {
    echo "Current user is an affiliate";
}

// Check specific user
$affiliate = fa_is_affiliate(123);
if ($affiliate) {
    echo "User is affiliate with ID: " . $affiliate->id;
}
```

## Function Availability

### ✅ **When Functions Are Available**

All global functions are available after the `plugins_loaded` action with priority 10. To ensure availability, use them in hooks that fire after plugin initialization:

```php
// Safe to use in init or later
add_action('init', function() {
    $affiliate = fa_get_affiliate(123);
});

// Safe to use in template files
// (after wp_head or in the loop)
if (fa_is_affiliate()) {
    // Show affiliate content
}
```

## Next Steps

Now that you know the global functions:

1. **[Helper Classes](/developers/helpers/)** - Object-oriented helper classes
2. **[Hooks Documentation](/developers/hooks/)** - Action and filter hooks
3. **[API Reference](/developers/api/)** - REST API endpoints

---

*These global functions provide the foundation for most FluentAffiliate customizations. Master them for efficient development.*
