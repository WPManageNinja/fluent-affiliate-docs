# WooCommerce Integration with FluentAffiliate

WooCommerce is one of the most popular plugins in WordPress that helps you sell products and manage your online store. With **FluentAffiliate**, you can easily track affiliate commissions and handle affiliate payments.

In this guide, we'll walk you through how to integrate WooCommerce with FluentAffiliate step by step.

> [!Note]
> To get started, you first need to install and activate the WooCommerce plugin on your WordPress website.

## Enable WooCommerce in FluentAffiliate

Once WooCommerce is running on your site, you can connect it to **FluentAffiliate**. 

1. Go to your **FluentAffiliate Dashboard** and click on the **Settings** tab in the top menu.
2. From the menu on the left, select **Integration Settings**. 
3. You will see a list of available integrations. Find **WooCommerce** and click the **toggle** button next to it to enable the integration.

Your **WooCommerce** integration with **FluentAffiliate** is now active, allowing affiliates to earn referral commissions on WooCommerce product sales.

In the **Manage** section, you'll find additional settings to customize how affiliate commissions work with your WooCommerce products.

![Integration Settings](/guide/public/images/integrations/woocommerce/integration-setup-options.webp)

## Configure WooCommerce Settings 

After you enable the integration, a pop-up window will appear with more settings to control how affiliate commissions are handled.

* **Affiliate on Discount Coupon**: If this option is enabled (checked), affiliates will earn a commission on sales even when a discount coupon is applied and reduces the purchase price.

  If disabled (unchecked), no commission will be paid on transactions where a coupon is used.

* **Custom Affiliate Rates**: Use this setting to override the default affiliate commission rate. Checking this box allows you to configure specific, custom rates for your affiliates. 

![WooCommerce Settings](/guide/public/images/integrations/woocommerce/woo-settings-configuration.webp)


## Custom Affiliate Rate Configuration

Once **Custom Affiliate Rate** is enabled, you can define specific commission structures based on products or categories. Click on the **+Add Rate** button for the next step.

**1. Select Type:** This option allows you to specify whether the custom rate applies to individual products or entire product categories.

  **Product:** Select this radio button to apply the custom rate to specific products.

  **Category:** Select this radio button to apply the custom rate to an entire product category.

**2. Affiliate Products / Categories:** Depending on your *"Select Type"* choice, this field will allow you to search for and select the specific items.

  **For Product Type:** Enter a keyword in the text field to search for and select the product(s) to which this custom rate will apply.

  **For Category Type:** Here, you would typically find a similar search or dropdown field to select the desired product category/categories.

**3. Affiliate Rate:** Set the commission rate for the selected products or categories.

  **Rate Value Input:** Use the” - “and “+” buttons, or directly type a numerical value into the field, to set the commission amount.

  **Rate Type Selector:** Click the dropdown menu to choose the type of commission:
     
  **• Percentage:** The affiliate will receive a percentage of the sale price as commission.

  **• Fixed:** The affiliate will receive a fixed amount (e.g., currency value) as commission, regardless of the sale price.

**Add More Rates:** After configuring the desired type, products/categories, and rate, click the *Add Rate* button to save this specific custom rate configuration. You can then repeat the process to add more custom rates. 

Also, you can delete the affiliate rates by clicking the *delete* icon in the top right corner.

![Woocommerce Settings](/guide/public/images/integrations/woocommerce/custom-affiliate-rates.webp)

Once all your custom rates are added, click **Save Settings** button to apply them.

## Generate an Affiliate Link

Once you've finished setting up your WooCommerce product settings, it's time to create your **affiliate link**.

1. Log in to the **Affiliate** area provided by FluentAffiliate and go to the affiliate **Links** section. 
2. **Paste** the URL of the product page you want to promote and click the **Generate** button.
3. FluentAffiliate will create a unique **affiliate link**. **Copy** this link and share it on social media, blogs, emails, or directly with your audience.

Now, when someone makes a purchase using this link, you'll earn a commission based on your *settings*.

![Affiliate Link Generate](/guide/public/images/integrations/woocommerce/affiliate-link-generation.webp)

### Troubleshooting Common Issues

Here are solutions to common issues you might encounter:

* **Integration Toggle Not Visible:** Ensure both WooCommerce and FluentAffiliate are activated. If the issue persists, deactivate and reactivate both plugins, then check again.
* **Affiliate Links Not Generating:** Verify that the product URL is valid and publicly accessible. Ensure FluentAffiliate is fully integrated with WooCommerce under **Integration Settings**.
* **Commissions Not Tracking:** Check that the **Enable Product-Based Commission** is activated if you are trying to track specific products. Also, make sure the **Disable Referral** option is not checked for that product.
* **Conflicting Rates:** If a product-specific rate isn't being applied, ensure you have set the product-specific rate and that your integration with WooCommerce is enabled.

