---
title: AffiliateWP Migration
description: Learn how to migrate from AffiliateWP to FluentAffiliate. Import affiliates, referrals, and commissions using the migrator settings or WP CLI for a smooth transition.
---

# AffiliateWP Migration

The AffiliateWP Migration Settings in FluentAffiliate allow you to easily import data from other affiliate plugins and perform cleanup tasks. Currently, FluentAffiliate supports migration from **AffiliateWP**. This guide will walk you through the available options.

## Accessing Migrator Settings

To access the Migrator Settings, navigate from your WordPress dashboard to **FluentAffiliate → Settings → Migrator Settings**.

![Migrator Settings Overview](/images/settings-and-customization/migrator/migrator-settings-overview.webp)

## Migrating from AffiliateWP

## Migration Using WP CLI (Recommended)

We recommend to use WordPress CLI to migrate from AffiliateWP for better performance.

**To start the migration just run the following WP CLI command on your site:**

```bash
wp fluent_affiliate migrate_from_affiliatewp
```

>[!Note]
>This CLI migration will remove all existing data from FluentAffiliate before starting the migration. This command will migrate all of your AffiliateWP data, including affiliates, referrals, payouts, and visits, to FluentAffiliate.

<hr />


## Migration Using Web UI

FluentAffiliate provides a streamlined Web UI to move your data from Affiliate Manager with just a few clicks.

#### Step 1: Select Migration Source

 On the Migrator Settings page, you will see a dropdown menu under "Please select an option". Click the dropdown and select AffiliateWP.

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
 * **Monitor Progress:** A progress window will show the status of each data type (Affiliates, Referrals, Customers, Payouts, and Visits) as they are moved to FluentAffiliate.
 * **Completion:** Once finished, a "**Migration Completed**" message will display a summary of the total metrics migrated. Click **Close** to return to the dashboard.

### Data Cleanup

This section also includes a **Wipe Data** tool to clean up your FluentAffiliate data. To use it, select the data you wish to remove, confirm your choice, and wait for the process to finish.

> **Warning:** Data cleanup is irreversible. Always make sure to back up your data before proceeding.

![Wipe Data Confirmation](/images/settings-and-customization/migrator/wipe-data-confirmation.gif)

### Troubleshooting

Here are solutions to common issues you might encounter during migration:

* **Migration Not Starting:** Ensure you have sufficient permissions and that all prerequisites are met.
* **Process Stuck:** Try refreshing the page and starting the process again.
* **Data Not Appearing:** Verify that the migration completed successfully and check your source data.
