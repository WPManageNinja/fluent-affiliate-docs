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
| id | Integer | Primary key |
| object_type | String | Always 'affiliate_group' (auto-set by global scope) |
| object_id | Integer | Group identifier |
| meta_key | String | Group property key |
| value | Text | Group property value (JSON data) |
| created_at | Date Time | Record creation timestamp |
| updated_at | Date Time | Last modification timestamp |

## Virtual Attributes

When working with AffiliateGroup, the following virtual attributes are available through the JSON value field:

| Attribute | Data Type | Comment |
|-----------|-----------|---------|
| title | String | Group title |
| slug | String | URL-friendly slug |
| description | Text | Group description |
| rate | Decimal | Group commission rate |
| rate_type | String | Commission type (percentage, flat) |
| settings | Object | Group settings and configuration |

## Usage

Please check [Model Basic](/developers/database/models/) for Common methods.

### Accessing Attributes

```php
$group = FluentAffiliate\App\Models\AffiliateGroup::find(1);

$group->id; // returns id
$group->title; // returns group title
$group->rate; // returns commission rate
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

## Methods

Along with Global Model methods, this model has few helper methods.

### addAffiliate($affiliateId)

Add an affiliate to this group

- **Parameters**
  - $affiliateId `int` - Affiliate ID to add
- **Returns** `bool`

#### Usage

```php
$group->addAffiliate(123);
```

### removeAffiliate($affiliateId)

Remove an affiliate from this group

- **Parameters**
  - $affiliateId `int` - Affiliate ID to remove
- **Returns** `bool`

#### Usage

```php
$group->removeAffiliate(123);
```

### getAffiliateCount()

Get the number of affiliates in this group

- **Parameters**
  - none
- **Returns** `int`

#### Usage

```php
$count = $group->getAffiliateCount();
```
