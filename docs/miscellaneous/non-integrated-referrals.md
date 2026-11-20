---
title: Track Referrals without Integration
description: Learn how to track referrals in FluentAffiliate without plugin integrations. Set up manual referral tracking, add referrals manually, and manage affiliate commissions for non-integrated sales.
---

# Track Referrals without Integration

While FluentAffiliate offers many direct integrations, you may need to award a commission for a sale made through a system that isn't automatically connected. This guide explains how to track referrals for any plugin or payment gateway that doesn't have a direct integration, ensuring no referral is ever missed.

FluentAffiliate Pro provides a shortcode to handle these situations. It works with any plugin that has a "Thank You" or success page.

## Automated Tracking with the Conversion Shortcode

This is the best choice when your other plugin or system automatically redirects users to a specific "Thank You" or "Success" page after a completed purchase.

### How It Works

The process is simple and runs in the background:
1. A customer clicks an affiliate's unique referral link.
2. They complete a purchase through your non-integrated system.
3. After payment, they are redirected to your success page.
4. A special shortcode on that page automatically tells FluentAffiliate to find the correct affiliate and create a referral for them.

> [!Note]
> Referrals created through this shortcode always go into **Pending** status and await your approval before they're eligible for payout, even if you pass a `status` parameter. This keeps commissions from non-integrated sources subject to the same review as your other referrals.

### Implementation

To set this up, simply place the following shortcode on the page that users are redirected to after a successful payment:

```
[fluent_aff_conversion_script]
```
### Customizing with Optional Parameters

For more detailed and accurate tracking, you can enhance the shortcode with optional parameters. This is especially useful if your payment system cannot automatically pass transaction details to FluentAffiliate.

| Parameter | Description | Example |
| :--- | :--- | :--- |
| `amount` | Sets the exact purchase amount that the commission will be calculated on. | `amount="99.50"` |
| `description` | A short note about the referral for your records. | `description="Custom Checkout"` |
| `provider` | Name of the system the sale came from. Defaults to `custom`. | `provider="my_checkout"` |
| `provider_id` | The order or transaction ID from that system. Repeat referrals for the same provider and ID are blocked. | `provider_id="123"` |
| `provider_sub_id` | An optional secondary ID, such as a subscription ID. | `provider_sub_id="456"` |
| `status` | Accepted by the shortcode, but every referral it creates is saved as **Pending** until you approve it. | |
| `type` | The referral type. Defaults to `sale`. Types used by FluentAffiliate are `sale`, `opt_in`, `lead`, `recurring_sale` and `lifetime_sale`. | `type="sale"` |

**Example shortcode with parameters:**

```
[fluent_aff_conversion_script 
amount="10.00" 
description="Product Purchase" 
provider="custom_provider" 
provider_id="123" 
provider_sub_id="456" 
type="sale"]
```

### Good to Know

* The `amount` can also be passed in the URL (for example `?amount=10`) if you don't set it in the shortcode. Referrals with a zero or negative amount are skipped.
* The visitor must have an active affiliate referral cookie, otherwise no referral is created.
* For special cases you can also [add a referral manually](/guide/admin-portal/managing-referrals).

This shortcode requires **FluentAffiliate Pro**.
