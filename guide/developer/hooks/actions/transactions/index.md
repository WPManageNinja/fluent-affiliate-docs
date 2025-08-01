# Transaction Action Hooks

## Transaction Status Hooks

### fluent_affiliate/payout/transaction/transaction_updated_to_{status}

**Dynamic Hook Pattern:** This hook fires when a transaction status changes to any specific status.

**Parameters:** 2
- `$transaction` (Object) - The transaction object
- `$payout` (Object) - The payout object

**Transaction Object Data:**
```php
$transaction = {
    id: 789,                           // int - Transaction ID
    affiliate_id: 123,                 // int - Affiliate ID
    payout_id: 456,                    // int - Payout ID
    total_amount: 150.00,              // float - Transaction amount
    payout_method: "paypal",           // string - Payment method
    status: "paid",                    // string - paid|processing|failed|cancelled
    currency: "USD",                   // string - Currency code
    settings: {                        // array - Payment settings
        paypal_email: "user@email.com", // string - PayPal email
        // ... other method-specific settings
    },
    created_by: 1,                     // int - Admin user ID who created
    created_at: "2024-01-15 10:30:00", // string - Creation date
    updated_at: "2024-01-15 10:30:00"  // string - Last update
}
```

**Payout Object Data:**
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

**Common Status Hooks:**
```php
// When transaction is marked as paid
add_action('fluent_affiliate/payout/transaction/transaction_updated_to_paid', function($transaction, $payout) {
    // Transaction status is now "paid"
    $transaction_id = $transaction->id;
    $affiliate_id = $transaction->affiliate_id;
    $amount = $transaction->total_amount;
    $method = $transaction->payout_method;
}, 10, 2);

// When transaction is marked as failed
add_action('fluent_affiliate/payout/transaction/transaction_updated_to_failed', function($transaction, $payout) {
    // Transaction status is now "failed"
    $transaction_id = $transaction->id;
    $affiliate_id = $transaction->affiliate_id;
}, 10, 2);

// When transaction is processing
add_action('fluent_affiliate/payout/transaction/transaction_updated_to_processing', function($transaction, $payout) {
    // Transaction status is now "processing"
    $transaction_id = $transaction->id;
    $affiliate_id = $transaction->affiliate_id;
}, 10, 2);
```

## Transaction Deletion Hooks

### fluent_affiliate/payout/transaction/deleting

**Parameters:** 2
- `$transaction` (Object) - The transaction object to be deleted
- `$payout` (Object) - The payout object

**Transaction Object Data:**
Same as `fluent_affiliate/payout/transaction/transaction_updated_to_{status}` above.

**Payout Object Data:**
Same as `fluent_affiliate/payout/transaction/transaction_updated_to_{status}` above.

**Usage:**
```php
add_action('fluent_affiliate/payout/transaction/deleting', function($transaction, $payout) {
    // Access transaction data before deletion
    $transaction_id = $transaction->id;
    $affiliate_id = $transaction->affiliate_id;
    $amount = $transaction->total_amount;
    $payout_id = $payout->id;
    
    // Perform cleanup or archiving
}, 10, 2);
```

---

### fluent_affiliate/payout/transaction/deleted

**Parameters:** 2
- `$transactionId` (Int) - The deleted transaction ID
- `$payout` (Object) - The payout object

**Data:**
```php
$transactionId = 789  // int - The transaction ID that was deleted
```

**Payout Object Data:**
Same as `fluent_affiliate/payout/transaction/transaction_updated_to_{status}` above.

**Usage:**
```php
add_action('fluent_affiliate/payout/transaction/deleted', function($transactionId, $payout) {
    // Only have transaction ID, transaction object is deleted
    $deleted_transaction_id = $transactionId;
    
    // Access payout data
    $payout_id = $payout->id;
    $payout_total = $payout->total_amount;
    
    // Perform final cleanup
}, 10, 2);
```
