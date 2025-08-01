# Portal & UI Filter Hooks

## Portal Navigation Filters

### fluent_affiliate/portal_menu_items

**Parameters:** 1
- `$menuItems` (Array) - Array of portal menu items

**Menu Items Array:**
```php
$menuItems = [
    'dashboard' => [
        'title' => 'Dashboard',
        'url' => '/dashboard',
        'icon' => 'dashboard-icon',
        'permission' => 'read'
    ],
    'referrals' => [
        'title' => 'Referrals',
        'url' => '/referrals',
        'icon' => 'referrals-icon',
        'permission' => 'read'
    ],
    // ... more menu items
]
```

**Usage:**
```php
add_filter('fluent_affiliate/portal_menu_items', function($menuItems) {
    // Add custom menu item
    $menuItems['custom_reports'] = [
        'title' => 'Custom Reports',
        'url' => '/custom-reports',
        'icon' => 'chart-icon',
        'permission' => 'read'
    ];
    
    // Remove unwanted menu item
    unset($menuItems['payouts']);
    
    // Modify existing menu item
    $menuItems['dashboard']['title'] = 'My Dashboard';
    
    return $menuItems;
}, 10, 1);
```

---

### fluent_affiliate/top_menu_items

**Parameters:** 1
- `$topMenuItems` (Array) - Array of top navigation menu items

**Usage:**
```php
add_filter('fluent_affiliate/top_menu_items', function($topMenuItems) {
    // Add custom top menu item
    $topMenuItems['help'] = [
        'title' => 'Help Center',
        'url' => '/help',
        'target' => '_blank'
    ];
    
    return $topMenuItems;
}, 10, 1);
```

---

### fluent_affiliate/settings_menu_items

**Parameters:** 1
- `$settingsItems` (Array) - Array of settings menu items

**Usage:**
```php
add_filter('fluent_affiliate/settings_menu_items', function($settingsItems) {
    // Add custom settings section
    $settingsItems['custom_settings'] = [
        'title' => 'Custom Settings',
        'url' => '/settings/custom',
        'icon' => 'settings-icon'
    ];
    
    return $settingsItems;
}, 10, 1);
```

## Dashboard Widgets Filter

### fluent_affiliate/affiliate_widgets

**Parameters:** 1
- `$widgets` (Array) - Array of dashboard widgets

**Widgets Array:**
```php
$widgets = [
    'stats' => [
        'title' => 'Statistics',
        'component' => 'StatsWidget',
        'position' => 1,
        'size' => 'large'
    ],
    'recent_referrals' => [
        'title' => 'Recent Referrals',
        'component' => 'ReferralsWidget',
        'position' => 2,
        'size' => 'medium'
    ],
    // ... more widgets
]
```

**Usage:**
```php
add_filter('fluent_affiliate/affiliate_widgets', function($widgets) {
    // Add custom widget
    $widgets['custom_analytics'] = [
        'title' => 'Custom Analytics',
        'component' => 'CustomAnalyticsWidget',
        'position' => 3,
        'size' => 'large',
        'data' => [
            'api_endpoint' => '/api/custom-analytics',
            'refresh_interval' => 30000
        ]
    ];
    
    // Modify existing widget
    $widgets['stats']['title'] = 'My Performance';
    $widgets['stats']['size'] = 'extra-large';
    
    // Remove widget
    unset($widgets['recent_referrals']);
    
    return $widgets;
}, 10, 1);
```

## Portal Messages Filters

### fluent_affiliate/portal/pending_message

**Parameters:** 1
- `$message` (String) - Message shown to pending affiliates

**Usage:**
```php
add_filter('fluent_affiliate/portal/pending_message', function($message) {
    $custom_message = '
        <div class="pending-notice">
            <h3>Application Under Review</h3>
            <p>Thank you for applying to our affiliate program! Your application is currently being reviewed by our team.</p>
            <p>You will receive an email notification once your application is approved.</p>
            <p>Questions? Contact us at <a href="mailto:affiliates@mysite.com">affiliates@mysite.com</a></p>
        </div>
    ';
    
    return $custom_message;
}, 10, 1);
```

---

### fluent_affiliate/portal/inactive_message

**Parameters:** 1
- `$message` (String) - Message shown to inactive affiliates

**Usage:**
```php
add_filter('fluent_affiliate/portal/inactive_message', function($message) {
    $custom_message = '
        <div class="inactive-notice">
            <h3>Account Temporarily Inactive</h3>
            <p>Your affiliate account is currently inactive. This may be due to:</p>
            <ul>
                <li>Pending compliance review</li>
                <li>Account maintenance</li>
                <li>Policy violation investigation</li>
            </ul>
            <p>Please contact support for more information.</p>
        </div>
    ';
    
    return $custom_message;
}, 10, 1);
```

---

### fluent_affiliate/portal/additional_sites

**Parameters:** 2
- `$sites` (Array) - Array of additional sites
- `$affiliate` (Object) - Current affiliate object

**Sites Array:**
```php
$sites = [
    [
        'name' => 'Main Site',
        'url' => 'https://mainsite.com',
        'description' => 'Primary website'
    ],
    // ... more sites
]
```

**Usage:**
```php
add_filter('fluent_affiliate/portal/additional_sites', function($sites, $affiliate) {
    // Add sites based on affiliate level
    if ($affiliate->group_id === 2) { // VIP group
        $sites[] = [
            'name' => 'VIP Resources',
            'url' => 'https://vip.mysite.com',
            'description' => 'Exclusive VIP affiliate resources'
        ];
    }
    
    // Add custom tracking sites
    $sites[] = [
        'name' => 'Analytics Dashboard',
        'url' => 'https://analytics.mysite.com/affiliate/' . $affiliate->id,
        'description' => 'Your personal analytics dashboard'
    ];
    
    return $sites;
}, 10, 2);
```
