---
title: FluentCart Integration with FluentAffiliate
description: Learn how to integrate FluentAffiliate with FluentCart. Set up affiliate commissions for FluentCart product sales and track affiliate performance in your online store.
---

# FluentCart Integration with FluentAffiliate

FluentCart is a modern, lightweight e-commerce plugin for WordPress, designed to help you build and manage a high-performance online store. When you connect FluentCart with FluentAffiliate, you can launch a complete affiliate program to increase sales, track affiliate commissions, and handle payouts easily.

This guide will walk you through each step of integrating FluentCart with FluentAffiliate.

> [!Note]
> To get started, you must have the FluentCart plugin installed and activated on your WordPress website.

## Enable the FluentCart Integration

First, you’ll need to activate the FluentCart module inside FluentAffiliate.

1.  Navigate to your **FluentAffiliate Dashboard**.
2.  Click on the **Settings** tab located in the top menu.
3.  From the settings menu on the left, select **Integration Settings**.
4.  You will see a list of available integrations. Find **FluentCart** and click the toggle button to activate it.

Once the integration is active, a **Manage** link will appear. Click this link to configure your FluentCart-specific affiliate settings.

![Integration Settings](/images/integrations/fluentCart/Integration-Settings-FluentAffiliate.webp)

### Configure FluentCart Settings

In the management panel, you can fine-tune how commissions work for your FluentCart store.

Here are the available options:

* **Enable Affiliate Integration for FluentCart:** This checkbox acts as the master switch for the integration. Ensure it is checked.
* **Enable Branded Coupon Codes for Affiliates:** When you enable this feature, you can offer branded coupon codes to your affiliates. This allows them to promote products with unique discount codes, giving them another powerful marketing opportunity. 

![Branded Coupon Code](/images/integrations/fluentCart/branded-coupon-code.webp)

For example, this is perfect if you want to give a special coupon code to a social media influencer who is also one of your affiliates.To assign a coupon to a specific affiliate, follow these steps:

1.  From your WordPress dashboard, navigate to **FluentCart > Coupons**.
2.  Either click to create a new coupon or edit an existing one.
3.  On the coupon editor page, look for the **Fluent Affiliate** section on the right-hand sidebar.
4.  Click on the **Select Affiliate** field and begin typing the affiliate's name. Select their name from the list when it appears.
5.  **Save** the coupon. Now, when this coupon is used, the selected affiliate will be credited with the referral.

 > [!Note] 
 > Before you can assign a coupon, the user must already be an approved affiliate in your FluentAffiliate program.
 
![Select Affiliate](/images/integrations/fluentCart/select-affiliate-from-fluentcart.webp)

* **Disable Referrals on Upgrades:** Check this box to ensure that no referrals will be added on purchased upgrades. This gives you more control over commission payouts for existing customers who upgrade their plan.
* **Enable custom rate for specific products or categories:** This is a powerful feature that lets you override your default commission rate. Check this box if you want to set special commission rates for specific products or entire product categories.

    > [!NOTE]
    > This feature gives you the flexibility to offer different commission rates for different products. For example, you could offer a higher commission on a new product as an incentive for affiliates to promote it more heavily.

* **Select Products:** In the `Select` field, start typing the name of the product or category and choose it from the list.

* **Select Rate:** Enter the commission value in the `Enter Rate` field. Then, choose whether the commission is a **Percentage (%)** or a **Fixed** amount from the dropdown menu.

* **Save Settings:** Once you have configured all your custom rates, click the Save Settings button to make them live.

You can add more custom rates for different products or categories by clicking the **+Add New Group** button again. You can also remove any rate rule by clicking the red `delete` icon.


![Add New Group](/images/integrations/fluentCart/specific-product-or-categories.webp)


### Generate an Affiliate Link

Once you've finished setting up your FluentCart product settings, it's time to generate your [affiliate link](/guide/affiliate-portal/generating-affiliate-links).

Whenever a customer makes a purchase using this link, the affiliate will earn a commission based on the rates you have configured.

### Troubleshooting Common Issues

If you encounter any issues, here are some solutions to common problems:

* **Commissions Not Tracking:** Verify that the integration toggle for FluentCart is enabled in the Integration Settings. You can also test your affiliate link with a purchase to ensure it is working correctly.
* **Affiliate Links Not Generating:** Verify that the product URL you are using is valid and the page is publicly accessible. Also, ensure that FluentAffiliate is fully integrated with FluentCart in the Integration Settings.
* **Custom Rates Not Applying:** If a product-specific or category-specific rate isn't being applied, double-check your custom rate rules in the integration settings to ensure they are configured correctly and that there are no conflicting rules.