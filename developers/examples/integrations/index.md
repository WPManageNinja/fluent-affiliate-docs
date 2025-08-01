# Integration Examples

FluentAffiliate Core Intermediate

Learn how to integrate FluentAffiliate with popular third-party services and platforms. These examples demonstrate real-world integration patterns for CRMs, email marketing platforms, analytics tools, and payment processors.

## Overview

FluentAffiliate's flexible hook system and REST API make it easy to integrate with external services. These examples show complete implementations for common integration scenarios.

### 🔌 **Integration Categories**

| Category | Services | Complexity | Use Cases |
|----------|----------|------------|-----------|
| **CRM Systems** | HubSpot, Salesforce, Pipedrive | Intermediate | Lead management, contact sync |
| **Email Marketing** | Mailchimp, ConvertKit, ActiveCampaign | Beginner | Automated campaigns, segmentation |
| **Analytics** | Google Analytics, Mixpanel, Segment | Intermediate | Event tracking, conversion analysis |
| **Payment Processors** | Stripe, PayPal, Wise | Advanced | Automated payouts, transaction sync |
| **Communication** | Slack, Discord, Telegram | Beginner | Notifications, team updates |

## CRM Integrations

### 🏢 **HubSpot Integration**

Sync affiliate data with HubSpot CRM for comprehensive lead management:

```php
<?php
/**
 * HubSpot CRM Integration
 */
class FluentAffiliateHubSpotIntegration {
    
    private $api_key;
    private $base_url = 'https://api.hubapi.com';
    
    public function __construct() {
        $this->api_key = get_option('hubspot_api_key');
        
        // Hook into FluentAffiliate events
        add_action('fluent_affiliate/affiliate_created', [$this, 'createHubSpotContact']);
        add_action('fluent_affiliate/affiliate_status_to_active', [$this, 'updateContactStatus']);
        add_action('fluent_affiliate/referral_created', [$this, 'trackReferralActivity']);
        add_action('fluent_affiliate/payout_processed', [$this, 'recordPayoutActivity']);
    }
    
    public function createHubSpotContact($affiliate) {
        $contact_data = [
            'properties' => [
                'email' => $affiliate->email,
                'firstname' => $affiliate->first_name,
                'lastname' => $affiliate->last_name,
                'lifecyclestage' => 'affiliate',
                'affiliate_id' => $affiliate->id,
                'affiliate_status' => $affiliate->status,
                'commission_rate' => $affiliate->commission_rate,
                'date_joined' => $affiliate->created_at
            ]
        ];
        
        $response = $this->makeHubSpotRequest('/crm/v3/objects/contacts', 'POST', $contact_data);
        
        if ($response && isset($response['id'])) {
            // Store HubSpot contact ID for future reference
            update_user_meta($affiliate->user_id, 'hubspot_contact_id', $response['id']);
            
            // Add to affiliate list
            $this->addToAffiliateList($response['id']);
        }
    }
    
    public function updateContactStatus($affiliate) {
        $hubspot_id = get_user_meta($affiliate->user_id, 'hubspot_contact_id', true);
        
        if (!$hubspot_id) {
            return;
        }
        
        $update_data = [
            'properties' => [
                'affiliate_status' => 'active',
                'date_activated' => current_time('mysql')
            ]
        ];
        
        $this->makeHubSpotRequest("/crm/v3/objects/contacts/{$hubspot_id}", 'PATCH', $update_data);
    }
    
    public function trackReferralActivity($referral) {
        $affiliate = fa_get_affiliate($referral->affiliate_id);
        $hubspot_id = get_user_meta($affiliate->user_id, 'hubspot_contact_id', true);
        
        if (!$hubspot_id) {
            return;
        }
        
        // Create engagement (activity)
        $engagement_data = [
            'engagement' => [
                'active' => true,
                'type' => 'NOTE',
                'timestamp' => strtotime($referral->created_at) * 1000
            ],
            'associations' => [
                'contactIds' => [$hubspot_id]
            ],
            'metadata' => [
                'body' => "New referral generated: Order #{$referral->order_id} - Commission: " . 
                         fa_format_currency($referral->commission_amount)
            ]
        ];
        
        $this->makeHubSpotRequest('/engagements/v1/engagements', 'POST', $engagement_data);
    }
    
    public function recordPayoutActivity($transaction) {
        $affiliate = fa_get_affiliate($transaction->affiliate_id);
        $hubspot_id = get_user_meta($affiliate->user_id, 'hubspot_contact_id', true);
        
        if (!$hubspot_id) {
            return;
        }
        
        $engagement_data = [
            'engagement' => [
                'active' => true,
                'type' => 'NOTE',
                'timestamp' => strtotime($transaction->created_at) * 1000
            ],
            'associations' => [
                'contactIds' => [$hubspot_id]
            ],
            'metadata' => [
                'body' => "Payout processed: " . fa_format_currency($transaction->amount) . 
                         " via {$transaction->method}"
            ]
        ];
        
        $this->makeHubSpotRequest('/engagements/v1/engagements', 'POST', $engagement_data);
    }
    
    private function addToAffiliateList($contact_id) {
        $list_id = get_option('hubspot_affiliate_list_id');
        
        if (!$list_id) {
            return;
        }
        
        $this->makeHubSpotRequest("/contacts/v1/lists/{$list_id}/add", 'POST', [
            'vids' => [$contact_id]
        ]);
    }
    
    private function makeHubSpotRequest($endpoint, $method = 'GET', $data = null) {
        $url = $this->base_url . $endpoint;
        
        $args = [
            'method' => $method,
            'headers' => [
                'Authorization' => 'Bearer ' . $this->api_key,
                'Content-Type' => 'application/json'
            ],
            'timeout' => 30
        ];
        
        if ($data && in_array($method, ['POST', 'PATCH', 'PUT'])) {
            $args['body'] = json_encode($data);
        }
        
        $response = wp_remote_request($url, $args);
        
        if (is_wp_error($response)) {
            error_log('HubSpot API Error: ' . $response->get_error_message());
            return false;
        }
        
        $status_code = wp_remote_retrieve_response_code($response);
        if ($status_code >= 400) {
            error_log('HubSpot API Error: HTTP ' . $status_code);
            return false;
        }
        
        return json_decode(wp_remote_retrieve_body($response), true);
    }
}

new FluentAffiliateHubSpotIntegration();
```

### 🏢 **Salesforce Integration**

Connect with Salesforce for enterprise-level affiliate management:

```php
<?php
/**
 * Salesforce Integration
 */
class FluentAffiliateSalesforceIntegration {
    
    private $instance_url;
    private $access_token;
    
    public function __construct() {
        $this->instance_url = get_option('salesforce_instance_url');
        $this->access_token = $this->getAccessToken();
        
        add_action('fluent_affiliate/affiliate_created', [$this, 'createSalesforceContact']);
        add_action('fluent_affiliate/referral_approved', [$this, 'createOpportunity']);
    }
    
    public function createSalesforceContact($affiliate) {
        $contact_data = [
            'FirstName' => $affiliate->first_name,
            'LastName' => $affiliate->last_name,
            'Email' => $affiliate->email,
            'Affiliate_ID__c' => $affiliate->id,
            'Commission_Rate__c' => $affiliate->commission_rate,
            'Affiliate_Status__c' => ucfirst($affiliate->status),
            'RecordTypeId' => get_option('salesforce_affiliate_record_type')
        ];
        
        $response = $this->makeSalesforceRequest('/services/data/v52.0/sobjects/Contact', 'POST', $contact_data);
        
        if ($response && isset($response['id'])) {
            update_user_meta($affiliate->user_id, 'salesforce_contact_id', $response['id']);
        }
    }
    
    public function createOpportunity($referral) {
        $affiliate = fa_get_affiliate($referral->affiliate_id);
        $salesforce_id = get_user_meta($affiliate->user_id, 'salesforce_contact_id', true);
        
        if (!$salesforce_id) {
            return;
        }
        
        $opportunity_data = [
            'Name' => "Referral - Order #{$referral->order_id}",
            'ContactId' => $salesforce_id,
            'Amount' => $referral->commission_amount,
            'CloseDate' => date('Y-m-d'),
            'StageName' => 'Closed Won',
            'Order_ID__c' => $referral->order_id,
            'Referral_ID__c' => $referral->id
        ];
        
        $this->makeSalesforceRequest('/services/data/v52.0/sobjects/Opportunity', 'POST', $opportunity_data);
    }
    
    private function getAccessToken() {
        // Implement OAuth2 flow or use stored token
        return get_option('salesforce_access_token');
    }
    
    private function makeSalesforceRequest($endpoint, $method = 'GET', $data = null) {
        $url = $this->instance_url . $endpoint;
        
        $args = [
            'method' => $method,
            'headers' => [
                'Authorization' => 'Bearer ' . $this->access_token,
                'Content-Type' => 'application/json'
            ]
        ];
        
        if ($data) {
            $args['body'] = json_encode($data);
        }
        
        $response = wp_remote_request($url, $args);
        
        if (is_wp_error($response)) {
            error_log('Salesforce API Error: ' . $response->get_error_message());
            return false;
        }
        
        return json_decode(wp_remote_retrieve_body($response), true);
    }
}

new FluentAffiliateSalesforceIntegration();
```

## Email Marketing Integrations

### 📧 **Mailchimp Integration**

Automatically manage affiliate email lists and campaigns:

```php
<?php
/**
 * Mailchimp Integration
 */
class FluentAffiliateMailchimpIntegration {
    
    private $api_key;
    private $server;
    private $list_id;
    
    public function __construct() {
        $this->api_key = get_option('mailchimp_api_key');
        $this->server = substr($this->api_key, strpos($this->api_key, '-') + 1);
        $this->list_id = get_option('mailchimp_affiliate_list_id');
        
        add_action('fluent_affiliate/affiliate_created', [$this, 'addToMailchimp']);
        add_action('fluent_affiliate/affiliate_status_to_active', [$this, 'updateSubscriberStatus']);
        add_action('fluent_affiliate/payout_processed', [$this, 'triggerPayoutCampaign']);
    }
    
    public function addToMailchimp($affiliate) {
        $subscriber_data = [
            'email_address' => $affiliate->email,
            'status' => 'subscribed',
            'merge_fields' => [
                'FNAME' => $affiliate->first_name,
                'LNAME' => $affiliate->last_name,
                'AFFID' => $affiliate->id,
                'COMMRATE' => $affiliate->commission_rate,
                'STATUS' => ucfirst($affiliate->status)
            ],
            'tags' => ['affiliate', 'new-affiliate']
        ];
        
        $response = $this->makeMailchimpRequest(
            "/lists/{$this->list_id}/members",
            'POST',
            $subscriber_data
        );
        
        if ($response && isset($response['id'])) {
            update_user_meta($affiliate->user_id, 'mailchimp_subscriber_id', $response['id']);
        }
    }
    
    public function updateSubscriberStatus($affiliate) {
        $subscriber_id = get_user_meta($affiliate->user_id, 'mailchimp_subscriber_id', true);
        
        if (!$subscriber_id) {
            return;
        }
        
        $update_data = [
            'merge_fields' => [
                'STATUS' => 'Active'
            ],
            'tags' => ['active-affiliate']
        ];
        
        $this->makeMailchimpRequest(
            "/lists/{$this->list_id}/members/{$subscriber_id}",
            'PATCH',
            $update_data
        );
    }
    
    public function triggerPayoutCampaign($transaction) {
        $affiliate = fa_get_affiliate($transaction->affiliate_id);
        
        // Send personalized payout notification
        $campaign_data = [
            'type' => 'regular',
            'recipients' => [
                'list_id' => $this->list_id,
                'segment_opts' => [
                    'match' => 'all',
                    'conditions' => [
                        [
                            'condition_type' => 'TextMerge',
                            'field' => 'AFFID',
                            'op' => 'is',
                            'value' => $affiliate->id
                        ]
                    ]
                ]
            ],
            'settings' => [
                'subject_line' => 'Your payout has been processed!',
                'from_name' => get_bloginfo('name'),
                'reply_to' => get_option('admin_email'),
                'template_id' => get_option('mailchimp_payout_template_id')
            ]
        ];
        
        $campaign = $this->makeMailchimpRequest('/campaigns', 'POST', $campaign_data);
        
        if ($campaign && isset($campaign['id'])) {
            // Send the campaign
            $this->makeMailchimpRequest("/campaigns/{$campaign['id']}/actions/send", 'POST');
        }
    }
    
    private function makeMailchimpRequest($endpoint, $method = 'GET', $data = null) {
        $url = "https://{$this->server}.api.mailchimp.com/3.0{$endpoint}";
        
        $args = [
            'method' => $method,
            'headers' => [
                'Authorization' => 'Basic ' . base64_encode('user:' . $this->api_key),
                'Content-Type' => 'application/json'
            ]
        ];
        
        if ($data) {
            $args['body'] = json_encode($data);
        }
        
        $response = wp_remote_request($url, $args);
        
        if (is_wp_error($response)) {
            error_log('Mailchimp API Error: ' . $response->get_error_message());
            return false;
        }
        
        return json_decode(wp_remote_retrieve_body($response), true);
    }
}

new FluentAffiliateMailchimpIntegration();
```

## Analytics Integrations

### 📊 **Google Analytics Integration**

Track affiliate events in Google Analytics for comprehensive reporting:

```php
<?php
/**
 * Google Analytics Integration
 */
class FluentAffiliateGoogleAnalyticsIntegration {
    
    private $measurement_id;
    private $api_secret;
    
    public function __construct() {
        $this->measurement_id = get_option('ga_measurement_id');
        $this->api_secret = get_option('ga_api_secret');
        
        add_action('fluent_affiliate/affiliate_created', [$this, 'trackAffiliateRegistration']);
        add_action('fluent_affiliate/referral_created', [$this, 'trackReferralEvent']);
        add_action('fluent_affiliate/payout_processed', [$this, 'trackPayoutEvent']);
    }
    
    public function trackAffiliateRegistration($affiliate) {
        $this->sendEvent('affiliate_registration', [
            'affiliate_id' => $affiliate->id,
            'commission_rate' => $affiliate->commission_rate,
            'status' => $affiliate->status
        ]);
    }
    
    public function trackReferralEvent($referral) {
        $this->sendEvent('referral_created', [
            'affiliate_id' => $referral->affiliate_id,
            'order_value' => $referral->order_total,
            'commission_amount' => $referral->commission_amount,
            'referral_type' => $referral->type,
            'origin' => $referral->origin
        ]);
    }
    
    public function trackPayoutEvent($transaction) {
        $this->sendEvent('payout_processed', [
            'affiliate_id' => $transaction->affiliate_id,
            'payout_amount' => $transaction->amount,
            'payment_method' => $transaction->method
        ]);
    }
    
    private function sendEvent($event_name, $parameters = []) {
        if (!$this->measurement_id || !$this->api_secret) {
            return;
        }
        
        $client_id = $this->generateClientId();
        
        $event_data = [
            'client_id' => $client_id,
            'events' => [
                [
                    'name' => $event_name,
                    'params' => $parameters
                ]
            ]
        ];
        
        $url = "https://www.google-analytics.com/mp/collect?measurement_id={$this->measurement_id}&api_secret={$this->api_secret}";
        
        wp_remote_post($url, [
            'headers' => ['Content-Type' => 'application/json'],
            'body' => json_encode($event_data)
        ]);
    }
    
    private function generateClientId() {
        // Generate a unique client ID for server-side tracking
        return wp_generate_uuid4();
    }
}

new FluentAffiliateGoogleAnalyticsIntegration();
```

## Communication Integrations

### 💬 **Slack Integration**

Send real-time notifications to Slack channels:

```php
<?php
/**
 * Slack Integration
 */
class FluentAffiliateSlackIntegration {
    
    private $webhook_url;
    
    public function __construct() {
        $this->webhook_url = get_option('slack_webhook_url');
        
        add_action('fluent_affiliate/affiliate_created', [$this, 'notifyNewAffiliate']);
        add_action('fluent_affiliate/referral_created', [$this, 'notifyNewReferral']);
        add_action('fluent_affiliate/payout_processed', [$this, 'notifyPayoutProcessed']);
    }
    
    public function notifyNewAffiliate($affiliate) {
        $message = [
            'text' => '🎉 New Affiliate Registration!',
            'attachments' => [
                [
                    'color' => 'good',
                    'fields' => [
                        [
                            'title' => 'Name',
                            'value' => $affiliate->first_name . ' ' . $affiliate->last_name,
                            'short' => true
                        ],
                        [
                            'title' => 'Email',
                            'value' => $affiliate->email,
                            'short' => true
                        ],
                        [
                            'title' => 'Status',
                            'value' => ucfirst($affiliate->status),
                            'short' => true
                        ],
                        [
                            'title' => 'Commission Rate',
                            'value' => $affiliate->commission_rate . '%',
                            'short' => true
                        ]
                    ]
                ]
            ]
        ];
        
        $this->sendSlackMessage($message);
    }
    
    public function notifyNewReferral($referral) {
        $affiliate = fa_get_affiliate($referral->affiliate_id);
        
        $message = [
            'text' => '💰 New Referral Generated!',
            'attachments' => [
                [
                    'color' => '#36a64f',
                    'fields' => [
                        [
                            'title' => 'Affiliate',
                            'value' => $affiliate->first_name . ' ' . $affiliate->last_name,
                            'short' => true
                        ],
                        [
                            'title' => 'Order ID',
                            'value' => $referral->order_id,
                            'short' => true
                        ],
                        [
                            'title' => 'Order Total',
                            'value' => fa_format_currency($referral->order_total),
                            'short' => true
                        ],
                        [
                            'title' => 'Commission',
                            'value' => fa_format_currency($referral->commission_amount),
                            'short' => true
                        ]
                    ]
                ]
            ]
        ];
        
        $this->sendSlackMessage($message);
    }
    
    public function notifyPayoutProcessed($transaction) {
        $affiliate = fa_get_affiliate($transaction->affiliate_id);
        
        $message = [
            'text' => '💸 Payout Processed!',
            'attachments' => [
                [
                    'color' => '#ff9900',
                    'fields' => [
                        [
                            'title' => 'Affiliate',
                            'value' => $affiliate->first_name . ' ' . $affiliate->last_name,
                            'short' => true
                        ],
                        [
                            'title' => 'Amount',
                            'value' => fa_format_currency($transaction->amount),
                            'short' => true
                        ],
                        [
                            'title' => 'Method',
                            'value' => ucfirst($transaction->method),
                            'short' => true
                        ],
                        [
                            'title' => 'Reference',
                            'value' => $transaction->reference,
                            'short' => true
                        ]
                    ]
                ]
            ]
        ];
        
        $this->sendSlackMessage($message);
    }
    
    private function sendSlackMessage($message) {
        if (!$this->webhook_url) {
            return;
        }
        
        wp_remote_post($this->webhook_url, [
            'headers' => ['Content-Type' => 'application/json'],
            'body' => json_encode($message)
        ]);
    }
}

new FluentAffiliateSlackIntegration();
```

## Payment Processor Integrations

### 💳 **Stripe Integration**

Automate payouts through Stripe Connect:

```php
<?php
/**
 * Stripe Payout Integration
 */
class FluentAffiliateStripeIntegration {
    
    private $stripe_secret_key;
    
    public function __construct() {
        $this->stripe_secret_key = get_option('stripe_secret_key');
        
        add_action('fluent_affiliate/process_payout', [$this, 'processStripePayout'], 10, 2);
        add_action('rest_api_init', [$this, 'registerWebhookEndpoint']);
    }
    
    public function processStripePayout($affiliate_id, $amount) {
        $affiliate = fa_get_affiliate($affiliate_id);
        $stripe_account_id = get_user_meta($affiliate->user_id, 'stripe_account_id', true);
        
        if (!$stripe_account_id) {
            error_log("No Stripe account for affiliate {$affiliate_id}");
            return false;
        }
        
        $transfer_data = [
            'amount' => $amount * 100, // Convert to cents
            'currency' => 'usd',
            'destination' => $stripe_account_id,
            'description' => "Affiliate payout for {$affiliate->first_name} {$affiliate->last_name}"
        ];
        
        $response = $this->makeStripeRequest('/v1/transfers', 'POST', $transfer_data);
        
        if ($response && isset($response['id'])) {
            // Create transaction record
            fa_create_transaction([
                'affiliate_id' => $affiliate_id,
                'amount' => $amount,
                'type' => 'payout',
                'status' => 'processing',
                'method' => 'stripe',
                'reference' => $response['id']
            ]);
            
            return true;
        }
        
        return false;
    }
    
    public function registerWebhookEndpoint() {
        register_rest_route('fluent-affiliate/v1', '/stripe/webhook', [
            'methods' => 'POST',
            'callback' => [$this, 'handleStripeWebhook'],
            'permission_callback' => [$this, 'verifyStripeSignature']
        ]);
    }
    
    public function handleStripeWebhook($request) {
        $payload = $request->get_body();
        $event = json_decode($payload, true);
        
        if ($event['type'] === 'transfer.paid') {
            $this->handleTransferPaid($event['data']['object']);
        }
        
        return new WP_REST_Response(['received' => true], 200);
    }
    
    private function handleTransferPaid($transfer) {
        // Find transaction by Stripe transfer ID
        $transactions = fa_get_transactions([
            'reference' => $transfer['id'],
            'status' => 'processing'
        ]);
        
        if (!empty($transactions)) {
            $transaction = $transactions[0];
            
            // Update transaction status
            fa_update_transaction($transaction->id, [
                'status' => 'paid'
            ]);
            
            // Update affiliate earnings
            $affiliate = fa_get_affiliate($transaction->affiliate_id);
            fa_update_affiliate($affiliate->id, [
                'paid_earnings' => $affiliate->paid_earnings + $transaction->amount
            ]);
        }
    }
    
    private function makeStripeRequest($endpoint, $method = 'GET', $data = null) {
        $url = 'https://api.stripe.com' . $endpoint;
        
        $args = [
            'method' => $method,
            'headers' => [
                'Authorization' => 'Bearer ' . $this->stripe_secret_key,
                'Content-Type' => 'application/x-www-form-urlencoded'
            ]
        ];
        
        if ($data) {
            $args['body'] = http_build_query($data);
        }
        
        $response = wp_remote_request($url, $args);
        
        if (is_wp_error($response)) {
            error_log('Stripe API Error: ' . $response->get_error_message());
            return false;
        }
        
        return json_decode(wp_remote_retrieve_body($response), true);
    }
    
    public function verifyStripeSignature($request) {
        $signature = $request->get_header('Stripe-Signature');
        $payload = $request->get_body();
        $endpoint_secret = get_option('stripe_webhook_secret');
        
        // Verify webhook signature (simplified)
        return !empty($signature) && !empty($endpoint_secret);
    }
}

new FluentAffiliateStripeIntegration();
```

## Integration Best Practices

### 🛡️ **Security Considerations**

1. **API Key Management**
```php
// ✅ Store API keys securely
define('HUBSPOT_API_KEY', getenv('HUBSPOT_API_KEY'));

// ✅ Use WordPress options with encryption
$encrypted_key = wp_hash($api_key . AUTH_SALT);
update_option('encrypted_api_key', $encrypted_key);
```

2. **Rate Limiting**
```php
// Implement rate limiting for API calls
private function checkRateLimit($service) {
    $last_call = get_transient("api_last_call_{$service}");
    if ($last_call && (time() - $last_call) < 1) {
        sleep(1); // Wait 1 second between calls
    }
    set_transient("api_last_call_{$service}", time(), 60);
}
```

3. **Error Handling**
```php
// Robust error handling with retries
private function makeApiRequestWithRetry($url, $args, $max_retries = 3) {
    for ($i = 0; $i < $max_retries; $i++) {
        $response = wp_remote_request($url, $args);
        
        if (!is_wp_error($response)) {
            return $response;
        }
        
        if ($i < $max_retries - 1) {
            sleep(pow(2, $i)); // Exponential backoff
        }
    }
    
    return $response; // Return last error
}
```

## Next Steps

Explore more integration examples:

1. **[Portal Customization](/developers/examples/portal/)** - Affiliate dashboard modifications
2. **[Workflow Examples](/developers/examples/workflows/)** - Custom affiliate workflows
3. **[API Documentation](/developers/api/)** - REST API reference

---

*These integration examples provide solid foundations for connecting FluentAffiliate with your favorite tools and services. Adapt them to your specific requirements and API versions.*
