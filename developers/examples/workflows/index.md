# Workflow Examples

FluentAffiliate Core Advanced

Learn how to create custom affiliate workflows, automation sequences, and business logic patterns. These examples demonstrate advanced implementations for affiliate lifecycle management, commission processing, and automated marketing workflows.

## Overview

FluentAffiliate workflows combine hooks, scheduled events, and business logic to create automated processes that enhance affiliate management and improve conversion rates. These examples show how to build sophisticated automation systems.

### 🔄 **Workflow Categories**

| Category | Description | Complexity | Use Cases |
|----------|-------------|------------|-----------|
| **Lifecycle Workflows** | Affiliate onboarding and management | Intermediate | Welcome sequences, training automation |
| **Commission Workflows** | Automated commission processing | Advanced | Multi-tier commissions, bonus calculations |
| **Marketing Workflows** | Automated marketing campaigns | Intermediate | Email sequences, promotional campaigns |
| **Performance Workflows** | Performance-based automation | Advanced | Tier upgrades, performance bonuses |
| **Compliance Workflows** | Automated compliance checking | Advanced | Fraud detection, policy enforcement |

## Lifecycle Workflows

### 🎯 **Affiliate Onboarding Workflow**

Create a comprehensive onboarding sequence for new affiliates:

```php
<?php
/**
 * Affiliate Onboarding Workflow
 */
class AffiliateOnboardingWorkflow {
    
    public function __construct() {
        add_action('fluent_affiliate/affiliate_created', [$this, 'startOnboardingSequence']);
        add_action('fluent_affiliate/affiliate_status_to_active', [$this, 'completeOnboarding']);
        add_action('wp', [$this, 'processScheduledOnboardingTasks']);
    }
    
    public function startOnboardingSequence($affiliate) {
        // Create onboarding record
        $onboarding_data = [
            'affiliate_id' => $affiliate->id,
            'status' => 'started',
            'current_step' => 1,
            'started_at' => current_time('mysql'),
            'steps_completed' => []
        ];
        
        $this->saveOnboardingProgress($affiliate->id, $onboarding_data);
        
        // Schedule immediate welcome email
        wp_schedule_single_event(time() + 300, 'send_welcome_email', [$affiliate->id]); // 5 minutes delay
        
        // Schedule follow-up emails
        wp_schedule_single_event(time() + DAY_IN_SECONDS, 'send_onboarding_day_1', [$affiliate->id]);
        wp_schedule_single_event(time() + (3 * DAY_IN_SECONDS), 'send_onboarding_day_3', [$affiliate->id]);
        wp_schedule_single_event(time() + (7 * DAY_IN_SECONDS), 'send_onboarding_week_1', [$affiliate->id]);
        
        // Create initial tasks
        $this->createOnboardingTasks($affiliate->id);
        
        // Log workflow start
        error_log("Onboarding workflow started for affiliate {$affiliate->id}");
    }
    
    public function completeOnboarding($affiliate) {
        $onboarding_data = $this->getOnboardingProgress($affiliate->id);
        
        if ($onboarding_data && $onboarding_data['status'] !== 'completed') {
            $onboarding_data['status'] = 'completed';
            $onboarding_data['completed_at'] = current_time('mysql');
            
            $this->saveOnboardingProgress($affiliate->id, $onboarding_data);
            
            // Send completion email
            $this->sendOnboardingCompletionEmail($affiliate);
            
            // Award welcome bonus
            $this->awardWelcomeBonus($affiliate->id);
            
            // Clear scheduled emails
            $this->clearScheduledOnboardingEmails($affiliate->id);
        }
    }
    
    public function processScheduledOnboardingTasks() {
        // Process pending onboarding tasks
        $pending_affiliates = $this->getPendingOnboardingAffiliates();
        
        foreach ($pending_affiliates as $affiliate_id) {
            $this->checkOnboardingProgress($affiliate_id);
        }
    }
    
    private function createOnboardingTasks($affiliate_id) {
        $tasks = [
            [
                'title' => 'Complete Profile Information',
                'description' => 'Add your payment details and profile information',
                'type' => 'profile_completion',
                'priority' => 'high',
                'due_date' => date('Y-m-d', strtotime('+3 days'))
            ],
            [
                'title' => 'Watch Getting Started Video',
                'description' => 'Learn the basics of our affiliate program',
                'type' => 'training_video',
                'priority' => 'medium',
                'due_date' => date('Y-m-d', strtotime('+5 days'))
            ],
            [
                'title' => 'Generate Your First Link',
                'description' => 'Create your first affiliate tracking link',
                'type' => 'first_link',
                'priority' => 'high',
                'due_date' => date('Y-m-d', strtotime('+7 days'))
            ],
            [
                'title' => 'Join Our Community',
                'description' => 'Connect with other affiliates in our Facebook group',
                'type' => 'community_join',
                'priority' => 'low',
                'due_date' => date('Y-m-d', strtotime('+14 days'))
            ]
        ];
        
        foreach ($tasks as $task) {
            $this->createOnboardingTask($affiliate_id, $task);
        }
    }
    
    private function checkOnboardingProgress($affiliate_id) {
        $onboarding_data = $this->getOnboardingProgress($affiliate_id);
        $affiliate = fa_get_affiliate($affiliate_id);
        
        if (!$onboarding_data || !$affiliate) {
            return;
        }
        
        // Check for profile completion
        if (!in_array('profile_completion', $onboarding_data['steps_completed'])) {
            if ($this->isProfileComplete($affiliate)) {
                $this->markStepCompleted($affiliate_id, 'profile_completion');
                $this->sendStepCompletionEmail($affiliate, 'Profile Completed');
            }
        }
        
        // Check for first link generation
        if (!in_array('first_link', $onboarding_data['steps_completed'])) {
            if ($this->hasGeneratedFirstLink($affiliate_id)) {
                $this->markStepCompleted($affiliate_id, 'first_link');
                $this->sendStepCompletionEmail($affiliate, 'First Link Generated');
            }
        }
        
        // Check if all critical steps are completed
        $critical_steps = ['profile_completion', 'first_link'];
        $completed_critical = array_intersect($critical_steps, $onboarding_data['steps_completed']);
        
        if (count($completed_critical) === count($critical_steps)) {
            $this->triggerOnboardingCompletion($affiliate_id);
        }
    }
    
    private function sendOnboardingCompletionEmail($affiliate) {
        $subject = 'Welcome to the Team! Your Onboarding is Complete';
        $message = $this->getEmailTemplate('onboarding_completion', [
            'affiliate_name' => $affiliate->first_name,
            'dashboard_url' => $this->getAffiliatePortalUrl(),
            'support_email' => get_option('admin_email')
        ]);
        
        wp_mail($affiliate->email, $subject, $message);
    }
    
    private function awardWelcomeBonus($affiliate_id) {
        $bonus_amount = get_option('affiliate_welcome_bonus', 25.00);
        
        if ($bonus_amount > 0) {
            // Create bonus transaction
            $transaction_data = [
                'affiliate_id' => $affiliate_id,
                'amount' => $bonus_amount,
                'type' => 'bonus',
                'status' => 'approved',
                'description' => 'Welcome bonus for completing onboarding',
                'reference' => 'WELCOME_BONUS_' . time()
            ];
            
            // Use FluentAffiliate API to create transaction
            $response = wp_remote_post(home_url('/wp-json/fluent-affiliate/v1/transactions'), [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'X-API-Key' => get_option('fa_internal_api_key')
                ],
                'body' => json_encode($transaction_data)
            ]);
            
            if (!is_wp_error($response)) {
                error_log("Welcome bonus awarded to affiliate {$affiliate_id}: {$bonus_amount}");
            }
        }
    }
    
    private function saveOnboardingProgress($affiliate_id, $data) {
        update_user_meta($affiliate_id, 'onboarding_progress', $data);
    }
    
    private function getOnboardingProgress($affiliate_id) {
        return get_user_meta($affiliate_id, 'onboarding_progress', true);
    }
    
    private function markStepCompleted($affiliate_id, $step) {
        $onboarding_data = $this->getOnboardingProgress($affiliate_id);
        
        if (!in_array($step, $onboarding_data['steps_completed'])) {
            $onboarding_data['steps_completed'][] = $step;
            $this->saveOnboardingProgress($affiliate_id, $onboarding_data);
        }
    }
    
    private function isProfileComplete($affiliate) {
        return !empty($affiliate->payment_email) && 
               !empty($affiliate->first_name) && 
               !empty($affiliate->last_name);
    }
    
    private function hasGeneratedFirstLink($affiliate_id) {
        $metrics = fa_get_url_metrics(['affiliate_id' => $affiliate_id]);
        return !empty($metrics);
    }
}

new AffiliateOnboardingWorkflow();
```

### 🎯 **Performance-Based Tier Upgrade Workflow**

Automatically upgrade affiliates based on performance metrics:

```php
<?php
/**
 * Performance-Based Tier Upgrade Workflow
 */
class PerformanceTierUpgradeWorkflow {
    
    private $tier_requirements = [
        'bronze' => [
            'min_referrals' => 0,
            'min_earnings' => 0,
            'commission_rate' => 10.0
        ],
        'silver' => [
            'min_referrals' => 10,
            'min_earnings' => 500.0,
            'commission_rate' => 12.0
        ],
        'gold' => [
            'min_referrals' => 25,
            'min_earnings' => 1500.0,
            'commission_rate' => 15.0
        ],
        'platinum' => [
            'min_referrals' => 50,
            'min_earnings' => 5000.0,
            'commission_rate' => 20.0
        ]
    ];
    
    public function __construct() {
        add_action('fluent_affiliate/referral_approved', [$this, 'checkTierUpgrade']);
        add_action('wp', [$this, 'processMonthlyTierReview']);
        
        // Schedule monthly tier review
        if (!wp_next_scheduled('monthly_tier_review')) {
            wp_schedule_event(time(), 'monthly', 'monthly_tier_review');
        }
        
        add_action('monthly_tier_review', [$this, 'performMonthlyTierReview']);
    }
    
    public function checkTierUpgrade($referral) {
        $affiliate = fa_get_affiliate($referral->affiliate_id);
        
        if (!$affiliate) {
            return;
        }
        
        $current_tier = get_user_meta($affiliate->user_id, 'affiliate_tier', true) ?: 'bronze';
        $performance_metrics = $this->getPerformanceMetrics($affiliate->id);
        $eligible_tier = $this->getEligibleTier($performance_metrics);
        
        if ($this->shouldUpgradeTier($current_tier, $eligible_tier)) {
            $this->upgradeTier($affiliate, $eligible_tier);
        }
    }
    
    public function performMonthlyTierReview() {
        $active_affiliates = fa_get_affiliates(['status' => 'active']);
        
        foreach ($active_affiliates as $affiliate) {
            $this->reviewAffiliateTier($affiliate);
        }
    }
    
    private function reviewAffiliateTier($affiliate) {
        $current_tier = get_user_meta($affiliate->user_id, 'affiliate_tier', true) ?: 'bronze';
        $performance_metrics = $this->getPerformanceMetrics($affiliate->id);
        $eligible_tier = $this->getEligibleTier($performance_metrics);
        
        if ($this->shouldUpgradeTier($current_tier, $eligible_tier)) {
            $this->upgradeTier($affiliate, $eligible_tier);
        } elseif ($this->shouldDowngradeTier($current_tier, $eligible_tier)) {
            $this->downgradeTier($affiliate, $eligible_tier);
        }
    }
    
    private function getPerformanceMetrics($affiliate_id) {
        // Get last 90 days performance
        $end_date = date('Y-m-d');
        $start_date = date('Y-m-d', strtotime('-90 days'));
        
        $referrals = fa_get_referrals([
            'affiliate_id' => $affiliate_id,
            'status' => 'approved',
            'date_from' => $start_date,
            'date_to' => $end_date
        ]);
        
        $total_earnings = array_sum(array_column($referrals, 'commission_amount'));
        
        return [
            'total_referrals' => count($referrals),
            'total_earnings' => $total_earnings,
            'avg_order_value' => count($referrals) > 0 ? 
                array_sum(array_column($referrals, 'order_total')) / count($referrals) : 0,
            'conversion_rate' => $this->calculateConversionRate($affiliate_id, $start_date, $end_date)
        ];
    }
    
    private function getEligibleTier($metrics) {
        $eligible_tier = 'bronze';
        
        foreach ($this->tier_requirements as $tier => $requirements) {
            if ($metrics['total_referrals'] >= $requirements['min_referrals'] &&
                $metrics['total_earnings'] >= $requirements['min_earnings']) {
                $eligible_tier = $tier;
            }
        }
        
        return $eligible_tier;
    }
    
    private function shouldUpgradeTier($current_tier, $eligible_tier) {
        $tier_order = array_keys($this->tier_requirements);
        $current_index = array_search($current_tier, $tier_order);
        $eligible_index = array_search($eligible_tier, $tier_order);
        
        return $eligible_index > $current_index;
    }
    
    private function shouldDowngradeTier($current_tier, $eligible_tier) {
        $tier_order = array_keys($this->tier_requirements);
        $current_index = array_search($current_tier, $tier_order);
        $eligible_index = array_search($eligible_tier, $tier_order);
        
        // Only downgrade if performance has been consistently low
        return $eligible_index < $current_index && $current_tier !== 'bronze';
    }
    
    private function upgradeTier($affiliate, $new_tier) {
        $old_tier = get_user_meta($affiliate->user_id, 'affiliate_tier', true) ?: 'bronze';
        
        // Update tier
        update_user_meta($affiliate->user_id, 'affiliate_tier', $new_tier);
        
        // Update commission rate
        $new_commission_rate = $this->tier_requirements[$new_tier]['commission_rate'];
        fa_update_affiliate($affiliate->id, [
            'commission_rate' => $new_commission_rate
        ]);
        
        // Log tier upgrade
        $this->logTierChange($affiliate->id, $old_tier, $new_tier, 'upgrade');
        
        // Send congratulations email
        $this->sendTierUpgradeEmail($affiliate, $old_tier, $new_tier);
        
        // Award tier upgrade bonus
        $this->awardTierUpgradeBonus($affiliate->id, $new_tier);
        
        // Trigger custom action
        do_action('fluent_affiliate/tier_upgraded', $affiliate, $old_tier, $new_tier);
    }
    
    private function downgradeTier($affiliate, $new_tier) {
        $old_tier = get_user_meta($affiliate->user_id, 'affiliate_tier', true);
        
        // Update tier
        update_user_meta($affiliate->user_id, 'affiliate_tier', $new_tier);
        
        // Update commission rate
        $new_commission_rate = $this->tier_requirements[$new_tier]['commission_rate'];
        fa_update_affiliate($affiliate->id, [
            'commission_rate' => $new_commission_rate
        ]);
        
        // Log tier change
        $this->logTierChange($affiliate->id, $old_tier, $new_tier, 'downgrade');
        
        // Send notification email
        $this->sendTierDowngradeEmail($affiliate, $old_tier, $new_tier);
        
        // Trigger custom action
        do_action('fluent_affiliate/tier_downgraded', $affiliate, $old_tier, $new_tier);
    }
    
    private function sendTierUpgradeEmail($affiliate, $old_tier, $new_tier) {
        $subject = "Congratulations! You've been upgraded to {$new_tier} tier!";
        $new_rate = $this->tier_requirements[$new_tier]['commission_rate'];
        
        $message = "Hi {$affiliate->first_name},\n\n";
        $message .= "Congratulations! Your excellent performance has earned you an upgrade from {$old_tier} to {$new_tier} tier!\n\n";
        $message .= "Your new commission rate is {$new_rate}%.\n\n";
        $message .= "Keep up the great work!\n";
        $message .= "The Team";
        
        wp_mail($affiliate->email, $subject, $message);
    }
    
    private function awardTierUpgradeBonus($affiliate_id, $tier) {
        $bonus_amounts = [
            'silver' => 50.00,
            'gold' => 100.00,
            'platinum' => 250.00
        ];
        
        if (isset($bonus_amounts[$tier])) {
            $bonus_amount = $bonus_amounts[$tier];
            
            $transaction_data = [
                'affiliate_id' => $affiliate_id,
                'amount' => $bonus_amount,
                'type' => 'bonus',
                'status' => 'approved',
                'description' => "Tier upgrade bonus - {$tier} tier",
                'reference' => "TIER_BONUS_{$tier}_" . time()
            ];
            
            // Create bonus transaction
            wp_remote_post(home_url('/wp-json/fluent-affiliate/v1/transactions'), [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'X-API-Key' => get_option('fa_internal_api_key')
                ],
                'body' => json_encode($transaction_data)
            ]);
        }
    }
    
    private function logTierChange($affiliate_id, $old_tier, $new_tier, $type) {
        $log_data = [
            'affiliate_id' => $affiliate_id,
            'old_tier' => $old_tier,
            'new_tier' => $new_tier,
            'change_type' => $type,
            'timestamp' => current_time('mysql'),
            'performance_data' => $this->getPerformanceMetrics($affiliate_id)
        ];
        
        // Store in custom table or meta
        update_user_meta($affiliate_id, 'tier_change_log', $log_data);
        
        error_log("Tier {$type}: Affiliate {$affiliate_id} from {$old_tier} to {$new_tier}");
    }
    
    private function calculateConversionRate($affiliate_id, $start_date, $end_date) {
        // Get clicks and conversions for the period
        $clicks = $this->getTotalClicks($affiliate_id, $start_date, $end_date);
        $conversions = $this->getTotalConversions($affiliate_id, $start_date, $end_date);
        
        return $clicks > 0 ? ($conversions / $clicks) * 100 : 0;
    }
    
    private function getTotalClicks($affiliate_id, $start_date, $end_date) {
        global $wpdb;
        
        $clicks = $wpdb->get_var($wpdb->prepare(
            "SELECT SUM(clicks) FROM {$wpdb->prefix}fa_url_metrics 
             WHERE affiliate_id = %d 
             AND last_clicked BETWEEN %s AND %s",
            $affiliate_id, $start_date, $end_date
        ));
        
        return intval($clicks);
    }
    
    private function getTotalConversions($affiliate_id, $start_date, $end_date) {
        $referrals = fa_get_referrals([
            'affiliate_id' => $affiliate_id,
            'status' => 'approved',
            'date_from' => $start_date,
            'date_to' => $end_date
        ]);
        
        return count($referrals);
    }
}

new PerformanceTierUpgradeWorkflow();
```

## Commission Workflows

### 💰 **Multi-Tier Commission Workflow**

Implement multi-level commission structures for referral networks:

```php
<?php
/**
 * Multi-Tier Commission Workflow
 */
class MultiTierCommissionWorkflow {
    
    private $tier_rates = [
        1 => 0.10, // 10% for direct referrals
        2 => 0.05, // 5% for second-tier
        3 => 0.02  // 2% for third-tier
    ];
    
    public function __construct() {
        add_action('fluent_affiliate/referral_created', [$this, 'processMultiTierCommissions']);
        add_filter('fluent_affiliate/calculate_commission', [$this, 'calculateTieredCommission'], 10, 3);
    }
    
    public function processMultiTierCommissions($referral) {
        $direct_affiliate = fa_get_affiliate($referral->affiliate_id);
        
        if (!$direct_affiliate) {
            return;
        }
        
        // Process commissions for each tier
        $this->processCommissionTier($referral, $direct_affiliate, 1);
        
        // Find and process parent affiliates
        $parent_affiliate_id = get_user_meta($direct_affiliate->user_id, 'parent_affiliate_id', true);
        $tier = 2;
        
        while ($parent_affiliate_id && $tier <= 3) {
            $parent_affiliate = fa_get_affiliate($parent_affiliate_id);
            
            if ($parent_affiliate && $parent_affiliate->status === 'active') {
                $this->processCommissionTier($referral, $parent_affiliate, $tier);
                
                // Get next parent
                $parent_affiliate_id = get_user_meta($parent_affiliate->user_id, 'parent_affiliate_id', true);
                $tier++;
            } else {
                break;
            }
        }
    }
    
    private function processCommissionTier($original_referral, $affiliate, $tier) {
        if (!isset($this->tier_rates[$tier])) {
            return;
        }
        
        $commission_rate = $this->tier_rates[$tier];
        $commission_amount = $original_referral->order_total * $commission_rate;
        
        // Create tier-specific referral record
        $tier_referral_data = [
            'affiliate_id' => $affiliate->id,
            'order_id' => $original_referral->order_id,
            'order_total' => $original_referral->order_total,
            'commission_amount' => $commission_amount,
            'commission_rate' => $commission_rate * 100,
            'commission_type' => 'percentage',
            'status' => 'pending',
            'type' => 'multi_tier',
            'origin' => $original_referral->origin,
            'reference' => "TIER_{$tier}_" . $original_referral->id,
            'description' => "Tier {$tier} commission from referral #{$original_referral->id}",
            'meta' => json_encode([
                'tier_level' => $tier,
                'original_referral_id' => $original_referral->id,
                'original_affiliate_id' => $original_referral->affiliate_id
            ])
        ];
        
        $tier_referral = fa_create_referral($tier_referral_data);
        
        if (!is_wp_error($tier_referral)) {
            // Auto-approve tier commissions if enabled
            if (get_option('auto_approve_tier_commissions', true)) {
                fa_approve_referral($tier_referral->id);
            }
            
            error_log("Tier {$tier} commission created for affiliate {$affiliate->id}: {$commission_amount}");
        }
    }
    
    public function calculateTieredCommission($commission, $affiliate_id, $context) {
        // This filter allows for dynamic tier rate calculation
        $tier_level = $context['tier_level'] ?? 1;
        
        if (isset($this->tier_rates[$tier_level])) {
            $order_total = $context['order_total'] ?? 0;
            return $order_total * $this->tier_rates[$tier_level];
        }
        
        return $commission;
    }
}

new MultiTierCommissionWorkflow();
```

## Marketing Workflows

### 📧 **Automated Email Campaign Workflow**

Create automated email sequences based on affiliate behavior:

```php
<?php
/**
 * Automated Email Campaign Workflow
 */
class AutomatedEmailCampaignWorkflow {
    
    public function __construct() {
        add_action('fluent_affiliate/affiliate_created', [$this, 'startWelcomeSequence']);
        add_action('fluent_affiliate/referral_created', [$this, 'triggerFirstReferralSequence']);
        add_action('wp', [$this, 'processScheduledEmails']);
        
        // Register email hooks
        add_action('send_welcome_email_day_1', [$this, 'sendWelcomeDay1']);
        add_action('send_welcome_email_day_3', [$this, 'sendWelcomeDay3']);
        add_action('send_welcome_email_week_1', [$this, 'sendWelcomeWeek1']);
        add_action('send_first_referral_congratulations', [$this, 'sendFirstReferralCongratulations']);
    }
    
    public function startWelcomeSequence($affiliate) {
        // Schedule welcome email sequence
        wp_schedule_single_event(time() + DAY_IN_SECONDS, 'send_welcome_email_day_1', [$affiliate->id]);
        wp_schedule_single_event(time() + (3 * DAY_IN_SECONDS), 'send_welcome_email_day_3', [$affiliate->id]);
        wp_schedule_single_event(time() + (7 * DAY_IN_SECONDS), 'send_welcome_email_week_1', [$affiliate->id]);
        
        // Track email sequence
        update_user_meta($affiliate->user_id, 'email_sequence_welcome', [
            'started' => current_time('mysql'),
            'status' => 'active'
        ]);
    }
    
    public function triggerFirstReferralSequence($referral) {
        $affiliate = fa_get_affiliate($referral->affiliate_id);
        
        // Check if this is their first referral
        $previous_referrals = fa_get_referrals([
            'affiliate_id' => $referral->affiliate_id,
            'status' => 'approved'
        ]);
        
        if (count($previous_referrals) === 1) { // This is the first one
            wp_schedule_single_event(time() + 3600, 'send_first_referral_congratulations', [$affiliate->id]);
        }
    }
    
    public function sendWelcomeDay1($affiliate_id) {
        $affiliate = fa_get_affiliate($affiliate_id);
        
        if (!$affiliate) {
            return;
        }
        
        $subject = 'Welcome to Our Affiliate Program!';
        $template_data = [
            'affiliate_name' => $affiliate->first_name,
            'dashboard_url' => $this->getAffiliatePortalUrl(),
            'getting_started_guide' => home_url('/affiliate-resources/getting-started'),
            'support_email' => get_option('admin_email')
        ];
        
        $message = $this->renderEmailTemplate('welcome_day_1', $template_data);
        
        $sent = wp_mail($affiliate->email, $subject, $message, [
            'Content-Type: text/html; charset=UTF-8'
        ]);
        
        $this->trackEmailSent($affiliate_id, 'welcome_day_1', $sent);
    }
    
    public function sendWelcomeDay3($affiliate_id) {
        $affiliate = fa_get_affiliate($affiliate_id);
        
        if (!$affiliate) {
            return;
        }
        
        $subject = 'Ready to Start Earning? Here\'s How!';
        $template_data = [
            'affiliate_name' => $affiliate->first_name,
            'link_generator_url' => $this->getAffiliatePortalUrl() . '/links',
            'marketing_materials_url' => home_url('/affiliate-resources/marketing-materials'),
            'commission_rate' => $affiliate->commission_rate
        ];
        
        $message = $this->renderEmailTemplate('welcome_day_3', $template_data);
        
        $sent = wp_mail($affiliate->email, $subject, $message, [
            'Content-Type: text/html; charset=UTF-8'
        ]);
        
        $this->trackEmailSent($affiliate_id, 'welcome_day_3', $sent);
    }
    
    public function sendWelcomeWeek1($affiliate_id) {
        $affiliate = fa_get_affiliate($affiliate_id);
        
        if (!$affiliate) {
            return;
        }
        
        // Check if they've made any referrals yet
        $referrals = fa_get_referrals(['affiliate_id' => $affiliate_id]);
        
        if (empty($referrals)) {
            // Send encouragement email
            $subject = 'Need Help Getting Started?';
            $template_data = [
                'affiliate_name' => $affiliate->first_name,
                'training_url' => home_url('/affiliate-training'),
                'success_stories_url' => home_url('/affiliate-success-stories'),
                'support_email' => get_option('admin_email')
            ];
            
            $message = $this->renderEmailTemplate('welcome_week_1_no_referrals', $template_data);
        } else {
            // Send congratulations and tips
            $subject = 'Great Start! Here Are Some Pro Tips';
            $template_data = [
                'affiliate_name' => $affiliate->first_name,
                'referral_count' => count($referrals),
                'advanced_tips_url' => home_url('/affiliate-resources/advanced-tips'),
                'community_url' => home_url('/affiliate-community')
            ];
            
            $message = $this->renderEmailTemplate('welcome_week_1_with_referrals', $template_data);
        }
        
        $sent = wp_mail($affiliate->email, $subject, $message, [
            'Content-Type: text/html; charset=UTF-8'
        ]);
        
        $this->trackEmailSent($affiliate_id, 'welcome_week_1', $sent);
    }
    
    public function sendFirstReferralCongratulations($affiliate_id) {
        $affiliate = fa_get_affiliate($affiliate_id);
        
        if (!$affiliate) {
            return;
        }
        
        $subject = '🎉 Congratulations on Your First Referral!';
        $template_data = [
            'affiliate_name' => $affiliate->first_name,
            'dashboard_url' => $this->getAffiliatePortalUrl(),
            'scaling_tips_url' => home_url('/affiliate-resources/scaling-tips'),
            'bonus_amount' => get_option('first_referral_bonus', 10.00)
        ];
        
        $message = $this->renderEmailTemplate('first_referral_congratulations', $template_data);
        
        $sent = wp_mail($affiliate->email, $subject, $message, [
            'Content-Type: text/html; charset=UTF-8'
        ]);
        
        $this->trackEmailSent($affiliate_id, 'first_referral_congratulations', $sent);
        
        // Award first referral bonus
        $this->awardFirstReferralBonus($affiliate_id);
    }
    
    private function renderEmailTemplate($template_name, $data) {
        // Simple template rendering - in production, use a proper template engine
        $template_path = plugin_dir_path(__FILE__) . "email-templates/{$template_name}.html";
        
        if (file_exists($template_path)) {
            $template = file_get_contents($template_path);
            
            foreach ($data as $key => $value) {
                $template = str_replace("{{$key}}", $value, $template);
            }
            
            return $template;
        }
        
        // Fallback to simple text template
        return $this->getSimpleTextTemplate($template_name, $data);
    }
    
    private function getSimpleTextTemplate($template_name, $data) {
        switch ($template_name) {
            case 'welcome_day_1':
                return "Hi {$data['affiliate_name']},\n\nWelcome to our affiliate program! We're excited to have you on board.\n\nGet started: {$data['dashboard_url']}\n\nBest regards,\nThe Team";
            
            case 'first_referral_congratulations':
                return "Hi {$data['affiliate_name']},\n\nCongratulations on your first referral! You're off to a great start.\n\nAs a bonus, we've added \${$data['bonus_amount']} to your account.\n\nKeep up the great work!\nThe Team";
            
            default:
                return "Hi {$data['affiliate_name']},\n\nThank you for being part of our affiliate program!\n\nBest regards,\nThe Team";
        }
    }
    
    private function trackEmailSent($affiliate_id, $email_type, $sent) {
        $email_log = get_user_meta($affiliate_id, 'email_campaign_log', true) ?: [];
        
        $email_log[] = [
            'type' => $email_type,
            'sent_at' => current_time('mysql'),
            'status' => $sent ? 'sent' : 'failed'
        ];
        
        update_user_meta($affiliate_id, 'email_campaign_log', $email_log);
    }
    
    private function awardFirstReferralBonus($affiliate_id) {
        $bonus_amount = get_option('first_referral_bonus', 10.00);
        
        if ($bonus_amount > 0) {
            $transaction_data = [
                'affiliate_id' => $affiliate_id,
                'amount' => $bonus_amount,
                'type' => 'bonus',
                'status' => 'approved',
                'description' => 'First referral bonus',
                'reference' => 'FIRST_REFERRAL_BONUS_' . time()
            ];
            
            wp_remote_post(home_url('/wp-json/fluent-affiliate/v1/transactions'), [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'X-API-Key' => get_option('fa_internal_api_key')
                ],
                'body' => json_encode($transaction_data)
            ]);
        }
    }
    
    private function getAffiliatePortalUrl() {
        return home_url('/affiliate-portal');
    }
}

new AutomatedEmailCampaignWorkflow();
```

## Compliance Workflows

### 🛡️ **Fraud Detection Workflow**

Implement automated fraud detection and prevention:

```php
<?php
/**
 * Fraud Detection Workflow
 */
class FraudDetectionWorkflow {
    
    private $fraud_indicators = [
        'suspicious_patterns' => [
            'rapid_referrals' => 10, // More than 10 referrals in 1 hour
            'same_ip_referrals' => 5, // More than 5 referrals from same IP
            'invalid_email_domains' => ['tempmail.com', '10minutemail.com'],
            'high_refund_rate' => 0.5 // More than 50% refund rate
        ],
        'risk_scores' => [
            'low' => 25,
            'medium' => 50,
            'high' => 75,
            'critical' => 90
        ]
    ];
    
    public function __construct() {
        add_action('fluent_affiliate/referral_created', [$this, 'analyzeReferralForFraud']);
        add_action('fluent_affiliate/affiliate_created', [$this, 'analyzeNewAffiliateForFraud']);
        add_action('wp', [$this, 'performDailyFraudReview']);
        
        // Schedule daily fraud review
        if (!wp_next_scheduled('daily_fraud_review')) {
            wp_schedule_event(time(), 'daily', 'daily_fraud_review');
        }
        
        add_action('daily_fraud_review', [$this, 'performComprehensiveFraudReview']);
    }
    
    public function analyzeReferralForFraud($referral) {
        $risk_score = 0;
        $fraud_indicators = [];
        
        // Check for rapid referrals
        $recent_referrals = $this->getRecentReferrals($referral->affiliate_id, 1); // Last 1 hour
        if (count($recent_referrals) > $this->fraud_indicators['suspicious_patterns']['rapid_referrals']) {
            $risk_score += 30;
            $fraud_indicators[] = 'rapid_referrals';
        }
        
        // Check for same IP referrals
        $same_ip_count = $this->getSameIPReferrals($referral);
        if ($same_ip_count > $this->fraud_indicators['suspicious_patterns']['same_ip_referrals']) {
            $risk_score += 25;
            $fraud_indicators[] = 'same_ip_referrals';
        }
        
        // Check customer email domain
        if ($this->isSuspiciousEmailDomain($referral->customer_email)) {
            $risk_score += 20;
            $fraud_indicators[] = 'suspicious_email_domain';
        }
        
        // Check order patterns
        if ($this->hasSuspiciousOrderPattern($referral)) {
            $risk_score += 15;
            $fraud_indicators[] = 'suspicious_order_pattern';
        }
        
        // Store fraud analysis
        $this->storeFraudAnalysis($referral->id, $risk_score, $fraud_indicators);
        
        // Take action based on risk score
        $this->handleFraudRisk($referral, $risk_score, $fraud_indicators);
    }
    
    public function analyzeNewAffiliateForFraud($affiliate) {
        $risk_score = 0;
        $fraud_indicators = [];
        
        // Check email domain
        if ($this->isSuspiciousEmailDomain($affiliate->email)) {
            $risk_score += 15;
            $fraud_indicators[] = 'suspicious_email_domain';
        }
        
        // Check for duplicate information
        if ($this->hasDuplicateAffiliateInfo($affiliate)) {
            $risk_score += 25;
            $fraud_indicators[] = 'duplicate_information';
        }
        
        // Check registration patterns
        if ($this->hasSuspiciousRegistrationPattern($affiliate)) {
            $risk_score += 20;
            $fraud_indicators[] = 'suspicious_registration';
        }
        
        // Store analysis
        update_user_meta($affiliate->user_id, 'fraud_risk_score', $risk_score);
        update_user_meta($affiliate->user_id, 'fraud_indicators', $fraud_indicators);
        
        // Handle high-risk affiliates
        if ($risk_score >= $this->fraud_indicators['risk_scores']['high']) {
            $this->flagAffiliateForReview($affiliate, $risk_score, $fraud_indicators);
        }
    }
    
    private function handleFraudRisk($referral, $risk_score, $indicators) {
        if ($risk_score >= $this->fraud_indicators['risk_scores']['critical']) {
            // Critical risk - auto-reject and flag affiliate
            fa_update_referral($referral->id, ['status' => 'rejected']);
            $this->flagAffiliateForReview(fa_get_affiliate($referral->affiliate_id), $risk_score, $indicators);
            $this->notifyAdminOfFraud($referral, $risk_score, $indicators, 'critical');
            
        } elseif ($risk_score >= $this->fraud_indicators['risk_scores']['high']) {
            // High risk - hold for manual review
            fa_update_referral($referral->id, ['status' => 'pending']);
            $this->addReferralNote($referral->id, "Flagged for manual review - High fraud risk score: {$risk_score}");
            $this->notifyAdminOfFraud($referral, $risk_score, $indicators, 'high');
            
        } elseif ($risk_score >= $this->fraud_indicators['risk_scores']['medium']) {
            // Medium risk - add note but allow processing
            $this->addReferralNote($referral->id, "Medium fraud risk detected - Score: {$risk_score}");
        }
    }
    
    private function getRecentReferrals($affiliate_id, $hours = 1) {
        $start_time = date('Y-m-d H:i:s', strtotime("-{$hours} hours"));
        
        return fa_get_referrals([
            'affiliate_id' => $affiliate_id,
            'date_from' => $start_time
        ]);
    }
    
    private function getSameIPReferrals($referral) {
        global $wpdb;
        
        $ip_address = get_post_meta($referral->order_id, '_customer_ip_address', true);
        
        if (!$ip_address) {
            return 0;
        }
        
        // Count referrals from same IP in last 24 hours
        $count = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM {$wpdb->prefix}fa_referrals r
             JOIN {$wpdb->postmeta} pm ON r.order_id = pm.post_id
             WHERE pm.meta_key = '_customer_ip_address'
             AND pm.meta_value = %s
             AND r.created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)",
            $ip_address
        ));
        
        return intval($count);
    }
    
    private function isSuspiciousEmailDomain($email) {
        $domain = substr(strrchr($email, "@"), 1);
        return in_array($domain, $this->fraud_indicators['suspicious_patterns']['invalid_email_domains']);
    }
    
    private function hasSuspiciousOrderPattern($referral) {
        // Check for round numbers, unusual order amounts, etc.
        $order_total = $referral->order_total;
        
        // Suspicious if order total is exactly round number over $100
        if ($order_total >= 100 && $order_total == round($order_total) && $order_total % 50 == 0) {
            return true;
        }
        
        // Check for unusually high order values for new customers
        if ($order_total > 1000 && $this->isNewCustomer($referral->customer_email)) {
            return true;
        }
        
        return false;
    }
    
    private function hasDuplicateAffiliateInfo($affiliate) {
        global $wpdb;
        
        // Check for duplicate email or payment email
        $duplicate_count = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM {$wpdb->prefix}fa_affiliates 
             WHERE (email = %s OR payment_email = %s) 
             AND id != %d",
            $affiliate->email, $affiliate->payment_email, $affiliate->id
        ));
        
        return $duplicate_count > 0;
    }
    
    private function storeFraudAnalysis($referral_id, $risk_score, $indicators) {
        $analysis_data = [
            'risk_score' => $risk_score,
            'indicators' => $indicators,
            'analyzed_at' => current_time('mysql'),
            'version' => '1.0'
        ];
        
        update_post_meta($referral_id, '_fraud_analysis', $analysis_data);
    }
    
    private function flagAffiliateForReview($affiliate, $risk_score, $indicators) {
        // Update affiliate status
        fa_update_affiliate($affiliate->id, ['status' => 'suspended']);
        
        // Add admin note
        $note = "Affiliate flagged for fraud review. Risk score: {$risk_score}. Indicators: " . implode(', ', $indicators);
        update_user_meta($affiliate->user_id, 'admin_notes', $note);
        
        // Log the action
        error_log("Affiliate {$affiliate->id} flagged for fraud review - Risk score: {$risk_score}");
    }
    
    private function notifyAdminOfFraud($referral, $risk_score, $indicators, $level) {
        $subject = "Fraud Alert: {$level} risk referral detected";
        $affiliate = fa_get_affiliate($referral->affiliate_id);
        
        $message = "A {$level} risk referral has been detected:\n\n";
        $message .= "Referral ID: {$referral->id}\n";
        $message .= "Affiliate: {$affiliate->first_name} {$affiliate->last_name} ({$affiliate->email})\n";
        $message .= "Order ID: {$referral->order_id}\n";
        $message .= "Order Total: " . fa_format_currency($referral->order_total) . "\n";
        $message .= "Risk Score: {$risk_score}\n";
        $message .= "Indicators: " . implode(', ', $indicators) . "\n\n";
        $message .= "Please review this referral in the admin panel.";
        
        wp_mail(get_option('admin_email'), $subject, $message);
    }
    
    private function addReferralNote($referral_id, $note) {
        $existing_notes = get_post_meta($referral_id, '_admin_notes', true) ?: [];
        $existing_notes[] = [
            'note' => $note,
            'added_at' => current_time('mysql'),
            'added_by' => 'fraud_detection_system'
        ];
        
        update_post_meta($referral_id, '_admin_notes', $existing_notes);
    }
    
    private function isNewCustomer($email) {
        // Check if customer has previous orders
        global $wpdb;
        
        $order_count = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM {$wpdb->posts} p
             JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id
             WHERE p.post_type = 'shop_order'
             AND pm.meta_key = '_billing_email'
             AND pm.meta_value = %s
             AND p.post_date < DATE_SUB(NOW(), INTERVAL 1 DAY)",
            $email
        ));
        
        return intval($order_count) === 0;
    }
    
    public function performComprehensiveFraudReview() {
        // Daily comprehensive fraud review
        $this->reviewHighRiskAffiliates();
        $this->reviewSuspiciousPatterns();
        $this->updateFraudScores();
    }
    
    private function reviewHighRiskAffiliates() {
        $high_risk_affiliates = $this->getHighRiskAffiliates();
        
        foreach ($high_risk_affiliates as $affiliate) {
            $this->performDetailedAffiliateReview($affiliate);
        }
    }
    
    private function getHighRiskAffiliates() {
        global $wpdb;
        
        $affiliates = $wpdb->get_results(
            "SELECT a.*, um.meta_value as risk_score
             FROM {$wpdb->prefix}fa_affiliates a
             JOIN {$wpdb->usermeta} um ON a.user_id = um.user_id
             WHERE um.meta_key = 'fraud_risk_score'
             AND CAST(um.meta_value AS UNSIGNED) >= {$this->fraud_indicators['risk_scores']['high']}
             AND a.status != 'suspended'"
        );
        
        return $affiliates;
    }
}

new FraudDetectionWorkflow();
```

## Workflow Best Practices

### 🛡️ **Security and Performance**

1. **Always validate data** before processing workflows
2. **Use WordPress cron** for scheduled tasks, not external cron
3. **Implement proper error handling** and logging
4. **Use database transactions** for critical operations
5. **Monitor workflow performance** and optimize queries

### 🔄 **Workflow Design Principles**

1. **Keep workflows modular** and reusable
2. **Use clear naming conventions** for hooks and functions
3. **Implement proper cleanup** for scheduled events
4. **Provide admin interfaces** for workflow management
5. **Document workflow logic** and dependencies

## Next Steps

Explore more development topics:

1. **[CLI Documentation](/developers/cli/)** - Command-line tools and utilities
2. **[API Endpoints](/developers/api/endpoints/)** - Detailed endpoint documentation
3. **[Testing Guide](/developers/testing/)** - Unit testing and integration testing

---

*These workflow examples demonstrate advanced FluentAffiliate automation patterns. Adapt them to your specific business requirements and compliance needs.*
