# Affiliate Model

**DB Table Name:** `{wp_db_prefix}_fa_affiliates`

**Schema:** [Check Schema](/developers/database/#fa-affiliates)

**Source File:** `fluent-affiliate/app/Models/Affiliate.php`

**Name Space:** `FluentAffiliate\App\Models`

**Class:** `FluentAffiliate\App\Models\Affiliate`

## Attributes

| Attribute | Data Type | Comment |
|-----------|-----------|---------|
| id | Integer | Primary key |
| user_id | Integer | WordPress user ID |
| group_id | Integer | Affiliate group ID |
| custom_param | String | Custom tracking parameter |
| total_earnings | Decimal | Total lifetime earnings |
| unpaid_earnings | Decimal | Unpaid earnings amount |
| referrals | Integer | Total referral count |
| visits | Integer | Total visit count |
| rate | Decimal | Individual commission rate |
| rate_type | String | Commission type (percentage, flat, group) |
| payment_email | String | Payment email address |
| status | String | Affiliate status (pending, active, inactive, suspended) |
| settings | Text | JSON settings data |
| note | Text | Admin notes |
| created_at | Date Time | Record creation timestamp |
| updated_at | Date Time | Last modification timestamp |

## Usage

Please check [Model Basic](/developers/database/models/) for Common methods.

### Accessing Attributes

```php
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);

$affiliate->id; // returns id
$affiliate->payment_email; // returns payment_email
$affiliate->total_earnings; // returns total_earnings
```

## Scopes

This model has the following scopes that you can use

### ofStatus($status)

Filter affiliates by status

- **Parameters**
  - $status - string

#### Usage:

```php
// Get all active affiliates
$affiliates = FluentAffiliate\App\Models\Affiliate::ofStatus('active')->get();
```

### searchBy($searchTerm)

Search affiliates by various fields

- **Parameters**
  - $searchTerm - string

#### Usage:

```php
// Search affiliates by email or name
$affiliates = FluentAffiliate\App\Models\Affiliate::searchBy('john@example.com')->get();
```

### byStatus($statuses)

Filter affiliates by multiple statuses

- **Parameters**
  - $statuses - array

#### Usage:

```php
// Get affiliates with active or pending status
$affiliates = FluentAffiliate\App\Models\Affiliate::byStatus(['active', 'pending'])->get();
```

## Relations

This model has the following relationships that you can use

### user

Access the associated WordPress user of an affiliate

- **Returns:** `WP_User` object

#### Example:

```php
// Accessing WordPress User
$user = $affiliate->user;

// For Filtering by user relationship
$affiliates = FluentAffiliate\App\Models\Affiliate::whereHas('user', function($query) {
    $query->where('user_status', 0);
})->get();
```

### group

Access the associated affiliate group

- **Returns:** `FluentAffiliate\App\Models\AffiliateGroup` Model

#### Example:

```php
// Accessing Affiliate Group
$group = $affiliate->group;

// For Filtering by group relationship
$affiliates = FluentAffiliate\App\Models\Affiliate::whereHas('group', function($query) {
    $query->where('title', 'Premium');
})->get();
```

### referrals

Access all the associated referrals of an affiliate

- **Returns:** `FluentAffiliate\App\Models\Referral` Model Collections

#### Example:

```php
// Accessing Referrals
$referrals = $affiliate->referrals;

// For Filtering by referrals relationship
$affiliates = FluentAffiliate\App\Models\Affiliate::whereHas('referrals', function($query) {
    $query->where('status', 'paid');
})->get();
```

### visits

Access all the associated visits of an affiliate

- **Returns:** `FluentAffiliate\App\Models\Visit` Model Collections

#### Example:

```php
// Accessing Visits
$visits = $affiliate->visits;

// For Filtering by visits relationship
$affiliates = FluentAffiliate\App\Models\Affiliate::whereHas('visits', function($query) {
    $query->whereDate('created_at', today());
})->get();
```

### transactions

Access all the associated payout transactions of an affiliate

- **Returns:** `FluentAffiliate\App\Models\Transaction` Model Collections

#### Example:

```php
// Accessing Transactions
$transactions = $affiliate->transactions;

// For Filtering by transactions relationship
$affiliates = FluentAffiliate\App\Models\Affiliate::whereHas('transactions', function($query) {
    $query->where('status', 'completed');
})->get();
```

### customers

Access all customers referred by this affiliate

- **Returns:** `FluentAffiliate\App\Models\Customer` Model Collections

#### Example:

```php
// Accessing Customers
$customers = $affiliate->customers;

// For Filtering by customers relationship
$affiliates = FluentAffiliate\App\Models\Affiliate::whereHas('customers', function($query) {
    $query->whereNotNull('email');
})->get();
```

---

## Methods

Along with Global Model methods, this model has few helper methods.

### getCommission($amount)

Calculate commission for a given amount

- **Parameters**
  - $amount `float` - The amount to calculate commission for
- **Returns** `float`

#### Usage

```php
$commission = $affiliate->getCommission(100.00);
```

### getRateDetails()

Get detailed rate information for the affiliate

- **Parameters**
  - none
- **Returns** `array`

#### Usage

```php
$rateDetails = $affiliate->getRateDetails();
```

### recountEarnings()

Recount and update affiliate earnings and referral counts

- **Parameters**
  - none
- **Returns** `void`

#### Usage

```php
$affiliate->recountEarnings();
```

### increase($column, $amount = 1)

Increase a counter column

- **Parameters**
  - $column `string` - Column name to increase
  - $amount `int` - Amount to increase by (default: 1)
- **Returns** `bool`

#### Usage

```php
$affiliate->increase('referrals');
$affiliate->increase('visits', 5);
```

### decrease($column, $amount = 1)

Decrease a counter column

- **Parameters**
  - $column `string` - Column name to decrease
  - $amount `int` - Amount to decrease by (default: 1)
- **Returns** `bool`

#### Usage

```php
$affiliate->decrease('visits');
$affiliate->decrease('referrals', 2);
```

### updateMeta($key, $value)

Update affiliate meta data

- **Parameters**
  - $key `string` - Meta key
  - $value `mixed` - Meta value
- **Returns** `bool`

#### Usage

```php
$affiliate->updateMeta('custom_field', 'custom_value');
```

### getMeta($key, $default = null)

Get affiliate meta data

- **Parameters**
  - $key `string` - Meta key
  - $default `mixed` - Default value if not found
- **Returns** `mixed`

#### Usage

```php
$value = $affiliate->getMeta('custom_field', 'default_value');
```

### deleteMeta($key)

Delete affiliate meta data

- **Parameters**
  - $key `string` - Meta key
- **Returns** `bool`

#### Usage

```php
$affiliate->deleteMeta('custom_field');
```

### getShareUrl($url)

Generate affiliate share URL

- **Parameters**
  - $url `string` - Base URL to share
- **Returns** `string`

#### Usage

```php
$shareUrl = $affiliate->getShareUrl('https://example.com/product');
```

### isNewRefEmailEnabled()

Check if new referral email notifications are enabled

- **Parameters**
  - none
- **Returns** `bool`

#### Usage

```php
$emailEnabled = $affiliate->isNewRefEmailEnabled();
```
