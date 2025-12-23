---
title: Track Referrals without Integration
description: Learn how to track referrals in FluentAffiliate without plugin integrations. Set up manual referral tracking, add referrals manually, and manage affiliate commissions for non-integrated sales.
---

# Track Referrals without Integration

While FluentAffiliate offers many direct integrations, you may need to award a commission for a sale made through a system that isn't automatically connected. This guide explains how to track referrals for any plugin or payment gateway that doesn't have a direct integration, ensuring no referral is ever missed.

FluentAffiliate provide a powerful method to handle these situations:
* An automated method using a shortcode for plugins that have a "Thank You" or success page.

## Automated Tracking with the Conversion Shortcode

This is the best choice when your other plugin or system automatically redirects users to a specific "Thank You" or "Success" page after a completed purchase.

### How It Works

The process is simple and runs in the background:
1. A customer clicks an affiliate's unique referral link.
2. They complete a purchase through your non-integrated system.
3. After payment, they are redirected to your success page.
4. A special shortcode on that page automatically tells FluentAffiliate to find the correct affiliate and create a referral for them.

### Implementation

To set this up, simply place the following shortcode on the page that users are redirected to after a successful payment:

```
[fluent_aff_conversion_script]
```
### Customizing with Optional Parameters

For more detailed and accurate tracking, you can enhance the shortcode with optional parameters. This is especially useful if your payment system cannot automatically pass transaction details to FluentAffiliate.

| Parameter     | Description                                                                                      | Example                         |
|:--------------|:-------------------------------------------------------------------------------------------------|:--------------------------------|
| `amount`      | Sets the exact Amount you want to share as affiliate commission. the amount will be set as it is | `amount="99.50"`                |
| `reference`   | Adds a unique Order ID or Transaction ID to the referral log.                                    | `reference="ORD-1001"`          |
| `description` | A short note about the referral for your records.                                                | `description="Custom Checkout"` |
| `status`      | Sets the initial status of the referral. Options are `pending`, `unpaid`, `paid`, `rejected`.    | `status="pending"`              |
| `type`        | Defines the type of conversion. Options include `sale`, `lead`, `signup`.                        | `type="sale"`                   |
| `total`       | Sets the exact Amount Order amount, fluent affiliate will calculate the amount for the referrals | `total="500"`                   |

**Example shortcode with parameters:**

```
[fluent_aff_conversion_script 
amount="10.00" 
description="Product Purchase" 
provider="custom_provider" 
provider_id="123" 
provider_sub_id="456" 
status="unpaid/pending" 
type="sale"
total="500"
]
```


### Customizing with request parameter

If you want to pass the amount and other details through the URL parameters, you can use the following shortcode:
```
[fluent_aff_conversion_script]
```

and the URL will be like this:
```
https://yoursite.com/thank-you/?amount=10&description=Product+Purchase&provider=custom_provider&provider_id=123&provider_sub_id=456&status=unpaid&type=sale&total=100
```
>[!NOTE]
> note: if you pass the amount through the URL parameter or the shortcode, the amount will be set as the referral commission amount. if you want to share commission as the percentage of the order amount, you can use the `total` parameter to set the order amount and fluent affiliate will calculate the amount for the referrals based on the commission rate.

Whether you use the automated shortcode for unsupported platforms or add a referral manually for special cases, FluentAffiliate provides the flexibility to ensure every affiliate is rewarded accurately for their efforts.
