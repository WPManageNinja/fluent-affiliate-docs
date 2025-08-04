# Payout Model

**DB Table Name:** `{wp_db_prefix}_fa_payouts`

**Schema:** [Check Schema](/developers/database/#fa-payouts)

**Source File:** `fluent-affiliate/app/Models/Payout.php`

**Name Space:** `FluentAffiliate\App\Models`

**Class:** `FluentAffiliate\App\Models\Payout`

## Attributes

| Attribute | Data Type | Comment |
|-----------|-----------|---------|
| id | Integer | Primary key |
| created_by | Integer | User ID who created the payout batch |
| total_amount | Decimal | Total amount for the entire payout batch |
| payout_method | String | Payment method: manual, paypal, bank_transfer, etc. |
| status | String | Batch status: draft, pending, processing, completed, failed |
| currency | String | Currency code (USD, EUR, etc.) |
| title | String | Human-readable payout batch title |
| description | Text | Detailed description of the payout batch |
| settings | Text | Serialized payout settings and configuration |
| created_at | Date Time | Batch creation timestamp |
| updated_at | Date Time | Last modification timestamp |

## Usage

Please check [Model Basic](/developers/database/models/) for Common methods.

### Accessing Attributes

```php
$payout = FluentAffiliate\App\Models\Payout::find(1);

$payout->id; // returns id
$payout->total_amount; // returns total batch amount
$payout->status; // returns batch status
```

## Searchable Attributes

The following attributes can be searched using the `searchBy()` scope:

| Attribute | Comment |
|-----------|---------|
| title | Payout batch title |
| total_amount | Total batch amount |
| description | Batch description |
| id | Payout ID |

## Scopes

This model has the following scopes that you can use

### searchBy($search)

Search payouts by various fields

- **Parameters**
  - $search - string

#### Usage:

```php
// Search payouts by title, amount, description, or ID
$payouts = FluentAffiliate\App\Models\Payout::searchBy('Monthly')->get();

// Column-specific search
$payouts = FluentAffiliate\App\Models\Payout::searchBy('title:Monthly')->get();

// Exact match search
$payouts = FluentAffiliate\App\Models\Payout::searchBy('status=completed')->get();
```

### byStatus($status)

Filter payouts by status

- **Parameters**
  - $status - string (draft, pending, processing, completed, failed, or 'all')

#### Usage:

```php
// Get completed payouts
$payouts = FluentAffiliate\App\Models\Payout::byStatus('completed')->get();

// Get all payouts (ignores filter)
$payouts = FluentAffiliate\App\Models\Payout::byStatus('all')->get();
```

### applyCustomFilters($filters)

Apply custom filters to payout queries

- **Parameters**
  - $filters - array

#### Usage:

```php
// Apply custom filters
$filters = [
    'total_amount' => ['operator' => 'gt', 'value' => 1000],
    'status' => ['operator' => '=', 'value' => 'completed']
];
$payouts = FluentAffiliate\App\Models\Payout::applyCustomFilters($filters)->get();
```

## Relations

This model has the following relationships that you can use

### transactions

Access all individual transactions within this payout batch (one per affiliate)

- **Returns:** `FluentAffiliate\App\Models\Transaction` Model Collections

#### Example:

```php
// Accessing Child Transactions
$transactions = $payout->transactions;

// For Filtering by transactions relationship
$payouts = FluentAffiliate\App\Models\Payout::whereHas('transactions', function($query) {
    $query->where('status', 'paid');
})->get();
```

### affiliates

Access all affiliates included in this payout batch (through transactions)

- **Returns:** `FluentAffiliate\App\Models\Affiliate` Model Collections

#### Example:

```php
// Accessing Affiliates in Payout (via transactions)
$affiliates = $payout->affiliates;

// For Filtering by affiliates relationship
$payouts = FluentAffiliate\App\Models\Payout::whereHas('affiliates', function($query) {
    $query->where('status', 'active');
})->get();
```

> [!NOTE]
> **Payout Structure:** A payout batch contains multiple transactions
> - **Payout** = Batch of payments (e.g., "January 2024 Payouts")
> - **Transaction** = Individual payment to one affiliate within the batch
> - **Referrals** = Individual commissions paid through each transaction

### creator

Access the user who created this payout

- **Returns:** `FluentAffiliate\App\Models\User` Model

#### Example:

```php
// Accessing Creator
$creator = $payout->creator;

// For Filtering by creator relationship
$payouts = FluentAffiliate\App\Models\Payout::whereHas('creator', function($query) {
    $query->where('user_status', 0);
})->get();
```

### referrals

Access all referrals included in this payout

- **Returns:** `FluentAffiliate\App\Models\Referral` Model Collections

#### Example:

```php
// Accessing Referrals in Payout
$referrals = $payout->referrals;

// For Filtering by referrals relationship
$payouts = FluentAffiliate\App\Models\Payout::whereHas('referrals', function($query) {
    $query->where('status', 'paid');
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
$settings = $payout->settings; // Auto-unserialized array
```

### setSettingsAttribute($value)

Set settings data (auto-serialized)

- **Parameters**
  - $value `array` - Settings data
- **Returns** `void`

#### Usage

```php
$payout->settings = ['auto_process' => true]; // Auto-serialized
```

### getCounts()

Get counts of affiliates and referrals for this payout

- **Parameters**
  - none
- **Returns** `array`

#### Usage

```php
$counts = $payout->getCounts();
// Returns: ['affiliates' => 10, 'referrals' => 50]
```

### recountPaymentTotal()

Recount the total amount and update status based on transactions

- **Parameters**
  - none
- **Returns** `FluentAffiliate\App\Models\Payout`

#### Usage

```php
$payout->recountPaymentTotal();
// Recalculates total_amount from transactions and updates status
```
