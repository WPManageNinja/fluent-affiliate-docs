# Database Schema

FluentAffiliate Core Intermediate

Understanding FluentAffiliate's database structure is essential for effective development. This guide covers the complete database schema, table relationships, and data flow patterns.

## Overview

FluentAffiliate uses a normalized database structure with 7 core tables that handle all affiliate marketing operations. The schema is designed for performance, scalability, and data integrity.

### 🗄️ **Core Tables**

| Table | Purpose | Records |
|-------|---------|---------|
| `fa_affiliates` | Affiliate profiles and settings | Affiliate data |
| `fa_referrals` | Referral tracking and commissions | Conversion events |
| `fa_customers` | Customer information and tracking | Customer data |
| `fa_visits` | Visit tracking and analytics | Visit logs |
| `fa_payouts` | Payout batch management | Payout batches |
| `fa_payout_transactions` | Individual payout transactions | Payment records |
| `fa_meta` | Metadata storage for all objects | Meta data |

## Table Structures

### 📊 **fa_affiliates**

The central table storing all affiliate information and settings.

| Column | Definition | Comment |
|--------|------------|---------|
| `id` | `bigint(20) unsigned NOT NULL AUTO_INCREMENT` | Primary key, unique affiliate identifier |
| `contact_id` | `bigint(20) unsigned DEFAULT NULL` | Links to contact/user information |
| `group_id` | `bigint(20) unsigned DEFAULT NULL` | Links to affiliate group for tier management |
| `rate` | `double DEFAULT NULL` | Individual commission rate (overrides global settings) |
| `rate_type` | `varchar(100) DEFAULT 'percent'` | Commission type: percent, fixed, or group |
| `status` | `varchar(100) DEFAULT 'pending'` | Affiliate status: pending, active, inactive, suspended |
| `custom_param` | `varchar(100) DEFAULT NULL` | Custom tracking parameter for URL generation |
| `settings` | `longtext DEFAULT NULL` | JSON configuration data for affiliate-specific settings |
| `created_at` | `timestamp NULL DEFAULT NULL` | Record creation timestamp |
| `updated_at` | `timestamp NULL DEFAULT NULL` | Last modification timestamp |

**Indexes:**
- `PRIMARY KEY (id)` - Primary key index
- `KEY fa_aff_contact_id_idx (contact_id)` - Contact lookup optimization
- `KEY fa_aff_status_idx (status)` - Status filtering optimization

### 💰 **fa_referrals**

Tracks all referral events and commission calculations.

| Column | Definition | Comment |
|--------|------------|---------|
| `id` | `bigint(20) unsigned NOT NULL AUTO_INCREMENT` | Primary key, unique referral identifier |
| `affiliate_id` | `bigint(20) unsigned DEFAULT NULL` | Links to fa_affiliates table |
| `parent_id` | `bigint(20) unsigned DEFAULT NULL` | Parent referral for multi-tier commission structures |
| `customer_id` | `bigint(20) unsigned DEFAULT NULL` | Links to fa_customers table |
| `visit_id` | `bigint(20) unsigned DEFAULT NULL` | Links to fa_visits table for tracking source |
| `description` | `longtext DEFAULT NULL` | Human-readable referral description |
| `status` | `varchar(100) DEFAULT 'pending'` | Referral status: pending, unpaid, paid, rejected |
| `amount` | `double DEFAULT NULL` | Commission amount earned by affiliate |
| `order_total` | `double DEFAULT NULL` | Total order value that generated the referral |
| `currency` | `char(3) DEFAULT NULL` | Currency code (USD, EUR, etc.) |
| `utm_campaign` | `varchar(100) DEFAULT NULL` | UTM campaign tracking parameter |
| `provider` | `varchar(100) DEFAULT NULL` | Source system: woocommerce, edd, fluentforms, etc. |
| `provider_id` | `bigint(20) unsigned DEFAULT NULL` | External system's order/transaction ID |
| `provider_sub_id` | `varchar(192) DEFAULT NULL` | External system's sub-identifier (order number, etc.) |
| `products` | `longtext DEFAULT NULL` | Serialized product data related to referral |
| `payout_transaction_id` | `bigint(20) unsigned DEFAULT NULL` | Links to fa_payout_transactions when paid |
| `payout_id` | `bigint(20) unsigned DEFAULT NULL` | Links to fa_payouts batch when paid |
| `type` | `varchar(100) DEFAULT 'sale'` | Referral type: sale, lead, click, custom |
| `settings` | `longtext DEFAULT NULL` | Serialized additional settings and metadata |
| `created_at` | `timestamp NULL DEFAULT NULL` | Record creation timestamp |
| `updated_at` | `timestamp NULL DEFAULT NULL` | Last modification timestamp |

**Indexes:**
- `PRIMARY KEY (id)` - Primary key index
- `KEY fa_aff_idx (affiliate_id)` - Affiliate lookup optimization
- `KEY fa_aff_status_idx (status)` - Status filtering optimization
- `KEY fa_aff_type (type)` - Type filtering optimization
- `KEY fa_aff_provider (provider)` - Provider filtering optimization
- `KEY fa_aff_provider_sub (provider_sub_id)` - External ID lookup optimization

### 👥 **fa_customers**

Customer information and tracking data.

| Column | Definition | Comment |
|--------|------------|---------|
| `id` | `bigint(20) unsigned NOT NULL AUTO_INCREMENT` | Primary key, unique customer identifier |
| `user_id` | `bigint(20) unsigned DEFAULT NULL` | Links to WordPress users table |
| `by_affiliate_id` | `bigint(20) unsigned DEFAULT NULL` | Referring affiliate who brought this customer |
| `email` | `varchar(192) DEFAULT NULL` | Customer email address |
| `first_name` | `varchar(192) DEFAULT NULL` | Customer first name |
| `last_name` | `varchar(192) DEFAULT NULL` | Customer last name |
| `ip` | `varchar(100) DEFAULT NULL` | Customer IP address for tracking |
| `settings` | `longtext DEFAULT NULL` | Serialized customer settings and metadata |
| `created_at` | `timestamp NULL DEFAULT NULL` | Record creation timestamp |
| `updated_at` | `timestamp NULL DEFAULT NULL` | Last modification timestamp |

**Indexes:**
- `PRIMARY KEY (id)` - Primary key index
- `KEY fa_cust_idx (email)` - Email lookup optimization
- `KEY fa_cust_user_id (user_id)` - User ID lookup optimization

### 🔍 **fa_visits**

Visit tracking and analytics data.

| Column | Definition | Comment |
|--------|------------|---------|
| `id` | `bigint(20) unsigned NOT NULL AUTO_INCREMENT` | Primary key, unique visit identifier |
| `affiliate_id` | `bigint(20) unsigned DEFAULT NULL` | Links to fa_affiliates table |
| `user_id` | `bigint(20) unsigned DEFAULT NULL` | Links to WordPress users table (if logged in) |
| `referral_id` | `bigint(20) unsigned DEFAULT NULL` | Links to fa_referrals if visit converted |
| `url` | `mediumtext DEFAULT NULL` | Visited URL/landing page |
| `referrer` | `mediumtext DEFAULT NULL` | Referring URL (where visitor came from) |
| `utm_campaign` | `varchar(100) DEFAULT NULL` | UTM campaign tracking parameter |
| `utm_medium` | `varchar(100) DEFAULT NULL` | UTM medium tracking parameter |
| `utm_source` | `varchar(100) DEFAULT NULL` | UTM source tracking parameter |
| `ip` | `varchar(100) DEFAULT NULL` | Visitor IP address |
| `created_at` | `timestamp NULL DEFAULT NULL` | Visit timestamp |
| `updated_at` | `timestamp NULL DEFAULT NULL` | Last modification timestamp |

**Indexes:**
- `PRIMARY KEY (id)` - Primary key index
- `KEY fa_visit_idx (affiliate_id)` - Affiliate lookup optimization
- `KEY fa_visit_utm_campaign (utm_campaign)` - Campaign tracking optimization

### 💰 **fa_payouts**

Payout batch management and tracking.

| Column | Definition | Comment |
|--------|------------|---------|
| `id` | `bigint(20) unsigned NOT NULL AUTO_INCREMENT` | Primary key, unique payout batch identifier |
| `created_by` | `bigint(20) unsigned DEFAULT NULL` | User ID who created the payout batch |
| `total_amount` | `double DEFAULT NULL` | Total amount for the entire payout batch |
| `payout_method` | `varchar(100) DEFAULT 'manual'` | Payment method: manual, paypal, bank_transfer, etc. |
| `status` | `varchar(100) DEFAULT 'draft'` | Batch status: draft, pending, processing, completed, failed |
| `currency` | `char(3) DEFAULT NULL` | Currency code (USD, EUR, etc.) |
| `title` | `varchar(192) DEFAULT NULL` | Human-readable payout batch title |
| `description` | `longtext DEFAULT NULL` | Detailed description of the payout batch |
| `settings` | `longtext DEFAULT NULL` | Serialized payout settings and configuration |
| `created_at` | `timestamp NULL DEFAULT NULL` | Batch creation timestamp |
| `updated_at` | `timestamp NULL DEFAULT NULL` | Last modification timestamp |

**Indexes:**
- `PRIMARY KEY (id)` - Primary key index
- `KEY fa_pay_status_idx (status)` - Status filtering optimization

### 🏦 **fa_payout_transactions**

Individual payout transaction records.

| Column | Definition | Comment |
|--------|------------|---------|
| `id` | `bigint(20) unsigned NOT NULL AUTO_INCREMENT` | Primary key, unique transaction identifier |
| `created_by` | `bigint(20) unsigned DEFAULT NULL` | User ID who created the transaction |
| `affiliate_id` | `bigint(20) unsigned DEFAULT NULL` | Links to fa_affiliates table |
| `payout_id` | `bigint(20) unsigned DEFAULT NULL` | Links to fa_payouts batch |
| `total_amount` | `double DEFAULT 0` | Individual transaction amount |
| `payout_method` | `varchar(100) DEFAULT 'manual'` | Payment method: manual, paypal, bank_transfer, etc. |
| `status` | `varchar(100) DEFAULT 'paid'` | Transaction status: paid, pending, failed, cancelled |
| `currency` | `char(3) DEFAULT NULL` | Currency code (USD, EUR, etc.) |
| `settings` | `longtext DEFAULT NULL` | Serialized transaction settings and metadata |
| `created_at` | `timestamp NULL DEFAULT NULL` | Transaction creation timestamp |
| `updated_at` | `timestamp NULL DEFAULT NULL` | Last modification timestamp |

**Indexes:**
- `PRIMARY KEY (id)` - Primary key index
- `KEY fa_pay_status_idx (status)` - Status filtering optimization

### 🗃️ **fa_meta**

Metadata storage for all objects.

| Column | Definition | Comment |
|--------|------------|---------|
| `id` | `bigint unsigned NOT NULL AUTO_INCREMENT` | Primary key, unique meta record identifier |
| `object_type` | `varchar(50) NOT NULL` | Type of object: affiliate, referral, customer, visit, etc. |
| `object_id` | `bigint DEFAULT NULL` | ID of the related object |
| `meta_key` | `varchar(192) NOT NULL` | Metadata key name |
| `value` | `longtext DEFAULT NULL` | Metadata value (JSON, text, or serialized data) |
| `created_at` | `timestamp NULL DEFAULT NULL` | Record creation timestamp |
| `updated_at` | `timestamp NULL DEFAULT NULL` | Last modification timestamp |

**Indexes:**
- `PRIMARY KEY (id)` - Primary key index
- `KEY fa_mt_idx (object_type)` - Object type filtering optimization
- `KEY fa_mto_id_idx (object_id)` - Object ID lookup optimization
- `KEY fa_mto_id_meta_key (meta_key)` - Meta key lookup optimization

## Data Flow

### 🔄 **Typical Data Flow**

1. **Affiliate Registration**
   ```
   Contact/User → fa_affiliates (pending status)
   ```

2. **Visit Tracking**
   ```
   Click Tracking → fa_visits (record visit data)
   Customer Identification → fa_customers (create/update customer)
   ```

3. **Referral Processing**
   ```
   Conversion Event → fa_referrals (create referral record)
   Link to Visit → fa_referrals.visit_id
   Link to Customer → fa_referrals.customer_id
   ```

4. **Payout Processing**
   ```
   Create Payout Batch → fa_payouts
   Process Individual Payouts → fa_payout_transactions
   Link Referrals → fa_referrals.payout_transaction_id
   ```

## Next Steps

Now that you understand the database structure:

1. **[Explore Database Models](/developers/database/models/)** - Learn about the Eloquent models
2. **[Global Functions](/developers/global-functions/)** - Database helper functions
3. **[API Reference](/developers/api/)** - Programmatic database access

---

*Understanding the database schema is crucial for building robust FluentAffiliate extensions. Use this reference when working with models and queries.*
