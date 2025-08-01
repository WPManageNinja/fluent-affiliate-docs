# Affiliate Action Hooks

## Lifecycle Hooks

### fluent_affiliate/affiliate_created

**Parameters:** 2
- `$affiliate` (Object) - The affiliate object
- `$user` (Object) - WordPress user object

**Affiliate Object Data:**
```php
$affiliate = {
    id: 123,                           // int - Affiliate ID
    user_id: 456,                      // int - WordPress user ID
    rate: 20,                          // int - Commission rate
    rate_type: "percentage",           // string - percentage|flat|group|default
    status: "active",                  // string - active|inactive|pending
    payment_email: "user@email.com",   // string - Payment email
    group_id: 0,                       // int - Group ID (0 = no group)
    note: "VIP affiliate",             // string - Admin notes
    created_at: "2024-01-15 10:30:00", // string - Creation date
    updated_at: "2024-01-15 10:30:00", // string - Last update
    user_details: {                    // array - User information
        full_name: "John Doe",         // string - Full name
        email: "user@email.com",       // string - User email
        avatar: "http://...",          // string - Avatar URL
        affiliate_id: 123              // int - Affiliate ID
    }
}
```

**User Object Data:**
```php
$user = {
    ID: 456,                          // int - WordPress user ID
    user_login: "johndoe",            // string - Username
    user_email: "user@email.com",     // string - Email
    user_nicename: "johndoe",         // string - Nice name
    display_name: "John Doe"          // string - Display name
    // ... other WordPress user properties
}
```

**Usage:**
```php
add_action('fluent_affiliate/affiliate_created', function($affiliate, $user) {
    // Access affiliate data
    $affiliate_id = $affiliate->id;
    $commission_rate = $affiliate->rate;
    $status = $affiliate->status;

    // Access user data
    $user_email = $user->user_email;
    $display_name = $user->display_name;
}, 10, 2);
```

---

### fluent_affiliate/affiliate_updated

**Parameters:** 3
- `$affiliate` (Object) - The updated affiliate object
- `$context` (String) - Update context
- `$data` (Array) - Update data

**Affiliate Object Data:**
Same as `fluent_affiliate/affiliate_created` above.

**Context Data:**
```php
$context = "by_admin"  // string - Always "by_admin" (admin panel updates)
```

**Data Array:**
```php
$data = [
    'rate' => 25,                     // int - New commission rate (if changed)
    'rate_type' => 'percentage',      // string - New rate type (if changed)
    'status' => 'active',             // string - New status (if changed)
    'payment_email' => 'new@email.com', // string - New payment email (if changed)
    'group_id' => 2,                  // int - New group ID (if changed)
    'note' => 'Updated note'          // string - New note (if changed)
]
```

**Usage:**
```php
add_action('fluent_affiliate/affiliate_updated', function($affiliate, $context, $data) {
    // Check what was updated
    if (isset($data['status'])) {
        $new_status = $data['status'];
    }

    if (isset($data['payment_email'])) {
        $new_email = $data['payment_email'];
    }

    // Context is always "by_admin"
    if ($context === 'by_admin') {
        // Admin made the change
    }
}, 10, 3);
```

---

### fluent_affiliate/before_delete_affiliate

**Parameters:** 1
- `$affiliate` (Object) - The affiliate object to be deleted

**Affiliate Object Data:**
Same as `fluent_affiliate/affiliate_created` above.

**Usage:**
```php
add_action('fluent_affiliate/before_delete_affiliate', function($affiliate) {
    // Access affiliate data before deletion
    $affiliate_id = $affiliate->id;
    $payment_email = $affiliate->payment_email;
    $user_id = $affiliate->user_id;

    // Perform cleanup or archiving
}, 10, 1);
```

---

### fluent_affiliate/after_delete_affiliate

**Parameters:** 1
- `$affiliateId` (Int) - The ID of the deleted affiliate

**Data:**
```php
$affiliateId = 123  // int - The affiliate ID that was deleted
```

**Usage:**
```php
add_action('fluent_affiliate/after_delete_affiliate', function($affiliateId) {
    // Only have the affiliate ID, affiliate object is already deleted
    $deleted_affiliate_id = $affiliateId;

    // Perform final cleanup
}, 10, 1);
```

## Status Change Hooks

### fluent_affiliate/affiliate_status_to_active

**Parameters:** 2
- `$affiliate` (Object) - The affiliate object
- `$previousStatus` (String) - Previous status

**Affiliate Object Data:**
Same as `fluent_affiliate/affiliate_created` above.

**Previous Status Data:**
```php
$previousStatus = "pending"  // string - pending|inactive|active
```

**Usage:**
```php
add_action('fluent_affiliate/affiliate_status_to_active', function($affiliate, $previousStatus) {
    // Current status is now "active"
    $current_status = $affiliate->status; // "active"
    $old_status = $previousStatus;        // "pending" or "inactive"
}, 10, 2);
```

---

### fluent_affiliate/affiliate_status_to_pending

**Parameters:** 2
- `$affiliate` (Object) - The affiliate object
- `$previousStatus` (String) - Previous status

**Data:**
Same parameter structure as `fluent_affiliate/affiliate_status_to_active` above.

**Usage:**
```php
add_action('fluent_affiliate/affiliate_status_to_pending', function($affiliate, $previousStatus) {
    // Current status is now "pending"
    $current_status = $affiliate->status; // "pending"
    $old_status = $previousStatus;        // "active" or "inactive"
}, 10, 2);
```

---

### fluent_affiliate/affiliate_status_to_inactive

**Parameters:** 2
- `$affiliate` (Object) - The affiliate object
- `$previousStatus` (String) - Previous status

**Data:**
Same parameter structure as `fluent_affiliate/affiliate_status_to_active` above.

**Usage:**
```php
add_action('fluent_affiliate/affiliate_status_to_inactive', function($affiliate, $previousStatus) {
    // Current status is now "inactive"
    $current_status = $affiliate->status; // "inactive"
    $old_status = $previousStatus;        // "active" or "pending"
}, 10, 2);
```

---

### Dynamic Status Pattern

**Pattern:** `fluent_affiliate/affiliate_status_to_{status}`

You can hook into any status change:

```php
add_action('fluent_affiliate/affiliate_status_to_custom_status', function($affiliate, $previousStatus) {
    // Handle any custom status
}, 10, 2);
```
