# Database Models

FluentAffiliate Core Intermediate

FluentAffiliate uses Eloquent ORM models to interact with the database. This guide covers all core models, their relationships, and common usage patterns.

## Overview

FluentAffiliate's models extend Laravel's Eloquent ORM, providing a powerful and intuitive way to work with affiliate data. Each model corresponds to a database table and includes relationships, scopes, and helper methods.

### 🏗️ **Model Architecture**

All FluentAffiliate models follow these conventions:
- **Namespace**: `FluentAffiliate\App\Models\`
- **Base Class**: Extends `FluentAffiliate\Framework\Database\Orm\Model`
- **Table Naming**: Snake case with `fa_` prefix
- **Timestamps**: Automatic `created_at` and `updated_at` handling

## Core Models

### 👥 **Affiliate Model**

**Class**: `FluentAffiliate\App\Models\Affiliate`  
**Table**: `fa_affiliates`

The central model representing affiliate users and their settings.

```php
use FluentAffiliate\App\Models\Affiliate;

// Create new affiliate
$affiliate = Affiliate::create([
    'user_id' => 123,
    'email' => 'affiliate@example.com',
    'first_name' => 'John',
    'last_name' => 'Doe',
    'status' => 'pending'
]);

// Find affiliate by user ID
$affiliate = Affiliate::where('user_id', 123)->first();

// Get affiliate by email
$affiliate = Affiliate::where('email', 'affiliate@example.com')->first();
```

**Key Properties:**
- `id` - Primary key
- `user_id` - WordPress user ID
- `email` - Affiliate email address
- `status` - pending, active, inactive, suspended
- `commission_rate` - Individual commission rate
- `earnings` - Total lifetime earnings

**Relationships:**
```php
// Get all referrals
$referrals = $affiliate->referrals;

// Get all transactions
$transactions = $affiliate->transactions;

// Get URL metrics
$metrics = $affiliate->urlMetrics;

// Get WordPress user
$user = $affiliate->user;
```

**Scopes:**
```php
// Active affiliates only
$activeAffiliates = Affiliate::active()->get();

// Pending approval
$pendingAffiliates = Affiliate::pending()->get();

// By status
$affiliates = Affiliate::byStatus('active')->get();
```

### 📈 **Referral Model**

**Class**: `FluentAffiliate\App\Models\Referral`  
**Table**: `fa_referrals`

Tracks referral events and commission calculations.

```php
use FluentAffiliate\App\Models\Referral;

// Create new referral
$referral = Referral::create([
    'affiliate_id' => 1,
    'order_id' => 'WC-12345',
    'order_total' => 100.00,
    'commission_amount' => 10.00,
    'commission_rate' => 10.00,
    'commission_type' => 'percentage',
    'status' => 'pending',
    'type' => 'sale',
    'origin' => 'woocommerce'
]);

// Find referrals by affiliate
$referrals = Referral::where('affiliate_id', 1)->get();

// Get approved referrals
$approved = Referral::approved()->get();
```

**Key Properties:**
- `affiliate_id` - Links to affiliate
- `order_id` - External order reference
- `commission_amount` - Calculated commission
- `status` - pending, approved, rejected, paid
- `type` - sale, lead, click, custom
- `origin` - Integration source

**Relationships:**
```php
// Get affiliate
$affiliate = $referral->affiliate;

// Get associated transaction
$transaction = $referral->transaction;
```

**Scopes:**
```php
// Approved referrals
$approved = Referral::approved()->get();

// Pending referrals
$pending = Referral::pending()->get();

// By type
$sales = Referral::byType('sale')->get();

// By origin
$wooReferrals = Referral::byOrigin('woocommerce')->get();
```

### 💰 **Transaction Model**

**Class**: `FluentAffiliate\App\Models\Transaction`  
**Table**: `fa_transactions`

Handles financial transactions and payout records.

```php
use FluentAffiliate\App\Models\Transaction;

// Create payout transaction
$transaction = Transaction::create([
    'affiliate_id' => 1,
    'amount' => 150.00,
    'currency' => 'USD',
    'type' => 'payout',
    'status' => 'pending',
    'method' => 'paypal',
    'reference' => 'PP-12345'
]);

// Find transactions by affiliate
$transactions = Transaction::where('affiliate_id', 1)->get();

// Get paid transactions
$paid = Transaction::paid()->get();
```

**Key Properties:**
- `affiliate_id` - Links to affiliate
- `referral_id` - Optional referral link
- `amount` - Transaction amount
- `type` - payout, adjustment, bonus, deduction
- `status` - pending, processing, paid, failed
- `method` - Payment method

**Relationships:**
```php
// Get affiliate
$affiliate = $transaction->affiliate;

// Get related referral (if any)
$referral = $transaction->referral;
```

**Scopes:**
```php
// Paid transactions
$paid = Transaction::paid()->get();

// Pending transactions
$pending = Transaction::pending()->get();

// By type
$payouts = Transaction::byType('payout')->get();

// By method
$paypalTxns = Transaction::byMethod('paypal')->get();
```

### 👥 **Group Model**

**Class**: `FluentAffiliate\App\Models\Group`  
**Table**: `fa_groups`

Organizes affiliates into groups with different commission structures.

```php
use FluentAffiliate\App\Models\Group;

// Create new group
$group = Group::create([
    'title' => 'Premium Affiliates',
    'slug' => 'premium-affiliates',
    'commission_rate' => 15.00,
    'commission_type' => 'percentage'
]);

// Find group by slug
$group = Group::where('slug', 'premium-affiliates')->first();
```

**Relationships:**
```php
// Get all affiliates in group
$affiliates = $group->affiliates;

// Add affiliate to group
$group->affiliates()->attach($affiliateId);

// Remove affiliate from group
$group->affiliates()->detach($affiliateId);
```

### 📊 **UrlMetric Model**

**Class**: `FluentAffiliate\App\Models\UrlMetric`  
**Table**: `fa_url_metrics`

Tracks URL performance and click analytics.

```php
use FluentAffiliate\App\Models\UrlMetric;

// Create or update URL metric
$metric = UrlMetric::updateOrCreate([
    'affiliate_id' => 1,
    'url' => 'https://example.com/product'
], [
    'clicks' => 1,
    'last_clicked' => now()
]);

// Get metrics for affiliate
$metrics = UrlMetric::where('affiliate_id', 1)->get();
```

## Model Relationships

### 🔗 **Relationship Methods**

**Affiliate Relationships:**
```php
// One-to-Many
$affiliate->referrals()      // HasMany
$affiliate->transactions()   // HasMany
$affiliate->urlMetrics()     // HasMany

// Many-to-Many
$affiliate->groups()         // BelongsToMany

// One-to-One
$affiliate->user()           // BelongsTo (WordPress user)
```

**Referral Relationships:**
```php
$referral->affiliate()       // BelongsTo
$referral->transaction()     // HasOne
```

**Transaction Relationships:**
```php
$transaction->affiliate()    // BelongsTo
$transaction->referral()     // BelongsTo
```

## Common Usage Patterns

### 📋 **Querying Examples**

**Get affiliate with related data:**
```php
$affiliate = Affiliate::with(['referrals', 'transactions'])
    ->where('id', 1)
    ->first();
```

**Calculate affiliate earnings:**
```php
$totalEarnings = Referral::where('affiliate_id', 1)
    ->where('status', 'approved')
    ->sum('commission_amount');
```

**Get top performing affiliates:**
```php
$topAffiliates = Affiliate::withCount('referrals')
    ->orderBy('referrals_count', 'desc')
    ->limit(10)
    ->get();
```

**Monthly referral report:**
```php
$monthlyReferrals = Referral::whereMonth('created_at', now()->month)
    ->whereYear('created_at', now()->year)
    ->with('affiliate')
    ->get();
```

### 🛠️ **Helper Methods**

**Affiliate Model:**
```php
// Check if affiliate is active
$isActive = $affiliate->isActive();

// Get commission rate (individual or group)
$rate = $affiliate->getCommissionRate();

// Calculate unpaid earnings
$unpaid = $affiliate->getUnpaidEarnings();
```

**Referral Model:**
```php
// Check if referral is approved
$isApproved = $referral->isApproved();

// Mark as paid
$referral->markAsPaid();

// Calculate commission
$commission = $referral->calculateCommission($orderTotal);
```

## Model Events

### 🎯 **Eloquent Events**

FluentAffiliate models fire standard Eloquent events that you can hook into:

```php
// Listen for affiliate creation
Affiliate::created(function ($affiliate) {
    // Send welcome email
    // Create default settings
});

// Listen for referral updates
Referral::updated(function ($referral) {
    // Update affiliate earnings
    // Trigger notifications
});

// Listen for transaction creation
Transaction::created(function ($transaction) {
    // Process payment
    // Update affiliate balance
});
```

## Next Steps

Now that you understand the models:

1. **[Global Functions](/developers/global-functions/)** - Helper functions for model operations
2. **[Hooks Documentation](/developers/hooks/)** - Model-related action and filter hooks
3. **[API Reference](/developers/api/)** - REST API endpoints for models

---

*Master these models to build powerful FluentAffiliate extensions with clean, maintainable code.*
