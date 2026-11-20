---
title: Managing Affiliates
description: Learn how to manage affiliates in FluentAffiliate. Add new affiliates, edit profiles, track performance, filter by status, and organize your affiliate program effectively.
---

# Managing Affiliates

In FluentAffiliate, managing your affiliates is easy and organized. The Affiliates page is your central hub to see a complete overview of all your affiliates, check their performance, manage their status, and even add new affiliates manually.

In this guide, we'll walk you through what you can do on the Affiliates page.

## Affiliates Dashboard Overview

First, go to the **Affiliates** tab from the FluentAffiliate menu. There, you'll see the affiliate dashboard with all your site's affiliate details.

Here's what you'll find in the **Affiliates** section:

### Adding a New Affiliate

At the top right corner, you'll find the **+ New Affiliate** button. Click this to manually add a new affiliate to your program without requiring them to sign up themselves.

### Filtering Your Affiliates

Just below the page title, you'll see filter tabs that let you quickly segment your list:

* **All:** Shows every affiliate in your program.
* **Active:** Shows only approved and active affiliates.
* **Pending:** Shows affiliates who have registered but are awaiting your approval.
* **Inactive:** Shows affiliates who have been deactivated.

### Affiliate Details Table

This is the heart of the page, where every affiliate is listed with their key performance details. This gives you a clear and immediate picture of how each partner is doing. The columns include:

* **ID:** A unique number assigned to each affiliate for easy identification.
* **Affiliate:** The name and email address of the affiliate.
* **Rate:** Their specific commission rate.
* **Total Earnings:** The total commissions they have ever earned.
* **Unpaid Earnings:** The approved earnings that are waiting to be paid out.
* **Referrals:** The total number of successful referrals they've made.
* **Visits:** The total number of clicks their links have received.
* **Registered at:** The date they joined your affiliate program.
* **Status:** Their current account status (e.g., Active, Pending, Inactive).

![Affiliate Management Dashboard](/images/admin-portal/managing-affiliates/affiliate-list-overview.webp)

### Managing Individual Affiliates

At the end of each affiliate's row, you'll see a three-dot menu. Clicking this opens a list of actions you can take for that specific affiliate:

* **Edit:** Opens the same form as **Add New Affiliate**, where you can update the affiliate's details, such as their status or commission rate. Save your changes with the **Update Affiliate** button.
* **Delete:** Permanently removes the affiliate from your program. You'll need to type **DELETE** to confirm. The affiliate's referrals and visit data are deleted as well, while payout transaction records are kept. An affiliate who has paid referrals or referrals in a payout can't be deleted; deactivate them instead.

### Pagination Buttons

If you have a large number of affiliates, the controls at the bottom of the page help you navigate your list easily. You can set the number of **affiliates to show per page** and use the **arrow** buttons to move between pages. You can also type a page number directly into the box and hit Enter to jump straight to that page.

### Search and Sort Tools

To the top-right of the table, you'll find icons to help you organize your view:

* **Search Bar:** Quickly find a specific affiliate by typing their name, email address, payment email, user ID, or Affiliate ID.
* **Column Selector:** Customize your table view using the **Columns** button. Check or uncheck columns based on what info you want to display. You can toggle **Total Earnings**, **Unpaid Earnings**, **Referrals**, **Visits**, and **Register Date**. The ID, Affiliate, Rate, and Status columns are always shown.
* **Export CSV:** Click the export icon next to the search bar to download your affiliates as a CSV file. The export follows your current search, status filter, and sort order. By default it is limited to the first 5,000 records, and a warning tells you when the export was cut off.

![Export Affiliates as CSV](/images/admin-portal/managing-affiliates/export-affiliates-csv.webp)

* **Sort Options:** Sort affiliates by **Affiliate ID**, **Total Earnings**, **Unpaid Earnings**, **Referrals**, **Visits**, or **Register Date**. You can also choose between ascending or descending order, then click **Apply** to update.

![Affiliate Search and Sort Tools](/images/admin-portal/managing-affiliates/search-and-sort-tools.webp)

## Add a New Affiliate

Want to manually add an affiliate to your site? Here's how:

<iframe class="video-embed" src="https://www.youtube.com/embed/oPcPsNmM4Lg" title="How to Add Affiliates in WordPress | FluentAffiliate's Secret to Grow Affiliate Network" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Click the **+ New Affiliate** button. A form will slide in from the right side of your screen.

![Add New Affiliate Button](/images/admin-portal/managing-affiliates/add-new-affiliate-button.webp)

Fill in the following fields:

* **Select User:** Click the field to search and select the existing WordPress user you want to turn into an affiliate.
* **Rate type:** Choose how they'll earn (Default, Percentage, Flat Rate, or Group).
* **Select Group / Commission Rate:** If you chose **Group**, select the [affiliate group](/guide/settings-and-customization/group-settings). Otherwise, unless you chose Default, enter the commission rate.
* **Status:** Set the initial affiliate status to Active, Pending, or Inactive.
* **Payment email:** Shown when your payout method is PayPal. Enter their PayPal payment email address. This is the email used for [PayPal Payouts](/guide/settings-and-customization/paypal-payouts).
* **Bank Details:** Shown instead of Payment email when your payout method is Bank Transfer. Enter the affiliate's bank details; this field is required in that case.
* **Note:** (Optional) Add any notes for internal admin use.

Hit the **Create Affiliate** button at the bottom to save.

![Add Affiliate Form](/images/admin-portal/managing-affiliates/add-affiliate-form.webp)

That's it! Your new affiliate will now appear in your main list.

## Affiliate Profile

Click an affiliate's name to open their profile. The profile has these sub-tabs, in this order: **Overview**, **Referrals**, **Visits**, **Payouts**, and **Customers**. Referrals, Visits, Payouts, and Customers only appear if you have the matching permission. The Overview tab shows the affiliate's all-time stats and an activity overview. If the affiliate isn't active yet, a banner says so and an **Approve Affiliate** button lets you approve them. See the [Affiliate Profile](/guide/miscellaneous/affiliate-profile) guide for more.

## Tracking Assigned Customers (Customers Tab)

The **Customers** sub-tab inside every affiliate's profile shows exactly which buyers are permanently linked to that specific partner. Linking, unlinking, and the status filters need **FluentAffiliate Pro** with the **[Lifetime Commissions](/guide/settings-and-customization/referral-settings#lifetime-commissions)** feature enabled in your global referral settings.

### Navigating to the Customers Tab

1. Head over to the **Affiliates** dashboard tab.
2. Click on the specific **Name** of the affiliate whose account you want to inspect.
3. Look at the sub-navigation menu inside their profile and click on **Customers**.

### Sorting and Searching Linked Customers

The Customers table shows a **#** column, the buyer's **Name** and **Email**, total **Referrals** generated, the date they **Joined**, and their **Lifetime Expiry** date (shown as **Never** when no expiry days are set; admins only), followed by the **Unlink** action.

* **Status Filtering (Pro):** You can easily segment this list by clicking the filter buttons just above the data table to display **All**, **Active**, or **Expired** relationships.
* **Quick Search:** Need to find a single person out of a large customer base? Use the search box to search by name or email.

![Customers Tab](/images/admin-portal/managing-affiliates/customer-tab.webp)

### Linking, Transferring, or Unlinking Customers

As an admin, you retain full operational control over these long-term customer assignments:

* **Link a New Customer:** To manually connect an existing buyer to this affiliate, click the **Link Customer** button. A modal window will appear allowing you to select a buyer profile from your database and attach them to the affiliate for automated lifetime commission tracking.
* **Transfer a Customer:** If the buyer you select is already linked to another affiliate, a **Transfer Customer** confirmation appears. Confirming it credits future purchases to the new affiliate, while past referrals stay with the original one.
* **Unlink a Connection:** To remove a relationship, click the **Unlink** button located at the end of that customer's data row.

![Link Customer](/images/admin-portal/managing-affiliates/link-customer.webp)

> [!NOTE]
> If you transfer or unlink a customer, any commissions previously earned on past purchases will securely stay with the original affiliate. Only future transactions follow the updated affiliate assignment.
