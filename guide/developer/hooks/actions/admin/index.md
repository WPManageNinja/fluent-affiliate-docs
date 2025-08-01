# Admin Action Hooks

## Admin Interface Hooks

### fluent_affilate/rendering_admin_app

**Parameters:** 0
- No parameters passed

**Context:** This hook is triggered before the FluentAffiliate admin interface is rendered. It's called in the admin menu handler when the admin page is being displayed, allowing you to add custom functionality, styles, or scripts to the admin interface.

**Note:** There's a typo in the hook name - it's `fluent_affilate` (missing 'i') instead of `fluent_affiliate`.

**Usage:**
```php
add_action('fluent_affilate/rendering_admin_app', function() {
    // Add custom admin styles
    wp_enqueue_style(
        'custom-fluent-affiliate-admin',
        'path/to/custom-admin.css',
        [],
        '1.0.0'
    );

    // Add custom admin scripts
    wp_enqueue_script(
        'custom-fluent-affiliate-admin-js',
        'path/to/custom-admin.js',
        ['jquery'],
        '1.0.0',
        true
    );

    // Initialize custom admin features
    echo '<script>
        window.customFluentAffiliateConfig = {
            customFeature: true,
            apiEndpoint: "' . admin_url('admin-ajax.php') . '"
        };
    </script>';

    // Add custom admin notices
    add_action('admin_notices', function() {
        echo '<div class="notice notice-info">
            <p>Custom FluentAffiliate admin feature is active!</p>
        </div>';
    });
}, 10);
```

---

### fluent-affiliate_loading_app

**Parameters:** 0
- No parameters passed

**Context:** This hook is triggered when the FluentAffiliate admin application is loading its assets. It's called after CSS files are enqueued but before JavaScript files are loaded, making it perfect for adding custom assets or configurations.

**Hook Name Pattern:** `{slug}_loading_app` where slug is `fluent-affiliate`

**Usage:**
```php
add_action('fluent-affiliate_loading_app', function() {
    // Add custom JavaScript configurations
    wp_localize_script('fluent-affiliate_admin_app', 'customConfig', [
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('custom_fluent_affiliate_nonce'),
        'customSettings' => [
            'feature1' => get_option('custom_feature_1', false),
            'feature2' => get_option('custom_feature_2', true)
        ]
    ]);

    // Enqueue additional admin scripts
    wp_enqueue_script(
        'custom-affiliate-extensions',
        plugin_dir_url(__FILE__) . 'assets/admin-extensions.js',
        ['fluent-affiliate_admin_app'],
        '1.0.0',
        true
    );

    // Add custom CSS for admin interface
    wp_add_inline_style('fluent-affiliate_admin_app', '
        .custom-admin-widget {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 4px;
            padding: 15px;
            margin: 10px 0;
        }
    ');
}, 10);
```
