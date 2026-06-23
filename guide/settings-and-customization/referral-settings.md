---
title: Referral Settings
description: Learn how to configure referral settings in FluentAffiliate. Set up commission rates, referral tracking, cost and tax settings, and recurring commission options for your affiliate program.
---

# Referral Settings

The Referral Settings section allows you to configure the core rules and formats for your affiliate program, including how commissions are calculated, links are structured, and tracking is handled.

## Accessing Referral Settings

To access this section, navigate from your WordPress dashboard to **FluentAffiliate → Settings → Referral Settings**.

### Link & Commission Settings

These settings define the structure of your affiliate links and the default commission rates.

* **Referral Variable:** Define the variable used in referral links. The example shown is `ref`.
* **Default Referral Format:** Choose the default format for how referral links will be generated. Here you will get two options for default referral format "Affiliate ID" and "WordPress Username".
* **Rate:** Set the standard commission rate for referrals, which can be a percentage or a fixed amount. The example value is 20 percent.

![Referral Settings](/images/settings-and-customization/referral/referral-settings-overview.webp)

### Financial Formatting

Configure how monetary values and numbers are displayed across the plugin.

* **Currency:** Select the primary currency for your store's transactions and affiliate payouts. "United States Dollar" is the example shown.
* **Number Format:** Choose the character style for separating thousands in numerical values. Options include US Style (1,000,00.00) and EU Style (1.000,00,00).
* **Currency Symbol Position:** Choose whether the currency symbol appears Before ($10) or After (10$) the amount.
* **Payout Method:** This setting allows you to choose how your affiliates will receive their earnings. You can select your preferred method from the dropdown menu:
   * **PayPal:** A common method for sending automated or manual payments via email.
   * **Bank Transfer:** If you select this option, affiliates will provide their bank details for payouts instead of an email address.

### Tracking & Credit Rules

Define the logic for how affiliates are credited for referrals and how long they are tracked.

* **Credit:** Determine which affiliate receives credit for a referral. You can credit the **First Affiliate** or the **Last Affiliate**.
* **Cookie Duration:** Set the duration of the cookie used to track referrals, specified in days. The example shows a duration of 30 days.

![Recurring Settings](/images/settings-and-customization/referral/recurring-commission-settings.webp)


### Page, Cost, & Subscription Settings

This section allows you to configure page assignments, cost exclusions, and rules for self-referrals and subscriptions.

* **Affiliate Area:** Select the page you want to use for your affiliate portal. You can use the `[fluent_affiliate_portal]` shortcode on this page. Clicking the plus icon will open an "Add Page" pop-up where you can enter a new "Page Title" and click "Add" to create it.

* **Exclude Shipping:** Enable this option to exclude shipping costs from the calculation of referral commissions.
* **Exclude Tax:** Enable this to exclude tax amounts from the calculation of referral commissions.
* **Disable Self Referral:** Enable this to prevent affiliates from earning commissions on their own purchases.

![Cost and Tax Settings](/images/settings-and-customization/referral/recurring-commission-settings.webp)

#### Affiliate Commission on Subscription Renewal

This feature allows you to reward affiliates for recurring subscription payments. 

>[!Note]
>To use this feature, you need [FluentAffiliate Pro](https://fluentaffiliate.com/pricing/).

 * **Enable Option:** Check the box to award affiliate commissions for subscription renewals.
 * **Renewal Rate:** Set the specific commission rate (Flat or Percentage) for these recurring referrals.
 * **Maximum Renewal Referrals:** Set the maximum number of times an affiliate can earn from a single subscription. Enter 0 for unlimited renewal commissions.
 
 Once activated, you’ll find this feature available in WooCommerce and FluentCart integration settings.


![Subscription Renewal](/images/settings-and-customization/referral/comission-Renewal.webp)

### Lifetime Commissions

The **Lifetime Commissions** feature allows affiliates to continue earning commissions from customers they originally referred. Once a customer is linked to an affiliate, that affiliate will receive commissions on future purchases made by the customer, even if they return and purchase directly without using a referral link.

>[!Note]
> You must have [FluentAffiliate Pro](https://fluentaffiliate.com/pricing/) installed and activated to use this feature.

 * **Enable Lifetime Commissions:** **Turn** on this option to enable lifetime commissions across your affiliate program. The customer's first purchase will follow your standard commission rules, while future direct purchases will use the lifetime commission settings.
 * **Lifetime Rate:** Set a dedicated lifetime commission rate (either a fixed amount or a percentage) applied to future direct purchases.
 * **Expiration:** Specify how long the affiliate-customer relationship remains active after the initial referral. Enter the number of days the tracking should remain valid. Leave the field empty or set it to **0** to keep the relationship active indefinitely.

After configuring all your choices, click the **Save Settings** button at the bottom of the screen to apply your changes.

![Lifetime Commission](/images/settings-and-customization/referral/lifetime-commission-7.webp)
