# Configuration & Settings Filter Hooks

## Currency & Localization Filters

### fluent_affiliate/get_currencies

**Parameters:** 1
- `$currencies` (Array) - Array of available currencies

**Default Currencies Array:**
```php
$currencies = [
    'USD' => 'US Dollar',
    'EUR' => 'Euro',
    'GBP' => 'British Pound',
    'CAD' => 'Canadian Dollar',
    'AUD' => 'Australian Dollar',
    'JPY' => 'Japanese Yen',
    // ... more currencies
]
```

**Usage:**
```php
add_filter('fluent_affiliate/get_currencies', function($currencies) {
    // Add custom currencies
    $currencies['BTC'] = 'Bitcoin';
    $currencies['ETH'] = 'Ethereum';
    
    // Remove unwanted currencies
    unset($currencies['JPY']);
    
    return $currencies;
}, 10, 1);
```

---

### fluent_affiliate/currency_symbols

**Parameters:** 1
- `$symbols` (Array) - Array of currency symbols

**Default Symbols Array:**
```php
$symbols = [
    'USD' => '$',
    'EUR' => '€',
    'GBP' => '£',
    'CAD' => 'C$',
    'AUD' => 'A$',
    'JPY' => '¥',
    // ... more symbols
]
```

**Usage:**
```php
add_filter('fluent_affiliate/currency_symbols', function($symbols) {
    // Add custom currency symbols
    $symbols['BTC'] = '₿';
    $symbols['ETH'] = 'Ξ';
    
    // Modify existing symbols
    $symbols['USD'] = 'US$';
    
    return $symbols;
}, 10, 1);
```

## Plugin Configuration Filters

### fluent_affiliate/get_referral_config

**Parameters:** 1
- `$config` (Array) - Referral configuration settings

**Referral Config Array:**
```php
$config = [
    'cookie_duration' => 30,              // int - Cookie duration in days
    'referral_rate' => 10,                // int - Default referral rate
    'referral_rate_type' => 'percentage', // string - percentage|flat
    'minimum_payout' => 50,               // float - Minimum payout amount
    'auto_approve_referrals' => false,    // bool - Auto-approve referrals
    'allow_self_referrals' => false,      // bool - Allow self-referrals
    // ... more settings
]
```

**Usage:**
```php
add_filter('fluent_affiliate/get_referral_config', function($config) {
    // Modify default settings
    $config['cookie_duration'] = 60; // Extend to 60 days
    $config['minimum_payout'] = 25;  // Lower minimum payout
    
    // Add custom settings
    $config['custom_tracking'] = true;
    
    return $config;
}, 10, 1);
```

---

### fluent_affiliate/update_referral_config

**Parameters:** 2
- `$config` (Array) - Updated referral configuration
- `$oldConfig` (Array) - Previous configuration

**Usage:**
```php
add_filter('fluent_affiliate/update_referral_config', function($config, $oldConfig) {
    // Validate configuration changes
    if ($config['minimum_payout'] < 10) {
        $config['minimum_payout'] = 10; // Enforce minimum
    }
    
    // Log configuration changes
    if ($config['cookie_duration'] !== $oldConfig['cookie_duration']) {
        error_log("Cookie duration changed from {$oldConfig['cookie_duration']} to {$config['cookie_duration']} days");
    }
    
    return $config;
}, 10, 2);
```

---

### fluent_affiliate/get_email_config

**Parameters:** 1
- `$config` (Array) - Email configuration settings

**Email Config Array:**
```php
$config = [
    'from_name' => 'FluentAffiliate',     // string - From name
    'from_email' => 'noreply@site.com',  // string - From email
    'email_template' => 'default',       // string - Template name
    'send_welcome_email' => true,        // bool - Send welcome emails
    'send_approval_email' => true,       // bool - Send approval emails
    // ... more email settings
]
```

**Usage:**
```php
add_filter('fluent_affiliate/get_email_config', function($config) {
    // Customize email settings
    $config['from_name'] = 'My Company Affiliates';
    $config['from_email'] = 'affiliates@mycompany.com';
    
    return $config;
}, 10, 1);
```

---

### fluent_affiliate/update_email_config

**Parameters:** 2
- `$config` (Array) - Updated email configuration
- `$oldConfig` (Array) - Previous configuration

**Usage:**
```php
add_filter('fluent_affiliate/update_email_config', function($config, $oldConfig) {
    // Validate email address
    if (!is_email($config['from_email'])) {
        $config['from_email'] = $oldConfig['from_email']; // Revert to old
    }

    return $config;
}, 10, 2);
```

## URL & Path Configuration Filters

### fluent_affiliate/admin_url

**Parameters:** 1
- `$url` (String) - Admin URL for FluentAffiliate

**Usage:**
```php
add_filter('fluent_affiliate/admin_url', function($url) {
    // Customize admin URL (e.g., for white-label)
    $custom_url = admin_url('admin.php?page=my-custom-affiliate-admin');

    return $custom_url;
}, 10, 1);
```

---

### fluent_affiliate/portal_page_url

**Parameters:** 1
- `$url` (String) - Portal page URL

**Usage:**
```php
add_filter('fluent_affiliate/portal_page_url', function($url) {
    // Use custom portal page
    $custom_url = home_url('/my-affiliate-portal/');

    return $custom_url;
}, 10, 1);
```

---

### fluent_affiliate_base_url

**Parameters:** 1
- `$baseUrl` (String) - Base URL for FluentAffiliate assets

**Usage:**
```php
add_filter('fluent_affiliate_base_url', function($baseUrl) {
    // Use CDN for assets
    $cdn_url = 'https://cdn.mysite.com/fluent-affiliate/';

    return $cdn_url;
}, 10, 1);
```

## System Settings Filters

### fluent_affiliate/max_execution_time

**Parameters:** 1
- `$time` (Int) - Maximum execution time in seconds

**Usage:**
```php
add_filter('fluent_affiliate/max_execution_time', function($time) {
    // Increase execution time for large operations
    return 300; // 5 minutes
}, 10, 1);
```

---

### fluent_affiliate/user_ip

**Parameters:** 1
- `$ip` (String) - User's IP address

**Usage:**
```php
add_filter('fluent_affiliate/user_ip', function($ip) {
    // Handle proxy/CDN scenarios
    if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) {
        return $_SERVER['HTTP_CF_CONNECTING_IP']; // Cloudflare
    }

    if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        return trim($ips[0]); // First IP in chain
    }

    return $ip;
}, 10, 1);
```
