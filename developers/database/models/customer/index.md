# Customer Model

**DB Table Name:** `{wp_db_prefix}_fa_customers`

**Schema:** [Check Schema](/developers/database/#fa-customers)

**Source File:** `fluent-affiliate/app/Models/Customer.php`

**Name Space:** `FluentAffiliate\App\Models`

**Class:** `FluentAffiliate\App\Models\Customer`

## Attributes

| Attribute | Data Type | Comment |
|-----------|-----------|---------|
| id | Integer | Primary key |
| user_id | Integer | WordPress user ID |
| by_affiliate_id | Integer | Referring affiliate ID |
| email | String | Customer email address |
| first_name | String | Customer first name |
| last_name | String | Customer last name |
| ip | String | Customer IP address |
| settings | Text | Serialized settings data |
| created_at | Date Time | Record creation timestamp |
| updated_at | Date Time | Last modification timestamp |

## Appended Attributes

| Attribute | Data Type | Comment |
|-----------|-----------|---------|
| full_name | String | Computed full name from first_name + last_name |
| photo | String | Gravatar URL based on email |

## Usage

Please check [Model Basic](/developers/database/models/) for Common methods.

### Accessing Attributes

```php
$customer = FluentAffiliate\App\Models\Customer::find(1);

$customer->id; // returns id
$customer->email; // returns email
$customer->full_name; // returns computed full name
$customer->photo; // returns gravatar URL
```

## Relations

This model has the following relationships that you can use

### affiliate

Access the referring affiliate of a customer

- **Returns:** `FluentAffiliate\App\Models\Affiliate` Model

#### Example:

```php
// Accessing Referring Affiliate
$affiliate = $customer->affiliate;

// For Filtering by affiliate relationship
$customers = FluentAffiliate\App\Models\Customer::whereHas('affiliate', function($query) {
    $query->where('status', 'active');
})->get();
```

### referrals

Access all referrals made by this customer

- **Returns:** `FluentAffiliate\App\Models\Referral` Model Collections

#### Example:

```php
// Accessing Customer Referrals
$referrals = $customer->referrals;

// For Filtering by referrals relationship
$customers = FluentAffiliate\App\Models\Customer::whereHas('referrals', function($query) {
    $query->where('status', 'paid');
})->get();
```

### visits

Access all visits made by this customer

- **Returns:** `FluentAffiliate\App\Models\Visit` Model Collections

#### Example:

```php
// Accessing Customer Visits
$visits = $customer->visits;

// For Filtering by visits relationship
$customers = FluentAffiliate\App\Models\Customer::whereHas('visits', function($query) {
    $query->whereDate('created_at', today());
})->get();
```

---

## Methods

Along with Global Model methods, this model has few helper methods.

### getFullNameAttribute()

Get computed full name from first_name and last_name

- **Parameters**
  - none
- **Returns** `string`

#### Usage

```php
$fullName = $customer->getFullNameAttribute(); // "John Doe"
// Or simply access as property
$fullName = $customer->full_name;
```

### getPhotoAttribute()

Get Gravatar URL based on email address

- **Parameters**
  - none
- **Returns** `string`

#### Usage

```php
$photo = $customer->getPhotoAttribute();
// Or simply access as property
$photo = $customer->photo;
```

### getSettingsAttribute()

Access serialized settings data (auto-unserialized)

- **Parameters**
  - none
- **Returns** `array`

#### Usage

```php
$settings = $customer->settings; // Auto-unserialized array
```

### setSettingsAttribute($value)

Set settings data (auto-serialized)

- **Parameters**
  - $value `array` - Settings data
- **Returns** `void`

#### Usage

```php
$customer->settings = ['key' => 'value']; // Auto-serialized
```
