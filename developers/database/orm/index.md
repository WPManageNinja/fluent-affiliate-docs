# Fluent ORM: Getting Started

Fluent Framework ORM

## Introduction

The Fluent ORM provides a beautiful, simple ActiveRecord implementation for working with your database. Each database table has a corresponding "Model" which is used to interact with that table. Models allow you to query for data in your tables, as well as insert new records into the table.

> [!NOTE]
> Fluent ORM is compatible with the PHP Laravel Framework's Eloquent ORM. If you are familiar with Laravel's Eloquent ORM, you will feel right at home using the Fluent ORM.

## Defining Models

To get started, let's create a Fluent model. Models typically live in the `app/Models` directory, but you are free to place them anywhere that can be auto-loaded according to your `composer.json` file. All Fluent models extend `FluentAffiliate\Framework\Database\Orm\Model` class.

## Fluent Model Conventions

Now, let's look at an example `Affiliate` model, which we will use to retrieve and store information from our `fa_affiliates` database table:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    //
}
```

### Table Names

Note that we did not tell Fluent ORM which table to use for our `Affiliate` model. By convention, the "snake case", plural name of the class will be used as the table name unless another name is explicitly specified. So, in this case, Fluent ORM will assume the `Affiliate` model stores records in the `fa_affiliates` table. You may specify a custom table by defining a `table` property on your model:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'fa_affiliates';
}
```

### Primary Keys

Fluent ORM will also assume that each table has a primary key column named `id`. You may define a protected `$primaryKey` property to override this convention. In addition, Fluent ORM assumes that the primary key is an incrementing integer value, which means that by default the primary key will be cast to an `int` automatically. If you wish to use a non-incrementing or a non-numeric primary key you must set the public `$incrementing` property on your model to `false`. If your primary key is not an integer, you should set the protected `$keyType` property on your model to `string`.

### Timestamps

By default, Fluent ORM expects `created_at` and `updated_at` columns to exist on your tables. If you do not wish to have these columns automatically managed by Fluent ORM, set the `$timestamps` property on your model to `false`:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
}
```

If you need to customize the format of your timestamps, set the `$dateFormat` property on your model. This property determines how date attributes are stored in the database, as well as their format when the model is serialized to an array or JSON:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    /**
     * The storage format of the model's date columns.
     *
     * @var string
     */
    protected $dateFormat = 'U';
}
```

If you need to customize the names of the columns used to store the timestamps, you may set the `CREATED_AT` and `UPDATED_AT` constants in your model:

```php
<?php

class Affiliate extends Model
{
    const CREATED_AT = 'sign_date';
    const UPDATED_AT = 'last_update';
}
```

### Database Connection

By default, all Fluent ORM models will use the default database connection configured for your application. If you would like to specify a different connection for the model, use the `$connection` property:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    /**
     * The connection name for the model.
     *
     * @var string
     */
    protected $connection = 'connection-name';
}
```

### Retrieving Models

Once you have created a model and its associated database table, you are ready to start retrieving data from your database. Think of each Fluent ORM model as a powerful [query builder](/developers/database/query-builder/) allowing you to fluently query the database table associated with the model. For example:

```php
<?php

use FluentAffiliate\App\Models\Affiliate;

$affiliates = Affiliate::all();

foreach ($affiliates as $affiliate) {
    echo $affiliate->payment_email;
}
```

### Adding Additional Constraints

The Fluent ORM `all` method will return all the results in the model's table. Since each Fluent ORM model serves as a [query builder](/developers/database/query-builder/), you may also add constraints to queries, and then use the `get` method to retrieve the results:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::where('status', 'active')
               ->orderBy('total_earnings', 'desc')
               ->take(10)
               ->get();
```

### Collections

For Fluent ORM methods like `all` and get which retrieve multiple results, an instance of `FluentAffiliate\Framework\Database\Orm\Collection` will be returned. The `Collection` class provides a variety of helpful methods for working with your Fluent ORM results:

```php
$affiliates = $affiliates->filter(function ($affiliate) {
    return $affiliate->total_earnings > 100;
});
```

Of course, you may also loop over the collection like an array:

```php
foreach ($affiliates as $affiliate) {
    echo $affiliate->payment_email;
}
```

### Chunking Results

If you need to process thousands of Fluent ORM records, use the `chunk` method. The `chunk` method will retrieve a "chunk" of Fluent ORM models, feeding them to a given `Closure` for processing. Using the chunk method will conserve memory when working with large result sets:

```php
Affiliate::chunk(200, function ($affiliates) {
    foreach ($affiliates as $affiliate) {
        //
    }
});
```

The first argument passed to the method is the number of records you wish to receive per "chunk". The `Closure` passed as the second argument will be called for each chunk that is retrieved from the database. A database query will be executed to retrieve each chunk of records passed to the `Closure`.

### Using Cursors

The `cursor` method allows you to iterate through your database records using a cursor, which will only execute a single query. When processing large amounts of data, the `cursor` method may be used to greatly reduce your memory usage:

```php
foreach (Affiliate::where('status', 'active')->cursor() as $affiliate) {
    //
}
```

## Retrieving Single Models / Aggregates

Of course, in addition to retrieving all the records for a given table, you may also retrieve single records using `find` or `first`. Instead of returning a collection of models, these methods return a single model instance.

```php
// Retrieve a model by its primary key...
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);

// Retrieve the first model matching the query constraints...
$affiliate = FluentAffiliate\App\Models\Affiliate::where('status', 'active')->first();
```

### Not Found Exceptions

Sometimes you may wish to throw an exception if a model is not found. This is particularly useful in routes or controllers. The `findOrFail` and `firstOrFail` methods will retrieve the first result of the query; however, if no result is found, a `FluentAffiliate\Framework\Database\Orm\ModelNotFoundException` will be thrown:

```php
$affiliate = FluentAffiliate\App\Models\Affiliate::findOrFail(1);

$affiliate = FluentAffiliate\App\Models\Affiliate::where('total_earnings', '>', 100)->firstOrFail();
```

## Retrieving Aggregates

You may also use the `count`, `sum`, `max`, and other [aggregate methods](/developers/database/query-builder/#aggregates) provided by the [query builder](/developers/database/query-builder/). These methods return the appropriate scalar value instead of a full model instance:

```php
$count = FluentAffiliate\App\Models\Affiliate::where('status', 'active')->count();

$maxEarnings = FluentAffiliate\App\Models\Affiliate::where('status', 'active')->max('total_earnings');
```

## Inserting & Updating Models

### Inserts

To create a new record in the database, create a new model instance, set attributes on the model, then call the save method:

```php
<?php

namespace FluentAffiliate\App\Http\Controllers;

use FluentAffiliate\App\Models\Affiliate;
use FluentAffiliate\Framework\Request\Request;
use FluentAffiliate\App\Http\Controllers\Controller;

class AffiliateController extends Controller
{
    /**
     * Create a new affiliate instance.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        // Validate the request...

        $affiliate = new Affiliate;

        $affiliate->payment_email = $request->payment_email;
        $affiliate->user_id = $request->user_id;
        $affiliate->status = 'pending';

        $affiliate->save();

        return $affiliate;
    }
}
```

In this example, we assign the `payment_email` and `user_id` parameters from the incoming HTTP request to the respective attributes of the `FluentAffiliate\App\Models\Affiliate` model instance. When we call the `save` method, a record will be inserted into the database. The `created_at` and `updated_at` timestamps will automatically be set when the `save` method is called, so there is no need to set them manually.

### Updates

The `save` method may also be used to update models that already exist in the database. To update a model, you should retrieve it, set any attributes you wish to update, and then call the `save` method. Again, the `updated_at` timestamp will automatically be updated, so there is no need to manually set its value:

```php
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);

$affiliate->status = 'active';

$affiliate->save();
```

### Mass Updates

Updates can also be performed against any number of models that match a given query. In this example, all affiliates that are `pending` and have earnings above $50 will be marked as active:

```php
FluentAffiliate\App\Models\Affiliate::where('status', 'pending')
          ->where('total_earnings', '>', 50)
          ->update(['status' => 'active']);
```

The `update` method expects an array of column and value pairs representing the columns that should be updated.

## Mass Assignment

You may also use the `create` method to save a new model in a single line. The inserted model instance will be returned to you from the method. However, before doing so, you will need to specify either a `fillable` or `guarded` attribute on the model, as all Fluent ORM models protect against mass-assignment by default.

A mass-assignment vulnerability occurs when a user passes an unexpected HTTP parameter through a request, and that parameter changes a column in your database you did not expect. For example, a malicious user might send an `is_admin` parameter through an HTTP request, which is then passed into your model's `create` method, allowing the user to escalate themselves to an administrator.

So, to get started, you should define which model attributes you want to make mass assignable. You may do this using the `$fillable` property on the model. For example, let's make the `payment_email` attribute of our `Affiliate` model mass assignable:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['payment_email', 'user_id', 'status'];
}
```

Once we have made the attributes mass assignable, we can use the `create` method to insert a new record in the database. The `create` method returns the saved model instance:

```php
$affiliate = FluentAffiliate\App\Models\Affiliate::create([
    'payment_email' => 'affiliate@example.com',
    'user_id' => 123,
    'status' => 'pending'
]);
```

### Guarding Attributes

While `$fillable` serves as a "white list" of attributes that should be mass assignable, you may also choose to use `$guarded`. The `$guarded` property should contain an array of attributes that you do not want to be mass assignable. All other attributes not in the array will be mass assignable. So, `$guarded` functions like a "black list". Of course, you should use either `$fillable` or `$guarded` - not both. In the example below, all attributes except for total_earnings will be mass assignable:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = ['total_earnings'];
}
```

If you would like to make all attributes mass assignable, you may define the `$guarded` property as an empty array:

```php
/**
 * The attributes that aren't mass assignable.
 *
 * @var array
 */
protected $guarded = [];
```

## Other Creation Methods

### firstOrCreate/ firstOrNew

There are two other methods you may use to create models by mass assigning attributes: `firstOrCreate` and `firstOrNew`. The `firstOrCreate` method will attempt to locate a database record using the given column / value pairs. If the model can not be found in the database, a record will be inserted with the attributes from the first parameter, along with those in the optional second parameter.

The `firstOrNew` method, like `firstOrCreate` will attempt to locate a record in the database matching the given attributes. However, if a model is not found, a new model instance will be returned. Note that the model returned by `firstOrNew` has not yet been persisted to the database. You will need to call save manually to persist it:

```php
// Retrieve affiliate by email, or create it if it doesn't exist...
$affiliate = FluentAffiliate\App\Models\Affiliate::firstOrCreate(['payment_email' => 'affiliate@example.com']);

// Retrieve affiliate by email, or create it with the email and status attributes...
$affiliate = FluentAffiliate\App\Models\Affiliate::firstOrCreate(
    ['payment_email' => 'affiliate@example.com'],
    ['status' => 'pending', 'user_id' => 123]
);

// Retrieve by email, or instantiate...
$affiliate = FluentAffiliate\App\Models\Affiliate::firstOrNew(['payment_email' => 'affiliate@example.com']);

// Retrieve by email, or instantiate with the email and status attributes...
$affiliate = FluentAffiliate\App\Models\Affiliate::firstOrNew(
    ['payment_email' => 'affiliate@example.com'],
    ['status' => 'pending', 'user_id' => 123]
);
```

### updateOrCreate

You may also come across situations where you want to update an existing model or create a new model if none exists. Fluent ORM provides an `updateOrCreate` method to do this in one step. Like the `firstOrCreate` method, `updateOrCreate` persists the model, so there's no need to call `save()`:

```php
// If there's an affiliate with this email and is pending, activate them.
// If no matching model exists, create one.
$affiliate = FluentAffiliate\App\Models\Affiliate::updateOrCreate(
    ['payment_email' => 'affiliate@example.com', 'status' => 'pending'],
    ['status' => 'active']
);
```

## Deleting Models

To delete a model, call the `delete` method on a model instance:

```php
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);

$affiliate->delete();
```

### Deleting An Existing Model By Key

In the example above, we are retrieving the model from the database before calling the `delete` method. However, if you know the primary key of the model, you may delete the model without retrieving it. To do so, call the `destroy` method:

```php
FluentAffiliate\App\Models\Affiliate::destroy(1);

FluentAffiliate\App\Models\Affiliate::destroy([1, 2, 3]);

FluentAffiliate\App\Models\Affiliate::destroy(1, 2, 3);
```

### Deleting Models By Query

Of course, you may also run a delete statement on a set of models. In this example, we will delete all affiliates that are marked as inactive. Like mass updates, mass deletes will not fire any model events for the models that are deleted:

```php
$deletedRows = FluentAffiliate\App\Models\Affiliate::where('status', 'inactive')->delete();
```

## Soft Deleting

In addition to actually removing records from your database, Fluent Orm can also "soft delete" models. When models are soft deleted, they are not actually removed from your database. Instead, a deleted_at attribute is set on the model and inserted into the database. If a model has a non-null `deleted_at` value, the model has been soft deleted. To enable soft deletes for a model, use the `FluentAffiliate\Framework\Database\Orm\SoftDeletes` trait on the model and add the `deleted_at` column to your $dates property:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;
use FluentAffiliate\Framework\Database\Orm\SoftDeletes;

class Affiliate extends Model
{
    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
}
```

Now, when you call the `delete` method on the model, the `deleted_at` column will be set to the current date and time. And, when querying a model that uses soft deletes, the soft deleted models will automatically be excluded from all query results.

To determine if a given model instance has been soft deleted, use the `trashed` method:

```php
if ($affiliate->trashed()) {
    //
}
```

## Querying Soft Deleted Models

### Including Soft Deleted Models

As noted above, soft deleted models will automatically be excluded from query results. However, you may force soft deleted models to appear in a result set using the `withTrashed` method on the query:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::withTrashed()
                ->where('status', 'active')
                ->get();
```

The `withTrashed` method may also be used on a relationship query:

```php
$affiliate->referrals()->withTrashed()->get();
```

### Retrieving Only Soft Deleted Models

The `onlyTrashed` method will retrieve only soft deleted models:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::onlyTrashed()
                ->where('status', 'active')
                ->get();
```

### Restoring Soft Deleted Models

Sometimes you may wish to "un-delete" a soft deleted model. To restore a soft deleted model into an active state, use the `restore` method on a model instance:

```php
$affiliate->restore();
```

You may also use the `restore` method in a query to quickly restore multiple models. Again, like other "mass" operations, this will not fire any model events for the models that are restored:

```php
FluentAffiliate\App\Models\Affiliate::withTrashed()
        ->where('status', 'active')
        ->restore();
```

Like the `withTrashed` method, the restore method may also be used on relationships:

```php
$affiliate->referrals()->restore();
```

### Permanently Deleting Models

Sometimes you may need to truly remove a model from your database. To permanently remove a soft deleted model from the database, use the `forceDelete` method:

```php
// Force deleting a single model instance...
$affiliate->forceDelete();

// Force deleting all related models...
$affiliate->referrals()->forceDelete();
```

## Query Scopes

### Global Scopes

Global scopes allow you to add constraints to all queries for a given model. Writing your own global scopes can provide a convenient, easy way to make sure every query for a given model receives certain constraints.

### Writing Global Scopes

Writing a global scope is simple. Define a class that implements the `FluentAffiliate\Framework\Database\Orm\Scope` interface. This interface requires you to implement one method: `apply`. The `apply` method may add where constraints to the query as needed:

```php
<?php

namespace FluentAffiliate\App\Scopes;

use FluentAffiliate\Framework\Database\Orm\Scope;
use FluentAffiliate\Framework\Database\Orm\Model;
use FluentAffiliate\Framework\Database\Orm\Builder;

class ActiveScope implements Scope
{
    /**
     * Apply the scope to a given Orm query builder.
     *
     * @param  \FluentAffiliate\Framework\Database\Orm\Builder  $builder
     * @param  \FluentAffiliate\Framework\Database\Orm\Model  $model
     * @return void
     */
    public function apply(Builder $builder, Model $model)
    {
        $builder->where('status', 'active');
    }
}
```

### Applying Global Scopes

To assign a global scope to a model, you should override a given model's boot method and use the `addGlobalScope` method:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\App\Scopes\ActiveScope;
use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope(new ActiveScope);
    }
}
```

After adding the scope, a query to `Affiliate::all()` will produce the following SQL:

```sql
select * from `fa_affiliates` where `status` = 'active'
```

### Anonymous Global Scopes

Orm also allows you to define global scopes using Closures, which is particularly useful for simple scopes that do not warrant a separate class:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;
use FluentAffiliate\Framework\Database\Orm\Builder;

class Affiliate extends Model
{
    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('status', function (Builder $builder) {
            $builder->where('status', 'active');
        });
    }
}
```

### Removing Global Scopes

If you would like to remove a global scope for a given query, you may use the `withoutGlobalScope` method. The method accepts the class name of the global scope as its only argument:

```php
Affiliate::withoutGlobalScope(ActiveScope::class)->get();
```

Or, if you defined the global scope using a Closure:

```php
Affiliate::withoutGlobalScope('status')->get();
```

If you would like to remove several or even all of the global scopes, you may use the `withoutGlobalScopes` method:

```php
// Remove all the global scopes...
Affiliate::withoutGlobalScopes()->get();

// Remove some of global scopes...
Affiliate::withoutGlobalScopes([
    FirstScope::class, SecondScope::class
])->get();
```

## Local Scopes

Local scopes allow you to define common sets of constraints that you may easily re-use throughout your application. For example, you may need to frequently retrieve all affiliates that are considered "high earners". To define a scope, prefix an Orm model method with `scope`.

Scopes should always return a query builder instance:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    /**
     * Scope a query to only include high earning affiliates.
     *
     * @param \FluentAffiliate\Framework\Database\Orm\Builder $query
     * @return \FluentAffiliate\Framework\Database\Orm\Builder
     */
    public function scopeHighEarners($query)
    {
        return $query->where('total_earnings', '>', 1000);
    }

    /**
     * Scope a query to only include active affiliates.
     *
     * @param \FluentAffiliate\Framework\Database\Orm\Builder $query
     * @return \FluentAffiliate\Framework\Database\Orm\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
```

### Utilizing A Local Scope

Once the scope has been defined, you may call the scope methods when querying the model. However, you should not include the scope prefix when calling the method. You can even chain calls to various scopes, for example:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::highEarners()->active()->orderBy('created_at')->get();
```

### Dynamic Scopes

Sometimes you may wish to define a scope that accepts parameters. To get started, just add your additional parameters to your scope. Scope parameters should be defined after the `$query` parameter:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    /**
     * Scope a query to only include affiliates with minimum earnings.
     *
     * @param \FluentAffiliate\Framework\Database\Orm\Builder $query
     * @param float $amount
     * @return \FluentAffiliate\Framework\Database\Orm\Builder
     */
    public function scopeMinEarnings($query, $amount)
    {
        return $query->where('total_earnings', '>=', $amount);
    }

    /**
     * Scope a query to only include affiliates with specific status.
     *
     * @param \FluentAffiliate\Framework\Database\Orm\Builder $query
     * @param string $status
     * @return \FluentAffiliate\Framework\Database\Orm\Builder
     */
    public function scopeOfStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}
```

Now, you may pass the parameters when calling the scope:

```php
$affiliates = FluentAffiliate\App\Models\Affiliate::minEarnings(500)->get();

$activeAffiliates = FluentAffiliate\App\Models\Affiliate::ofStatus('active')->get();
```
