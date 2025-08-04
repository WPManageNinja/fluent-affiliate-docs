# FluentAffiliate Query Builder

## Introduction

FluentAffiliate's database query builder provides a convenient, fluent interface to creating and running database queries. It can be used to perform most database operations in your application.

> [!TIP]
> Our Query Builder is compatible with Laravel's Query Builder. If you are familiar with Laravel's Query Builder, you will feel right at home using FluentAffiliate's Query Builder.

### Example

Here is an example FluentAffiliate Query Builder

```php
$query = FluentAffiliate('db')->table('fa_referrals')
            ->select(['amount', 'status', 'type'])
            ->where('provider', 'woocommerce')
            ->whereBetween('created_at', ['2022-12-05 00:00:00', '2022-12-30 23:59:59'])
            ->when($affiliateId, function ($query) use ($affiliateId) {
                return $query->where('affiliate_id', $affiliateId);
            })
            ->orderBy('created_at', 'ASC');
```

# Retrieving Results

## Retrieving All Rows From A Table

You may use the `table` method on the `FluentAffiliate('db')` function to begin a query. The `table` method returns a fluent query builder instance for the given table, allowing you to chain more constraints onto the query and then finally get the results using the `get` method:

```php
<?php

namespace FluentAffiliate\App\Http\Controllers;

class AffiliateController extends Controller
{
    /**
     * Show a list of all active affiliates.
     *
     * @return Response
     */
    public function index()
    {
        $affiliates = FluentAffiliate('db')->table('fa_affiliates')->get();

        return [
            'affiliates' => $affiliates
        ];   
    }
}
```

The `get` method returns an array containing the results where each result is an instance of the PHP stdClass object. You may access each column's value by accessing the column as a property of the object:

```php
foreach ($affiliates as $affiliate) {
    echo $affiliate->payment_email;
}
```

## Retrieving A Single Row / Column From A Table

If you just need to retrieve a single row from the database table, you may use the `first` method. This method will return a single stdClass object:

```php
$affiliate = FluentAffiliate('db')->table('fa_affiliates')->where('status', 'active')->first();

echo $affiliate->payment_email;
```

If you don't even need an entire row, you may extract a single value from a record using the `value` method. This method will return the value of the column directly:

```php
$email = FluentAffiliate('db')->table('fa_affiliates')->where('user_id', 123)->value('payment_email');
```

## Retrieving A List Of Column Values

If you would like to retrieve an array containing the values of a single column, you may use the `pluck` method. In this example, we'll retrieve an array of payment emails:

```php
$emails = FluentAffiliate('db')->table('fa_affiliates')->pluck('payment_email');

foreach ($emails as $email) {
    echo $email;
}
```

You may also specify a custom key column for the returned Collection:

```php
$emails = FluentAffiliate('db')->table('fa_affiliates')->pluck('payment_email', 'id');

foreach ($emails as $id => $email) {
    echo $email;
}
```

## Chunking Results

If you need to work with thousands of database records, consider using the `chunk` method. This method retrieves a small chunk of the results at a time and feeds each chunk into a Closure for processing. This method is very useful for processing thousands of records. For example, let's work with the entire `fa_affiliates` table in chunks of 100 records at a time:

```php
FluentAffiliate('db')->table('fa_affiliates')->orderBy('id')->chunk(100, function ($affiliates) {
    foreach ($affiliates as $affiliate) {
        //
    }
});
```

You may stop further chunks from being processed by returning false from the Closure:

```php
FluentAffiliate('db')->table('fa_affiliates')->orderBy('id')->chunk(100, function ($affiliates) {
    // Process the records...
    
    return false;
});
```

## Aggregates

The query builder also provides a variety of aggregate methods such as `count`, `max`, `min`, `avg`, and `sum`. You may call any of these methods after constructing your query:

```php
$affiliates = FluentAffiliate('db')->table('fa_affiliates')->count();

$maxEarnings = FluentAffiliate('db')->table('fa_referrals')->max('amount');
```

Of course, you may combine these methods with other clauses:

```php
$avgCommission = FluentAffiliate('db')->table('fa_referrals')
                ->where('provider', 'woocommerce')
                ->avg('amount');
```

## Determining If Records Exist

Instead of using the `count` method to determine if any records exist that match your query's constraints, you may use the `exists`:

```php
return FluentAffiliate('db')->table('fa_referrals')->where('provider', 'woocommerce')->exists();
```

# Selects

## Specifying A Select Clause

Of course, you may not always want to select all columns from a database table. Using the `select` method, you can specify a custom `select` clause for the query:

```php
$affiliates = FluentAffiliate('db')->table('fa_affiliates')->select('user_id', 'payment_email as email')->get();
```

The `distinct` method allows you to force the query to return distinct results:

```php
$affiliates = FluentAffiliate('db')->table('fa_affiliates')->distinct()->get();
```

If you already have a query builder instance and wish to add a column to its existing select clause, you may use the `addSelect` method:

```php
$query = FluentAffiliate('db')->table('fa_affiliates')->select('user_id');

$affiliates = $query->addSelect('payment_email')->get();
```

# Raw Expressions

Sometimes you may need to use a raw expression in a query. To create a raw expression, you may use the `raw` method:

```php
$affiliates = FluentAffiliate('db')->table('fa_affiliates')
                     ->select(FluentAffiliate('db')->raw('count(*) as affiliate_count, status'))
                     ->where('status', '<>', 'inactive')
                     ->groupBy('status')
                     ->get();
```

## Raw Methods

Instead of using `FluentAffiliate('db')->raw`, you may also use the following methods to insert a raw expression into various parts of your query.

### `selectRaw`

The `selectRaw` method can be used in place of `select(FluentAffiliate('db')->raw(...))`. This method accepts an optional array of bindings as its second argument:

```php
$referrals = FluentAffiliate('db')->table('fa_referrals')
                ->selectRaw('amount * ? as commission_with_bonus', [1.1])
                ->get();
```

### `whereRaw / orWhereRaw`

The `whereRaw` and `orWhereRaw` methods can be used to inject a raw `where` clause into your query. These methods accept an optional array of bindings as their second argument:

```php
$referrals = FluentAffiliate('db')->table('fa_referrals')
                ->whereRaw('amount > IF(type = "sale", ?, 50)', [100])
                ->get();
```

### `havingRaw / orHavingRaw`

The `havingRaw` and `orHavingRaw` methods may be used to set a raw string as the value of the `having` clause. These methods accept an optional array of bindings as their second argument:

```php
$referrals = FluentAffiliate('db')->table('fa_referrals')
                ->select('provider', FluentAffiliate('db')->raw('SUM(amount) as total_commissions'))
                ->groupBy('provider')
                ->havingRaw('SUM(amount) > ?', [1000])
                ->get();
```

### `orderByRaw`

The `orderByRaw` method may be used to set a raw string as the value of the `order by` clause:

```php
$affiliates = FluentAffiliate('db')->table('fa_affiliates')
                ->orderByRaw('updated_at - created_at DESC')
                ->get();
```

# Joins

## Inner Join Clause

The query builder may also be used to write join statements. To perform a basic "inner join", you may use the `join` method on a query builder instance. The first argument passed to the `join` method is the name of the table you need to join to, while the remaining arguments specify the column constraints for the join. Of course, as you can see, you can join to multiple tables in a single query:

```php
$affiliates = FluentAffiliate('db')->table('fa_affiliates')
            ->join('users', 'users.ID', '=', 'fa_affiliates.user_id')
            ->select('fa_affiliates.*', 'users.user_email')
            ->get();
```

## Left Join Clause

If you would like to perform a "left join" instead of an "inner join", use the `leftJoin` method. The leftJoin method has the same signature as the join method:

```php
$affiliates = FluentAffiliate('db')->table('fa_affiliates')
            ->leftJoin('users', 'users.ID', '=', 'fa_affiliates.user_id')
            ->get();
```

## Cross Join Clause

To perform a "cross join" use the `crossJoin` method with the name of the table you wish to cross join to. Cross joins generate a cartesian product between the first table and the joined table:

```php
$affiliates = FluentAffiliate('db')->table('fa_affiliates')
            ->crossJoin('fa_affiliate_groups')
            ->get();
```

## Advanced Join Clauses

You may also specify more advanced join clauses. To get started, pass a `Closure` as the second argument into the `join` method. The `Closure` will receive a `JoinClause` object which allows you to specify constraints on the `join` clause:

```php
FluentAffiliate('db')->table('fa_affiliates')
        ->join('users', function ($join) {
            $join->on('fa_affiliates.user_id', '=', 'users.ID')->orOn(...);
        })
        ->get();
```

If you would like to use a "where" style clause on your joins, you may use the `where` and `orWhere` methods on a join. Instead of comparing two columns, these methods will compare the column against a value:

```php
FluentAffiliate('db')->table('fa_affiliates')
        ->join('users', function ($join) {
            $join->on('fa_affiliates.user_id', '=', 'users.ID')
                 ->where('users.ID', '>', 5);
        })
        ->get();
```
