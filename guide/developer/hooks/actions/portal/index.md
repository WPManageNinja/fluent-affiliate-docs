# Portal Action Hooks

## Email Template Hooks

### fluent_affiliate/email_head

**Parameters:** 0
- No parameters passed

**Context:** This hook is triggered in the `<head>` section of email templates sent by FluentAffiliate. It allows you to add custom CSS styles, meta tags, or other head elements to email templates.

**Usage:**
```php
add_action('fluent_affiliate/email_head', function() {
    // Add custom CSS to email templates
    echo '<style>
        .custom-email-header {
            background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            text-align: center;
            color: white;
        }
        .email-body {
            font-family: "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
        }
        .highlight {
            background-color: #fff3cd;
            padding: 10px;
            border-radius: 4px;
        }
    </style>';

    // Add custom meta tags
    echo '<meta name="color-scheme" content="light dark">';
    echo '<meta name="supported-color-schemes" content="light dark">';

    // Add custom fonts
    echo '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">';
}, 10);
```
