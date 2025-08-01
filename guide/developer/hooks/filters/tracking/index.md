# Tracking & Analytics Filter Hooks

## Tracking Configuration Filters

### fluent_affiliate/will_load_tracker_js

**Parameters:** 1
- `$willLoad` (Boolean) - Whether to load tracking JavaScript

**Usage:**
```php
add_filter('fluent_affiliate/will_load_tracker_js', function($willLoad) {
    // Disable tracking on admin pages
    if (is_admin()) {
        return false;
    }
    
    // Disable tracking for logged-in administrators
    if (current_user_can('manage_options')) {
        return false;
    }
    
    // Disable tracking on specific pages
    if (is_page(['privacy-policy', 'terms-of-service'])) {
        return false;
    }
    
    // Enable tracking for all other cases
    return true;
}, 10, 1);
```

---

### fluent_affiliate_tracker_vars

**Parameters:** 1
- `$vars` (Array) - JavaScript tracking variables

**Tracker Variables Array:**
```php
$vars = [
    'ajax_url' => admin_url('admin-ajax.php'),
    'nonce' => wp_create_nonce('fluent_affiliate_tracker'),
    'cookie_name' => 'fluent_affiliate_tracking',
    'cookie_duration' => 30, // days
    'debug_mode' => false,
    'track_visits' => true,
    'track_conversions' => true,
    // ... more tracking settings
]
```

**Usage:**
```php
add_filter('fluent_affiliate_tracker_vars', function($vars) {
    // Enable debug mode for development
    if (WP_DEBUG) {
        $vars['debug_mode'] = true;
    }
    
    // Extend cookie duration
    $vars['cookie_duration'] = 60; // 60 days
    
    // Add custom tracking parameters
    $vars['custom_tracking'] = [
        'track_page_views' => true,
        'track_scroll_depth' => true,
        'track_time_on_page' => true,
        'google_analytics_id' => 'GA-XXXXXXXXX'
    ];
    
    // Add custom events to track
    $vars['custom_events'] = [
        'button_clicks' => '.affiliate-cta-button',
        'form_submissions' => '.contact-form',
        'video_plays' => '.video-player'
    ];
    
    // Customize cookie settings
    $vars['cookie_settings'] = [
        'secure' => is_ssl(),
        'samesite' => 'Lax',
        'domain' => '.mysite.com' // For subdomain tracking
    ];
    
    return $vars;
}, 10, 1);
```

## Advanced Tracking Customization

### Custom Event Tracking

```php
add_filter('fluent_affiliate_tracker_vars', function($vars) {
    // Add e-commerce tracking
    $vars['ecommerce_tracking'] = [
        'enabled' => true,
        'currency' => 'USD',
        'track_add_to_cart' => true,
        'track_checkout_steps' => true,
        'enhanced_ecommerce' => true
    ];
    
    // Add social media tracking
    $vars['social_tracking'] = [
        'facebook_pixel' => 'XXXXXXXXXXXXXXXXX',
        'twitter_pixel' => 'XXXXXXXXX',
        'linkedin_insight' => 'XXXXXXX'
    ];
    
    return $vars;
}, 10, 1);
```

### Conditional Tracking

```php
add_filter('fluent_affiliate_tracker_vars', function($vars) {
    // Different tracking for different user types
    if (is_user_logged_in()) {
        $vars['user_type'] = 'logged_in';
        $vars['track_detailed_behavior'] = true;
    } else {
        $vars['user_type'] = 'guest';
        $vars['track_detailed_behavior'] = false;
    }
    
    // Geographic-based tracking
    $user_country = get_user_country(); // Custom function
    if (in_array($user_country, ['US', 'CA', 'GB'])) {
        $vars['enhanced_tracking'] = true;
    }
    
    return $vars;
}, 10, 1);
```

### Privacy Compliance

```php
add_filter('fluent_affiliate_tracker_vars', function($vars) {
    // GDPR compliance
    $vars['privacy_compliance'] = [
        'gdpr_enabled' => true,
        'consent_required' => true,
        'consent_cookie' => 'cookie_consent',
        'anonymize_ip' => true
    ];
    
    // CCPA compliance
    $vars['ccpa_compliance'] = [
        'enabled' => true,
        'do_not_sell_cookie' => 'ccpa_do_not_sell'
    ];
    
    return $vars;
}, 10, 1);
```

### Performance Optimization

```php
add_filter('fluent_affiliate_tracker_vars', function($vars) {
    // Optimize tracking performance
    $vars['performance'] = [
        'lazy_load' => true,
        'batch_requests' => true,
        'batch_size' => 10,
        'batch_timeout' => 5000, // milliseconds
        'cache_duration' => 300 // seconds
    ];
    
    // Reduce tracking on mobile
    if (wp_is_mobile()) {
        $vars['mobile_optimized'] = true;
        $vars['track_scroll_depth'] = false;
        $vars['batch_size'] = 5;
    }
    
    return $vars;
}, 10, 1);
```
