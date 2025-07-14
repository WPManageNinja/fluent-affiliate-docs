# FluentForms Integration with FluentAffiliate

FluentForms is a powerful, lightweight, and user-friendly form builder for WordPress. When you connect it with FluentAffiliate, you can unlock two powerful capabilities: tracking affiliate commissions on your paid form submissions and creating custom affiliate registration forms.

This guide will show you how to set up both, starting with the simple way to track commissions.

>[!Note]
> Make sure both plugin FluentForms and FluentAffiliate are installed and activated on your website.

## Enable FluentForms in FluentAffiliate

First, you need to activate the integration module in FluentAffiliate.

1. Go to the **FluentAffiliate Dashboard**. 
2. From the top menu, click on **Settings**, and from the left sidebar, select the **Integration Settings** option. 
3. You will see a list of available integrations. Look for **FluentForms** in this list. To enable the integration, click on the **toggle** button next to FluentForms.

Your **FluentForms** integration with **FluentAffiliate** is now active, allowing you to create affiliate registration forms and track form submissions.

In the **Manage** section, you'll find additional settings to customize how the integration works.

![Integration Settings](/guide/public/images/integrations/fluentforms/fluentforms-integration-setup.webp)

## Set Custom Commission Rates for Your Forms

Click the **Manage** link to tell FluentAffiliate how much to pay for referrals from specific forms. This is where you set the commission that overrides your global rate.

Check the box for **Enable custom rate for specific forms**. This will reveal the configuration options.

* **Select Forms:** Click inside the "Select" box and choose the payment form you want to set a commission for.

* **Select Rate:** Enter the commission amount and choose whether it's a Percentage (%) of the payment or a Fixed amount.

* **Add More Rates:** To set up commissions for another form, click the +Add New Group button. This will add a new row where you can select another form and set its rate.

**Save Settings:** Once you're done, click the **Save Settings** button.

![FluentForms Settings](/guide/public/images/integrations/fluentforms/custom-rate-setup.webp)

## Creating a Custom Affiliate Registration Form 

You can also use FluentForms to create a beautiful, custom registration form for users who want to become your affiliates.

### Step 1: Create Your Registration Form

In FluentForms, create a new form with all the fields you need for registration, such as:

* Name Fields

* Email

* Password

* Payment Email 

* Website URL (Optional)

![Configure Forms](/guide/public/images/integrations/fluentforms/edit-form.webp)

### Step 2: Configure the Integration Feed

Next, you need to connect this specific form to ***FluentAffiliate's** registration system.

1. Go into the settings for your registration form and click on **Settings & Integrations**.

2. From the left menu, select **Configure Integrations**.

3. Click the **Add New Integration** button and choose **Fluent Affiliate Registration Integration** from the dropdown list.


![Settings & Integrations](/guide/public/images/integrations/fluentforms/fluentaffiliate-integrations.webp)

### Step 3: Map Your Form Fields

Now, you need to tell FluentAffiliate which form field corresponds to which piece of affiliate data.

* **Integration Name:** Give your feed a recognizable name.

* **Map Fields:** For each Affiliate Field (like Email Address, Full Name, Password), select the corresponding field from your form in the dropdown on the right.

* **Auto Approve Affiliate:** Choose whether to use the global setting, automatically approve the affiliate, or keep their application pending for you to review manually.

* **Conditional Logic:** You can enable this to process the registration feed only when certain conditions are met.  For example, you could set a condition to only register a user as an affiliate if they select a "Yes, I agree to the terms" checkbox on your form.

* **Status:** Ensure the Enable this Integration checkbox is checked to make the feed active.  You can uncheck this at any time to temporarily disable new affiliate registrations through this form without deleting your settings.

* Click **Save Feed** when you are done.

After saving, a success message will appear confirming that the feed has been created.

Now, you can easily **edit**, **delete**, or **disable** this feed at any time from the form's integration settings. 

![Integrations Feed](/guide/public/images/integrations/fluentforms/form-integration-feed.webp)

### Embed your Form

Once you complete the customizations, click the **Preview & Design** button in the middle of the screen. This will allow you to see a live preview of how your form will look on the front end.

To display the form on a specific page or post, simply **copy** the **Shortcode** from the top right corner of the screen. Then, paste this shortcode into the content area of your desired **Page** or **Post**.

This will embed the form on your website, making it visible and ready for users to interact with.

![Embedded Form](/guide/public/images/integrations/fluentforms/embedded-form-settings.webp)

## Generate an Affiliate Link

Once your form is live, your affiliates can start promoting it.

1. Affiliates should log in to their **Affiliate** area and go to the Affiliate **Links** section. 
2. There, you can **paste** the URL of the page where you embedded the form. 
3. Click on the **Generate** button and FluentAffiliate will generate a unique **affiliate link** for you.

Once your link is ready, **copy** the affiliate link and share it wherever you like on social media, emails, blogs, or directly with your audience.

![Copy Affiliate Link](/guide//public/images/integrations/fluentforms/copy-affiliate-link.webp)

If someone clicks the link, you will get the affiliate commission.

![Referral](/guide//public/images/integrations/fluentforms/referral.webp)


### Troubleshooting Common Issues

Here are solutions to common issues you might encounter:


* **Registration Form Not Working:** Double-check that you have correctly mapped all the required fields (like Email and Password) in the form's integration feed. An unmapped required field will cause the registration to fail.

And that's it. This is an easy process to integrate FluentForms with FluentAffiliate.


