# Portal Customization Examples

FluentAffiliate Core Beginner

Learn how to customize the FluentAffiliate portal interface with custom widgets, pages, menu items, and styling. These examples show how to enhance the affiliate experience with personalized dashboard components and functionality.

## Overview

The FluentAffiliate portal is highly customizable through hooks, filters, and custom components. You can add widgets, create custom pages, modify navigation, and implement custom styling to match your brand and business needs.

### 🎨 **Customization Categories**

| Category | Description | Complexity | Examples |
|----------|-------------|------------|----------|
| **Dashboard Widgets** | Custom dashboard components | Beginner | Stats, goals, announcements |
| **Navigation Menu** | Custom menu items and pages | Beginner | Help center, resources, tools |
| **Custom Pages** | Full custom portal pages | Intermediate | Training, leaderboards, reports |
| **Styling & Branding** | CSS and theme customization | Beginner | Colors, fonts, layouts |
| **Data Visualization** | Charts and analytics | Intermediate | Performance graphs, comparisons |

## Dashboard Widgets

### 📊 **Performance Goals Widget**

Create a widget that shows affiliate progress toward monthly goals:

```php
<?php
/**
 * Performance Goals Widget
 */
class AffiliateGoalsWidget {
    
    public function __construct() {
        add_filter('fluent_affiliate/affiliate_widgets', [$this, 'addGoalsWidget']);
        add_action('wp_ajax_get_affiliate_goals_data', [$this, 'getGoalsData']);
        add_action('wp_ajax_update_affiliate_goals', [$this, 'updateGoals']);
        add_action('wp_enqueue_scripts', [$this, 'enqueueScripts']);
    }
    
    public function addGoalsWidget($widgets) {
        $widgets['performance_goals'] = [
            'title' => 'Monthly Goals',
            'component' => 'PerformanceGoalsWidget',
            'position' => 'top',
            'width' => 'half',
            'icon' => 'target',
            'description' => 'Track your monthly performance goals'
        ];
        
        return $widgets;
    }
    
    public function getGoalsData() {
        if (!wp_verify_nonce($_GET['nonce'], 'affiliate_goals_nonce')) {
            wp_die('Security check failed');
        }
        
        $affiliate_id = intval($_GET['affiliate_id']);
        $current_month = date('Y-m');
        
        // Get goals for current month
        $goals = get_user_meta($affiliate_id, "monthly_goals_{$current_month}", true);
        if (!$goals) {
            $goals = [
                'referrals' => 10,
                'earnings' => 500.00,
                'clicks' => 1000
            ];
        }
        
        // Get current progress
        $progress = $this->getCurrentProgress($affiliate_id, $current_month);
        
        // Calculate percentages
        $percentages = [
            'referrals' => $goals['referrals'] > 0 ? min(100, ($progress['referrals'] / $goals['referrals']) * 100) : 0,
            'earnings' => $goals['earnings'] > 0 ? min(100, ($progress['earnings'] / $goals['earnings']) * 100) : 0,
            'clicks' => $goals['clicks'] > 0 ? min(100, ($progress['clicks'] / $goals['clicks']) * 100) : 0
        ];
        
        wp_send_json_success([
            'goals' => $goals,
            'progress' => $progress,
            'percentages' => $percentages,
            'month' => date('F Y')
        ]);
    }
    
    public function updateGoals() {
        if (!wp_verify_nonce($_POST['nonce'], 'affiliate_goals_nonce')) {
            wp_die('Security check failed');
        }
        
        $affiliate_id = intval($_POST['affiliate_id']);
        $current_month = date('Y-m');
        
        $goals = [
            'referrals' => intval($_POST['referrals_goal']),
            'earnings' => floatval($_POST['earnings_goal']),
            'clicks' => intval($_POST['clicks_goal'])
        ];
        
        update_user_meta($affiliate_id, "monthly_goals_{$current_month}", $goals);
        
        wp_send_json_success(['message' => 'Goals updated successfully']);
    }
    
    private function getCurrentProgress($affiliate_id, $month) {
        $start_date = $month . '-01';
        $end_date = date('Y-m-t', strtotime($start_date));
        
        // Get referrals for the month
        $referrals = fa_get_referrals([
            'affiliate_id' => $affiliate_id,
            'date_from' => $start_date,
            'date_to' => $end_date,
            'status' => 'approved'
        ]);
        
        $earnings = array_sum(array_column($referrals, 'commission_amount'));
        
        // Get clicks for the month
        $clicks = $this->getMonthlyClicks($affiliate_id, $start_date, $end_date);
        
        return [
            'referrals' => count($referrals),
            'earnings' => $earnings,
            'clicks' => $clicks
        ];
    }
    
    private function getMonthlyClicks($affiliate_id, $start_date, $end_date) {
        global $wpdb;
        
        $table = $wpdb->prefix . 'fa_url_metrics';
        
        $clicks = $wpdb->get_var($wpdb->prepare(
            "SELECT SUM(clicks) FROM {$table} 
             WHERE affiliate_id = %d 
             AND last_clicked BETWEEN %s AND %s",
            $affiliate_id, $start_date, $end_date
        ));
        
        return intval($clicks);
    }
    
    public function enqueueScripts() {
        if (is_page('affiliate-portal')) {
            wp_enqueue_script('goals-widget', plugin_dir_url(__FILE__) . 'assets/goals-widget.js', ['jquery'], '1.0.0', true);
            wp_localize_script('goals-widget', 'goalsWidget', [
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('affiliate_goals_nonce')
            ]);
        }
    }
}

new AffiliateGoalsWidget();
```

### 📊 **Leaderboard Widget**

Display top-performing affiliates to encourage competition:

```php
<?php
/**
 * Affiliate Leaderboard Widget
 */
class AffiliateLeaderboardWidget {
    
    public function __construct() {
        add_filter('fluent_affiliate/affiliate_widgets', [$this, 'addLeaderboardWidget']);
        add_action('wp_ajax_get_leaderboard_data', [$this, 'getLeaderboardData']);
    }
    
    public function addLeaderboardWidget($widgets) {
        $widgets['leaderboard'] = [
            'title' => 'Top Performers',
            'component' => 'LeaderboardWidget',
            'position' => 'sidebar',
            'width' => 'full',
            'icon' => 'trophy',
            'description' => 'See how you rank against other affiliates'
        ];
        
        return $widgets;
    }
    
    public function getLeaderboardData() {
        if (!wp_verify_nonce($_GET['nonce'], 'leaderboard_nonce')) {
            wp_die('Security check failed');
        }
        
        $current_affiliate_id = intval($_GET['affiliate_id']);
        $period = sanitize_text_field($_GET['period'] ?? 'month');
        
        $leaderboard = $this->getTopAffiliates($period, 10);
        $current_rank = $this->getAffiliateRank($current_affiliate_id, $period);
        
        wp_send_json_success([
            'leaderboard' => $leaderboard,
            'current_rank' => $current_rank,
            'period' => $period
        ]);
    }
    
    private function getTopAffiliates($period, $limit = 10) {
        global $wpdb;
        
        $date_condition = $this->getDateCondition($period);
        
        $query = "
            SELECT 
                a.id,
                a.first_name,
                a.last_name,
                COUNT(r.id) as referral_count,
                SUM(r.commission_amount) as total_earnings,
                AVG(r.commission_amount) as avg_commission
            FROM {$wpdb->prefix}fa_affiliates a
            LEFT JOIN {$wpdb->prefix}fa_referrals r ON a.id = r.affiliate_id 
                AND r.status = 'approved' {$date_condition}
            WHERE a.status = 'active'
            GROUP BY a.id
            ORDER BY total_earnings DESC, referral_count DESC
            LIMIT %d
        ";
        
        $results = $wpdb->get_results($wpdb->prepare($query, $limit));
        
        $leaderboard = [];
        foreach ($results as $index => $affiliate) {
            $leaderboard[] = [
                'rank' => $index + 1,
                'name' => $affiliate->first_name . ' ' . substr($affiliate->last_name, 0, 1) . '.',
                'referrals' => intval($affiliate->referral_count),
                'earnings' => floatval($affiliate->total_earnings),
                'avg_commission' => floatval($affiliate->avg_commission),
                'is_current' => false // Will be set in frontend
            ];
        }
        
        return $leaderboard;
    }
    
    private function getAffiliateRank($affiliate_id, $period) {
        global $wpdb;
        
        $date_condition = $this->getDateCondition($period);
        
        $query = "
            SELECT COUNT(*) + 1 as rank
            FROM (
                SELECT 
                    a.id,
                    SUM(r.commission_amount) as total_earnings
                FROM {$wpdb->prefix}fa_affiliates a
                LEFT JOIN {$wpdb->prefix}fa_referrals r ON a.id = r.affiliate_id 
                    AND r.status = 'approved' {$date_condition}
                WHERE a.status = 'active'
                GROUP BY a.id
                HAVING total_earnings > (
                    SELECT SUM(r2.commission_amount)
                    FROM {$wpdb->prefix}fa_referrals r2
                    WHERE r2.affiliate_id = %d 
                    AND r2.status = 'approved' {$date_condition}
                )
            ) as higher_earners
        ";
        
        $rank = $wpdb->get_var($wpdb->prepare($query, $affiliate_id));
        
        return intval($rank);
    }
    
    private function getDateCondition($period) {
        switch ($period) {
            case 'week':
                return "AND r.created_at >= DATE_SUB(NOW(), INTERVAL 1 WEEK)";
            case 'month':
                return "AND r.created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)";
            case 'quarter':
                return "AND r.created_at >= DATE_SUB(NOW(), INTERVAL 3 MONTH)";
            case 'year':
                return "AND r.created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)";
            default:
                return "AND r.created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)";
        }
    }
}

new AffiliateLeaderboardWidget();
```

## Navigation Customization

### 🧭 **Custom Menu Items**

Add custom navigation items to the affiliate portal:

```php
<?php
/**
 * Custom Portal Navigation
 */
class CustomPortalNavigation {
    
    public function __construct() {
        add_filter('fluent_affiliate/portal_menu_items', [$this, 'addCustomMenuItems']);
        add_filter('fluent_affiliate/portal_routes', [$this, 'addCustomRoutes']);
    }
    
    public function addCustomMenuItems($menu_items) {
        // Add Training Center
        $menu_items['training'] = [
            'title' => 'Training Center',
            'icon' => 'graduation-cap',
            'route' => '/training',
            'position' => 3,
            'badge' => $this->getNewTrainingCount()
        ];
        
        // Add Resource Library
        $menu_items['resources'] = [
            'title' => 'Resources',
            'icon' => 'folder',
            'route' => '/resources',
            'position' => 4,
            'children' => [
                [
                    'title' => 'Marketing Materials',
                    'route' => '/resources/marketing'
                ],
                [
                    'title' => 'Brand Guidelines',
                    'route' => '/resources/branding'
                ],
                [
                    'title' => 'API Documentation',
                    'route' => '/resources/api'
                ]
            ]
        ];
        
        // Add Help Center
        $menu_items['help'] = [
            'title' => 'Help Center',
            'icon' => 'question-circle',
            'route' => '/help',
            'position' => 10,
            'external' => false
        ];
        
        return $menu_items;
    }
    
    public function addCustomRoutes($routes) {
        $routes['/training'] = [
            'component' => 'TrainingCenter',
            'title' => 'Training Center',
            'meta' => [
                'requiresAuth' => true,
                'description' => 'Learn how to maximize your affiliate earnings'
            ]
        ];
        
        $routes['/resources'] = [
            'component' => 'ResourceLibrary',
            'title' => 'Resources',
            'meta' => [
                'requiresAuth' => true
            ]
        ];
        
        $routes['/resources/marketing'] = [
            'component' => 'MarketingMaterials',
            'title' => 'Marketing Materials',
            'meta' => [
                'requiresAuth' => true,
                'parent' => '/resources'
            ]
        ];
        
        $routes['/help'] = [
            'component' => 'HelpCenter',
            'title' => 'Help Center',
            'meta' => [
                'requiresAuth' => true
            ]
        ];
        
        return $routes;
    }
    
    private function getNewTrainingCount() {
        // Return number of new training materials
        $last_visit = get_user_meta(get_current_user_id(), 'last_training_visit', true);
        if (!$last_visit) {
            return null;
        }
        
        // Count new training posts since last visit
        $new_count = wp_count_posts('training_material', [
            'post_status' => 'publish',
            'date_query' => [
                'after' => $last_visit
            ]
        ]);
        
        return $new_count > 0 ? $new_count : null;
    }
}

new CustomPortalNavigation();
```

## Custom Pages

### 📚 **Training Center Page**

Create a comprehensive training center for affiliates:

```php
<?php
/**
 * Training Center Implementation
 */
class AffiliateTrainingCenter {
    
    public function __construct() {
        add_action('wp_ajax_get_training_content', [$this, 'getTrainingContent']);
        add_action('wp_ajax_mark_training_complete', [$this, 'markTrainingComplete']);
        add_action('wp_ajax_get_training_progress', [$this, 'getTrainingProgress']);
    }
    
    public function getTrainingContent() {
        if (!wp_verify_nonce($_GET['nonce'], 'training_nonce')) {
            wp_die('Security check failed');
        }
        
        $affiliate_id = intval($_GET['affiliate_id']);
        $category = sanitize_text_field($_GET['category'] ?? 'all');
        
        $training_modules = $this->getTrainingModules($category);
        $progress = $this->getUserProgress($affiliate_id);
        
        wp_send_json_success([
            'modules' => $training_modules,
            'progress' => $progress,
            'categories' => $this->getTrainingCategories()
        ]);
    }
    
    public function markTrainingComplete() {
        if (!wp_verify_nonce($_POST['nonce'], 'training_nonce')) {
            wp_die('Security check failed');
        }
        
        $affiliate_id = intval($_POST['affiliate_id']);
        $module_id = intval($_POST['module_id']);
        
        $completed_modules = get_user_meta($affiliate_id, 'completed_training_modules', true) ?: [];
        
        if (!in_array($module_id, $completed_modules)) {
            $completed_modules[] = $module_id;
            update_user_meta($affiliate_id, 'completed_training_modules', $completed_modules);
            
            // Award points or badges
            $this->awardTrainingPoints($affiliate_id, $module_id);
        }
        
        wp_send_json_success(['message' => 'Training module completed!']);
    }
    
    public function getTrainingProgress() {
        $affiliate_id = intval($_GET['affiliate_id']);
        
        $total_modules = $this->getTotalModuleCount();
        $completed_modules = count(get_user_meta($affiliate_id, 'completed_training_modules', true) ?: []);
        
        $progress_percentage = $total_modules > 0 ? ($completed_modules / $total_modules) * 100 : 0;
        
        wp_send_json_success([
            'total_modules' => $total_modules,
            'completed_modules' => $completed_modules,
            'progress_percentage' => round($progress_percentage, 1),
            'certificates' => $this->getEarnedCertificates($affiliate_id)
        ]);
    }
    
    private function getTrainingModules($category = 'all') {
        $args = [
            'post_type' => 'training_module',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'orderby' => 'menu_order',
            'order' => 'ASC'
        ];
        
        if ($category !== 'all') {
            $args['meta_query'] = [
                [
                    'key' => 'training_category',
                    'value' => $category,
                    'compare' => '='
                ]
            ];
        }
        
        $modules = get_posts($args);
        $training_data = [];
        
        foreach ($modules as $module) {
            $training_data[] = [
                'id' => $module->ID,
                'title' => $module->post_title,
                'description' => $module->post_excerpt,
                'content' => $module->post_content,
                'category' => get_post_meta($module->ID, 'training_category', true),
                'duration' => get_post_meta($module->ID, 'estimated_duration', true),
                'difficulty' => get_post_meta($module->ID, 'difficulty_level', true),
                'video_url' => get_post_meta($module->ID, 'video_url', true),
                'resources' => get_post_meta($module->ID, 'additional_resources', true)
            ];
        }
        
        return $training_data;
    }
    
    private function getUserProgress($affiliate_id) {
        $completed_modules = get_user_meta($affiliate_id, 'completed_training_modules', true) ?: [];
        
        return [
            'completed_modules' => $completed_modules,
            'last_accessed' => get_user_meta($affiliate_id, 'last_training_access', true),
            'total_time_spent' => get_user_meta($affiliate_id, 'training_time_spent', true) ?: 0
        ];
    }
    
    private function getTrainingCategories() {
        return [
            'getting_started' => 'Getting Started',
            'marketing_basics' => 'Marketing Basics',
            'advanced_strategies' => 'Advanced Strategies',
            'tools_resources' => 'Tools & Resources',
            'compliance' => 'Compliance & Guidelines'
        ];
    }
    
    private function awardTrainingPoints($affiliate_id, $module_id) {
        $points = get_post_meta($module_id, 'completion_points', true) ?: 10;
        $current_points = get_user_meta($affiliate_id, 'training_points', true) ?: 0;
        
        update_user_meta($affiliate_id, 'training_points', $current_points + $points);
        
        // Check for certificate eligibility
        $this->checkCertificateEligibility($affiliate_id);
    }
    
    private function checkCertificateEligibility($affiliate_id) {
        $completed_modules = get_user_meta($affiliate_id, 'completed_training_modules', true) ?: [];
        $certificates = get_user_meta($affiliate_id, 'earned_certificates', true) ?: [];
        
        // Basic Certificate - Complete 5 modules
        if (count($completed_modules) >= 5 && !in_array('basic', $certificates)) {
            $certificates[] = 'basic';
            update_user_meta($affiliate_id, 'earned_certificates', $certificates);
            
            // Send congratulations email
            $this->sendCertificateEmail($affiliate_id, 'basic');
        }
        
        // Advanced Certificate - Complete 15 modules
        if (count($completed_modules) >= 15 && !in_array('advanced', $certificates)) {
            $certificates[] = 'advanced';
            update_user_meta($affiliate_id, 'earned_certificates', $certificates);
            
            $this->sendCertificateEmail($affiliate_id, 'advanced');
        }
    }
    
    private function sendCertificateEmail($affiliate_id, $certificate_type) {
        $affiliate = fa_get_affiliate($affiliate_id);
        
        $subject = 'Congratulations! You\'ve earned a certificate!';
        $message = "Hi {$affiliate->first_name},\n\n";
        $message .= "Congratulations on earning your " . ucfirst($certificate_type) . " Affiliate Certificate!\n";
        $message .= "You can download your certificate from your training center.\n\n";
        $message .= "Keep up the great work!\n";
        $message .= "The Team";
        
        wp_mail($affiliate->email, $subject, $message);
    }
    
    private function getTotalModuleCount() {
        return wp_count_posts('training_module')->publish;
    }
    
    private function getEarnedCertificates($affiliate_id) {
        return get_user_meta($affiliate_id, 'earned_certificates', true) ?: [];
    }
}

new AffiliateTrainingCenter();
```

## Styling and Branding

### 🎨 **Custom Portal Styling**

Apply custom branding and styling to the affiliate portal:

```php
<?php
/**
 * Portal Styling Customization
 */
class PortalStylingCustomization {
    
    public function __construct() {
        add_action('fluent_affiliate/portal_head', [$this, 'addCustomStyles']);
        add_filter('fluent_affiliate/portal_config', [$this, 'customizePortalConfig']);
        add_action('wp_enqueue_scripts', [$this, 'enqueueCustomAssets']);
    }
    
    public function addCustomStyles() {
        $primary_color = get_option('portal_primary_color', '#3498db');
        $secondary_color = get_option('portal_secondary_color', '#2c3e50');
        $accent_color = get_option('portal_accent_color', '#e74c3c');
        
        ?>
        <style>
        :root {
            --portal-primary: <?php echo esc_attr($primary_color); ?>;
            --portal-secondary: <?php echo esc_attr($secondary_color); ?>;
            --portal-accent: <?php echo esc_attr($accent_color); ?>;
            --portal-success: #27ae60;
            --portal-warning: #f39c12;
            --portal-danger: #e74c3c;
        }
        
        /* Custom Header Styling */
        .affiliate-portal-header {
            background: linear-gradient(135deg, var(--portal-primary), var(--portal-secondary));
            border-radius: 0 0 20px 20px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        .portal-logo {
            max-height: 50px;
            width: auto;
        }
        
        /* Dashboard Cards */
        .dashboard-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            border: 1px solid #f0f0f0;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .dashboard-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.12);
        }
        
        /* Custom Buttons */
        .btn-primary {
            background: var(--portal-primary);
            border-color: var(--portal-primary);
            border-radius: 8px;
            font-weight: 600;
            padding: 12px 24px;
            transition: all 0.2s ease;
        }
        
        .btn-primary:hover {
            background: var(--portal-secondary);
            border-color: var(--portal-secondary);
            transform: translateY(-1px);
        }
        
        /* Navigation Styling */
        .portal-sidebar {
            background: #f8f9fa;
            border-right: 1px solid #e9ecef;
        }
        
        .nav-item.active {
            background: var(--portal-primary);
            color: white;
            border-radius: 8px;
        }
        
        /* Widget Styling */
        .widget-header {
            background: linear-gradient(45deg, var(--portal-primary), var(--portal-accent));
            color: white;
            border-radius: 8px 8px 0 0;
            padding: 16px 20px;
        }
        
        .widget-content {
            padding: 20px;
        }
        
        /* Progress Bars */
        .progress-bar {
            background: linear-gradient(90deg, var(--portal-primary), var(--portal-accent));
            border-radius: 10px;
            height: 8px;
        }
        
        /* Custom Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .dashboard-card {
                margin-bottom: 16px;
            }
            
            .portal-sidebar {
                position: fixed;
                top: 0;
                left: -250px;
                width: 250px;
                height: 100vh;
                z-index: 1000;
                transition: left 0.3s ease;
            }
            
            .portal-sidebar.open {
                left: 0;
            }
        }
        
        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
            .dashboard-card {
                background: #2d3748;
                border-color: #4a5568;
                color: #e2e8f0;
            }
            
            .portal-sidebar {
                background: #1a202c;
                border-color: #2d3748;
            }
        }
        </style>
        <?php
    }
    
    public function customizePortalConfig($config) {
        $config['branding'] = [
            'logo' => get_option('portal_logo_url', ''),
            'company_name' => get_option('portal_company_name', get_bloginfo('name')),
            'primary_color' => get_option('portal_primary_color', '#3498db'),
            'favicon' => get_option('portal_favicon_url', ''),
            'footer_text' => get_option('portal_footer_text', '© ' . date('Y') . ' ' . get_bloginfo('name'))
        ];
        
        $config['features'] = [
            'dark_mode' => get_option('portal_enable_dark_mode', true),
            'animations' => get_option('portal_enable_animations', true),
            'mobile_app_banner' => get_option('portal_show_mobile_banner', false),
            'help_widget' => get_option('portal_show_help_widget', true)
        ];
        
        return $config;
    }
    
    public function enqueueCustomAssets() {
        if (is_page('affiliate-portal')) {
            // Custom JavaScript for portal interactions
            wp_enqueue_script(
                'portal-custom',
                plugin_dir_url(__FILE__) . 'assets/portal-custom.js',
                ['jquery'],
                '1.0.0',
                true
            );
            
            // Custom fonts
            wp_enqueue_style(
                'portal-fonts',
                'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
            );
            
            // Chart.js for data visualization
            wp_enqueue_script(
                'chartjs',
                'https://cdn.jsdelivr.net/npm/chart.js',
                [],
                '3.9.1',
                true
            );
        }
    }
}

new PortalStylingCustomization();
```

## Data Visualization

### 📈 **Performance Charts Widget**

Add interactive charts to visualize affiliate performance:

```php
<?php
/**
 * Performance Charts Widget
 */
class PerformanceChartsWidget {
    
    public function __construct() {
        add_filter('fluent_affiliate/affiliate_widgets', [$this, 'addChartsWidget']);
        add_action('wp_ajax_get_performance_chart_data', [$this, 'getChartData']);
    }
    
    public function addChartsWidget($widgets) {
        $widgets['performance_charts'] = [
            'title' => 'Performance Analytics',
            'component' => 'PerformanceChartsWidget',
            'position' => 'main',
            'width' => 'full',
            'icon' => 'chart-line',
            'description' => 'Visual analytics of your affiliate performance'
        ];
        
        return $widgets;
    }
    
    public function getChartData() {
        if (!wp_verify_nonce($_GET['nonce'], 'charts_nonce')) {
            wp_die('Security check failed');
        }
        
        $affiliate_id = intval($_GET['affiliate_id']);
        $period = sanitize_text_field($_GET['period'] ?? '30days');
        $chart_type = sanitize_text_field($_GET['chart_type'] ?? 'earnings');
        
        $data = [];
        
        switch ($chart_type) {
            case 'earnings':
                $data = $this->getEarningsChartData($affiliate_id, $period);
                break;
            case 'referrals':
                $data = $this->getReferralsChartData($affiliate_id, $period);
                break;
            case 'clicks':
                $data = $this->getClicksChartData($affiliate_id, $period);
                break;
            case 'conversion':
                $data = $this->getConversionChartData($affiliate_id, $period);
                break;
        }
        
        wp_send_json_success($data);
    }
    
    private function getEarningsChartData($affiliate_id, $period) {
        $dates = $this->getDateRange($period);
        $earnings_data = [];
        $labels = [];
        
        foreach ($dates as $date) {
            $daily_earnings = $this->getDailyEarnings($affiliate_id, $date);
            $earnings_data[] = $daily_earnings;
            $labels[] = date('M j', strtotime($date));
        }
        
        return [
            'type' => 'line',
            'data' => [
                'labels' => $labels,
                'datasets' => [
                    [
                        'label' => 'Daily Earnings',
                        'data' => $earnings_data,
                        'borderColor' => '#3498db',
                        'backgroundColor' => 'rgba(52, 152, 219, 0.1)',
                        'fill' => true,
                        'tension' => 0.4
                    ]
                ]
            ],
            'options' => [
                'responsive' => true,
                'plugins' => [
                    'title' => [
                        'display' => true,
                        'text' => 'Earnings Over Time'
                    ]
                ],
                'scales' => [
                    'y' => [
                        'beginAtZero' => true,
                        'ticks' => [
                            'callback' => 'function(value) { return "$" + value.toFixed(2); }'
                        ]
                    ]
                ]
            ]
        ];
    }
    
    private function getReferralsChartData($affiliate_id, $period) {
        $dates = $this->getDateRange($period);
        $referrals_data = [];
        $labels = [];
        
        foreach ($dates as $date) {
            $daily_referrals = $this->getDailyReferrals($affiliate_id, $date);
            $referrals_data[] = $daily_referrals;
            $labels[] = date('M j', strtotime($date));
        }
        
        return [
            'type' => 'bar',
            'data' => [
                'labels' => $labels,
                'datasets' => [
                    [
                        'label' => 'Daily Referrals',
                        'data' => $referrals_data,
                        'backgroundColor' => '#27ae60',
                        'borderColor' => '#2ecc71',
                        'borderWidth' => 1
                    ]
                ]
            ],
            'options' => [
                'responsive' => true,
                'plugins' => [
                    'title' => [
                        'display' => true,
                        'text' => 'Referrals Over Time'
                    ]
                ],
                'scales' => [
                    'y' => [
                        'beginAtZero' => true,
                        'ticks' => [
                            'stepSize' => 1
                        ]
                    ]
                ]
            ]
        ];
    }
    
    private function getDateRange($period) {
        $end_date = date('Y-m-d');
        
        switch ($period) {
            case '7days':
                $start_date = date('Y-m-d', strtotime('-7 days'));
                break;
            case '30days':
                $start_date = date('Y-m-d', strtotime('-30 days'));
                break;
            case '90days':
                $start_date = date('Y-m-d', strtotime('-90 days'));
                break;
            default:
                $start_date = date('Y-m-d', strtotime('-30 days'));
        }
        
        $dates = [];
        $current_date = $start_date;
        
        while ($current_date <= $end_date) {
            $dates[] = $current_date;
            $current_date = date('Y-m-d', strtotime($current_date . ' +1 day'));
        }
        
        return $dates;
    }
    
    private function getDailyEarnings($affiliate_id, $date) {
        global $wpdb;
        
        $earnings = $wpdb->get_var($wpdb->prepare(
            "SELECT SUM(commission_amount) 
             FROM {$wpdb->prefix}fa_referrals 
             WHERE affiliate_id = %d 
             AND DATE(created_at) = %s 
             AND status = 'approved'",
            $affiliate_id, $date
        ));
        
        return floatval($earnings);
    }
    
    private function getDailyReferrals($affiliate_id, $date) {
        global $wpdb;
        
        $count = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) 
             FROM {$wpdb->prefix}fa_referrals 
             WHERE affiliate_id = %d 
             AND DATE(created_at) = %s 
             AND status = 'approved'",
            $affiliate_id, $date
        ));
        
        return intval($count);
    }
}

new PerformanceChartsWidget();
```

## Best Practices

### 🛡️ **Security and Performance**

1. **Always verify nonces** for AJAX requests
2. **Sanitize and validate** all user inputs
3. **Use caching** for expensive database queries
4. **Optimize database queries** with proper indexing
5. **Implement rate limiting** for API endpoints

### 🎨 **UI/UX Guidelines**

1. **Maintain consistency** with existing portal design
2. **Use responsive design** for mobile compatibility
3. **Implement loading states** for better user experience
4. **Provide clear feedback** for user actions
5. **Follow accessibility standards** (WCAG guidelines)

## Next Steps

Explore more customization examples:

1. **[Workflow Examples](/developers/examples/workflows/)** - Custom affiliate workflows
2. **[Integration Examples](/developers/examples/integrations/)** - Third-party integrations
3. **[API Documentation](/developers/api/)** - REST API reference

---

*These portal customization examples help you create a unique, branded experience for your affiliates. Customize them to match your specific requirements and brand guidelines.*
