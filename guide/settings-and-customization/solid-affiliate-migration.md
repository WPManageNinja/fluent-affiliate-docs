---
title: Solid Affiliate Migration
description: Learn how to migrate from Solid Affiliate to FluentAffiliate. Import affiliates, referrals, payouts, and visits using the migrator settings or WP CLI for a smooth transition.
---

# Solid Affiliate Migration

The **Solid Affiliate Migration** feature in FluentAffiliate helps you migrate your existing affiliate data from **Solid Affiliate** to **FluentAffiliate**. If needed, you can also remove your existing FluentAffiliate data before starting a new migration to avoid conflicts.

The migration supports **affiliates, referrals, customers, payouts, visits, affiliate groups, commission rate types**, and **referral product names**. If you're using **FluentAffiliate Pro**, your **marketing creatives** are migrated as well, allowing your affiliates to continue using their existing promotional materials after the migration.

This guide walks you through the available migration options and shows you how to migrate your Solid Affiliate data using either the **Web UI** or **WP-CLI**.

## Accessing Migrator Settings

To access the Migrator Settings, navigate from your WordPress dashboard to **FluentAffiliate → Settings → Migrator Settings**.

![Migrator Settings Overview](/images/settings-and-customization/solid-affiliate/access-migration-settings-1.webp)

## Migrating from Solid Affiliate

### Migration Using WP CLI (Recommended)

We recommend using WordPress CLI to migrate from Solid Affiliate for better performance.

**To start the migration, run the following WP CLI command on your site:**

```bash
wp fluent_affiliate migrate_from_solid_affiliate
```

>[!Note]
>This CLI migration will remove all existing data from FluentAffiliate before starting the migration. This command will migrate all of your Solid Affiliate data, including affiliates, referrals, payouts, and visits, to FluentAffiliate.

<hr />

### Migration Using Web UI

FluentAffiliate provides a streamlined Web UI to move your data from Solid Affiliate with just a few clicks.

#### Step 1: Select Migration Source

On the Migrator Settings page, you will see a dropdown menu under "**Please select an option**". Click the dropdown and select **Solid Affiliate**.

#### Step 2: Initialize Migration

Click the **Migrate** button to begin. A pop-up will appear displaying an overview of the data available for migration, including:

- Total Affiliates
- Total Referrals
- Total Payouts
- Total Visits
- Total Customers

You also have the option to check **Reset Current Migration** if you need to restart a previous attempt. Click **Confirm** to proceed.

#### Step 3: Confirm and Monitor

A final confirmation box will appear, warning you that this action cannot be undone. Click **Yes, Migrate**.

- **Monitor Progress:** A progress window will show the status of each data type (Affiliates, Referrals, Customers, Payouts, and Visits) as they are moved to FluentAffiliate.
- **Completion:** Once finished, a "**Migration Completed**" message will display a summary of the total metrics migrated. Click **Close** to return to the dashboard.

### Data Cleanup

If you need to start fresh or resolve conflicts before migrating, you can use the **Wipe Existing Data** tool.

1. Click the three-dot (vertical ellipsis) menu in the top-right corner of the Migration Settings card.
2. Select **Wipe Existing Data**.
3. A pop-up will show the total data currently stored in FluentAffiliate.
4. Click **Confirm** to permanently remove the data.

>[!WARNING]
>Data cleanup is irreversible. Always make sure to back up your database before proceeding with a wipe.

![Wipe Data Confirmation](/images/settings-and-customization/solid-affiliate/solid-affiliate-migration.gif)

### Troubleshooting

Here are solutions to common issues you might encounter during the migration process:

* **Migration Not Starting:** Ensure you have sufficient administrative permissions and that the Solid Affiliate plugin is still installed on your site.
* **Process Stuck:** If the progress bar stops, try refreshing the page and starting the process again.
* **Data Not Appearing:** Verify that the migration summary showed successful numbers and check your Affiliates or Referrals tabs to see the imported records.
