# Payout Action Hooks

## Payout Lifecycle Hooks

> [!NOTE]
> **Coming Soon:** Payout-specific lifecycle hooks are not yet implemented in FluentAffiliate core. The current payout functionality primarily manages transactions rather than payout objects themselves.

### Expected Payout Hooks (Not Yet Available)

The following hooks would be expected for a complete payout lifecycle but are **not currently implemented**:

**Payout Creation:**
- `fluent_affiliate/payout_created` - When a new payout batch is created
- `fluent_affiliate/before_create_payout` - Before payout creation

**Payout Status Changes:**
- `fluent_affiliate/payout_status_to_processing` - When payout starts processing
- `fluent_affiliate/payout_status_to_completed` - When payout is completed
- `fluent_affiliate/payout_status_to_failed` - When payout fails

**Payout Deletion:**
- `fluent_affiliate/before_delete_payout` - Before payout deletion
- `fluent_affiliate/after_delete_payout` - After payout deletion

## Current Implementation

Currently, FluentAffiliate's payout system works through **transaction-level hooks** rather than payout-level hooks. For transaction-specific hooks, see the [Transaction Module](/guide/developer/hooks/actions/transactions/).

**Payout Object Structure (for reference):**
```php
$payout = {
    id: 456,                           // int - Payout ID
    total_amount: 500.00,              // float - Total payout amount
    payout_method: "paypal",           // string - Payment method
    status: "processing",              // string - processing|completed|failed
    title: "Monthly Payout - Jan 2024", // string - Payout title
    description: "January 2024 commissions", // string - Description
    currency: "USD",                   // string - Currency code
    settings: {                        // array - Payout settings
        // Method-specific settings
    },
    created_by: 1,                     // int - Admin user ID
    created_at: "2024-01-15 10:00:00", // string - Creation date
    updated_at: "2024-01-15 10:30:00"  // string - Last update
}
```

## Workaround Using Transaction Hooks

Until payout-specific hooks are implemented, you can monitor payout progress using transaction hooks:

```php
// Monitor when all transactions in a payout are completed
add_action('fluent_affiliate/payout/transaction/transaction_updated_to_paid', function($transaction, $payout) {
    // Check if this was the last transaction in the payout
    $remaining_transactions = \FluentAffiliate\App\Models\Transaction::where('payout_id', $payout->id)
        ->where('status', '!=', 'paid')
        ->count();

    if ($remaining_transactions === 0) {
        // All transactions in this payout are now paid
        error_log("Payout {$payout->id} fully completed - all transactions paid");

        // Custom payout completion logic
        // send_payout_completion_notification($payout);
    }
}, 10, 2);
```
