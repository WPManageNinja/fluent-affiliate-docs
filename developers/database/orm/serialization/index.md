# Fluent ORM: Serialization

Fluent Framework ORM

## Introduction

When building JSON APIs, you will often need to convert your models and relationships to arrays or JSON. Fluent ORM includes convenient methods for making these conversions, as well as controlling which attributes are included in your serializations.

## Serializing Models & Collections

### Serializing To Arrays

To convert a model and its loaded [relationships](/developers/database/orm/relationship/) to an array, you should use the `toArray` method. This method is recursive, so all attributes and all relations (including the relations of relations) will be converted to arrays:

```php
$affiliate = FluentAffiliate\App\Models\Affiliate::with('referrals')->first();

return $affiliate->toArray();
```

You may also convert entire [collections](/developers/database/orm/collections/) of models to arrays:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::all();

return $affiliates->toArray();
```

### Serializing To JSON

To convert a model to JSON, you should use the `toJson` method. Like `toArray`, the toJson method is recursive, so all attributes and relations will be converted to JSON. You may also specify JSON encoding options supported by PHP:

```php
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);

return $affiliate->toJson();

return $affiliate->toJson(JSON_PRETTY_PRINT);
```

Alternatively, you may cast a model or collection to a string, which will automatically call the `toJson` method on the model or collection:

```php
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);

return (string) $affiliate;
```

Since models and collections are converted to JSON when cast to a string, you can return Fluent ORM objects directly from your application's routes or controllers:

```php
Route::get('affiliates', function () {
    return FluentAffiliate\App\Models\Affiliate::all();
});
```

## Hiding Attributes From JSON

Sometimes you may wish to limit the attributes, such as sensitive payment information, that are included in your model's array or JSON representation. To do so, add a `$hidden` property to your model:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['api_key', 'secret_token'];
}
```

> [!NOTE]
> When hiding relationships, use the relationship's method name.

Alternatively, you may use the `visible` property to define a white-list of attributes that should be included in your model's array and JSON representation. All other attributes will be hidden when the model is converted to an array or JSON:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
    protected $visible = ['id', 'payment_email', 'status', 'total_earnings'];
}
```

### Temporarily Modifying Attribute Visibility

If you would like to make some typically hidden attributes visible on a given model instance, you may use the `makeVisible` method. The makeVisible method returns the model instance for convenient method chaining:

```php
return $affiliate->makeVisible('api_key')->toArray();
```

Likewise, if you would like to make some typically visible attributes hidden on a given model instance, you may use the `makeHidden` method:

```php
return $affiliate->makeHidden('total_earnings')->toArray();
```

## Appending Values To JSON

Occasionally, when casting models to an array or JSON, you may wish to add attributes that do not have a corresponding column in your database. To do so, first define an accessor for the value:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    /**
     * Get the affiliate's commission rate as percentage.
     *
     * @return string
     */
    public function getCommissionRateAttribute()
    {
        $rateDetails = $this->getRateDetails();
        return $rateDetails['rate'] . '%';
    }

    /**
     * Get the affiliate's performance tier.
     *
     * @return string
     */
    public function getPerformanceTierAttribute()
    {
        if ($this->total_earnings > 5000) return 'platinum';
        if ($this->total_earnings > 2000) return 'gold';
        if ($this->total_earnings > 500) return 'silver';
        return 'bronze';
    }
}
```

After creating the accessor, add the attribute name to the `appends` property on the model. Note that attribute names are typically referenced in "snake case", even though the accessor is defined using "camel case":

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['user_details', 'commission_rate', 'performance_tier'];
}
```

Once the attribute has been added to the `appends` list, it will be included in both the model's array and JSON representations. Attributes in the `appends` array will also respect the `visible` and `hidden` settings configured on the model.

### Appending At Run Time

You may instruct a single model instance to `append` attributes using the `append` method. Or, you may use the `setAppends` method to override the entire array of appended properties for a given model instance:

```php
return $affiliate->append('commission_rate')->toArray();

return $affiliate->setAppends(['commission_rate', 'performance_tier'])->toArray();
```

## FluentAffiliate Serialization Examples

### Affiliate Model Serialization

```php
// Basic affiliate serialization
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);

$affiliateArray = $affiliate->toArray();
/*
[
    'id' => 1,
    'user_id' => 123,
    'payment_email' => 'affiliate@example.com',
    'status' => 'active',
    'total_earnings' => 1250.50,
    'referrals' => 25,
    'visits' => 150,
    'created_at' => '2024-01-15 10:30:00',
    'updated_at' => '2024-01-20 14:45:00',
    'user_details' => [
        'full_name' => 'John Doe',
        'email' => 'john@example.com',
        'avatar' => 'https://...',
        // ... more user details
    ]
]
*/

// Affiliate with relationships
$affiliate = FluentAffiliate\App\Models\Affiliate::with(['referrals', 'group'])->find(1);

$affiliateWithRelations = $affiliate->toArray();
/*
[
    'id' => 1,
    'payment_email' => 'affiliate@example.com',
    // ... other affiliate attributes
    'referrals' => [
        [
            'id' => 1,
            'amount' => 50.00,
            'status' => 'paid',
            // ... referral attributes
        ],
        // ... more referrals
    ],
    'group' => [
        'id' => 1,
        'meta_key' => 'premium_group',
        'value' => [
            'rate' => 25,
            'rate_type' => 'percentage'
        ]
    ]
]
*/
```

### Referral Model Serialization

```php
// Referral with hidden sensitive data
class Referral extends Model
{
    protected $hidden = ['internal_notes', 'admin_flags'];
    
    protected $appends = ['formatted_amount', 'days_since_created'];
    
    public function getFormattedAmountAttribute()
    {
        return '$' . number_format($this->amount, 2);
    }
    
    public function getDaysSinceCreatedAttribute()
    {
        return $this->created_at->diffInDays(now());
    }
}

$referral = FluentAffiliate\App\Models\Referral::find(1);

$referralArray = $referral->toArray();
/*
[
    'id' => 1,
    'affiliate_id' => 1,
    'amount' => 50.00,
    'status' => 'paid',
    'provider' => 'woocommerce',
    'created_at' => '2024-01-15 10:30:00',
    'formatted_amount' => '$50.00',
    'days_since_created' => 5
    // 'internal_notes' and 'admin_flags' are hidden
]
*/
```

### Customer Model Serialization

```php
class Customer extends Model
{
    protected $appends = ['full_name', 'photo'];
    
    protected $hidden = ['settings']; // Hide internal settings
    
    public function getFullNameAttribute()
    {
        return trim($this->first_name . ' ' . $this->last_name);
    }
    
    public function getPhotoAttribute()
    {
        return $this->avatar ?: get_avatar_url($this->email, 40);
    }
}

$customer = FluentAffiliate\App\Models\Customer::find(1);

$customerArray = $customer->toArray();
/*
[
    'id' => 1,
    'first_name' => 'Jane',
    'last_name' => 'Smith',
    'email' => 'jane@example.com',
    'created_at' => '2024-01-10 09:15:00',
    'full_name' => 'Jane Smith',
    'photo' => 'https://gravatar.com/avatar/...'
    // 'settings' is hidden
]
*/
```

### Collection Serialization

```php
// Serialize collection of affiliates
$affiliates = FluentAffiliate\App\Models\Affiliate::where('status', 'active')
    ->with('referrals')
    ->get();

$affiliatesArray = $affiliates->toArray();

// Convert to JSON for API response
$affiliatesJson = $affiliates->toJson(JSON_PRETTY_PRINT);

// Group and serialize
$groupedAffiliates = $affiliates->groupBy('status')->toArray();
```

### API Response Examples

```php
// API endpoint returning affiliate data
function getAffiliate($id) {
    $affiliate = FluentAffiliate\App\Models\Affiliate::with(['referrals', 'group'])
        ->find($id);
    
    if (!$affiliate) {
        return response()->json(['error' => 'Affiliate not found'], 404);
    }
    
    // Temporarily show additional data for API
    return $affiliate->append('commission_rate')
                    ->makeVisible('api_key')
                    ->toJson();
}

// API endpoint with filtered data
function getAffiliatePublic($id) {
    $affiliate = FluentAffiliate\App\Models\Affiliate::find($id);
    
    // Only show public information
    return $affiliate->setVisible(['id', 'status', 'total_earnings'])
                    ->append('performance_tier')
                    ->toJson();
}
```

## WordPress Integration

FluentAffiliate models work seamlessly with WordPress's JSON handling:

```php
// WordPress-compatible serialization
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);

// Use WordPress functions for consistent formatting
$affiliateData = $affiliate->toArray();
$affiliateData['formatted_date'] = date_i18n(get_option('date_format'), strtotime($affiliate->created_at));

// Return as WordPress REST API response
return new WP_REST_Response($affiliateData, 200);
```

This ensures that your FluentAffiliate data integrates perfectly with WordPress's existing API infrastructure and follows WordPress coding standards.
