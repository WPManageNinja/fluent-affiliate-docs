---
title: Google reCAPTCHA Integration
description: Learn how to integrate Google reCAPTCHA with FluentAffiliate to protect your affiliate registration form from spam and bot sign-ups.
---

# Google reCAPTCHA Integration

Spam registrations and bot sign-ups can affect the quality of your affiliate program. FluentAffiliate allows you to protect your affiliate registration form with **Google reCAPTCHA**, ensuring that only genuine users can register as affiliates.

In this guide, you'll learn how to generate reCAPTCHA credentials from Google, configure them inside FluentAffiliate, and confirm what your affiliates will see once the challenge is live.

## Step 1: Get Your Google reCAPTCHA Keys

Before enabling reCAPTCHA in FluentAffiliate, you need to generate a **Site Key** and **Secret Key** from Google. These keys are what let your WordPress site and Google's reCAPTCHA servers talk to each other and verify that a visitor is human.

1. Visit the **[Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)** and sign in with your Google account. If you already manage other sites here, you'll land on the dashboard for your most recently used site, showing stats like **Total requests** and **Suspicious requests**.
2. Click the **+ (plus)** icon in the top-right corner, next to the settings gear and download icons, to register a new site.

![reCaptcha](/images/integrations/recaptcha/plus-icon-1.webp)

This opens the **Register a new site** form.

3. Enter a **Label** for the site a short name (up to 50 characters) that helps you identify this credential set later, especially if you manage reCAPTCHA for multiple sites.
4. Under **reCAPTCHA type**, choose the version you want to use:
   * **Score based (v3)**: verifies requests silently using a risk score, with no visible challenge or checkbox for your affiliates to interact with. This is the option selected in the example below.
   * **Challenge (v2)**: shows the familiar "I'm not a robot" checkbox that visitors must click.
5. Add your website's domain in the **Domains** field (click the **+** to add it).
6. Optionally, if you've used Google Cloud before, a **Google Cloud Platform** section appears where you can pick an existing **Project Name** to associate the keys with. You can leave the default selection as-is if you're not sure.
7. Click the **Submit** button.

![reCaptcha](/images/integrations/recaptcha/captcha-type-2.webp)

### Copy Your Site Key and Secret Key

Once you submit the form, Google registers your site and takes you to the **Adding reCAPTCHA to your site** confirmation page. This page gives you everything you need to connect the credential to FluentAffiliate:

* **Site Key**: Shown in a read-only field with a **COPY SITE KEY** button next to it. This is the public key used in the HTML your site serves to visitors.
* **Secret Key**: Shown in its own field with a **COPY SECRET KEY** button. This key is used for server-to-server communication between your site and reCAPTCHA, and should be kept private.

**Copy** both values now, as you'll paste them into FluentAffiliate in the next step. You can always return to this page later via **GO TO SETTINGS**, **GO TO ANALYTICS**, or **VIEW IN CLOUD CONSOLE** if you need to retrieve them again.

![Credentials](/images/integrations/recaptcha/credentials-3.webp)

## Step 2: Configure Google reCAPTCHA in FluentAffiliate

After generating your reCAPTCHA keys, you can configure them in FluentAffiliate.

1. Go to your **WordPress Dashboard**.
2. Navigate to **FluentAffiliate → Settings**.
3. From the left sidebar, select **Registration Settings** to expand it, then click **Captcha**.

> For a full breakdown of every field on this page, see the [Captcha Settings](/guide/settings-and-customization/captcha-settings) guide.

On the Captcha settings page, configure the following options:

### Enable Captcha on Registration

Check this box to add Google reCAPTCHA to your affiliate registration form. Once enabled, submissions are verified against your reCAPTCHA credentials before a new affiliate account is created.

### reCAPTCHA Version

Choose the same reCAPTCHA version that you selected when creating your credentials in the Google reCAPTCHA Admin Console:

* **v2 Checkbox ("I'm not a robot")** — matches the Google **Challenge (v2)** type.
* **v3 (score based, invisible)** — matches the Google **Score based (v3)** type.

### Site Key

Paste the **Site Key** you copied from Google into this field.

### Secret Key

Paste the **Secret Key** you copied from Google into this field. The value is masked by default click the eye icon next to the field to reveal it while you're pasting or verifying it.

### Validate Keys

After entering both keys, click **Validate Keys** to have FluentAffiliate check them against Google. If everything is correct, you'll see a confirmation message reading **"Both keys are valid."** just below the button.

### v3 Score Threshold

This field only applies when you're using **reCAPTCHA v3**. It sets the minimum score (from **0.0** to **1.0**) a submission must reach to be accepted a score of **1.0** means "very likely a human," while **0.0** means "very likely a bot." Any request scoring below your chosen threshold is blocked. Use the **−** and **+** buttons to adjust the value; the default is **0.5**.

### Failure Message

Enter the message you want users to see if the reCAPTCHA verification fails. The default message is:

> **Security check failed. Please try again.**

Once you've finished configuring the settings, click **Save Settings** to apply your changes.

![Valid Key](/images/integrations/recaptcha/validate-key-4.webp)

## Previewing the Result

Here's a preview of the affiliate registration form after adding reCAPTCHA v3 to the site. Since v3 runs invisibly in the background, affiliates won't see a checkbox to click instead, a short disclaimer appears near the **Register** button, noting that the site is protected by reCAPTCHA and linking to Google's Privacy Policy and Terms of Service. Any suspicious submissions are silently blocked based on the score threshold you set, without interrupting genuine affiliates.

![Preview](/images/integrations/recaptcha/preview-5.webp)

That's it! Your affiliate registration form is now protected with **Google reCAPTCHA**, helping prevent spam registrations and keeping your affiliate program secure.
