---
title: PayPal Payouts
description: Learn how to set up PayPal Payouts in FluentAffiliate Pro. Connect your PayPal account with API keys, register the webhook, and pay your affiliates to their PayPal email in one step.
---

# PayPal Payouts


Is paying every affiliate one by one taking up too much of your time? As your affiliate program grows, sending manual payments to each partner quickly becomes a hassle. With PayPal Payouts, FluentAffiliate allows you to send all the payments of a payout to your affiliates' PayPal emails in one step, and it updates the status of each payment for you.

In this guide, we'll walk you through connecting your PayPal account with FluentAffiliate.

::: info
To get started, you must have **FluentAffiliate Pro** installed and activated on your WordPress site. Only site administrators can change the PayPal Payouts settings.
:::

## Before You Start

Before connecting PayPal, make sure you have the following ready:

* **PayPal Business Account:** You need a PayPal Business account with the **Payouts** feature turned on. If Payouts is not enabled on your account, you can request access from PayPal.
* **PayPal REST API App:** You create this app in the PayPal Developer Dashboard. It gives you the **Client ID** and **Secret** that FluentAffiliate needs to send payments.
* **Supported Currency:** Your store currency must be supported by PayPal Payouts. Supported currencies are AUD, BRL, CAD, CHF, CNY, CZK, DKK, EUR, GBP, HKD, HUF, ILS, JPY, MXN, MYR, NOK, NZD, PHP, PLN, SEK, SGD, THB, TWD, and USD.

## Accessing PayPal Payouts Settings

To find these settings, go to your WordPress dashboard. From the FluentAffiliate menu, click on **Settings**, and select **PayPal Payouts** from the left sidebar.

On this page, you'll also find a quick **PayPal Developer Dashboard** link, so you can jump straight to your PayPal app to copy the keys.

![PayPal Payouts Settings](/images/settings-and-customization/paypal-payouts/paypal-payouts-settings.webp)

## Generate Your PayPal API Credentials

You can create the required API credentials through the PayPal Developer Dashboard.

#### Step 1: Sign in to PayPal Developer

Open the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/) and sign in with the PayPal Business account you want to use for payouts.

#### Step 2: Open Apps & Credentials

Navigate to Apps & Credentials and choose the appropriate environment:

 * **Sandbox:** Use this environment for testing without sending real payments.
 * **Live:** Use this environment when you are ready to process real payouts.

We recommend starting with Sandbox so you can test your configuration before handling actual affiliate payments.

#### Step 3: Create a REST API app

- Select the option to create a new app.
- Enter a recognizable application name.
- Complete the required setup.
- Create the application.

![Create App](/images/settings-and-customization/paypal-payouts/create-app-1.webp)

#### Step 4: Copy your credentials

After creating the application, locate the API credentials displayed on its details page.

Copy the following values:

- **Client ID**

- **Secret key**

Store these credentials securely. Never publish your Secret in frontend code, public repositories, screenshots, or other publicly accessible locations.

#### Step 5: Enable Payouts

Open your application's settings and verify that the Payouts feature is enabled, where applicable. If your account requires additional permissions or activation, complete those steps before testing the integration.

>[!Note]
> Sandbox and Live credentials are different. Use credentials that match the environment you have selected in FluentAffiliate.


![PayPal API Credentials](/images/settings-and-customization/paypal-payouts/paypal-api-credentials.webp)


## Configure PayPal Payouts

Return to your WordPress dashboard and open **FluentAffiliate → Settings → PayPal Payouts**. Complete the following fields.

* **Client ID:** In the **Test Client ID** or **Live Client ID** field, paste the Client ID you copied from your PayPal app.
* **Secret:** In the **Test Secret** or **Live Secret** field, paste the Secret from your PayPal app. FluentAffiliate keeps the Secret encrypted and does not show it again. If you want to change it later, simply enter a new Secret.
* **Webhook URL:** This is the URL where PayPal sends the payout results. You don't need to copy it anywhere, as FluentAffiliate registers it at PayPal automatically when you save the credentials. The **Copy** button is only for reference, for example, if you want to check the URL in your PayPal dashboard.
* **Test connection:** Click this button to make sure FluentAffiliate can reach PayPal with your keys. If everything is correct, you'll see a **Connected to PayPal** message.

Keep in mind that payouts use the credentials of the tab that is open when you save. So, if you save while the **Live credentials** tab is open, your payouts will move real money.

Once you have entered your keys, click the **Save Settings** button to apply your changes. FluentAffiliate checks the keys with PayPal before saving them, and if PayPal refuses them, you'll see the reason on the screen.

![PayPal Payouts configure](/images/settings-and-customization/paypal-payouts/PayPal-payouts-accessing-1.webp)


### Webhook Status

When you save your PayPal keys, FluentAffiliate registers the webhook at PayPal for you and saves the webhook ID that PayPal sends back. After saving, you'll see the webhook status on the settings page:

* **Webhook registered at PayPal:** Everything is set. PayPal will send each payment result to your site within seconds.
* **Webhook not registered:** Your payouts will still work, but the payment status updates through the hourly check instead. Click the **Register webhook again** button to try again.

::: warning
Please don't add the webhook by hand in your PayPal dashboard. FluentAffiliate checks every PayPal event against the webhook ID it saved. A webhook you create yourself has a different ID, so FluentAffiliate will reject its events, and you'll end up with duplicate webhooks in your PayPal app.
:::

To receive webhooks, your site must be reachable from the public internet over **HTTPS**. If you are using a local or staging site, PayPal usually can't reach it. That's okay! FluentAffiliate checks PayPal every hour for recent payouts and once a day for older ones, so your payment statuses stay up to date.

### Remove PayPal API Credentials

If you need to disconnect PayPal, click the **Remove keys** button in the PayPal Payouts settings.

Removing the keys disconnects the stored API credentials and removes the associated integration configuration, including the **Sandbox** and **Live** keys and webhook setup.

After removing the credentials, you will need to configure the integration again before using PayPal Payouts.

Before disconnecting PayPal, review any pending payouts and confirm that you no longer need the existing connection.

## Selecting PayPal as the Payout Method

Adding the keys is only half of the setup. You also need to select PayPal as your payout method:

1. Go to **FluentAffiliate → Settings → Referral Settings**.
2. Find the **Payout Method** dropdown and select **PayPal**.
3. Click the **Save Settings** button.

That's it! Now, when you create a new payout, you'll see **PayPal Payouts** as a payout method. To learn how to send your first PayPal payout, check out the [Payout Management](/guide/admin-portal/payout-management#pay-affiliates-with-paypal-payouts) guide.

## Affiliate PayPal Email

PayPal sends each payment to the affiliate's **Payment Email**. Affiliates can add this email from their [affiliate portal settings](/guide/affiliate-portal/update-your-settings), and you can also edit it from the affiliate's profile.

When you create a PayPal payout, FluentAffiliate leaves out any affiliate without a valid PayPal email. Their referrals stay unpaid, so a later payout can pay them once they add an email.

## Troubleshooting

Here are some common issues you might run into and how to fix them:

* **Payouts is not enabled on this PayPal account:** Turn on the Payouts feature for your PayPal Business account and your REST app, then try again.
* **PayPal refused the keys:** Make sure you copied the Client ID and Secret from the right mode. Sandbox keys only work in the **Test credentials** tab, and Live keys only work in the **Live credentials** tab.
* **PayPal does not support the currency:** Your store currency is not on PayPal's supported list. In this case, you'll need to pay these affiliates manually.
* **The referrals use more than one currency:** PayPal can only send one currency in a single payout. Create a separate payout for each currency.
* **PayPal Payouts is not showing when creating a payout:** Check that your keys are saved and that **PayPal** is selected as the payout method in Referral Settings.
