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

## Searchable Attributes

The following attributes can be searched using the `searchBy()` scope:

| Attribute | Comment |
|-----------|---------|
| total_amount | Transaction amount |
| created_at | Creation timestamp |
| id | Transaction ID |

## Scopes

This model has the following scopes that you can use

### searchBy($search)

Search transactions by various fields

- **Parameters**
  - $search - string

#### Usage:

```php
// Search transactions by amount, date, or ID
$transactions = FluentAffiliate\App\Models\Transaction::searchBy('100')->get();

// Column-specific search
$transactions = FluentAffiliate\App\Models\Transaction::searchBy('total_amount:100')->get();

// Exact match search
$transactions = FluentAffiliate\App\Models\Transaction::searchBy('status=paid')->get();
```

### byStatus($status)

Filter transactions by status

- **Parameters**
  - $status - string (paid, pending, failed, cancelled, or 'all')

#### Usage:

```php
// Get paid transactions
$transactions = FluentAffiliate\App\Models\Transaction::byStatus('paid')->get();

// Get all transactions (ignores filter)
$transactions = FluentAffiliate\App\Models\Transaction::byStatus('all')->get();
```

### applyCustomFilters($filters)

Apply custom filters to transaction queries

- **Parameters**
  - $filters - array

#### Usage:

```php
// Apply custom filters
$filters = [
    'total_amount' => ['operator' => 'gt', 'value' => 100],
    'status' => ['operator' => '=', 'value' => 'paid']
];
$transactions = FluentAffiliate\App\Models\Transaction::applyCustomFilters($filters)->get();
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

Access the parent payout batch that contains this transaction

- **Returns:** `FluentAffiliate\App\Models\Payout` Model

#### Example:

```php
// Accessing Parent Payout Batch
$payout = $transaction->payout;

// For Filtering by payout relationship
$transactions = FluentAffiliate\App\Models\Transaction::whereHas('payout', function($query) {
    $query->where('status', 'completed');
})->get();
```

### referrals

Access referrals that are paid through this specific transaction

- **Returns:** `FluentAffiliate\App\Models\Referral` Model Collections

#### Example:

```php
// Accessing Referrals Paid by This Transaction
$referrals = $transaction->referrals;

// For Filtering by referrals relationship
$transactions = FluentAffiliate\App\Models\Transaction::whereHas('referrals', function($query) {
    $query->where('provider', 'woocommerce');
})->get();
```

> [!NOTE]
> **Relationship Hierarchy:** Payout → Transaction → Referrals
> - A **Payout** contains multiple **Transactions** (one per affiliate)
> - Each **Transaction** pays out multiple **Referrals** for that affiliate
> - Referrals link to transactions via `payout_transaction_id` foreign key

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

### getCounts()

Get counts of affiliates and referrals for this transaction

- **Parameters**
  - none
- **Returns** `array`

#### Usage

```php
$counts = $transaction->getCounts();
// Returns: ['affiliates' => 5, 'referrals' => 25]
```
