# Affiliate Group Action Hooks

## Group Management Hooks

### fluent_affiliate/before_create_affiliate_group

**Parameters:** 1
- `$groupData` (Array) - The group data that will be used to create the group

**Group Data Array:**
```php
$groupData = [
    'meta_key' => 'group_name',           // string - Group identifier/name
    'value' => [                          // array - Group settings
        'rate_type' => 'percentage',      // string - percentage|flat|default
        'rate' => 25,                     // int - Commission rate
        'status' => 'active',             // string - active|inactive
        'notes' => 'VIP group'            // string - Admin notes
    ]
]
```

**Usage:**
```php
add_action('fluent_affiliate/before_create_affiliate_group', function($groupData) {
    // Access group data
    $group_name = $groupData['meta_key'];
    $rate_type = $groupData['value']['rate_type'];
    $rate = $groupData['value']['rate'];
    $status = $groupData['value']['status'];
    $notes = $groupData['value']['notes'];
    
    // Validate or modify data before creation
    if ($rate > 50) {
        error_log("High commission rate group being created: {$group_name} - {$rate}%");
    }
}, 10, 1);
```

---

### fluent_affiliate/before_delete_affiliate_group

**Parameters:** 1
- `$affiliateGroup` (Object) - The affiliate group object to be deleted

**Affiliate Group Object Data:**
```php
$affiliateGroup = {
    id: 123,                              // int - Group ID
    meta_key: 'vip_group',                // string - Group identifier/name
    value: {                              // array - Group settings
        rate_type: 'percentage',          // string - percentage|flat|default
        rate: 30,                         // int - Commission rate
        status: 'active',                 // string - active|inactive
        notes: 'VIP affiliate group'      // string - Admin notes
    },
    object_type: 'affiliate_group',       // string - Always 'affiliate_group'
    object_id: null,                      // null - Not used for groups
    created_at: '2024-01-15 10:30:00',    // string - Creation date
    updated_at: '2024-01-15 10:30:00'     // string - Last update
}
```

**Usage:**
```php
add_action('fluent_affiliate/before_delete_affiliate_group', function($affiliateGroup) {
    // Access group data before deletion
    $group_id = $affiliateGroup->id;
    $group_name = $affiliateGroup->meta_key;
    $rate = $affiliateGroup->value['rate'];
    
    // Check if group has affiliates
    $affiliate_count = $affiliateGroup->affiliates()->count();
    if ($affiliate_count > 0) {
        error_log("Warning: Deleting group {$group_name} with {$affiliate_count} affiliates");
    }
    
    // Archive group data
    $archive_data = [
        'group_id' => $group_id,
        'group_name' => $group_name,
        'rate' => $rate,
        'affiliate_count' => $affiliate_count,
        'deleted_at' => current_time('mysql')
    ];
    // save_group_archive($archive_data);
}, 10, 1);
```

---

### fluent_affiliate/after_delete_affiliate_group

**Parameters:** 1
- `$affiliateGroup` (Object) - The affiliate group object that was deleted

**Affiliate Group Object Data:**
Same as `fluent_affiliate/before_delete_affiliate_group` above.

**Usage:**
```php
add_action('fluent_affiliate/after_delete_affiliate_group', function($affiliateGroup) {
    // Group has been deleted from database
    $group_id = $affiliateGroup->id;
    $group_name = $affiliateGroup->meta_key;
    
    // Final cleanup
    error_log("Affiliate group deleted: ID {$group_id}, Name: {$group_name}");
    
    // Clean up any remaining custom data
    delete_option("custom_group_data_{$group_id}");
    
    // Update external systems
    // remove_from_external_crm($group_id);
}, 10, 1);
```
