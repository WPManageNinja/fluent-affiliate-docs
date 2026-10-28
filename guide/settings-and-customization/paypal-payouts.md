---
title: PayPal Payouts
description: Learn how to set up PayPal Payouts in FluentAffiliate Pro. Connect your PayPal account with API keys, register the webhook, and pay your affiliates to their PayPal email in one step.
---

# PayPal Payouts

Is paying every affiliate one by one taking up too much of your time? As your affiliate program grows, sending manual payments to each partner quickly becomes a hassle. With PayPal Payouts, FluentAffiliate lets you send all the payments of a payout to your affiliates' PayPal emails in one step, and it updates the status of each payment for you.

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

## Getting Your PayPal API Keys

Getting your API keys only takes a few minutes. Follow these steps:

1. Log in to the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/) with your PayPal Business account.
2. Go to **Apps & Credentials**.
3. Choose **Sandbox** to get test keys, or **Live** to get the keys that send real money.
4. Click the **Create App** button, give your app a name, and create it.

![Create App](/images/settings-and-customization/paypal-payouts/create-app-1.webp)


5. Open the app, and under **API credentials**, click the copy icon next to the **Client ID** and the **Secret key** to copy them.
6. In the app settings, make sure the **Payouts** feature is checked.

We recommend starting with the **Sandbox** keys first. Sandbox payouts don't move any real money, so you can safely test everything before going live.

![PayPal API Credentials](/images/settings-and-customization/paypal-payouts/paypal-api-credentials.webp)


## How to Configure PayPal Payouts

The settings page has two tabs: **Test credentials** and **Live credentials**. Open the tab for the mode you want to use and fill out the following:

* **Client ID:** In the **Test Client ID** or **Live Client ID** field, paste the Client ID you copied from your PayPal app.
* **Secret:** In the **Test Secret** or **Live Secret** field, paste the Secret from your PayPal app. FluentAffiliate keeps the Secret encrypted and does not show it again. If you want to change it later, simply enter a new Secret.
* **Webhook URL:** This is the URL where PayPal sends the payout results. You don't need to copy it anywhere, as FluentAffiliate registers it at PayPal automatically when you save the credentials.
* **Test connection:** Click this button to make sure FluentAffiliate can reach PayPal with your keys. If everything is correct, you'll see a **Connected to PayPal** message.

Keep in mind that payouts use the credentials of the tab that is open when you save. So, if you save while the **Live credentials** tab is open, your payouts will move real money.

Once you have entered your keys, click the **Save Settings** button to apply your changes. FluentAffiliate checks the keys with PayPal before saving them, and if PayPal refuses them, you'll see the reason on the screen.

![PayPal Payouts configure](/images/settings-and-customization/paypal-payouts/PayPal-payouts-accessing-1.webp)


### Webhook Status

After saving, you'll see the webhook status on the settings page:

* **Webhook registered at PayPal:** Everything is set. PayPal will send each payment result to your site within seconds.
* **Webhook not registered:** Your payouts will still work, but the payment status updates through the hourly check instead. Click the **Register webhook again** button to try again.

If you are using a local or staging site, PayPal usually can't reach it. That's okay! FluentAffiliate checks PayPal every hour for recent payouts and once a day for older ones, so your payment statuses stay up to date.

### Removing the Keys

If you want to disconnect PayPal, click the **Remove keys** button. This removes both the Sandbox and Live keys along with the webhooks. You won't be able to send PayPal payouts until you add the keys again.

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
