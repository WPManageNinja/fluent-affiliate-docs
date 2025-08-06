# Fluent ORM: Mutators

Fluent Framework ORM

## Introduction

Accessors and mutators allow you to format Fluent ORM attribute values when you retrieve or set them on model instances. For example, you may want to use accessors to format affiliate payment emails or mutators to automatically hash sensitive data before storing it in the database.

## Accessors & Mutators

### Defining An Accessor

To define an accessor, create a `getPaymentEmailAttribute` method on your model where PaymentEmail is the "studly" cased name of the column you wish to access. In this example, we'll define an accessor for the `payment_email` attribute. The accessor will automatically be called by Fluent ORM when attempting to retrieve the value of the `payment_email` attribute:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    /**
     * Get the affiliate's formatted payment email.
     *
     * @param  string  $value
     * @return string
     */
    public function getPaymentEmailAttribute($value)
    {
        return strtolower($value);
    }
}
```

As you can see, the original value of the column is passed to the accessor, allowing you to manipulate and return the value. To access the value of the accessor, you may access the `payment_email` attribute on a model instance:

```php
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);

$paymentEmail = $affiliate->payment_email;
```

Of course, you may also use accessors to return new, computed values from existing attributes:

```php
/**
 * Get the affiliate's full display name.
 *
 * @return string
 */
public function getDisplayNameAttribute()
{
    $user = $this->user;
    return $user ? $user->display_name : $this->payment_email;
}

/**
 * Get the affiliate's commission rate as percentage.
 *
 * @return string
 */
public function getCommissionRatePercentageAttribute()
{
    $rateDetails = $this->getRateDetails();
    return $rateDetails['rate'] . '%';
}
```

### Defining A Mutator

To define a mutator, define a `setPaymentEmailAttribute` method on your model where PaymentEmail is the "studly" cased name of the column you wish to access. So, again, let's define a mutator for the `payment_email` attribute. This mutator will be automatically called when we attempt to set the value of the `payment_email` attribute on the model:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    /**
     * Set the affiliate's payment email.
     *
     * @param  string  $value
     * @return void
     */
    public function setPaymentEmailAttribute($value)
    {
        $this->attributes['payment_email'] = strtolower(trim($value));
    }
}
```

The mutator will receive the value that is being set on the attribute, allowing you to manipulate the value and set the manipulated value on the Fluent ORM model's internal `$attributes` property. So, for example, if we attempt to set the `payment_email` attribute to `AFFILIATE@EXAMPLE.COM`:

```php
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);

$affiliate->payment_email = 'AFFILIATE@EXAMPLE.COM';
```

In this example, the `setPaymentEmailAttribute` function will be called with the value `AFFILIATE@EXAMPLE.COM`. The mutator will then apply the `strtolower` and `trim` functions to the email and set its resulting value in the internal `$attributes` array.

### Real FluentAffiliate Examples

Here are some practical examples of accessors and mutators used in FluentAffiliate models:

#### Affiliate Model Examples

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    /**
     * Get the user details (appended attribute).
     *
     * @return array
     */
    public function getUserDetailsAttribute()
    {
        $user = $this->user;
        if (!$user) {
            return [];
        }

        return [
            'full_name' => $user->display_name,
            'edit_url' => admin_url('user-edit.php?user_id=' . $user->ID),
            'email' => $user->user_email,
            'avatar' => get_avatar_url($user->user_email, 40),
            'affiliate_id' => $this->id,
            'website' => $user->user_url,
            'user_name' => $user->user_login
        ];
    }

    /**
     * Set the status attribute with validation.
     *
     * @param  string  $value
     * @return void
     */
    public function setStatusAttribute($value)
    {
        $allowedStatuses = ['active', 'pending', 'inactive', 'rejected'];
        $this->attributes['status'] = in_array($value, $allowedStatuses) ? $value : 'pending';
    }
}
```

#### Customer Model Examples

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Customer extends Model
{
    /**
     * Get the customer's full name.
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        return trim($this->first_name . ' ' . $this->last_name);
    }

    /**
     * Get the customer's photo/avatar.
     *
     * @return string
     */
    public function getPhotoAttribute()
    {
        if ($this->avatar) {
            return $this->avatar;
        }

        return get_avatar_url($this->email, 40);
    }

    /**
     * Set settings data (auto-serialized).
     *
     * @param  mixed  $value
     * @return void
     */
    public function setSettingsAttribute($value)
    {
        $this->attributes['settings'] = maybe_serialize($value);
    }

    /**
     * Get settings data (auto-unserialized).
     *
     * @param  mixed  $value
     * @return mixed
     */
    public function getSettingsAttribute($value)
    {
        return maybe_unserialize($value);
    }
}
```

### Date Mutators

By default, Fluent ORM will convert the `created_at` and `updated_at` columns to instances of `DateTime`, which provide an assortment of helpful methods. You may customize which dates are automatically mutated, and even completely disable this mutation, by overriding the `$dates` property of your model:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Referral extends Model
{
    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'created_at',
        'updated_at',
        'converted_at'
    ];
}
```

When a column is considered a date, you may set its value to a UNIX timestamp, date string `(Y-m-d)`, date-time string, and of course a `DateTime` instance, and the date's value will automatically be correctly stored in your database:

```php
$referral = FluentAffiliate\App\Models\Referral::find(1);

$referral->converted_at = now();

$referral->save();
```

As noted above, when retrieving attributes that are listed in your `$dates` property, they will automatically be cast to `DateTime` instances, allowing you to use any of `DateTime`'s methods on your attributes:

```php
$referral = FluentAffiliate\App\Models\Referral::find(1);

return $referral->converted_at->getTimestamp();
```

### Date Formats

By default, timestamps are formatted as `Y-m-d H:i:s`. If you need to customize the timestamp format, set the `$dateFormat` property on your model. This property determines how date attributes are stored in the database, as well as their format when the model is serialized to an array or JSON:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Visit extends Model
{
    /**
     * The storage format of the model's date columns.
     *
     * @var string
     */
    protected $dateFormat = 'U';
}
```

## Attribute Casting

The `$casts` property on your model provides a convenient method of converting attributes to common data types. The `$casts` property should be an array where the key is the name of the attribute being cast and the value is the type you wish to cast the column to. The supported cast types are: `int`, `integer`, `real`, `float`, `double`, `string`, `boolean`, `bool`, `object`, `array`, `json`, `collection`, `date`, `datetime`, and `timestamp`.

For example, let's cast the `is_active` attribute, which is stored in our database as an integer `(0 or 1)` to a boolean value:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'is_active' => 'boolean',
        'total_earnings' => 'float',
        'referrals' => 'integer',
        'visits' => 'integer'
    ];
}
```

Now the `is_active` attribute will always be cast to a boolean when you access it, even if the underlying value is stored in the database as an integer:

```php
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);

if ($affiliate->is_active) {
    // Affiliate is active
}
```

## Array & JSON Casting

The `array` cast type is particularly useful when working with columns that are stored as serialized JSON. For example, if your database has a JSON or TEXT field type that contains serialized JSON, adding the array cast to that attribute will automatically deserialize the attribute to a PHP array when you access it on your Fluent ORM model:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Referral extends Model
{
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'products' => 'array',
        'settings' => 'array',
        'utm_data' => 'array'
    ];
}
```

Once the cast is defined, you may access the `products` attribute and it will automatically be deserialized from JSON into a PHP array. When you set the value of the `products` attribute, the given array will automatically be serialized back into JSON for storage:

```php
$referral = FluentAffiliate\App\Models\Referral::find(1);

$products = $referral->products;

$products[] = ['id' => 123, 'name' => 'New Product'];

$referral->products = $products;

$referral->save();
```

## Date Casting

When using the `date` or `datetime` cast type, you may specify the date's format:

```php
/**
 * The attributes that should be cast to native types.
 *
 * @var array
 */
protected $casts = [
    'created_at' => 'datetime:Y-m-d',
    'converted_at' => 'datetime:Y-m-d H:i:s'
];
```

## WordPress Integration

FluentAffiliate models often use WordPress-specific functions in their mutators and accessors:

```php
/**
 * Set value using WordPress serialization.
 *
 * @param  mixed  $value
 * @return void
 */
public function setSettingsAttribute($value)
{
    $this->attributes['settings'] = maybe_serialize($value);
}

/**
 * Get value using WordPress unserialization.
 *
 * @param  mixed  $value
 * @return mixed
 */
public function getSettingsAttribute($value)
{
    return maybe_unserialize($value);
}
```

This ensures compatibility with WordPress's data handling conventions and provides seamless integration with the WordPress ecosystem.
