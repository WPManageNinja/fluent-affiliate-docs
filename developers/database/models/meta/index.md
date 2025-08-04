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

### forObject($objectType, $objectId)

Filter meta records for a specific object

- **Parameters**
  - $objectType - string (affiliate, referral, customer, etc.)
  - $objectId - integer

#### Usage:

```php
// Get all meta for affiliate ID 1
$meta = FluentAffiliate\App\Models\Meta::forObject('affiliate', 1)->get();
```

### byKey($metaKey)

Filter meta records by meta key

- **Parameters**
  - $metaKey - string

#### Usage:

```php
// Get all meta with specific key
$meta = FluentAffiliate\App\Models\Meta::byKey('custom_field')->get();
```

### byType($objectType)

Filter meta records by object type

- **Parameters**
  - $objectType - string

#### Usage:

```php
// Get all affiliate meta
$meta = FluentAffiliate\App\Models\Meta::byType('affiliate')->get();
```

---

## Methods

Along with Global Model methods, this model has few helper methods.

### getValue()

Get the meta value (handles JSON decoding if needed)

- **Parameters**
  - none
- **Returns** `mixed`

#### Usage

```php
$value = $meta->getValue();
```

### setValue($value)

Set the meta value (handles JSON encoding if needed)

- **Parameters**
  - $value `mixed` - Value to store
- **Returns** `void`

#### Usage

```php
$meta->setValue(['key' => 'value']);
```

### updateOrCreate($objectType, $objectId, $metaKey, $value)

Update or create a meta record

- **Parameters**
  - $objectType `string` - Object type
  - $objectId `int` - Object ID
  - $metaKey `string` - Meta key
  - $value `mixed` - Meta value
- **Returns** `FluentAffiliate\App\Models\Meta`

#### Usage

```php
$meta = FluentAffiliate\App\Models\Meta::updateOrCreate(
    'affiliate', 
    123, 
    'custom_field', 
    'custom_value'
);
```

### getForObject($objectType, $objectId, $metaKey = null, $default = null)

Get meta value(s) for an object

- **Parameters**
  - $objectType `string` - Object type
  - $objectId `int` - Object ID
  - $metaKey `string|null` - Specific meta key (optional)
  - $default `mixed` - Default value if not found
- **Returns** `mixed`

#### Usage

```php
// Get specific meta
$value = FluentAffiliate\App\Models\Meta::getForObject('affiliate', 123, 'custom_field', 'default');

// Get all meta for object
$allMeta = FluentAffiliate\App\Models\Meta::getForObject('affiliate', 123);
```

### deleteForObject($objectType, $objectId, $metaKey = null)

Delete meta for an object

- **Parameters**
  - $objectType `string` - Object type
  - $objectId `int` - Object ID
  - $metaKey `string|null` - Specific meta key (optional, deletes all if null)
- **Returns** `bool`

#### Usage

```php
// Delete specific meta
FluentAffiliate\App\Models\Meta::deleteForObject('affiliate', 123, 'custom_field');

// Delete all meta for object
FluentAffiliate\App\Models\Meta::deleteForObject('affiliate', 123);
```
