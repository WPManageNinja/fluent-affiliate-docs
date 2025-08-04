# Database Model Basic

## Introduction

FluentAffiliate ORM provides a beautiful, simple ActiveRecord implementation for working with database tables. Each database table has a corresponding "Model" which is used to interact with that table. Models allow you to query for data in db tables, as well as insert new records into the table.

> [!NOTE]
> FluentAffiliate offers helper functions and methods to interact with FluentAffiliate's database so you may use those things instead of Models directly. We are documenting these for our internal usage and very-high level usage by 3rd-party developers.

> [!TIP]
> Our database models are compatible with Laravel's Eloquent ORM. If you are familiar with Laravel's Eloquent models, you will feel right at home using FluentAffiliate's models.

## Built-in FluentAffiliate DB Models

All the built-in database models are available at `fluent-affiliate/app/Models/`

In this Article we will use `FluentAffiliate\App\Models\Affiliate` model as an example.

## Retrieving Models

Think of each Eloquent model as a powerful query builder allowing you to fluently query the database table associated with the model. For example:

```php
<?php

$affiliates = FluentAffiliate\App\Models\Affiliate::all();

foreach ($affiliates as $affiliate) {
    echo $affiliate->payment_email;
}
```

### Adding Additional Constraints

The ORM all method will return all of the results in the model's table. Since each model serves as a query builder, you may also add constraints to queries, and then use the get method to retrieve the results:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::where('status', 'active')
               ->orderBy('created_at', 'DESC')
               ->limit(10)
               ->skip(5)
               ->get();
```

## Retrieving Single Models / Aggregates

Of course, in addition to retrieving all of the records for a given table, you may also retrieve single records using find or first. Instead of returning a collection of models, these methods return a single model instance:

```php
// Retrieve a model by its primary key...
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);

// Retrieve the first model matching the query constraints...
$affiliate = FluentAffiliate\App\Models\Affiliate::where('status', 'active')->first();
```

You may also call the find method with an array of primary keys, which will return a collection of the matching records:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::find([1,2,3]);
```

## Retrieving Aggregates

You may also use the count, sum, max, and other aggregate methods available. These methods return the appropriate scalar value instead of a full model instance:

```php
$count = FluentAffiliate\App\Models\Affiliate::where('status', 'active')->count();

$max = FluentAffiliate\App\Models\Affiliate::where('status', 'active')->max('id');
```

Available aggregate methods such as `count`, `max`, `min`, `avg`, and `sum`.

# Inserting & Updating Models

## Inserts

To create a new record in the database, create a new model instance, set attributes on the model, then call the save method:

```php
$affiliate = FluentAffiliate\App\Models\Affiliate::create([
    'user_id' => 123,
    'group_id' => 1,
    'custom_param' => 'affiliate123',
    'rate' => 10.0,
    'rate_type' => 'percentage',
    'payment_email' => 'affiliate@example.com',
    'status' => 'pending'
]);
```

## Updates

You can update a model few different way. You can assign property and then call `save()` method

```php
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);

$affiliate->status = 'active';
$affiliate->rate = 15.0;
$affiliate->save();
```

You can also update with an array

```php
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);

$affiliate->update([
    'status' => 'active',
    'rate' => 15.0
]);
```

# Accessing Attributes

You can just call the database table column name for accessing the attributes

```php
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);

$userId = $affiliate->user_id;
$status = $affiliate->status;
$rate = $affiliate->rate;
```

# Deleting Models

To delete a model, call the delete method on a model instance:

```php
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);
$affiliate->delete();
```

### Deleting Models By Query

Of course, you may also run a delete statement on a set of models. In this example, we will delete all affiliates that are marked as inactive. Like mass updates, mass deletes will not fire any model events for the models that are deleted:

```php
FluentAffiliate\App\Models\Affiliate::where('status', 'inactive')->delete();
```

# Query Scopes

Scopes allow you to define common sets of constraints that you may easily re-use throughout application. For example, you may need to frequently retrieve all affiliates by given statuses. In FluentAffiliate Affiliate model we already have this scope defined like this.

```php
/**
 * Local scope to filter affiliates by status
 * @param \FluentAffiliate\Framework\Database\Query\Builder $query
 * @param string $status
 * @return \FluentAffiliate\Framework\Database\Query\Builder $query
 */
public function scopeOfStatus($query, $status)
{
    return $query->where('status', $status);
}
```

Now say you want to get affiliates where status equal active

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::ofStatus('active')->get();
```

Please note that, the first letter will be small case.

In the individual model documentation, you will find which FluentAffiliate models have scopes.

### Available Scopes in Affiliate Model

```php
// Filter by status
$affiliates = FluentAffiliate\App\Models\Affiliate::ofStatus('active')->get();

// Search by name/email
$affiliates = FluentAffiliate\App\Models\Affiliate::searchBy('john@example.com')->get();

// Apply custom filters
$affiliates = FluentAffiliate\App\Models\Affiliate::applyCustomFilters($filters)->get();

// Filter by status array
$affiliates = FluentAffiliate\App\Models\Affiliate::byStatus(['active', 'pending'])->get();
```

# Relationships

Database tables are often related to one another. For example, an affiliate has multiple referrals, or multiple visits. FluentAffiliate ORM makes managing and working with these relationships easy. Each Model has predefined relationships and you will find those in the individual model documentation.

```php
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);

// These will return corresponding Referral and Visit collections
$affiliateReferrals = $affiliate->referrals;
$affiliateVisits = $affiliate->visits;
```

For a single relation like a `Referral` belongs to an affiliate

```php
$referral = FluentAffiliate\App\Models\Referral::find(1);
$affiliate = $referral->affiliate; // will return FluentAffiliate\App\Models\Affiliate
```

## Available Models

FluentAffiliate includes the following models:

| Model | Class | Table | Purpose |
|-------|-------|-------|---------|
| **Affiliate** | `FluentAffiliate\App\Models\Affiliate` | `fa_affiliates` | Affiliate management and settings |
| **AffiliateGroup** | `FluentAffiliate\App\Models\AffiliateGroup` | `fa_meta` | Affiliate group management (extends Meta) |
| **Referral** | `FluentAffiliate\App\Models\Referral` | `fa_referrals` | Referral tracking and commissions |
| **Customer** | `FluentAffiliate\App\Models\Customer` | `fa_customers` | Customer information and tracking |
| **Visit** | `FluentAffiliate\App\Models\Visit` | `fa_visits` | Visit tracking and analytics |
| **Transaction** | `FluentAffiliate\App\Models\Transaction` | `fa_payout_transactions` | Individual payout transactions |
| **Payout** | `FluentAffiliate\App\Models\Payout` | `fa_payouts` | Payout batch management |
| **Meta** | `FluentAffiliate\App\Models\Meta` | `fa_meta` | Metadata storage for all objects |
| **Model** | `FluentAffiliate\App\Models\Model` | - | Base model class (extends Framework ORM) |
| **User** | `FluentAffiliate\App\Models\User` | `users` | WordPress user integration |
| **Post** | `FluentAffiliate\App\Models\Post` | `posts` | WordPress post integration |

Each model provides the standard Eloquent functionality along with FluentAffiliate-specific methods and relationships.




