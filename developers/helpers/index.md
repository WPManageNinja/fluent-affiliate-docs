# Helper Classes

FluentAffiliate Core Intermediate

FluentAffiliate provides a comprehensive set of helper classes that encapsulate common functionality and provide object-oriented interfaces for complex operations. These classes offer more advanced functionality than global functions and are designed for developers who prefer structured, reusable code.

## Overview

Helper classes in FluentAffiliate follow object-oriented design patterns and provide clean, testable interfaces for common operations. They handle complex business logic, data validation, and integration patterns while maintaining consistency across the plugin.

### 🏗️ **Class Architecture**

All helper classes follow these conventions:
- **Namespace**: `FluentAffiliate\App\Services\`
- **Design Pattern**: Service classes with dependency injection
- **Error Handling**: Consistent exception handling and validation
- **Testability**: Designed for unit testing and mocking

### 📦 **Helper Categories**

| Category | Purpose | Classes |
|----------|---------|---------|
| **Affiliate Services** | Affiliate management operations | `AffiliateService`, `RegistrationService` |
| **Referral Services** | Referral tracking and processing | `ReferralService`, `TrackingService` |
| **Commission Services** | Commission calculations | `CommissionCalculator`, `PayoutService` |
| **Integration Services** | Third-party integrations | `IntegrationManager`, `WebhookService` |
| **Utility Services** | Common utilities and helpers | `CurrencyHelper`, `UrlHelper`, `ValidationHelper` |

## Affiliate Services

### 👥 **AffiliateService**

**Class**: `FluentAffiliate\App\Services\AffiliateService`

Handles comprehensive affiliate management operations with validation and business logic.

```php
use FluentAffiliate\App\Services\AffiliateService;

$affiliateService = new AffiliateService();

// Create affiliate with validation
$affiliate = $affiliateService->create([
    'user_id' => 123,
    'email' => 'affiliate@example.com',
    'first_name' => 'John',
    'last_name' => 'Doe'
]);

// Update affiliate status with hooks
$affiliateService->updateStatus($affiliateId, 'active');

// Get affiliate with related data
$affiliate = $affiliateService->getWithRelations($affiliateId, [
    'referrals', 'transactions', 'groups'
]);
```

**Key Methods:**
- `create($data)` - Create affiliate with validation
- `update($id, $data)` - Update affiliate data
- `updateStatus($id, $status)` - Change affiliate status
- `getWithRelations($id, $relations)` - Get affiliate with related data
- `calculateEarnings($id)` - Calculate total earnings
- `getPerformanceMetrics($id)` - Get performance statistics

### 👥 **RegistrationService**

**Class**: `FluentAffiliate\App\Services\RegistrationService`

Manages affiliate registration process with approval workflows.

```php
use FluentAffiliate\App\Services\RegistrationService;

$registrationService = new RegistrationService();

// Process registration with auto-approval check
$result = $registrationService->processRegistration([
    'user_id' => 123,
    'terms_accepted' => true,
    'referral_source' => 'website'
]);

// Handle approval workflow
if ($result['requires_approval']) {
    $registrationService->sendApprovalNotification($result['affiliate']);
} else {
    $registrationService->sendWelcomeEmail($result['affiliate']);
}
```

**Key Methods:**
- `processRegistration($data)` - Handle complete registration flow
- `validateRegistration($data)` - Validate registration data
- `checkAutoApproval($data)` - Determine if auto-approval applies
- `sendApprovalNotification($affiliate)` - Send approval request
- `sendWelcomeEmail($affiliate)` - Send welcome email

## Referral Services

### 📈 **ReferralService**

**Class**: `FluentAffiliate\App\Services\ReferralService`

Comprehensive referral management with commission calculation and status handling.

```php
use FluentAffiliate\App\Services\ReferralService;

$referralService = new ReferralService();

// Create referral with automatic commission calculation
$referral = $referralService->createReferral([
    'affiliate_id' => 123,
    'order_id' => 'WC-12345',
    'order_total' => 100.00,
    'customer_email' => 'customer@example.com',
    'origin' => 'woocommerce'
]);

// Process referral approval
$referralService->approveReferral($referralId, [
    'approved_by' => get_current_user_id(),
    'notes' => 'Approved after verification'
]);

// Bulk operations
$referralService->bulkApprove($referralIds);
$referralService->bulkReject($referralIds, 'Fraudulent activity');
```

**Key Methods:**
- `createReferral($data)` - Create referral with validation
- `approveReferral($id, $meta)` - Approve referral
- `rejectReferral($id, $reason)` - Reject referral
- `bulkApprove($ids)` - Bulk approve referrals
- `calculateCommission($referral)` - Calculate commission amount
- `getAffiliateReferrals($affiliateId, $filters)` - Get filtered referrals

### 📈 **TrackingService**

**Class**: `FluentAffiliate\App\Services\TrackingService`

Handles URL tracking, click attribution, and conversion tracking.

```php
use FluentAffiliate\App\Services\TrackingService;

$trackingService = new TrackingService();

// Track click with attribution
$trackingService->trackClick([
    'affiliate_id' => 123,
    'url' => 'https://example.com/product',
    'ip_address' => $_SERVER['REMOTE_ADDR'],
    'user_agent' => $_SERVER['HTTP_USER_AGENT'],
    'referrer' => $_SERVER['HTTP_REFERER']
]);

// Track conversion
$trackingService->trackConversion([
    'affiliate_id' => 123,
    'order_id' => 'WC-12345',
    'conversion_value' => 100.00
]);

// Get tracking analytics
$analytics = $trackingService->getAnalytics($affiliateId, [
    'date_from' => '2024-01-01',
    'date_to' => '2024-01-31'
]);
```

**Key Methods:**
- `trackClick($data)` - Record click with attribution
- `trackConversion($data)` - Record conversion event
- `getAnalytics($affiliateId, $filters)` - Get tracking analytics
- `getClickHistory($affiliateId)` - Get click history
- `calculateConversionRate($affiliateId)` - Calculate conversion rates

## Commission Services

### 💰 **CommissionCalculator**

**Class**: `FluentAffiliate\App\Services\CommissionCalculator`

Advanced commission calculation with multi-tier support and custom rules.

```php
use FluentAffiliate\App\Services\CommissionCalculator;

$calculator = new CommissionCalculator();

// Calculate commission with context
$commission = $calculator->calculate([
    'affiliate_id' => 123,
    'order_total' => 100.00,
    'product_ids' => [456, 789],
    'customer_type' => 'new'
]);

// Calculate multi-tier commission
$multiTierCommission = $calculator->calculateMultiTier([
    'referring_affiliate_id' => 123,
    'order_total' => 100.00,
    'tier_levels' => 3
]);

// Get commission breakdown
$breakdown = $calculator->getCommissionBreakdown($affiliateId, $orderData);
```

**Key Methods:**
- `calculate($context)` - Calculate commission with full context
- `calculateMultiTier($data)` - Multi-tier commission calculation
- `getCommissionBreakdown($affiliateId, $orderData)` - Detailed breakdown
- `getEffectiveRate($affiliateId, $context)` - Get effective commission rate
- `validateCommissionRules($data)` - Validate commission rules

### 💰 **PayoutService**

**Class**: `FluentAffiliate\App\Services\PayoutService`

Manages payout processing, batch payments, and payment method integration.

```php
use FluentAffiliate\App\Services\PayoutService;

$payoutService = new PayoutService();

// Process individual payout
$payout = $payoutService->processPayout([
    'affiliate_id' => 123,
    'amount' => 150.00,
    'method' => 'paypal',
    'reference' => 'PP-12345'
]);

// Process batch payouts
$batchResult = $payoutService->processBatchPayouts([
    ['affiliate_id' => 123, 'amount' => 150.00],
    ['affiliate_id' => 456, 'amount' => 200.00]
], 'paypal');

// Generate payout report
$report = $payoutService->generatePayoutReport([
    'date_from' => '2024-01-01',
    'date_to' => '2024-01-31',
    'status' => 'paid'
]);
```

**Key Methods:**
- `processPayout($data)` - Process individual payout
- `processBatchPayouts($payouts, $method)` - Batch payout processing
- `generatePayoutReport($filters)` - Generate payout reports
- `validatePayoutData($data)` - Validate payout information
- `getPayoutMethods()` - Get available payment methods

## Integration Services

### 🔌 **IntegrationManager**

**Class**: `FluentAffiliate\App\Services\IntegrationManager`

Manages third-party integrations and provides standardized integration patterns.

```php
use FluentAffiliate\App\Services\IntegrationManager;

$integrationManager = new IntegrationManager();

// Register custom integration
$integrationManager->register('custom_crm', [
    'name' => 'Custom CRM',
    'handler' => CustomCrmIntegration::class,
    'settings' => ['api_key', 'endpoint']
]);

// Process integration event
$integrationManager->processEvent('referral_created', [
    'referral' => $referral,
    'affiliate' => $affiliate
]);

// Get integration status
$status = $integrationManager->getIntegrationStatus('woocommerce');
```

**Key Methods:**
- `register($key, $config)` - Register integration
- `processEvent($event, $data)` - Process integration events
- `getIntegrationStatus($integration)` - Get integration status
- `syncData($integration, $data)` - Sync data with integration
- `validateIntegration($integration)` - Validate integration setup

### 🔌 **WebhookService**

**Class**: `FluentAffiliate\App\Services\WebhookService`

Handles webhook delivery, retry logic, and webhook management.

```php
use FluentAffiliate\App\Services\WebhookService;

$webhookService = new WebhookService();

// Send webhook
$webhookService->send('referral.created', [
    'referral_id' => 123,
    'affiliate_id' => 456,
    'commission_amount' => 10.00
], 'https://example.com/webhook');

// Register webhook endpoint
$webhookService->registerEndpoint([
    'url' => 'https://example.com/webhook',
    'events' => ['referral.created', 'affiliate.approved'],
    'secret' => 'webhook_secret_key'
]);

// Get webhook logs
$logs = $webhookService->getLogs(['status' => 'failed']);
```

**Key Methods:**
- `send($event, $data, $url)` - Send webhook
- `registerEndpoint($config)` - Register webhook endpoint
- `getLogs($filters)` - Get webhook delivery logs
- `retryFailedWebhooks()` - Retry failed deliveries
- `validateWebhookSignature($payload, $signature)` - Validate signatures

## Utility Services

### 🛠️ **CurrencyHelper**

**Class**: `FluentAffiliate\App\Services\CurrencyHelper`

Handles currency formatting, conversion, and localization.

```php
use FluentAffiliate\App\Services\CurrencyHelper;

$currencyHelper = new CurrencyHelper();

// Format currency
$formatted = $currencyHelper->format(123.45, 'USD');
// Returns: "$123.45"

// Convert currency
$converted = $currencyHelper->convert(100.00, 'USD', 'EUR');

// Get currency symbol
$symbol = $currencyHelper->getSymbol('EUR');
// Returns: "€"
```

### 🛠️ **UrlHelper**

**Class**: `FluentAffiliate\App\Services\UrlHelper`

Manages URL generation, validation, and affiliate link creation.

```php
use FluentAffiliate\App\Services\UrlHelper;

$urlHelper = new UrlHelper();

// Generate affiliate URL
$affiliateUrl = $urlHelper->generateAffiliateUrl([
    'affiliate_id' => 123,
    'target_url' => 'https://example.com/product',
    'campaign' => 'email'
]);

// Validate URL
$isValid = $urlHelper->validateUrl('https://example.com');

// Parse affiliate URL
$parsed = $urlHelper->parseAffiliateUrl($url);
```

### 🛠️ **ValidationHelper**

**Class**: `FluentAffiliate\App\Services\ValidationHelper`

Provides comprehensive validation for affiliate data and operations.

```php
use FluentAffiliate\App\Services\ValidationHelper;

$validator = new ValidationHelper();

// Validate affiliate data
$isValid = $validator->validateAffiliateData([
    'email' => 'affiliate@example.com',
    'commission_rate' => 10.00
]);

// Validate referral data
$isValid = $validator->validateReferralData([
    'affiliate_id' => 123,
    'order_total' => 100.00
]);

// Get validation errors
$errors = $validator->getErrors();
```

## Usage Patterns

### 🎯 **Dependency Injection**

Helper classes support dependency injection for better testability:

```php
// Manual instantiation
$affiliateService = new AffiliateService();

// With dependency injection (in advanced setups)
$affiliateService = app(AffiliateService::class);
```

### 🎯 **Error Handling**

All helper classes use consistent error handling:

```php
try {
    $affiliate = $affiliateService->create($data);
} catch (ValidationException $e) {
    // Handle validation errors
    $errors = $e->getErrors();
} catch (Exception $e) {
    // Handle general errors
    error_log($e->getMessage());
}
```

## Next Steps

Now that you understand helper classes:

1. **[Hooks Documentation](/developers/hooks/)** - Action and filter hooks
2. **[API Reference](/developers/api/)** - REST API endpoints
3. **[Code Examples](/developers/examples/)** - Real-world implementation examples

---

*Helper classes provide the building blocks for sophisticated FluentAffiliate extensions. Use them to build maintainable, testable code.*
