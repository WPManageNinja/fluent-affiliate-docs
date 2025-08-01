# Referral Action Hooks

## Lifecycle Hooks

### fluent_affiliate/referral_created

**Parameters:** 1
- `$referral` (Object) - The referral object

**Referral Object Data:**
```php
$referral = {
    id: 456,                           // int - Referral ID
    affiliate_id: 123,                 // int - Affiliate ID
    customer_id: 789,                  // int - Customer ID
    provider: "woocommerce",           // string - Integration provider
    provider_id: "order_123",          // string - Provider transaction ID
    amount: 25.50,                     // float - Commission amount
    currency: "USD",                   // string - Currency code
    status: "paid",                    // string - paid|unpaid|rejected
    type: "sale",                      // string - sale|lead|signup
    description: "Product purchase",    // string - Description
    reference: "REF123",               // string - Reference info
    created_at: "2024-01-15 10:30:00", // string - Creation date
    updated_at: "2024-01-15 10:30:00"  // string - Last update
}
```

**Usage:**
```php
add_action('fluent_affiliate/referral_created', function($referral) {
    // Access referral data
    $referral_id = $referral->id;
    $affiliate_id = $referral->affiliate_id;
    $amount = $referral->amount;
    $currency = $referral->currency;
    $provider = $referral->provider;
}, 10, 1);
```

---

### fluent_affiliate/referral_marked_unpaid

**Parameters:** 1
- `$referral` (Object) - The referral object

**Referral Object Data:**
Same as `fluent_affiliate/referral_created` above.

**Usage:**
```php
add_action('fluent_affiliate/referral_marked_unpaid', function($referral) {
    // Referral status is now "unpaid"
    $status = $referral->status; // "unpaid"
    $amount = $referral->amount;
    $affiliate_id = $referral->affiliate_id;
}, 10, 1);
```

---

### fluent_affiliate/referral_marked_rejected

**Parameters:** 1
- `$referral` (Object) - The referral object

**Referral Object Data:**
Same as `fluent_affiliate/referral_created` above.

**Usage:**
```php
add_action('fluent_affiliate/referral_marked_rejected', function($referral) {
    // Referral status is now "rejected"
    $status = $referral->status; // "rejected"
    $amount = $referral->amount;
    $affiliate_id = $referral->affiliate_id;
}, 10, 1);
```

---

### fluent_affiliate/referral/before_delete

**Parameters:** 1
- `$referral` (Object) - The referral object to be deleted

**Referral Object Data:**
Same as `fluent_affiliate/referral_created` above.

**Usage:**
```php
add_action('fluent_affiliate/referral/before_delete', function($referral) {
    // Access referral data before deletion
    $referral_id = $referral->id;
    $affiliate_id = $referral->affiliate_id;
    $amount = $referral->amount;
}, 10, 1);
```

---

### fluent_affiliate/referral/deleted

**Parameters:** 2
- `$referralId` (Int) - The deleted referral ID
- `$affiliate` (Object) - The affiliate object

**Data:**
```php
$referralId = 456  // int - The referral ID that was deleted
```

**Affiliate Object Data:**
Same as affiliate hooks (see affiliate/index.md).

**Usage:**
```php
add_action('fluent_affiliate/referral/deleted', function($referralId, $affiliate) {
    // Only have referral ID, referral object is deleted
    $deleted_referral_id = $referralId;

    // Access affiliate data
    $affiliate_id = $affiliate->id;
    $affiliate_email = $affiliate->payment_email;
}, 10, 2);
```

## Notification Hooks

### fluent_affiliate/send_new_referral_notification

**Parameters:** 1
- `$referralId` (Int) - The referral ID

**Data:**
```php
$referralId = 456  // int - The referral ID to send notification for
```

**Usage:**
```php
add_action('fluent_affiliate/send_new_referral_notification', function($referralId) {
    // Get referral object (you need to fetch it)
    $referral = \FluentAffiliate\App\Models\Referral::find($referralId);

    if ($referral) {
        $affiliate_id = $referral->affiliate_id;
        $amount = $referral->amount;
        $currency = $referral->currency;
    }
}, 10, 1);
```

**Note:** This is a scheduled hook that fires 5 seconds after a referral is marked as unpaid. You need to fetch the referral object using the provided ID.
