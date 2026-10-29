---
title: Payout Management
description: Learn how to manage affiliate payouts in FluentAffiliate. Create payout batches, send payments through PayPal Payouts, export transaction reports, track payment history, and process manual payments to your affiliates.
---

# Payout Management

FluentAffiliate provides a Payout option to manage affiliate payments. It records each transaction and generates a detailed report showing who was paid and how much. You can also export this report for your records.

You can pay your affiliates in two ways. You can make the payments manually, using the PayPal email listed in their profile. Or, if you are using FluentAffiliate Pro, you can send all the payments through **PayPal Payouts** in one step. In this guide, we'll walk you through both.

Watch the payout process in action:

<iframe class="video-embed" src="https://www.youtube.com/embed/KYeamXNWn7U" title="How to Pay Your Affiliates in WordPress | FluentAffiliate Payout Management" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Payout 

Navigate to the **Payout** tab from the FluentAffiliate menu to view your list of previous payouts or to create new payouts. You'll also find filter and search options to help you quickly locate specific records.

To create a new payout, simply click the **Pay Affiliate** button.

![Payout Dashboard](/images/admin-portal/payout-management/payout-dashboard-overview.webp)

You'll now land on the payout creation page. This page only appears if there are unpaid affiliates available for payment.

Here's what to fill out:

* **Payout Title**: Add a title for the payout.

* **Payout Description**: Enter a short note or description.

* **Affiliates**: Select one or more affiliates to pay. Only affiliates with unpaid earnings will be listed here. If you leave this field blank, payment will be sent to all eligible affiliates.

* **Start Date - End Date**: Choose the date range for which you want to process payouts. For example, select last month's range to pay commissions from that period.

* **Minimum Payout Amount**: Set a minimum amount that affiliates must reach to be eligible for payout.

* **Payout Method**: Choose how you want to pay this payout. Select **Manual** to pay the affiliates yourself, or **PayPal Payouts** to send the money through PayPal. The PayPal Payouts option only appears once you have [set up PayPal Payouts](/guide/settings-and-customization/paypal-payouts).

Once everything is filled out, click the **Next (Review Payout)** button to proceed.

![Payout Creation Form](/images/admin-portal/payout-management/create-new-payout.webp)

Now, on the Payout dashboard, you'll see your newly created payout listed.

![Payout List](/images/admin-portal/payout-management/payout-list-view.webp)

Now, click on the **Payout Name** to view its payment details. Here, you can see the total amount paid to your affiliates, along with which affiliates received commissions, the dates, and other important info.

The right sidebar will show you additional payout details.

![Payout Details](/images/admin-portal/payout-management/payout-details-view.webp)

In the Transactions tab, you can generate a report for your transactions. Simply click the **Export** button to download a CSV file with your payout details.

![Transaction Export](/images/admin-portal/payout-management/export-transaction-button.webp)

The **CSV** file will include the following details:

* affiliate_id
* affiliate_name
* email
* payout_email
* amount
* currency

![CSV Export Example](/images/admin-portal/payout-management/csv-export-example.webp)

## Pay Affiliates with PayPal Payouts

If you don't want to pay each affiliate one by one, you can use PayPal Payouts to send all the payments of a payout in one step. FluentAffiliate also updates the status of each payment for you, so you always know who has been paid.

::: info
To use PayPal Payouts, you must have **FluentAffiliate Pro** installed and activated. You also need to add your PayPal API keys and select PayPal as the payout method. Check out the [PayPal Payouts](/guide/settings-and-customization/paypal-payouts) guide to set it up.
:::

### Creating a PayPal Payout

Create your payout the same way as shown above, and select **PayPal Payouts** from the **Payout Method** dropdown. Then, click the **Next (Review Payout)** button.

![PayPal Payout Method](/images/admin-portal/payout-management/paypal-payout-method.webp)

On the review page, you'll see each affiliate, their PayPal email, the payout amount, and the total. Any affiliate without a valid PayPal email is left out of the payout. Don't worry, their referrals stay unpaid, so a later payout can pay them.

No money is sent at this step. Click the **Create Payout** button to create the payout, and you can send it to PayPal from the next page.

![Review PayPal Payout](/images/admin-portal/payout-management/paypal-review-payout.webp)

### Sending the Payout to PayPal

After creating the payout, you'll land on the payout page. Here, each payment shows the **Ready To Send** status. Simply click the **Send via PayPal** button at the top.

![Ready to Send](/images/admin-portal/payout-management/paypal-ready-to-send.webp)

A confirmation popup will show you the total amount, the number of affiliates, and the mode you are using:

* **Sandbox Mode:** No real money moves. This is perfect for testing your setup.
* **Live Mode:** This sends real money to your affiliates, and PayPal charges its fee. Keep in mind that you cannot undo this.

Click **Send via PayPal** again in the popup to send the payout. It only takes a few seconds, and you can leave the page while it runs.

![Send via PayPal Confirmation](/images/admin-portal/payout-management/paypal-send-confirmation.webp)

### Tracking the Payment Status

After the payout is sent, the payout page shows the **Sent to PayPal** message along with its PayPal batch ID and the status of each payment. FluentAffiliate updates these statuses automatically through the webhook and an hourly check. If you want the latest status right away, simply click the **Check now** button.

Here are the payment statuses you might see:

* **Waiting at PayPal:** PayPal is still processing the payment.
* **Unclaimed:** The affiliate's email doesn't have a PayPal account yet. PayPal holds the money for up to 30 days and asks the affiliate to claim it. If it isn't claimed, PayPal returns the money and the payment is marked as **Failed**.
* **Paid:** PayPal has sent the money to the affiliate.
* **Failed:** PayPal couldn't pay the affiliate, for example, because the payment was denied, blocked, or returned.
* **Refunded at PayPal:** The payment was made but later refunded in PayPal. You should check this payment with the affiliate.

You'll also see the **PayPal Fee** for each payment. The site pays this fee, not the affiliate.

The **PayPal Activity** section in the right sidebar lists the recent requests sent to PayPal for this payout. This can be helpful if you ever need to contact support. You can also click the **Export** button to download a CSV file of the payout, just like a manual payout.

![PayPal Payment Status](/images/admin-portal/payout-management/paypal-payment-status.webp)

Back on the **Payouts** page, you can see the **Method** of each payout. A PayPal payout stays **Processing** while PayPal is still handling its payments, and it changes to **Paid** once all of them are paid.

![Payout List with PayPal Payouts](/images/admin-portal/payout-management/paypal-payout-list.webp)

### Handling Failed Payments

If a payment fails, you have two options:

* **Mark as paid manually:** Pay the affiliate another way, then use this option to record the payment as paid.
* **Remove from batch:** Remove the payment from this payout. The affiliate's referrals become unpaid again, so you can include them in a later payout.

### When PayPal Doesn't Respond

Sometimes the connection to PayPal can break while a payout is being sent. When this happens, the payout may already be at PayPal, and you'll see a **Payout may be sent** or **Batch ID missing** message on the payout page. To avoid paying your affiliates twice, don't send it again right away. Instead, follow these steps:

1. Log in to your PayPal account and look for the payout.
2. If you find the payout, copy its **PayPal batch ID**, paste it into the field on the payout page, and click **Add batch ID**. FluentAffiliate will check that the batch belongs to this payout and update the status of each payment.
3. If you don't find the payout, click the **Send again** button.

Please note that you can only send a payout again within 29 days of the first try. After that, the **Send again** button is no longer available. If the payout is not in your PayPal account, click the **Not in PayPal** button instead. Its payments will be marked as **Failed**, and you can pay them manually or remove them so a later payout can pay them.

Only use the **Not in PayPal** option after checking your PayPal account. If PayPal already has the payout, your affiliates could be paid twice.
