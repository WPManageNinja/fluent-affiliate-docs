# Affiliate Landing Page with Shortcode

While standard affiliate links (`yoursite.com/?ref=123`) are effective, you can offer your top affiliates a more professional and branded way to promote your products. FluentAffiliate provides a powerful shortcode that allows you to create dedicated, custom landing pages for each of your affiliates.

This feature lets you transform a standard referral link into a clean, memorable URL (e.g., `yoursite.com/partner/alex`), enhancing trust and boosting conversions while ensuring all referrals are tracked perfectly.

### How It Works

The magic happens behind the scenes. When a visitor arrives on a page that contains the custom landing page shortcode, FluentAffiliate instantly recognizes the affiliate ID or username specified within it (e.g., `ref="X"`).

It then sets the necessary tracking cookie in the visitor's browser, linking them to that affiliate. Any purchase or conversion made during their session will be automatically credited to that affiliate, just as if they had used a standard referral link.

### Step-by-Step Implementation Guide

Setting up a custom landing page is a straightforward process:

1.  **Create a New Page:** From your WordPress dashboard, navigate to **Pages → Add New**. Give your page a title and a clean, memorable URL slug that relates to the affiliate (e.g., `/partner/john-doe`).

2.  **Add the Shortcode:** In the page content editor, add the following shortcode:
    ```
    [fluent_aff_custom_landing ref="X"]
    ```

3.  **Set the Affiliate ID or Username:** This is the most important step. Replace `X` with the affiliate's unique identifier.
    * **By ID:** For affiliate John Doe with ID **2**, the shortcode would be:
        ```
        [fluent_aff_custom_landing ref="2"]
        ```
    * **By Username (Optional):** You can also use the affiliate's WordPress username. This will only work if you have set the [**Default Referral Format**](/guide/settings-and-customization/referral-settings.md) to "WordPress username" in FluentAffiliate's main settings. If John Doe's username is `johndoe`, the shortcode would be:
        ```
        [fluent_aff_custom_landing ref="johndoe"]
        ```

4.  **Publish and Share:** Publish the page. You can now share the new, professional URL (e.g., `yoursite.com/partner/john-doe`) directly with your affiliate.

### Benefits of Using Custom Landing Pages

* **Professional, Branded Links:** Affiliates can promote a clean URL (`yoursite.com/partner/john`) instead of a generic one with a query parameter. This looks more professional and builds brand credibility.
* **Enhanced Trust and Conversions:** A custom URL is often perceived as more trustworthy by potential customers, which can lead to higher click-through rates and better conversion rates.
* **Personalized Content:** You can tailor the content of each landing page for a specific affiliate. Imagine adding their photo, a personal welcome message from them, a testimonial about your product, or even a special discount exclusive to their audience.


### Important Notes
* Each custom landing page can only be assigned to **one affiliate**.
* The `ref` attribute in the shortcode can accept either the affiliate's numeric **ID** or their WordPress **username** (if enabled in settings).
* You can create an **unlimited number of landing pages** for as many different affiliates as you wish.
* This feature is especially valuable for your top-performing affiliates, providing them with a powerful and professional promotional tool.