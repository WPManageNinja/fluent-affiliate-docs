# Referral Model

**DB Table Name:** `{wp_db_prefix}_fa_referrals`

**Schema:** [Check Schema](/developers/database/#fa-referrals)

**Source File:** `fluent-affiliate/app/Models/Referral.php`

**Name Space:** `FluentAffiliate\App\Models`

**Class:** `FluentAffiliate\App\Models\Referral`

## Attributes

| Attribute | Data Type | Comment |
|-----------|-----------|---------|
| id | Integer | Primary key |
| affiliate_id | Integer | Links to fa_affiliates |
| parent_id | Integer | Parent referral for multi-tier commissions |
| customer_id | Integer | Links to fa_customers |
| visit_id | Integer | Links to fa_visits |
| description | Text | Referral description |
| amount | Decimal | Commission amount |
| order_total | Decimal | Total order value |
| currency | String | Currency code (3 chars) |
| utm_campaign | String | UTM campaign tracking |
| provider | String | Integration source (woocommerce, edd, etc.) |
| provider_id | Integer | External system ID |
| provider_sub_id | String | External order/transaction ID |
| products | Text | Serialized product data |
| payout_id | Integer | Links to payout batch |
| type | String | Referral type (sale, lead, click, custom) |
| status | String | Referral status (pending, unpaid, paid, rejected) |
| settings | Text | Serialized settings data |
| created_at | Date Time | Record creation timestamp |
| updated_at | Date Time | Last modification timestamp |

## Usage

Please check [Model Basic](/developers/database/models/) for Common methods.

### Accessing Attributes

```php
$referral = FluentAffiliate\App\Models\Referral::find(1);

$referral->id; // returns id
$referral->amount; // returns commission amount
$referral->provider; // returns provider
```

## Scopes

This model has the following scopes that you can use

### searchBy($searchTerm)

Search referrals by various fields

- **Parameters**
  - $searchTerm - string

#### Usage:

```php
// Search referrals by description, amount, utm_campaign, provider, or id
$referrals = FluentAffiliate\App\Models\Referral::searchBy('woocommerce')->get();

// Column-specific search
$referrals = FluentAffiliate\App\Models\Referral::searchBy('provider:woocommerce')->get();

// Exact match search
$referrals = FluentAffiliate\App\Models\Referral::searchBy('status=paid')->get();
```

### byStatus($status)

Filter referrals by status

- **Parameters**
  - $status - string or array

#### Usage:

```php
// Get paid referrals
$referrals = FluentAffiliate\App\Models\Referral::byStatus('paid')->get();

// Get multiple statuses
$referrals = FluentAffiliate\App\Models\Referral::byStatus(['paid', 'unpaid'])->get();
```

### byProvider($provider)

Filter referrals by provider

- **Parameters**
  - $provider - string

#### Usage:

```php
// Get WooCommerce referrals
$referrals = FluentAffiliate\App\Models\Referral::byProvider('woocommerce')->get();
```

## Relations

This model has the following relationships that you can use

### affiliate

Access the associated affiliate of a referral

- **Returns:** `FluentAffiliate\App\Models\Affiliate` Model

#### Example:

```php
// Accessing Affiliate
$affiliate = $referral->affiliate;

// For Filtering by affiliate relationship
$referrals = FluentAffiliate\App\Models\Referral::whereHas('affiliate', function($query) {
    $query->where('status', 'active');
})->get();
```

### customer

Access the associated customer of a referral

- **Returns:** `FluentAffiliate\App\Models\Customer` Model

#### Example:

```php
// Accessing Customer
$customer = $referral->customer;

// For Filtering by customer relationship
$referrals = FluentAffiliate\App\Models\Referral::whereHas('customer', function($query) {
    $query->whereNotNull('email');
})->get();
```

### visit

Access the associated visit of a referral

- **Returns:** `FluentAffiliate\App\Models\Visit` Model

#### Example:

```php
// Accessing Visit
$visit = $referral->visit;

// For Filtering by visit relationship
$referrals = FluentAffiliate\App\Models\Referral::whereHas('visit', function($query) {
    $query->where('utm_source', 'facebook');
})->get();
```

### parent

Access the parent referral (for multi-tier commissions)

- **Returns:** `FluentAffiliate\App\Models\Referral` Model

#### Example:

```php
// Accessing Parent Referral
$parentReferral = $referral->parent;

// For Filtering by parent relationship
$referrals = FluentAffiliate\App\Models\Referral::whereHas('parent', function($query) {
    $query->where('type', 'sale');
})->get();
```

### children

Access child referrals (for multi-tier commissions)

- **Returns:** `FluentAffiliate\App\Models\Referral` Model Collections

#### Example:

```php
// Accessing Child Referrals
$childReferrals = $referral->children;

// For Filtering by children relationship
$referrals = FluentAffiliate\App\Models\Referral::whereHas('children', function($query) {
    $query->where('status', 'paid');
})->get();
```

### payoutTransaction

Access the associated payout transaction

- **Returns:** `FluentAffiliate\App\Models\Transaction` Model

#### Example:

```php
// Accessing Payout Transaction
$transaction = $referral->payoutTransaction;

// For Filtering by payout transaction relationship
$referrals = FluentAffiliate\App\Models\Referral::whereHas('payoutTransaction', function($query) {
    $query->where('status', 'completed');
})->get();
```

---

## Methods

Along with Global Model methods, this model has few helper methods.

### getProviderUrl()

Get the provider-specific URL for this referral

- **Parameters**
  - none
- **Returns** `string|null`

#### Usage

```php
$providerUrl = $referral->getProviderUrl();
```

### getProductsAttribute()

Access serialized products data (auto-unserialized)

- **Parameters**
  - none
- **Returns** `array`

#### Usage

```php
$products = $referral->products; // Auto-unserialized array
```

### getSettingsAttribute()

Access serialized settings data (auto-unserialized)

- **Parameters**
  - none
- **Returns** `array`

#### Usage

```php
$settings = $referral->settings; // Auto-unserialized array
```

### setProductsAttribute($value)

Set products data (auto-serialized)

- **Parameters**
  - $value `array` - Products data
- **Returns** `void`

#### Usage

```php
$referral->products = ['product_1', 'product_2']; // Auto-serialized
```

### setSettingsAttribute($value)

Set settings data (auto-serialized)

- **Parameters**
  - $value `array` - Settings data
- **Returns** `void`

#### Usage

```php
$referral->settings = ['key' => 'value']; // Auto-serialized
```
