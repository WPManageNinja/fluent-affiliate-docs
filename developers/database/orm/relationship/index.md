# Fluent ORM: Relationships

Fluent Framework ORM

## Introduction

Database tables are often related to one another. For example, an affiliate may have many referrals, or a referral could be related to the customer who made the purchase. Fluent ORM makes managing and working with these relationships easy, and supports several types of relationships:

- [One To One](#one-to-one)
- [One To Many](#one-to-many)
- [Many To Many](#many-to-many)
- [Has Many Through](#has-many-through)
- [Polymorphic Relations](#polymorphic-relations)
- [Many To Many Polymorphic Relations](#many-to-many-polymorphic-relations)

## Defining Relationships

Fluent ORM relationships are defined as methods on your Fluent ORM model classes. Since, like Fluent ORM models themselves, relationships also serve as powerful [query builders](/developers/database/query-builder), defining relationships as methods provides powerful method chaining and querying capabilities. For example, we may chain additional constraints on this `referrals` relationship:

```php
$affiliate->referrals()->where('status', 'paid')->get();
```

But, before diving too deep into using relationships, let's learn how to define each type.

### One To One

A one-to-one relationship is a very basic relation. For example, an `Affiliate` model might be associated with one `AffiliateGroup`. To define this relationship, we place a `group` method on the `Affiliate` model. The `group` method should call the `belongsTo` method and return its result:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
     /**
     * Get the affiliate group that the affiliate belongs to.
     *
     * @return \FluentAffiliate\Framework\Database\Orm\Relations\BelongsTo
     */
    public function group()
    {
        return $this->belongsTo(AffiliateGroup::class, 'group_id', 'id');
    }
}
```

The first argument passed to the `belongsTo` method is the name of the related model. Once the relationship is defined, we may retrieve the related record using Fluent ORM's dynamic properties. Dynamic properties allow you to access relationship methods as if they were properties defined on the model:

```php
$group = FluentAffiliate\App\Models\Affiliate::find(1)->group;
```

Fluent ORM determines the foreign key of the relationship based on the model name. In this case, the `Affiliate` model is automatically assumed to have a `group_id` foreign key. If you wish to override this convention, you may pass a second argument to the `belongsTo` method:

```php
return $this->belongsTo('FluentAffiliate\App\Models\AffiliateGroup', 'group_id');
```

Additionally, Fluent ORM assumes that the foreign key should have a value matching the `id` (or the custom `$primaryKey`) column of the parent. In other words, Fluent ORM will look for the value of the group's `id` column in the `group_id` column of the `Affiliate` record. If you would like the relationship to use a value other than `id`, you may pass a third argument to the `belongsTo` method specifying your custom key:

```php
return $this->belongsTo('FluentAffiliate\App\Models\AffiliateGroup', 'group_id', 'local_key');
```

### Defining The Inverse Of The Relationship

So, we can access the `AffiliateGroup` model from our `Affiliate`. Now, let's define a relationship on the `AffiliateGroup` model that will let us access the `Affiliate` models that belong to the group. We can define the inverse of a `belongsTo` relationship using the `hasMany` method:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class AffiliateGroup extends Model
{
    /**
     * Get the affiliates for the group.
     */
    public function affiliates()
    {
        return $this->hasMany('FluentAffiliate\App\Models\Affiliate', 'group_id', 'id');
    }
}
```

In the example above, Fluent ORM will try to match the `group_id` from the `Affiliate` model to an id on the `AffiliateGroup` model. Fluent ORM determines the default foreign key name by examining the name of the relationship method and suffixing the method name with `_id`. However, if the foreign key on the `Affiliate` model is not `group_id`, you may pass a custom key name as the second argument to the `hasMany` method:

```php
return $this->hasMany('FluentAffiliate\App\Models\Affiliate', 'group_id');
```

If your parent model does not use `id` as its primary key, or you wish to join the child model to a different column, you may pass a third argument to the `hasMany` method specifying your parent table's custom key:

```php
return $this->hasMany('FluentAffiliate\App\Models\Affiliate', 'group_id', 'other_key');
```

### One To Many

A "one-to-many" relationship is used to define relationships where a single model owns any amount of other models. For example, an affiliate may have an infinite number of referrals. Like all other Fluent ORM relationships, one-to-many relationships are defined by placing a function on your Fluent ORM model:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Affiliate extends Model
{
    /**
     * An affiliate has many referrals.
     *
     * @return \FluentAffiliate\Framework\Database\Orm\Relations\HasMany
     */
    public function referrals()
    {
         return $this->hasMany(Referral::class, 'affiliate_id', 'id');
    }
}
```

Remember, Fluent ORM will automatically determine the proper foreign key column on the `Referral` model. By convention, Fluent ORM will take the "snake case" name of the owning model and suffix it with `_id`. So, for this example, Fluent ORM will assume the foreign key on the `Referral` model is `affiliate_id`.

Once the relationship has been defined, we can access the collection of referrals by accessing the `referrals` property. Remember, since Fluent ORM provides "dynamic properties", we can access relationship methods as if they were defined as properties on the model:

```php
$referrals = FluentAffiliate\App\Models\Affiliate::find(1)->referrals;

foreach ($referrals as $referral) {
    //
}
```

Of course, since all relationships also serve as query builders, you can add further constraints to which `referrals` are retrieved by calling the `referrals` method and continuing to chain conditions onto the query:

```php
$referral = FluentAffiliate\App\Models\Affiliate::find(1)->referrals()->where('status', 'paid')->first();
```

Like the `hasMany` method, you may also override the foreign and local keys by passing additional arguments to the `hasMany` method:

```php
return $this->hasMany('FluentAffiliate\App\Models\Referral', 'affiliate_id');

return $this->hasMany('FluentAffiliate\App\Models\Referral', 'affiliate_id', 'local_key');
```

### One To Many (Inverse)

Now that we can access all of an affiliate's referrals, let's define a relationship to allow a referral to access its parent affiliate. To define the inverse of a `hasMany` relationship, define a relationship function on the child model which calls the `belongsTo` method:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Referral extends Model
{
    /**
     * Get the affiliate that owns the referral.
     */
    public function affiliate()
    {
        return $this->belongsTo('FluentAffiliate\App\Models\Affiliate');
    }
}
```

Once the relationship has been defined, we can retrieve the `Affiliate` model for a `Referral` by accessing the `affiliate` "dynamic property":

```php
$referral = FluentAffiliate\App\Models\Referral::find(1);

echo $referral->affiliate->payment_email;
```

In the example above, Fluent ORM will try to match the `affiliate_id` from the `Referral` model to an `id` on the `Affiliate` model. Fluent ORM determines the default foreign key name by examining the name of the relationship method and suffixing the method name with a `_` followed by the name of the primary key column. However, if the foreign key on the `Referral` model is not `affiliate_id`, you may pass a custom key name as the second argument to the `belongsTo` method:

```php
/**
 * Get the affiliate that owns the referral.
 */
public function affiliate()
{
    return $this->belongsTo('FluentAffiliate\App\Models\Affiliate', 'affiliate_id');
}
```

If your parent model does not use `id` as its primary key, or you wish to join the child model to a different column, you may pass a third argument to the `belongsTo` method specifying your parent table's custom key:

```php
/**
 * Get the affiliate that owns the referral.
 */
public function affiliate()
{
    return $this->belongsTo(Affiliate::class, 'affiliate_id', 'id');
}
```

### Has Many Through

The "has-many-through" relationship provides a convenient shortcut for accessing distant relations via an intermediate relation. For example, a `Payout` model might have many `Referral` models through an intermediate `Transaction` model. In this example, you could easily gather all referrals for a given payout. Let's look at the tables required to define this relationship:

```
payouts
    id - integer
    title - string

transactions
    id - integer
    payout_id - integer
    affiliate_id - integer

referrals
    id - integer
    payout_transaction_id - integer
    affiliate_id - integer
```

Though `referrals` does not contain a `payout_id` column, the `hasManyThrough` relation provides access to a payout's referrals via `$payout->referrals`. To perform this query, Fluent ORM inspects the `payout_id` on the intermediate transactions table. After finding the matching transaction IDs, they are used to query the `referrals` table.

Now that we have examined the table structure for the relationship, let's define it on the `Payout` model:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Payout extends Model
{
    /**
     * Get all the referrals for the payout.
     */
    public function referrals()
    {
        return $this->hasManyThrough('FluentAffiliate\App\Models\Referral', 'FluentAffiliate\App\Models\Transaction');
    }
}
```

The first argument passed to the `hasManyThrough` method is the name of the final model we wish to access, while the second argument is the name of the intermediate model.

Typical Fluent ORM foreign key conventions will be used when performing the relationship's queries. If you would like to customize the keys of the relationship, you may pass them as the third and fourth arguments to the `hasManyThrough` method. The third argument is the name of the foreign key on the intermediate model. The fourth argument is the name of the foreign key on the final model. The fifth argument is the local key, while the sixth argument is the local key of the intermediate model:

```php
class Payout extends Model
{
    public function referrals()
    {
        return $this->hasManyThrough(
            'FluentAffiliate\App\Models\Referral',
            'FluentAffiliate\App\Models\Transaction',
            'payout_id', // Foreign key on transactions table...
            'payout_transaction_id', // Foreign key on referrals table...
            'id', // Local key on payouts table...
            'id' // Local key on transactions table...
        );
    }
}
```

### Polymorphic Relations

#### Table Structure

Polymorphic relations allow a model to belong to more than one other model on a single association. For example, imagine users of your application can "comment" on both affiliates and referrals. Using polymorphic relationships, you can use a single `comments` table for both of these scenarios. First, let's examine the table structure required to build this relationship:

```
affiliates
    id - integer
    payment_email - string
    status - string

referrals
    id - integer
    affiliate_id - integer
    amount - decimal

comments
    id - integer
    body - text
    commentable_id - integer
    commentable_type - string
```

Two important columns to note are the `commentable_id` and `commentable_type` columns on the `comments` table. The `commentable_id` column will contain the ID value of the affiliate or referral, while the `commentable_type` column will contain the class name of the owning model. The `commentable_type` column is how the ORM determines which "type" of owning model to return when accessing the commentable relation.

#### Model Structure

Next, let's examine the model definitions needed to build this relationship:

```php
<?php

namespace FluentAffiliate\App\Models;

use FluentAffiliate\Framework\Database\Orm\Model;

class Comment extends Model
{
    /**
     * Get all the owning commentable models.
     */
    public function commentable()
    {
        return $this->morphTo();
    }
}

class Affiliate extends Model
{
    /**
     * Get all the affiliate's comments.
     */
    public function comments()
    {
        return $this->morphMany('FluentAffiliate\App\Models\Comment', 'commentable');
    }
}

class Referral extends Model
{
    /**
     * Get all the referral's comments.
     */
    public function comments()
    {
        return $this->morphMany('FluentAffiliate\App\Models\Comment', 'commentable');
    }
}
```

#### Retrieving Polymorphic Relations

Once your database table and models are defined, you may access the relationships via your models. For example, to access all the comments for an affiliate, we can use the `comments` dynamic property:

```php
$affiliate = FluentAffiliate\App\Models\Affiliate::find(1);

foreach ($affiliate->comments as $comment) {
    //
}
```

You may also retrieve the owner of a polymorphic relation from the polymorphic model by accessing the name of the method that performs the call to `morphTo`. In our case, that is the `commentable` method on the `Comment` model. So, we will access that method as a dynamic property:

```php
$comment = FluentAffiliate\App\Models\Comment::find(1);

$commentable = $comment->commentable;
```

The `commentable` relation on the `Comment` model will return either an `Affiliate` or `Referral` instance, depending on which type of model owns the comment.
