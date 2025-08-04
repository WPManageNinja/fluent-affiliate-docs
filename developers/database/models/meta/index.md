# Meta Model

**DB Table Name:** `{wp_db_prefix}_fa_meta`

**Schema:** [Check Schema](/developers/database/#fa-meta)

**Source File:** `fluent-affiliate/app/Models/Meta.php`

**Name Space:** `FluentAffiliate\App\Models`

**Class:** `FluentAffiliate\App\Models\Meta`

## Attributes

| Attribute | Data Type | Comment |
|-----------|-----------|---------|
| id | Integer | Primary key |
| object_type | String | Type of object: affiliate, referral, customer, visit, etc. |
| object_id | Integer | ID of the related object |
| meta_key | String | Metadata key name |
| value | Text | Metadata value (JSON, text, or serialized data) |
| created_at | Date Time | Record creation timestamp |
| updated_at | Date Time | Last modification timestamp |

## Usage

Please check [Model Basic](/developers/database/models/) for Common methods.

### Accessing Attributes

```php
$meta = FluentAffiliate\App\Models\Meta::find(1);

$meta->id; // returns id
$meta->object_type; // returns object type
$meta->meta_key; // returns meta key
$meta->value; // returns meta value
```

## Scopes

This model has the following scopes that you can use

### ref($objectId)

Filter meta records for referral references

- **Parameters**
  - $objectId - integer

#### Usage:

```php
// Get referral reference meta for specific object
$meta = FluentAffiliate\App\Models\Meta::ref(123)->get();
```

### referralSetting()

Filter meta records for referral settings

- **Parameters**
  - none

#### Usage:

```php
// Get referral settings meta
$meta = FluentAffiliate\App\Models\Meta::referralSetting()->get();
```

## Relations

This model has the following relationships that you can use

### meta

Access the related object (polymorphic relationship)

- **Returns:** Mixed Model (depends on object_type)

#### Example:

```php
// Accessing Related Object
$relatedObject = $meta->meta;

// The actual model depends on object_type:
// - 'affiliate' -> Affiliate model
// - 'referral' -> Referral model
// - etc.
```

---

## Methods

Along with Global Model methods, this model has the following accessor/mutator methods.

### getValueAttribute($value)

Get the meta value (handles unserialization)

- **Parameters**
  - $value `mixed` - Raw value from database
- **Returns** `mixed`

#### Usage

```php
$value = $meta->value; // Auto-unserialized value
```

### setValueAttribute($value)

Set the meta value (handles serialization)

- **Parameters**
  - $value `mixed` - Value to store
- **Returns** `void`

#### Usage

```php
$meta->value = ['key' => 'value']; // Auto-serialized
$meta->save();
```

> [!NOTE]
> This model uses WordPress `maybe_serialize()` and `maybe_unserialize()` functions for automatic serialization/unserialization of the value field.
