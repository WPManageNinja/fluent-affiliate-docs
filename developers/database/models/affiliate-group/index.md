# AffiliateGroup Model

**DB Table Name:** `{wp_db_prefix}_fa_meta`

**Schema:** [Check Schema](/developers/database/#fa-meta)

**Source File:** `fluent-affiliate/app/Models/AffiliateGroup.php`

**Name Space:** `FluentAffiliate\App\Models`

**Class:** `FluentAffiliate\App\Models\AffiliateGroup`

> [!NOTE]
> This model extends the Meta model and uses the fa_meta table with object_type = 'affiliate_group'. It uses a global scope to automatically filter records.

## Attributes

| Attribute | Data Type | Comment |
|-----------|-----------|---------|
| id | Integer | Primary key (inherited from Meta) |
| object_type | String | Always 'affiliate_group' (auto-set by global scope) |
| object_id | Integer | Not used in this model |
| meta_key | String | Group identifier/name |
| value | Text | Group data (JSON serialized) |
| created_at | Date Time | Record creation timestamp |
| updated_at | Date Time | Last modification timestamp |

## Fillable Attributes

Only the following attributes can be mass-assigned:

| Attribute | Data Type | Comment |
|-----------|-----------|---------|
| meta_key | String | Group identifier/name |
| value | Text | Group data (JSON serialized) |

## Usage

Please check [Model Basic](/developers/database/models/) for Common methods.

### Accessing Attributes

```php
$group = FluentAffiliate\App\Models\AffiliateGroup::find(1);

$group->id; // returns id
$group->meta_key; // returns group identifier
$group->value; // returns group data (JSON)
```

## Scopes

This model has the following scopes that you can use

### search($search)

Search affiliate groups by meta_key or value->name

- **Parameters**
  - $search - string

#### Usage:

```php
// Search groups by meta_key or name in value JSON
$groups = FluentAffiliate\App\Models\AffiliateGroup::search('premium')->get();
```

## Relations

This model has the following relationships that you can use

### affiliates

Access all affiliates in this group

- **Returns:** `FluentAffiliate\App\Models\Affiliate` Model Collections

#### Example:

```php
// Accessing Affiliates in Group
$affiliates = $group->affiliates;

// For Filtering by affiliates relationship
$groups = FluentAffiliate\App\Models\AffiliateGroup::whereHas('affiliates', function($query) {
    $query->where('status', 'active');
})->get();
```

---

---

## Working with Affiliate Groups

Since AffiliateGroup is a specialized Meta model, it works differently from other models. Here are practical examples:

### Creating an Affiliate Group

```php
// Create a new affiliate group
$group = FluentAffiliate\App\Models\AffiliateGroup::create([
    'meta_key' => 'premium_affiliates',  // Group identifier/name
    'value' => [                         // Group settings (JSON)
        'rate_type' => 'percentage',     // percentage|flat|default
        'rate' => 25,                    // Commission rate
        'status' => 'active',            // active|inactive
        'notes' => 'VIP affiliate group' // Admin notes
    ]
]);

echo "Created group with ID: " . $group->id;
```

### Accessing Group Data

```php
$group = FluentAffiliate\App\Models\AffiliateGroup::find(1);

// Access basic attributes
$groupName = $group->meta_key;           // 'premium_affiliates'
$groupSettings = $group->value;          // Auto-unserialized array

// Access specific settings from value JSON
$rateType = $group->value['rate_type'];  // 'percentage'
$rate = $group->value['rate'];           // 25
$status = $group->value['status'];       // 'active'
$notes = $group->value['notes'];         // 'VIP affiliate group'
```

### Updating Group Settings

```php
$group = FluentAffiliate\App\Models\AffiliateGroup::find(1);

// Update the entire value array
$group->value = [
    'rate_type' => 'percentage',
    'rate' => 30,                        // Increased rate
    'status' => 'active',
    'notes' => 'Updated VIP group with higher rate'
];
$group->save();

// Or update specific fields in value
$currentValue = $group->value;
$currentValue['rate'] = 35;              // Update just the rate
$group->value = $currentValue;
$group->save();
```

### Assigning Affiliates to Groups

```php
// Create affiliate and assign to group
$affiliate = FluentAffiliate\App\Models\Affiliate::create([
    'user_id' => 123,
    'group_id' => $group->id,            // Assign to group
    'payment_email' => 'affiliate@example.com',
    'status' => 'active'
]);

// Update existing affiliate's group
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);
$affiliate->group_id = $group->id;
$affiliate->save();
```

### Working with Group Affiliates

```php
$group = FluentAffiliate\App\Models\AffiliateGroup::find(1);

// Get all affiliates in this group
$affiliates = $group->affiliates;
echo "Group has " . $affiliates->count() . " affiliates";

// Get only active affiliates in group
$activeAffiliates = $group->affiliates()->where('status', 'active')->get();

// Check if group has any affiliates
if ($group->affiliates()->exists()) {
    echo "Group has affiliates assigned";
}
```

### Finding Groups

```php
// Find all groups
$allGroups = FluentAffiliate\App\Models\AffiliateGroup::all();

// Search groups by name
$premiumGroups = FluentAffiliate\App\Models\AffiliateGroup::search('premium')->get();

// Find groups with specific rate type
$percentageGroups = FluentAffiliate\App\Models\AffiliateGroup::where('value->rate_type', 'percentage')->get();

// Find groups with rate above 20%
$highRateGroups = FluentAffiliate\App\Models\AffiliateGroup::where('value->rate', '>', 20)->get();
```

### Group Statistics

```php
$group = FluentAffiliate\App\Models\AffiliateGroup::find(1);

// Get group statistics
$stats = [
    'total_affiliates' => $group->affiliates()->count(),
    'active_affiliates' => $group->affiliates()->where('status', 'active')->count(),
    'total_referrals' => $group->affiliates()->withCount('referrals')->get()->sum('referrals_count'),
    'total_earnings' => $group->affiliates()->sum('total_earnings')
];

echo "Group Stats: " . json_encode($stats);
```

## Methods

This model inherits all methods from the Meta model. No additional custom methods are defined in the AffiliateGroup model.

> [!NOTE]
> Since this model extends Meta, you can use all Meta model methods for managing group data. The `value` field contains JSON data with group configuration like rate_type, rate, status, and notes.
