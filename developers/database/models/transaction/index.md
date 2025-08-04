# Transaction Model

**DB Table Name:** `{wp_db_prefix}_fa_payout_transactions`

**Schema:** [Check Schema](/developers/database/#fa-payout-transactions)

**Source File:** `fluent-affiliate/app/Models/Transaction.php`

**Name Space:** `FluentAffiliate\App\Models`

**Class:** `FluentAffiliate\App\Models\Transaction`

## Attributes

| Attribute | Data Type | Comment |
|-----------|-----------|---------|
| id | Integer | Primary key |
| created_by | Integer | User ID who created the transaction |
| affiliate_id | Integer | Links to fa_affiliates |
| payout_id | Integer | Links to fa_payouts batch |
| total_amount | Decimal | Individual transaction amount |
| payout_method | String | Payment method: manual, paypal, bank_transfer, etc. |
| status | String | Transaction status: paid, pending, failed, cancelled |
| currency | String | Currency code (USD, EUR, etc.) |
| settings | Text | Serialized transaction settings and metadata |
| created_at | Date Time | Transaction creation timestamp |
| updated_at | Date Time | Last modification timestamp |

## Usage

Please check [Model Basic](/developers/database/models/) for Common methods.

### Accessing Attributes

```php
$transaction = FluentAffiliate\App\Models\Transaction::find(1);

$transaction->id; // returns id
$transaction->total_amount; // returns transaction amount
$transaction->status; // returns transaction status
```

## Relations

This model has the following relationships that you can use

### affiliate

Access the associated affiliate of a transaction

- **Returns:** `FluentAffiliate\App\Models\Affiliate` Model

#### Example:

```php
// Accessing Affiliate
$affiliate = $transaction->affiliate;

// For Filtering by affiliate relationship
$transactions = FluentAffiliate\App\Models\Transaction::whereHas('affiliate', function($query) {
    $query->where('status', 'active');
})->get();
```

### payout

Access the associated payout batch

- **Returns:** `FluentAffiliate\App\Models\Payout` Model

#### Example:

```php
// Accessing Payout Batch
$payout = $transaction->payout;

// For Filtering by payout relationship
$transactions = FluentAffiliate\App\Models\Transaction::whereHas('payout', function($query) {
    $query->where('status', 'completed');
})->get();
```

### referrals

Access referrals associated with this transaction

- **Returns:** `FluentAffiliate\App\Models\Referral` Model Collections

#### Example:

```php
// Accessing Related Referrals
$referrals = $transaction->referrals;

// For Filtering by referrals relationship
$transactions = FluentAffiliate\App\Models\Transaction::whereHas('referrals', function($query) {
    $query->where('provider', 'woocommerce');
})->get();
```

---

## Methods

Along with Global Model methods, this model has few helper methods.

### getSettingsAttribute()

Access serialized settings data (auto-unserialized)

- **Parameters**
  - none
- **Returns** `array`

#### Usage

```php
$settings = $transaction->settings; // Auto-unserialized array
```

### setSettingsAttribute($value)

Set settings data (auto-serialized)

- **Parameters**
  - $value `array` - Settings data
- **Returns** `void`

#### Usage

```php
$transaction->settings = ['paypal_email' => 'affiliate@example.com']; // Auto-serialized
```
