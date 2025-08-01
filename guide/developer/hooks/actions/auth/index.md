# Authentication Action Hooks

## Form Rendering Hooks

### fluent_affiliate/render_login_form

**Parameters:** 0
- No parameters passed

**Context:** This hook is triggered when the affiliate portal needs to display a login form. It's called when a user visits the affiliate portal but is not logged in.

**Usage:**
```php
add_action('fluent_affiliate/render_login_form', function() {
    // Add custom content to login form
    echo '<div class="custom-login-notice">Welcome back to our affiliate program!</div>';

    // Add custom CSS
    echo '<style>.custom-login-notice { background: #f0f8ff; padding: 10px; }</style>';

    // Add custom JavaScript
    echo '<script>console.log("Login form rendered");</script>';
}, 10);
```

---

### fluent_affiliate/render_signup_form

**Parameters:** 0
- No parameters passed

**Context:** This hook is triggered when the affiliate portal needs to display a signup form. It's called when a logged-in user visits the affiliate portal but doesn't have an affiliate account yet.

**Usage:**
```php
add_action('fluent_affiliate/render_signup_form', function() {
    // Add custom content to signup form
    echo '<div class="custom-signup-notice">Join our exclusive affiliate program!</div>';

    // Add terms and conditions notice
    echo '<div class="terms-notice">By signing up, you agree to our terms and conditions.</div>';

    // Add custom styling
    echo '<style>
        .custom-signup-notice {
            background: #e8f5e8;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
        }
    </style>';
}, 10);
```
