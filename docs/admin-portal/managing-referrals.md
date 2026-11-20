---
title: Managing Referrals
description: Complete guide to managing referrals in FluentAffiliate. Learn how to track, filter, approve, and manage affiliate referrals with detailed analytics and commission tracking.
---

# Managing Referrals

FluentAffiliate gives you a clear and powerful dashboard to manage and track every affiliate referral. This is where you can see all successful conversions, review their status, and take action when needed.

In this guide, we'll walk you through the features of the Referrals page to help you stay in control.

## Referral Dashboard Overview

To get started, click on the **Referrals** tab from the main FluentAffiliate menu. This will take you to the main referrals dashboard.

### Adding a New Referral

At the top right, you'll see the **New Referral** button. This allows you to manually create a referral and assign it to an affiliate, which can be useful for offline sales or special cases. See [Add a New Referral](#add-a-new-referral) below for the form.

### Filtering Referrals by Status

Just below the page title, you can use the filter tabs to quickly view referrals based on their status:
* **All:** Shows every referral that has ever been recorded. 
* **Unpaid:** Shows approved referrals that are waiting to be included in a payout. 
* **Paid:** Shows referrals for which commissions have already been paid to the affiliate. 
* **Pending:** Shows new referrals that are awaiting your approval before they can be paid. 
* **Rejected:** Shows any referrals that you have marked as rejected, meaning no commission will be paid for them.

### Referrals Details Table
The main table lists every referral with all the important details, giving you a transparent overview.

* **ID:** A unique identification number for each referral.
* **Affiliate:** The name of the affiliate who generated the referral. You can click on their name to view their full profile. 
* **Amount:** The commission amount earned from that specific referral. 
* **Description:** Details about the product or service that was purchased. 
* **Reference:** A source or order ID linked to the referral. 
* **Status:** The current status of the referral: **Paid**, **Pending**, **Unpaid**, **Processing** (the referral is in a payout that is being paid), **Rejected**, or **Cancelled**. Only the All, Unpaid, Paid, Pending, and Rejected filter tabs are available. If you have set a [holding period](/guide/settings-and-customization/referral-settings#how-the-holding-period-works), an unpaid referral that is still on hold also shows an **On hold until** date. It can't be added to a payout before this date. 
* **Type:** The source of the commission, such as a product sale or a form submission. 
* **Date:** The exact date the referral was created. 

![Referral Dashboard Overview](/images/admin-portal/managing-referrals/referrals-list-overview.webp)

To see all the details of a referral, click its **ID**. The details page includes:

* **Referral Details:** Source ID, Total Order Amount, Status, On Hold Until (if the referral is still on hold), Date, and Commission Amount.
* **Customer Info.**
* **Visit Details:** Referral Visit URL, Referrer URL (Source), UTM Campaign, UTM Source, UTM Medium, and Visit Date.
* **Affiliate Info:** Base Referral URL, Joined on, Rate, Status, Payment Email, Bank Details, Website, Note, a QR code you can download, and any attached coupons.

If the referral is in a payout that is being paid, the page tells you that you can change it after the payout finishes.

![View Referral On Hold](/images/admin-portal/managing-referrals/view-referral-on-hold.webp)

### Managing Individual Referrals
At the end of each referral's row is a three-dot menu that contains key actions:

* **Edit:** Allows you to modify the details of the referral, such as its status or amount. A paid referral can't be edited.
* **Delete:** Permanently removes the referral record. You'll be asked to confirm, and this can't be undone. A referral that is paid or already in a payout can't be deleted.

Edit and Delete are disabled for a referral that is in a payout currently being paid.

### Search and Sort Tools

* **Search bar**: Quickly find specific referrals by product description, provider, or ID.

* **Column Selection**: Choose which columns you want to display in the referral table. You can toggle **Description**, **Type**, and **Date**.

* **Export CSV**: Download your referrals as a CSV file. The export follows your current search and filters and is limited to the first 5,000 records by default. A warning tells you when the export was cut off.

* **Sort**: Sort your referrals by Referral ID, Amount, or Reference in ascending or descending order. Don't forget to hit **Apply** after sorting.

![Referral Search and Sort Tools](/images/admin-portal/managing-referrals/search-and-sort-tools.webp)

### Add a New Referral

Want to manually add a referral to your site? 

First, click the **New Referral** button. 

![Add New Referral Button](/images/admin-portal/managing-referrals/add-new-referral-button.webp)

After clicking the button, a form will slide in from the right side of your screen. Here, you'll need to fill in the details for the new referral.

* **Select Affiliate:** Start typing the name of the affiliate you want to credit and select them from the list. This is the most important field.
* **Type:** Choose the type of referral from the dropdown menu (**Sale** or **Lead Optin**). Provider-managed types such as Payment, Recurring Sale, and Lifetime Sale are shown as locked when you edit an existing referral.
* **Amount:** Enter the exact commission amount the affiliate will earn for this referral in the designated numerical field. The currency for this amount is displayed next to the input box, and decimal amounts are accepted.
* **Status:** Set the initial status of the referral. You can choose from Unpaid, Pending, or Rejected. A referral becomes Paid through a [payout](/guide/admin-portal/payout-management).
* **Description:** Add a short note or description for your own records, explaining why this referral was added manually (e.g., "Manual entry for phone order #5512").
* **Source (Optional):** You can enter a source slug here to provide extra context about where the referral came from (e.g., manual_sale).
* **Provider ID (Order ID) (Optional):** If this referral corresponds to an order in another system (like WooCommerce), you can enter the Order ID here to link them for easy reference.

Source and Provider ID can't be changed when you edit a referral. Once you have filled in all the necessary details, click the **Create Manual Referral** button at the bottom of the form.

The new referral will be instantly created and will appear in your main referrals list, assigned to the affiliate you selected.

![Create Manual Referral](/images/admin-portal/managing-referrals/create-manual-referral.webp)

That's it! Your new referral will now appear in the list.
