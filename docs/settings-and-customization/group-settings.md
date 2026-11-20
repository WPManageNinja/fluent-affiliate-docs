---
title: Group Settings
description: Learn how to create and manage affiliate groups in FluentAffiliate. Set up different commission rates, organize affiliates by groups, and customize group-specific settings for your affiliate program.
---

# Group Settings

Managing a growing affiliate program means realizing that not all affiliates are the same. Some partners bring in more sales, while others might be part of a special promotional team. Instead of manually changing commission rates for every single person, you can use Affiliate Groups to keep things organized.

Affiliate Groups let you bundle your partners into tiers - like a VIP tier or an onboarding tier—and give each group its own special commission rules.

## Accessing Affiliate Groups

Setting up groups is simple and only takes a few steps from your site's backend:

1. Log in to your **WordPress Dashboard**.
2. Go to **FluentAffiliate → Settings** from the left-hand menu.
3. Click on **Affiliate Groups** from the left sidebar panel.

![Group Settings](/images/settings-and-customization/group/group-settings-overview.webp)


## Creating a New Affiliate Group

If you want to build a new tier for your partners, follow these quick steps:

1. Click the **Add New Group** button on your Affiliate Groups dashboard.
2. A form panel will slide in from the right side of your screen. Fill out the following options:

 * **Name:** Enter a clear name for your group so you can recognize it later (e.g., "VIP High Rollers" or "First Group").
 * **Rate:** Type the numerical commission value (e.g., enter 10 for a flat $10 payout or a 10% rate). Next to it, choose the rate type: **Percentage (%)** or **Flat**.
 * **Status:** Set the status of this group. You can choose **Active** or **Inactive**.
 * **Note:** Add an optional internal note about the group.

![Group Creation](/images/settings-and-customization/group/create-new-group.webp)

### Custom Renewal Commissions for Groups

>[!Note]
>This section only appears when [FluentAffiliate Pro](https://fluentaffiliate.com/pricing/) is active and renewal commissions are enabled in [Referral Settings](/guide/settings-and-customization/referral-settings).

Check the box for "**Enable custom renewal commission for this group**" to give this group its own rate for subscription renewals.

 * **Renewal Rate:** Set the rate value and type (Percentage or Flat) for renewal referrals.
 * **Max Renewal Count:** Set the maximum number of renewals that earn a commission. Enter `0` for unlimited renewal commissions.

### Custom Lifetime Commissions for Groups

>[!Note]
>This section only appears when [FluentAffiliate Pro](https://fluentaffiliate.com/pricing/) is active and **Lifetime Commissions** is enabled in [Referral Settings](/guide/settings-and-customization/referral-settings#lifetime-commissions).

If you want members of this specific group to get rewarded for future direct purchases made by customers they originally brought in, check the box for "**Enable custom lifetime commission for this group**".

 * **Lifetime Rate:** Set the specific reward value (Percentage or Flat amount) for any repeat purchases made by their referred customers without a link.

 * **Expiration Days:** Enter the number of days this lifetime relationship should stick around before resetting. If you leave this field empty or type `0`, the connection never expires!

Once you are done adjusting all the fields, click the **Create** button to save your new group.

![Create Lifetime Commission](/images/settings-and-customization/group/custom-lifetime-commission-3.webp)

### Managing and Assigning Groups

After hitting save, your newly created tier will appear in a list on your main Affiliate Groups section. The list shows the **ID, Name, Rate, Total Affiliate, Visits, Total Earnings,** and **Status** of each group, with **Edit** and **Delete** actions.

 * **Editing or Deleting Groups:** Use the **Edit** or **Delete** action on the group row to change a group's rate or remove it.

![Group Management](/images/settings-and-customization/group/group-management.webp)

### Assigning a Group to an Affiliate

When creating a new affiliate or editing an existing one, you can assign them to a group:

1.  In the affiliate form, set **Rate type** to **Group**.
2.  Choose the desired group from the **Group** dropdown ("Select Group").

The selected group's commission rules will automatically replace your global site rates for that affiliate.
