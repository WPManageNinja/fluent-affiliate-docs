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

Filter referrals by status (single status only)

- **Parameters**
  - $status - string (paid, unpaid, pending, rejected, cancelled)

#### Usage:

```php
// Get paid referrals
$referrals = FluentAffiliate\App\Models\Referral::byStatus('paid')->get();

// Get unpaid referrals
$referrals = FluentAffiliate\App\Models\Referral::byStatus('unpaid')->get();
```

### applyCustomFilters($filters)

Apply custom filters to referral queries

- **Parameters**
  - $filters - array

#### Usage:

```php
// Apply custom filters
$filters = [
    'amount' => ['operator' => 'gt', 'value' => 10],
    'status' => ['operator' => '=', 'value' => 'paid']
];
$referrals = FluentAffiliate\App\Models\Referral::applyCustomFilters($filters)->get();
```

### paid()

Filter referrals with paid status

- **Parameters**
  - none

#### Usage:

```php
// Get paid referrals
$referrals = FluentAffiliate\App\Models\Referral::paid()->get();
```

### unPaid()

Filter referrals with unpaid status

- **Parameters**
  - none

#### Usage:

```php
// Get unpaid referrals
$referrals = FluentAffiliate\App\Models\Referral::unPaid()->get();
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

### payout

Access the payout batch this referral belongs to

- **Returns:** `FluentAffiliate\App\Models\Payout` Model

#### Example:

```php
// Accessing Payout Batch
$payout = $referral->payout;

// For Filtering by payout relationship
$referrals = FluentAffiliate\App\Models\Referral::whereHas('payout', function($query) {
    $query->where('status', 'completed');
})->get();
```

### transaction

Access the specific transaction that paid this referral

- **Returns:** `FluentAffiliate\App\Models\Transaction` Model

#### Example:

```php
// Accessing Payment Transaction
$transaction = $referral->transaction;

// For Filtering by transaction relationship
$referrals = FluentAffiliate\App\Models\Referral::whereHas('transaction', function($query) {
    $query->where('status', 'completed');
})->get();
```

> [!NOTE]
> **Payment Hierarchy:** Payout → Transaction → Referral
> - **Payout** = Batch payment (e.g., "January 2024 Payouts")
> - **Transaction** = Individual affiliate payment within the batch
> - **Referral** = Individual commission paid through the transaction
> - Referrals link to transactions via `payout_transaction_id`

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

### getProviderReferenceUrl()

Get the provider-specific reference URL for this referral

- **Parameters**
  - none
- **Returns** `string`

#### Usage

```php
$providerReferenceUrl = $referral->getProviderReferenceUrl();
```
