# WooCommerce Integration with FluentAffiliate

WooCommerce is one of the most popular e-commerce plugins for WordPress, helping you build and manage a powerful online store. When you connect WooCommerce with FluentAffiliate, you can launch a full-featured affiliate program to boost your sales, track commissions, and manage affiliate payments with ease.

This guide will walk you through every step of integrating WooCommerce with FluentAffiliate.

> [!NOTE]
> To get started, you first need to have the WooCommerce plugin installed and activated on your WordPress website.

## Enable the WooCommerce Integration

First, you’ll need to switch on the WooCommerce module within FluentAffiliate.

1.  Navigate to your **FluentAffiliate Dashboard**.
2.  Click on the **Settings** tab located in the top menu.
3.  From the settings menu on the left, select **Integration Settings**.
4.  Here, you will see a list of available integrations. Find **WooCommerce** and click the toggle button to activate it.

Once the toggle is active, a **Manage** link will appear. Click this link to configure your WooCommerce-specific affiliate settings.

![Integration Settings](/guide/public/images/integrations/woocommerce/integration-setup-options.webp)

## Configure WooCommerce Settings

In the management panel, you can fine-tune how commissions work for your WooCommerce store.

Here are the available options:

* **Enable Affiliate Integration for Woocommerce:** This checkbox acts as the master switch for the integration. Ensure it is checked.
* **Enable Branded Coupon Codes for affiliates:** When you enable this, you can offer branded coupon codes to your affiliates. This allows them to promote products with unique discount codes, giving them another powerful marketing tool. You can manage these codes in the **Discount Codes** editor in WooCommerce.

* **Enable custom rate for specific product or categories:** This is a powerful feature that lets you override your default commission rate. Check this box if you want to set special commission rates for specific products or entire product categories.

After that, click on the **+Add New Group** button.

![Integration Settings](/guide/public/images/integrations/woocommerce/configure-woocommerce-settings.webp)

### Custom Affiliate Rate Configuration

After enabling custom rates, you can create specific commission rules for your products. This gives you the flexibility to offer higher commissions on certain items to encourage sales.

1.  First, you must decide if the custom rate will apply to products or categories.
    * **By Specific Products:** Choose this to set a custom commission for one or more individual products.
    * **By Specific Categories:** Choose this to apply a custom commission rate to all products within a specific category.

![Integration Settings](/guide/public/images/integrations/woocommerce/select-product-or-categories.webp)

2.  Once you make a selection, new fields will appear.
    * **Select Products/Categories:** In the **Select** field, start typing the name of the product or category and choose it from the list.
    * **Select Rate:** Enter the commission value (e.g., 20 for 20% or $20). Then, choose whether the commission is a **Percentage (%)** or a **Fixed** amount from the dropdown menu.

3.  **Add More Rates:** To add another custom rate for a different product or category, click the **+Add New Group** button and repeat the process. You can also remove any rate rule by clicking the red delete icon.
4.  **Save Settings:** When you are finished, click the **Save Settings** button to apply all your changes.

![Integration Settings](/guide/public/images/integrations/woocommerce/select-product-rate.webp)

## Generate an Affiliate Link

Once you've finished setting up your WooCommerce product settings, it's time to create your **affiliate link**.

1. Log in to the **Affiliate** area provided by FluentAffiliate and go to the affiliate **Links** section. 
2. Paste the URL of the product page you want to promote and click the **Generate** button.
3. FluentAffiliate will create a unique **affiliate link**. **Copy** this link and share it on social media, blogs, emails, or directly with your audience.

![Copy Affiliate Link](/guide/public/images/integrations/woocommerce/copy-affiliate-link.webp)

Whenever a customer makes a purchase through this link, the affiliate will earn a commission based on the rates you’ve set up.

## Troubleshooting Common Issues

If you encounter any issues, here are some solutions to common problems:


* **Affiliate Links Not Generating:** Verify that the product URL you are using is correct and the page is publicly accessible.
* **Commissions Not Tracking:** Double-check that the "Enable Affiliate Integration for WooCommerce" option is checked in the settings. If you're using custom rates, ensure they are configured correctly for the specific product or category.
* **Conflicting Rates:** If a product-specific rate isn't being applied as expected, review your rules to ensure there isn't an overlap with a category-wide rate that might be taking precedence.