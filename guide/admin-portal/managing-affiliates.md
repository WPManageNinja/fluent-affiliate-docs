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

### Affiliates Details Table

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

* **Edit:** Opens a panel where you can update the affiliate's details, such as their status or commission rate.
* **Delete:** Permanently removes the affiliate from your program.

### Pagination Buttons

If you have a large number of affiliates, the controls at the bottom of the page help you navigate your list easily. You can set the number of **affiliates to show per page** and use the **arrow** buttons to move between pages. You can also type a page number directly into the box and hit Enter to jump straight to that page.

### Search and Sort Tools

To the top-right of the table, you'll find icons to help you organize your view:

* **Search Bar:** Quickly find a specific affiliate by typing their name, email address, or Affiliate ID.
* **Column Selector:** Customize your table view using the **Columns** button. Check or uncheck columns based on what info you want to display.
* **Sort Options:** Sort affiliates by **ID**, **Total Earnings**, **Unpaid Earnings**, **Referrals**, **Visits**, or **Registration Date**. You can also choose between ascending or descending order, then click **Apply** to update.

![Affiliate Search and Sort Tools](/images/admin-portal/managing-affiliates/search-and-sort-tools.webp)

## Add a New Affiliate

Want to manually add an affiliate to your site? Here's how:

<iframe class="video-embed" src="https://www.youtube.com/embed/oPcPsNmM4Lg" title="How to Add Affiliates in WordPress | FluentAffiliate's Secret to Grow Affiliate Network" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Click the **+ New Affiliate** button. A form will slide in from the right side of your screen.

![Add New Affiliate Button](/images/admin-portal/managing-affiliates/add-new-affiliate-button.webp)

Fill in the following fields:

* **Select User:** Click the field to search and select the existing WordPress user you want to turn into an affiliate.
* **Rate Type:** Choose how they'll earn (Default, Percentage, Flat Rate, or Group).
* **Status:** Set the initial affiliate status to Active, Pending, or Inactive.
* **Payment Email:** Enter their PayPal or preferred payment email address.
* **Additional Note:** (Optional) Add any notes for internal admin use.

Hit the **Create Affiliate** button at the bottom to save.

![Add Affiliate Form](/images/admin-portal/managing-affiliates/add-affiliate-form.webp)

That's it! Your new affiliate will now appear in your main list.

## Tracking Assigned Customers (Customers Tab)

Once you enable the **[Lifetime Commissions](/guide/settings-and-customization/referral-settings#lifetime-commissions)** feature in your global referral settings, a dedicated **Customers** tab becomes available inside every affiliate's profile panel. This sub-tab acts as your clear window to view exactly which buyers are permanently linked to that specific partner.

### Navigating to the Customers Tab

1. Head over to the **Affiliates** dashboard tab.
2. Click on the specific **Name** of the affiliate whose account you want to inspect.
3. Look at the sub-navigation menu inside their profile and click on **Customers**.

### Sorting and Searching Linked Customers

The Customers table keeps things structured by outlining the buyer's **Name**, **Email**, total **Referrals** generated, the date they **Joined**, and their **Lifetime Expiry** date.

* **Status Filtering:** You can easily segment this list by clicking the filter buttons just above the data table to display **All**, **Active**, or **Expired** relationships.
* **Quick Search:** Need to find a single person out of a large customer base? Use the search icon to type in a customer's details and find them instantly.

![Customers Tab](/images/admin-portal/managing-affiliates/customer-tab.webp)

### Linking, Transferring, or Unlinking Customers

As an admin, you retain full operational control over these long-term customer assignments:

* **Link a New Customer:** To manually connect an existing buyer to this affiliate, click the **Link Customer** button. A modal window will appear allowing you to select a buyer profile from your database and attach them to the affiliate for automated lifetime commission tracking.
* **Transfer or Unlink a Connection:** If a customer relationship changes or needs adjusting, you can click the **Unlink** button located at the end of that customer's data row.

![Link Customer](/images/admin-portal/managing-affiliates/link-customer.webp)

> [!NOTE]
> If you transfer or unlink a customer, any commissions previously earned on past purchases will securely stay with the original affiliate. Only future transactions follow the updated affiliate assignment.
