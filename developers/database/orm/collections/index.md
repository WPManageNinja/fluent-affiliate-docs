# Fluent ORM: Collections

Fluent Framework ORM

## Introduction

All multi-result sets returned by Fluent ORM are instances of the `FluentAffiliate\Framework\Database\Orm\Collection` object, including results retrieved via the `get` method or accessed via a relationship. The Fluent ORM collection naturally inherits dozens of methods used to fluently work with the underlying array of Fluent ORM models.

Of course, all collections also serve as iterators, allowing you to loop over them as if they were simple PHP arrays:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::where('status', 'active')->get();

foreach ($affiliates as $affiliate) {
    echo $affiliate->payment_email;
}
```

However, collections are much more powerful than arrays and expose a variety of `map` / `reduce` operations that may be chained using an intuitive interface. For example, let's remove all inactive affiliates and gather the payment email for each remaining affiliate:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::all();

$emails = $affiliates->reject(function ($affiliate) {
    return $affiliate->status === 'inactive';
})
->map(function ($affiliate) {
    return $affiliate->payment_email;
});
```

## Available Methods

All Fluent ORM collections extend the base Fluent Framework collection object; therefore, they inherit all the powerful methods provided by the base collection class:

[all](#all) [average](#average) [avg](#avg) [chunk](#chunk) [collapse](#collapse) [combine](#combine) [concat](#concat) [contains](#contains) [count](#count) [diff](#diff) [diffKeys](#diffKeys) [each](#each) [every](#every) [except](#except) [filter](#filter) [first](#first) [flatMap](#flatMap) [flatten](#flatten) [flip](#flip) [forget](#forget) [forPage](#forPage) [get](#get) [groupBy](#groupBy) [has](#has) [implode](#implode) [intersect](#intersect) [isEmpty](#isEmpty) [keyBy](#keyBy) [keys](#keys) [last](#last) [map](#map) [max](#max) [median](#median) [merge](#merge) [min](#min) [mode](#mode) [only](#only) [pipe](#pipe) [pluck](#pluck) [pop](#pop) [prepend](#prepend) [pull](#pull) [push](#push) [put](#put) [random](#random) [reduce](#reduce) [reject](#reject) [reverse](#reverse) [search](#search) [shift](#shift) [shuffle](#shuffle) [slice](#slice) [sort](#sort) [sortBy](#sortBy) [sortByDesc](#sortByDesc) [splice](#splice) [split](#split) [sum](#sum) [take](#take) [toArray](#toArray) [toJson](#toJson) [jsonSerialize](#jsonSerialize) [transform](#transform) [union](#union) [unique](#unique) [values](#values) [where](#where) [whereIn](#whereIn) [zip](#zip)

## Method Listing

### all()

The `all` method returns the underlying array represented by the collection:

```php
collect([1, 2, 3])->all();

// [1, 2, 3]
```

### average()

Alias for the `avg` method.

### avg()

The `avg` method returns the average value of a given key:

```php
$average = collect([
    ['total_earnings' => 100], 
    ['total_earnings' => 200], 
    ['total_earnings' => 300], 
    ['total_earnings' => 400]
])->avg('total_earnings');

// 250

$average = collect([100, 200, 300, 400])->avg();

// 250
```

### chunk()

The `chunk` method breaks the collection into multiple, smaller collections of a given size:

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7]);

$chunks = $collection->chunk(4);

$chunks->toArray();

// [[1, 2, 3, 4], [5, 6, 7]]
```

### contains()

The contains method determines whether the collection contains a given item:

```php
$collection = collect([
    ['payment_email' => 'affiliate@example.com', 'total_earnings' => 100],
    ['payment_email' => 'partner@example.com', 'total_earnings' => 200]
]);

$collection->contains('payment_email', 'affiliate@example.com');

// true

$collection->contains('payment_email', 'unknown@example.com');

// false
```

You may also pass a callback to the `contains` method to perform your own truth test:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::all();

$hasHighEarner = $affiliates->contains(function ($affiliate) {
    return $affiliate->total_earnings > 1000;
});

// true or false
```

### count()

The `count` method returns the total number of items in the collection:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::where('status', 'active')->get();

$affiliates->count();

// 25
```

### filter()

The `filter` method filters the collection using the given callback, keeping only those items that pass a given truth test:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::all();

$activeAffiliates = $affiliates->filter(function ($affiliate) {
    return $affiliate->status === 'active';
});

$activeAffiliates->all();
```

If no callback is supplied, all entries of the collection that are equivalent to false will be removed:

```php
$collection = collect([1, 2, 3, null, false, '', 0, []]);

$collection->filter()->all();

// [1, 2, 3]
```

For the inverse of `filter`, see the [`reject`](#reject) method.

### first()

The `first` method returns the first element in the collection that passes a given truth test:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::all();

$topEarner = $affiliates->first(function ($affiliate) {
    return $affiliate->total_earnings > 500;
});

// Returns first affiliate with earnings > 500
```

You may also call the `first` method with no arguments to get the first element in the collection:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::all();

$firstAffiliate = $affiliates->first();

// Returns first affiliate in collection
```

### groupBy()

The `groupBy` method groups the collection's items by a given key:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::all();

$grouped = $affiliates->groupBy('status');

$grouped->toArray();

/*
[
    'active' => [
        ['id' => 1, 'status' => 'active', 'payment_email' => 'affiliate1@example.com'],
        ['id' => 2, 'status' => 'active', 'payment_email' => 'affiliate2@example.com'],
    ],
    'pending' => [
        ['id' => 3, 'status' => 'pending', 'payment_email' => 'affiliate3@example.com'],
    ],
]
*/
```

Instead of passing a string `key`, you may pass a callback. The callback should return the value you wish to key the group by:

```php
$grouped = $affiliates->groupBy(function ($affiliate) {
    return $affiliate->total_earnings > 100 ? 'high_earner' : 'low_earner';
});
```

### map()

The `map` method iterates through the collection and passes each value to the given callback. The callback is free to modify the item and return it, thus forming a new collection of modified items:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::all();

$emails = $affiliates->map(function ($affiliate) {
    return $affiliate->payment_email;
});

$emails->all();

// ['affiliate1@example.com', 'affiliate2@example.com', ...]
```

### max()

The `max` method returns the maximum value of a given key:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::all();

$maxEarnings = $affiliates->max('total_earnings');

// 1500.00

$max = collect([100, 200, 300, 400, 500])->max();

// 500
```

### pluck()

The `pluck` method retrieves all of the values for a given key:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::all();

$emails = $affiliates->pluck('payment_email');

$emails->all();

// ['affiliate1@example.com', 'affiliate2@example.com', ...]
```

You may also specify how you wish the resulting collection to be keyed:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::all();

$emailsById = $affiliates->pluck('payment_email', 'id');

$emailsById->all();

// [1 => 'affiliate1@example.com', 2 => 'affiliate2@example.com', ...]
```

### reject()

The `reject` method filters the collection using the given callback. The callback should return `true` if the item should be removed from the resulting collection:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::all();

$activeAffiliates = $affiliates->reject(function ($affiliate) {
    return $affiliate->status === 'inactive';
});

$activeAffiliates->all();
```

For the inverse of `reject`, see the [`filter`](#filter) method.

### sortBy()

The `sortBy` method sorts the collection by the given key:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::all();

$sorted = $affiliates->sortBy('total_earnings');

$sorted->values()->all();

// Affiliates sorted by earnings (lowest to highest)
```

You can also pass your own callback to determine how to sort the collection values:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::all();

$sorted = $affiliates->sortBy(function ($affiliate) {
    return $affiliate->referrals()->count();
});

$sorted->values()->all();

// Affiliates sorted by referral count
```

### sum()

The sum method returns the sum of all items in the collection:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::all();

$totalEarnings = $affiliates->sum('total_earnings');

// 15750.00
```

If the collection contains nested arrays or objects, you should pass a key to use for determining which values to sum:

```php
$referrals = FluentAffiliate\App\Models\Referral::all();

$totalCommissions = $referrals->sum('amount');

// 2500.00
```

In addition, you may pass your own callback to determine which values of the collection to sum:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::all();

$totalReferrals = $affiliates->sum(function ($affiliate) {
    return $affiliate->referrals;
});

// 150
```

### where()

The `where` method filters the collection by a given key / value pair:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::all();

$activeAffiliates = $affiliates->where('status', 'active');

$activeAffiliates->all();

/*
[
    ['id' => 1, 'status' => 'active', 'payment_email' => 'affiliate1@example.com'],
    ['id' => 2, 'status' => 'active', 'payment_email' => 'affiliate2@example.com'],
]
*/
```

The `where` method uses "loose" comparisons when checking item values, meaning a string with an integer value will be considered equal to an integer of the same value.

### whereIn()

The `whereIn` method filters the collection by a given key / value contained within the given array:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::all();

$filteredAffiliates = $affiliates->whereIn('status', ['active', 'pending']);

$filteredAffiliates->all();

/*
[
    ['id' => 1, 'status' => 'active', 'payment_email' => 'affiliate1@example.com'],
    ['id' => 2, 'status' => 'active', 'payment_email' => 'affiliate2@example.com'],
    ['id' => 3, 'status' => 'pending', 'payment_email' => 'affiliate3@example.com'],
]
*/
```

## Practical Examples with FluentAffiliate

### Working with Affiliate Collections

```php
// Get all active affiliates with high earnings
$topAffiliates = FluentAffiliate\App\Models\Affiliate::where('status', 'active')
    ->get()
    ->filter(function ($affiliate) {
        return $affiliate->total_earnings > 1000;
    })
    ->sortByDesc('total_earnings')
    ->take(10);

// Get payment emails for bulk operations
$paymentEmails = $topAffiliates->pluck('payment_email');

// Calculate total earnings
$totalEarnings = $topAffiliates->sum('total_earnings');

// Group by earnings tier
$groupedByTier = $topAffiliates->groupBy(function ($affiliate) {
    if ($affiliate->total_earnings > 5000) return 'platinum';
    if ($affiliate->total_earnings > 2000) return 'gold';
    return 'silver';
});
```

### Working with Referral Collections

```php
// Get referrals and analyze performance
$referrals = FluentAffiliate\App\Models\Referral::where('status', 'paid')
    ->get()
    ->groupBy('affiliate_id')
    ->map(function ($affiliateReferrals) {
        return [
            'count' => $affiliateReferrals->count(),
            'total_amount' => $affiliateReferrals->sum('amount'),
            'average_amount' => $affiliateReferrals->avg('amount')
        ];
    });

// Find top performing affiliates
$topPerformers = $referrals->sortByDesc('total_amount')->take(5);
```
