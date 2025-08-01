# Integration Action Hooks

## Third-Party Plugin Integration Hooks

### fluent_affiliate/affiliate_created_via_fluent_form

**Parameters:** 3
- `$affiliate` (Object) - The created affiliate object
- `$user` (Object) - WordPress user object
- `$feedData` (Array) - FluentForms feed configuration

**Affiliate Object Data:**
Same as affiliate hooks (see [Affiliate Module](/guide/developer/hooks/actions/affiliate/)).

**User Object Data:**
Same as affiliate hooks (see [Affiliate Module](/guide/developer/hooks/actions/affiliate/)).

**Feed Data Array:**
```php
$feedData = [
    'form_id' => 123,                    // int - FluentForms form ID
    'feed_name' => 'Affiliate Registration', // string - Feed name
    'settings' => [                      // array - Feed settings
        'auto_approve' => true,          // bool - Auto-approve setting
        'commission_rate' => 25,         // int - Custom commission rate
        'group_id' => 2                  // int - Assign to group
    ],
    'conditions' => [                    // array - Conditional logic
        // Conditional rules if any
    ]
]
```

**Usage:**
```php
add_action('fluent_affiliate/affiliate_created_via_fluent_form', function($affiliate, $user, $feedData) {
    // Access form data
    $form_id = $feedData['form_id'];
    $feed_name = $feedData['feed_name'];

    // Access settings
    if (isset($feedData['settings']['auto_approve'])) {
        $auto_approve = $feedData['settings']['auto_approve'];
    }
}, 10, 3);
```

## Expected Integration Hooks (Coming Soon)

> [!NOTE]
> **Coming Soon:** Additional integration hooks for other popular plugins are expected to be added in future versions of FluentAffiliate.

### WooCommerce Integration Hooks (Not Yet Available)
- `fluent_affiliate/affiliate_created_via_woocommerce` - When affiliate registers via WooCommerce
- `fluent_affiliate/woocommerce_order_processed` - When WooCommerce order creates referral

### Easy Digital Downloads Integration Hooks (Not Yet Available)
- `fluent_affiliate/affiliate_created_via_edd` - When affiliate registers via EDD
- `fluent_affiliate/edd_payment_processed` - When EDD payment creates referral

### LearnDash Integration Hooks (Not Yet Available)
- `fluent_affiliate/affiliate_created_via_learndash` - When affiliate registers via LearnDash
- `fluent_affiliate/learndash_course_completed` - When course completion creates referral

### MemberPress Integration Hooks (Not Yet Available)
- `fluent_affiliate/affiliate_created_via_memberpress` - When affiliate registers via MemberPress
- `fluent_affiliate/memberpress_subscription_created` - When subscription creates referral

## Current Integration Support

Currently, FluentAffiliate provides built-in integration with:
- **FluentForms** - Affiliate registration forms
- **WooCommerce** - E-commerce referral tracking
- **Easy Digital Downloads** - Digital product referrals
- **FluentBooking** - Booking referrals
- **Paymattic** - Payment form referrals

However, most of these integrations work through the standard referral creation hooks rather than integration-specific hooks.
