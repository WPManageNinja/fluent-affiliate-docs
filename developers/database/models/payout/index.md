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

## Relations

This model has the following relationships that you can use

### transactions

Access all transactions in this payout batch

- **Returns:** `FluentAffiliate\App\Models\Transaction` Model Collections

#### Example:

```php
// Accessing Payout Transactions
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
// Accessing Affiliates in Payout
$affiliates = $payout->affiliates;

// For Filtering by affiliates relationship
$payouts = FluentAffiliate\App\Models\Payout::whereHas('affiliates', function($query) {
    $query->where('status', 'active');
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
