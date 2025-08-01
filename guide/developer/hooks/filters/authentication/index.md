# Authentication Filter Hooks

## Redirect URL Filters

### fluent_affiliate/auth/after_login_redirect_url

**Parameters:** 2
- `$url` (String) - Default redirect URL after login
- `$user` (Object) - WordPress user object

**Usage:**
```php
add_filter('fluent_affiliate/auth/after_login_redirect_url', function($url, $user) {
    // Redirect based on user role
    if (user_can($user, 'manage_options')) {
        return admin_url('admin.php?page=fluent-affiliate');
    }
    
    // Redirect VIP affiliates to special dashboard
    $affiliate = \FluentAffiliate\App\Models\Affiliate::where('user_id', $user->ID)->first();
    if ($affiliate && $affiliate->group_id === 2) {
        return home_url('/vip-affiliate-dashboard/');
    }
    
    // Default portal redirect
    return home_url('/affiliate-portal/');
}, 10, 2);
```

---

### fluent_affiliate/auth/after_signup_redirect_url

**Parameters:** 2
- `$url` (String) - Default redirect URL after signup
- `$user` (Object) - WordPress user object

**Usage:**
```php
add_filter('fluent_affiliate/auth/after_signup_redirect_url', function($url, $user) {
    // Redirect to welcome page with onboarding
    $welcome_url = add_query_arg([
        'welcome' => '1',
        'user_id' => $user->ID
    ], home_url('/affiliate-welcome/'));
    
    return $welcome_url;
}, 10, 2);
```

---

### fluent_affiliate/auth/lost_password_url

**Parameters:** 1
- `$url` (String) - Lost password URL

**Usage:**
```php
add_filter('fluent_affiliate/auth/lost_password_url', function($url) {
    // Use custom password reset page
    return home_url('/affiliate-password-reset/');
}, 10, 1);
```

## Registration & Approval Filters

### fluent_affiliate/auth/signup_fields

**Parameters:** 1
- `$fields` (Array) - Array of signup form fields

**Signup Fields Array:**
```php
$fields = [
    'first_name' => [
        'type' => 'text',
        'label' => 'First Name',
        'required' => true,
        'placeholder' => 'Enter your first name'
    ],
    'last_name' => [
        'type' => 'text',
        'label' => 'Last Name',
        'required' => true,
        'placeholder' => 'Enter your last name'
    ],
    'email' => [
        'type' => 'email',
        'label' => 'Email Address',
        'required' => true,
        'placeholder' => 'Enter your email'
    ],
    // ... more fields
]
```

**Usage:**
```php
add_filter('fluent_affiliate/auth/signup_fields', function($fields) {
    // Add custom fields
    $fields['company'] = [
        'type' => 'text',
        'label' => 'Company Name',
        'required' => false,
        'placeholder' => 'Enter your company name'
    ];
    
    $fields['website'] = [
        'type' => 'url',
        'label' => 'Website URL',
        'required' => true,
        'placeholder' => 'https://yourwebsite.com'
    ];
    
    $fields['experience'] = [
        'type' => 'select',
        'label' => 'Affiliate Experience',
        'required' => true,
        'options' => [
            'beginner' => 'Beginner (0-1 years)',
            'intermediate' => 'Intermediate (1-3 years)',
            'advanced' => 'Advanced (3+ years)'
        ]
    ];
    
    // Modify existing fields
    $fields['first_name']['placeholder'] = 'Your first name';
    
    // Remove fields
    unset($fields['last_name']);
    
    return $fields;
}, 10, 1);
```

---

### fluent_affiliate/auth/auto_approve_affiliates

**Parameters:** 2
- `$autoApprove` (Boolean) - Whether to auto-approve
- `$userData` (Array) - User registration data

**Usage:**
```php
add_filter('fluent_affiliate/auth/auto_approve_affiliates', function($autoApprove, $userData) {
    // Auto-approve based on email domain
    $email = $userData['email'];
    $trusted_domains = ['company.com', 'partner.org', 'trusted.net'];
    
    foreach ($trusted_domains as $domain) {
        if (strpos($email, '@' . $domain) !== false) {
            return true; // Auto-approve trusted domains
        }
    }
    
    // Auto-approve if they have a website
    if (!empty($userData['website']) && filter_var($userData['website'], FILTER_VALIDATE_URL)) {
        return true;
    }
    
    // Manual approval for others
    return false;
}, 10, 2);
```

---

### fluent_affiliate/reserved_usernames

**Parameters:** 1
- `$reserved` (Array) - Array of reserved usernames

**Usage:**
```php
add_filter('fluent_affiliate/reserved_usernames', function($reserved) {
    // Add custom reserved usernames
    $custom_reserved = [
        'admin',
        'administrator',
        'support',
        'help',
        'api',
        'affiliate',
        'partner',
        'company-name',
        'brand-name'
    ];
    
    return array_merge($reserved, $custom_reserved);
}, 10, 1);
```

## Terms & Policies Filter

### fluent_affiliate/terms_policy_url

**Parameters:** 1
- `$url` (String) - Terms and policy URL

**Usage:**
```php
add_filter('fluent_affiliate/terms_policy_url', function($url) {
    // Use custom terms page
    return home_url('/affiliate-terms-and-conditions/');
}, 10, 1);
```
