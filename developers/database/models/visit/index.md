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
| url | Text | Visited URL/landing page |
| referrer | Text | Referring URL (where visitor came from) |
| utm_campaign | String | UTM campaign tracking parameter |
| referral_id | Integer | Links to fa_referrals if visit converted |
| utm_medium | String | UTM medium tracking parameter |
| utm_source | String | UTM source tracking parameter |
| ip | String | Visitor IP address |
| user_id | Integer | Links to WordPress users table (if logged in) |
| created_at | Date Time | Visit timestamp |
| updated_at | Date Time | Last modification timestamp |

## Searchable Attributes

The following attributes can be searched using the `searchBy()` scope:

| Attribute | Comment |
|-----------|---------|
| url | Visited URL/landing page |
| referrer | Referring URL |
| utm_campaign | UTM campaign parameter |
| utm_medium | UTM medium parameter |
| utm_source | UTM source parameter |

## Usage

Please check [Model Basic](/developers/database/models/) for Common methods.

### Accessing Attributes

```php
$visit = FluentAffiliate\App\Models\Visit::find(1);

$visit->id; // returns id
$visit->url; // returns visited URL
$visit->utm_source; // returns UTM source
```

## Scopes

This model has the following scopes that you can use

### searchBy($search)

Search visits by various fields

- **Parameters**
  - $search - string

#### Usage:

```php
// Search visits by URL, referrer, or UTM parameters
$visits = FluentAffiliate\App\Models\Visit::searchBy('facebook')->get();

// Column-specific search
$visits = FluentAffiliate\App\Models\Visit::searchBy('utm_source:facebook')->get();

// Exact match search
$visits = FluentAffiliate\App\Models\Visit::searchBy('utm_medium=social')->get();
```

### byConvertedStatus($convertedStatus)

Filter visits by conversion status

- **Parameters**
  - $convertedStatus - string ('converted', 'not_converted')

#### Usage:

```php
// Get visits that converted to referrals
$visits = FluentAffiliate\App\Models\Visit::byConvertedStatus('converted')->get();

// Get visits that did not convert
$visits = FluentAffiliate\App\Models\Visit::byConvertedStatus('not_converted')->get();
```

### applyCustomFilters($filters)

Apply custom filters to visit queries

- **Parameters**
  - $filters - array

#### Usage:

```php
// Apply custom filters for conversion status
$filters = [
    ['operator' => 'YES'], // Has referral_id (converted)
    ['operator' => 'NO']   // No referral_id (not converted)
];
$visits = FluentAffiliate\App\Models\Visit::applyCustomFilters($filters)->get();
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
