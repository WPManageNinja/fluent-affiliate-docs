# Code Examples

FluentAffiliate Core Beginner

Real-world implementation examples, integration patterns, and best practices for FluentAffiliate development. These examples demonstrate common use cases and provide starting points for your custom implementations.

## Overview

This collection covers practical implementations that developers commonly need when extending FluentAffiliate. Each example includes complete, working code with explanations and best practices.

### 📚 **Example Categories**

| Category | Description | Complexity |
|----------|-------------|------------|
| **[Integration Examples](/developers/examples/integrations/)** | Third-party service integrations | Intermediate |
| **[Portal Customization](/developers/examples/portal/)** | Affiliate dashboard modifications | Beginner |
| **[Workflow Examples](/developers/examples/workflows/)** | Custom affiliate workflows | Advanced |
| **API Implementations** | REST API usage patterns | Intermediate |
| **Hook Implementations** | Action and filter hook examples | Beginner |

## Quick Start Examples

### 🚀 **Basic Affiliate Registration**

Create a custom affiliate registration form with validation:

```php
<?php
/**
 * Custom Affiliate Registration Handler
 */
class CustomAffiliateRegistration {
    
    public function __construct() {
        add_action('wp_ajax_register_affiliate', [$this, 'handleRegistration']);
        add_action('wp_ajax_nopriv_register_affiliate', [$this, 'handleRegistration']);
    }
    
    public function handleRegistration() {
        // Verify nonce
        if (!wp_verify_nonce($_POST['nonce'], 'affiliate_registration')) {
            wp_die('Security check failed');
        }
        
        // Validate input
        $email = sanitize_email($_POST['email']);
        $first_name = sanitize_text_field($_POST['first_name']);
        $last_name = sanitize_text_field($_POST['last_name']);
        
        if (!is_email($email)) {
            wp_send_json_error('Invalid email address');
        }
        
        // Check if user exists
        $user = get_user_by('email', $email);
        if (!$user) {
            // Create WordPress user
            $user_id = wp_create_user($email, wp_generate_password(), $email);
            if (is_wp_error($user_id)) {
                wp_send_json_error($user_id->get_error_message());
            }
        } else {
            $user_id = $user->ID;
        }
        
        // Create affiliate
        $affiliate = fa_create_affiliate([
            'user_id' => $user_id,
            'email' => $email,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'status' => 'pending'
        ]);
        
        if (is_wp_error($affiliate)) {
            wp_send_json_error($affiliate->get_error_message());
        }
        
        // Send welcome email
        $this->sendWelcomeEmail($affiliate);
        
        wp_send_json_success([
            'message' => 'Registration successful! Please check your email.',
            'affiliate_id' => $affiliate->id
        ]);
    }
    
    private function sendWelcomeEmail($affiliate) {
        $subject = 'Welcome to Our Affiliate Program!';
        $message = "Hi {$affiliate->first_name},\n\n";
        $message .= "Thank you for joining our affiliate program!\n";
        $message .= "Your application is being reviewed and you'll hear from us soon.\n\n";
        $message .= "Best regards,\nThe Team";
        
        wp_mail($affiliate->email, $subject, $message);
    }
}

new CustomAffiliateRegistration();
```

### 🚀 **Automatic Referral Tracking**

Track referrals automatically when orders are completed:

```php
<?php
/**
 * WooCommerce Referral Tracking
 */
class WooCommerceReferralTracker {
    
    public function __construct() {
        add_action('woocommerce_order_status_completed', [$this, 'trackReferral']);
        add_action('woocommerce_checkout_order_processed', [$this, 'storeAffiliateData']);
    }
    
    public function storeAffiliateData($order_id) {
        // Check for affiliate tracking
        if (isset($_COOKIE['fa_ref'])) {
            $affiliate_id = intval($_COOKIE['fa_ref']);
            update_post_meta($order_id, '_affiliate_id', $affiliate_id);
        }
    }
    
    public function trackReferral($order_id) {
        $affiliate_id = get_post_meta($order_id, '_affiliate_id', true);
        
        if (!$affiliate_id) {
            return; // No affiliate tracking
        }
        
        $order = wc_get_order($order_id);
        if (!$order) {
            return;
        }
        
        // Create referral
        $referral = fa_create_referral([
            'affiliate_id' => $affiliate_id,
            'order_id' => $order->get_order_number(),
            'order_total' => $order->get_total(),
            'customer_email' => $order->get_billing_email(),
            'type' => 'sale',
            'origin' => 'woocommerce',
            'status' => 'pending'
        ]);
        
        if (!is_wp_error($referral)) {
            // Log successful tracking
            error_log("Referral tracked: Order #{$order_id}, Affiliate #{$affiliate_id}");
            
            // Trigger custom action
            do_action('custom_referral_tracked', $referral, $order);
        }
    }
}

new WooCommerceReferralTracker();
```

### 🚀 **Custom Commission Calculator**

Implement custom commission rules based on product categories:

```php
<?php
/**
 * Custom Commission Calculator
 */
class CustomCommissionCalculator {
    
    public function __construct() {
        add_filter('fluent_affiliate/calculate_commission', [$this, 'calculateCustomCommission'], 10, 3);
    }
    
    public function calculateCustomCommission($commission, $affiliate_id, $context) {
        // Get product categories from context
        $product_ids = $context['product_ids'] ?? [];
        $order_total = $context['order_total'] ?? 0;
        
        if (empty($product_ids)) {
            return $commission; // Use default calculation
        }
        
        $total_commission = 0;
        
        foreach ($product_ids as $product_id) {
            $product = wc_get_product($product_id);
            if (!$product) continue;
            
            $product_total = $product->get_price();
            $commission_rate = $this->getProductCommissionRate($product);
            
            $product_commission = ($product_total * $commission_rate) / 100;
            $total_commission += $product_commission;
        }
        
        return $total_commission;
    }
    
    private function getProductCommissionRate($product) {
        $categories = wp_get_post_terms($product->get_id(), 'product_cat');
        
        // Define commission rates by category
        $category_rates = [
            'electronics' => 5.0,
            'clothing' => 15.0,
            'books' => 8.0,
            'software' => 25.0
        ];
        
        foreach ($categories as $category) {
            if (isset($category_rates[$category->slug])) {
                return $category_rates[$category->slug];
            }
        }
        
        return 10.0; // Default rate
    }
}

new CustomCommissionCalculator();
```

### 🚀 **Affiliate Dashboard Widget**

Add a custom widget to the affiliate dashboard:

```php
<?php
/**
 * Custom Affiliate Dashboard Widget
 */
class CustomDashboardWidget {
    
    public function __construct() {
        add_filter('fluent_affiliate/affiliate_widgets', [$this, 'addCustomWidget']);
        add_action('wp_ajax_get_affiliate_goals', [$this, 'getAffiliateGoals']);
    }
    
    public function addCustomWidget($widgets) {
        $widgets['monthly_goals'] = [
            'title' => 'Monthly Goals',
            'component' => 'MonthlyGoalsWidget',
            'position' => 'top',
            'width' => 'half'
        ];
        
        return $widgets;
    }
    
    public function getAffiliateGoals() {
        $affiliate_id = intval($_GET['affiliate_id']);
        
        if (!$affiliate_id) {
            wp_send_json_error('Invalid affiliate ID');
        }
        
        // Get current month data
        $current_month = date('Y-m');
        $goals = $this->getMonthlyGoals($affiliate_id, $current_month);
        $progress = $this->getMonthlyProgress($affiliate_id, $current_month);
        
        wp_send_json_success([
            'goals' => $goals,
            'progress' => $progress,
            'percentage' => $goals['referrals'] > 0 ? 
                round(($progress['referrals'] / $goals['referrals']) * 100) : 0
        ]);
    }
    
    private function getMonthlyGoals($affiliate_id, $month) {
        return get_user_meta($affiliate_id, "goals_{$month}", true) ?: [
            'referrals' => 10,
            'earnings' => 500.00
        ];
    }
    
    private function getMonthlyProgress($affiliate_id, $month) {
        $start_date = $month . '-01';
        $end_date = date('Y-m-t', strtotime($start_date));
        
        $referrals = fa_get_referrals([
            'affiliate_id' => $affiliate_id,
            'date_from' => $start_date,
            'date_to' => $end_date,
            'status' => 'approved'
        ]);
        
        $earnings = array_sum(array_column($referrals, 'commission_amount'));
        
        return [
            'referrals' => count($referrals),
            'earnings' => $earnings
        ];
    }
}

new CustomDashboardWidget();
```

## API Integration Examples

### 🌐 **External CRM Sync**

Sync affiliate data with external CRM system:

```php
<?php
/**
 * CRM Integration Example
 */
class CRMIntegration {
    
    private $crm_api_url = 'https://api.yourcrm.com/v1/';
    private $api_key;
    
    public function __construct() {
        $this->api_key = get_option('crm_api_key');
        
        add_action('fluent_affiliate/affiliate_created', [$this, 'syncNewAffiliate']);
        add_action('fluent_affiliate/referral_approved', [$this, 'syncApprovedReferral']);
    }
    
    public function syncNewAffiliate($affiliate) {
        $crm_data = [
            'email' => $affiliate->email,
            'first_name' => $affiliate->first_name,
            'last_name' => $affiliate->last_name,
            'tags' => ['affiliate', 'new'],
            'custom_fields' => [
                'affiliate_id' => $affiliate->id,
                'commission_rate' => $affiliate->commission_rate,
                'status' => $affiliate->status
            ]
        ];
        
        $response = $this->makeApiRequest('contacts', 'POST', $crm_data);
        
        if ($response && isset($response['id'])) {
            // Store CRM contact ID
            update_user_meta($affiliate->user_id, 'crm_contact_id', $response['id']);
        }
    }
    
    public function syncApprovedReferral($referral) {
        $affiliate = fa_get_affiliate($referral->affiliate_id);
        $crm_contact_id = get_user_meta($affiliate->user_id, 'crm_contact_id', true);
        
        if (!$crm_contact_id) {
            return; // No CRM contact found
        }
        
        $activity_data = [
            'contact_id' => $crm_contact_id,
            'type' => 'referral_approved',
            'description' => "Referral approved: Order #{$referral->order_id}",
            'value' => $referral->commission_amount,
            'date' => $referral->updated_at
        ];
        
        $this->makeApiRequest('activities', 'POST', $activity_data);
    }
    
    private function makeApiRequest($endpoint, $method = 'GET', $data = null) {
        $url = $this->crm_api_url . $endpoint;
        
        $args = [
            'method' => $method,
            'headers' => [
                'Authorization' => 'Bearer ' . $this->api_key,
                'Content-Type' => 'application/json'
            ],
            'timeout' => 30
        ];
        
        if ($data && in_array($method, ['POST', 'PUT', 'PATCH'])) {
            $args['body'] = json_encode($data);
        }
        
        $response = wp_remote_request($url, $args);
        
        if (is_wp_error($response)) {
            error_log('CRM API Error: ' . $response->get_error_message());
            return false;
        }
        
        $body = wp_remote_retrieve_body($response);
        return json_decode($body, true);
    }
}

new CRMIntegration();
```

### 🌐 **Webhook Handler**

Handle incoming webhooks from external services:

```php
<?php
/**
 * Webhook Handler Example
 */
class WebhookHandler {
    
    public function __construct() {
        add_action('rest_api_init', [$this, 'registerWebhookEndpoint']);
    }
    
    public function registerWebhookEndpoint() {
        register_rest_route('fluent-affiliate/v1', '/webhook/payment', [
            'methods' => 'POST',
            'callback' => [$this, 'handlePaymentWebhook'],
            'permission_callback' => [$this, 'verifyWebhookSignature']
        ]);
    }
    
    public function verifyWebhookSignature($request) {
        $signature = $request->get_header('X-Webhook-Signature');
        $payload = $request->get_body();
        $secret = get_option('webhook_secret');
        
        $expected_signature = hash_hmac('sha256', $payload, $secret);
        
        return hash_equals($signature, $expected_signature);
    }
    
    public function handlePaymentWebhook($request) {
        $data = $request->get_json_params();
        
        if ($data['event'] === 'payment.completed') {
            $this->processPaymentCompleted($data['payment']);
        }
        
        return new WP_REST_Response(['status' => 'success'], 200);
    }
    
    private function processPaymentCompleted($payment_data) {
        $affiliate_id = $payment_data['metadata']['affiliate_id'] ?? null;
        
        if (!$affiliate_id) {
            return;
        }
        
        // Create transaction record
        $transaction = [
            'affiliate_id' => $affiliate_id,
            'amount' => $payment_data['amount'],
            'currency' => $payment_data['currency'],
            'type' => 'payout',
            'status' => 'paid',
            'method' => $payment_data['method'],
            'reference' => $payment_data['id']
        ];
        
        // Use FluentAffiliate API to create transaction
        $response = wp_remote_post(home_url('/wp-json/fluent-affiliate/v1/transactions'), [
            'headers' => [
                'Content-Type' => 'application/json',
                'X-API-Key' => get_option('fa_internal_api_key')
            ],
            'body' => json_encode($transaction)
        ]);
        
        if (!is_wp_error($response)) {
            error_log("Payout processed for affiliate #{$affiliate_id}: {$payment_data['amount']}");
        }
    }
}

new WebhookHandler();
```

## Testing Examples

### 🧪 **Unit Test Example**

Example unit test for custom functionality:

```php
<?php
/**
 * Unit Test Example
 */
class TestCustomCommissionCalculator extends WP_UnitTestCase {
    
    private $calculator;
    
    public function setUp(): void {
        parent::setUp();
        $this->calculator = new CustomCommissionCalculator();
    }
    
    public function test_electronics_commission_rate() {
        // Create test product in electronics category
        $product_id = $this->factory->post->create([
            'post_type' => 'product',
            'post_status' => 'publish'
        ]);
        
        wp_set_object_terms($product_id, 'electronics', 'product_cat');
        
        $context = [
            'product_ids' => [$product_id],
            'order_total' => 100.00
        ];
        
        $commission = $this->calculator->calculateCustomCommission(0, 1, $context);
        
        // Electronics should have 5% commission
        $this->assertEquals(5.00, $commission);
    }
    
    public function test_default_commission_rate() {
        $product_id = $this->factory->post->create([
            'post_type' => 'product',
            'post_status' => 'publish'
        ]);
        
        // No category assigned - should use default rate
        $context = [
            'product_ids' => [$product_id],
            'order_total' => 100.00
        ];
        
        $commission = $this->calculator->calculateCustomCommission(0, 1, $context);
        
        // Default should be 10%
        $this->assertEquals(10.00, $commission);
    }
}
```

## Performance Examples

### ⚡ **Caching Implementation**

Implement caching for expensive operations:

```php
<?php
/**
 * Performance Optimization Example
 */
class AffiliatePerformanceOptimizer {
    
    public function __construct() {
        add_filter('fluent_affiliate/get_affiliate_stats', [$this, 'getCachedStats'], 10, 2);
        add_action('fluent_affiliate/referral_approved', [$this, 'clearStatsCache']);
    }
    
    public function getCachedStats($stats, $affiliate_id) {
        $cache_key = "fa_stats_{$affiliate_id}";
        $cached_stats = wp_cache_get($cache_key, 'fluent_affiliate');
        
        if ($cached_stats !== false) {
            return $cached_stats;
        }
        
        // Calculate stats if not cached
        $stats = $this->calculateAffiliateStats($affiliate_id);
        
        // Cache for 1 hour
        wp_cache_set($cache_key, $stats, 'fluent_affiliate', HOUR_IN_SECONDS);
        
        return $stats;
    }
    
    public function clearStatsCache($referral) {
        $cache_key = "fa_stats_{$referral->affiliate_id}";
        wp_cache_delete($cache_key, 'fluent_affiliate');
    }
    
    private function calculateAffiliateStats($affiliate_id) {
        // Expensive database operations here
        return [
            'total_referrals' => $this->getTotalReferrals($affiliate_id),
            'total_earnings' => $this->getTotalEarnings($affiliate_id),
            'conversion_rate' => $this->getConversionRate($affiliate_id)
        ];
    }
}

new AffiliatePerformanceOptimizer();
```

## Next Steps

Explore specific implementation areas:

1. **[Integration Examples](/developers/examples/integrations/)** - Third-party service integrations
2. **[Portal Customization](/developers/examples/portal/)** - Affiliate dashboard modifications
3. **[Workflow Examples](/developers/examples/workflows/)** - Custom affiliate workflows

---

*These examples provide practical starting points for common FluentAffiliate customizations. Adapt them to your specific requirements and use cases.*
