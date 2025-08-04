# Visit Model

**DB Table Name:** `{wp_db_prefix}_fa_visits`

**Schema:** [Check Schema](/developers/database/#fa-visits)

**Source File:** `fluent-affiliate/app/Models/Visit.php`

**Name Space:** `FluentAffiliate\App\Models`

**Class:** `FluentAffiliate\App\Models\Visit`

## Attributes

| Attribute | Data Type | Comment |
|-----------|-----------|---------|
| id | Integer | Primary key |
| affiliate_id | Integer | Links to fa_affiliates |
| user_id | Integer | Links to WordPress users table (if logged in) |
| referral_id | Integer | Links to fa_referrals if visit converted |
| url | Text | Visited URL/landing page |
| referrer | Text | Referring URL (where visitor came from) |
| utm_campaign | String | UTM campaign tracking parameter |
| utm_medium | String | UTM medium tracking parameter |
| utm_source | String | UTM source tracking parameter |
| ip | String | Visitor IP address |
| created_at | Date Time | Visit timestamp |
| updated_at | Date Time | Last modification timestamp |

## Usage

Please check [Model Basic](/developers/database/models/) for Common methods.

### Accessing Attributes

```php
$visit = FluentAffiliate\App\Models\Visit::find(1);

$visit->id; // returns id
$visit->url; // returns visited URL
$visit->utm_source; // returns UTM source
```

## Relations

This model has the following relationships that you can use

### affiliate

Access the associated affiliate of a visit

- **Returns:** `FluentAffiliate\App\Models\Affiliate` Model

#### Example:

```php
// Accessing Affiliate
$affiliate = $visit->affiliate;

// For Filtering by affiliate relationship
$visits = FluentAffiliate\App\Models\Visit::whereHas('affiliate', function($query) {
    $query->where('status', 'active');
})->get();
```

### customer

Access the associated customer of a visit (if identified)

- **Returns:** `FluentAffiliate\App\Models\Customer` Model

#### Example:

```php
// Accessing Customer
$customer = $visit->customer;

// For Filtering by customer relationship
$visits = FluentAffiliate\App\Models\Visit::whereHas('customer', function($query) {
    $query->whereNotNull('email');
})->get();
```

### referrals

Access referrals that resulted from this visit

- **Returns:** `FluentAffiliate\App\Models\Referral` Model Collections

#### Example:

```php
// Accessing Referrals from Visit
$referrals = $visit->referrals;

// For Filtering by referrals relationship
$visits = FluentAffiliate\App\Models\Visit::whereHas('referrals', function($query) {
    $query->where('status', 'paid');
})->get();
```
