# SliceWP Migration

The Migrator Settings in FluentAffiliate allow you to seamlessly import your entire affiliate program from other affiliate plugins without disruption. Currently, FluentAffiliate supports migration from **SliceWP**, helping you bring over your existing data so you can upgrade to a modern affiliate management experience without losing your historical data. This guide will walk you through the available options.

## Accessing Migrator Settings

To access the Migrator Settings, navigate from your WordPress dashboard to **FluentAffiliate → Settings → Migrator Settings**.

![Migrator Settings Overview](/images/settings-and-customization/slicewp/migrator-settings-1.webp)

## Migrating from SliceWP

### Migration Using WP CLI (Recommended)

We recommend using WordPress CLI to migrate from SliceWP for better performance. 

To start the migration, just run the following WP CLI command on your site:

`wp fluent_affiliate migrate_from_slicewp`

> **NOTE**
> This CLI migration will remove all existing data from FluentAffiliate before starting the migration. This command will migrate all of your SliceWP data, including affiliates, referrals, commissions, visits, affiliate groups, and creatives, to FluentAffiliate.

### Migration Using Web UI

FluentAffiliate provides a streamlined Web UI to move your data from SliceWP with just a few clicks.

**Step 1: Select Migration Source**
On the Migrator Settings page, you will see a dropdown menu under "Please select an option". Click the dropdown and select **SliceWP**.

**Step 2: Initialize Migration**
Click the **Migrate** button to begin. A pop-up will appear displaying an overview of the data available for migration, including:
* Total Affiliates
* Total Referrals
* Total Payouts
* Total Visits
* Total Customers

You also have the option to check **Reset Current Migration** if you need to restart a previous attempt. Click **Confirm** to proceed.

![SliceWP migration data overview](/images/settings-and-customization/slicewp/migrator-settings-2.webp)

**Step 3: Confirm and Monitor**
A final confirmation box will appear, warning you that this action cannot be undone. Click **Yes, Migrate**.

* **Monitor Progress:** A progress window will show the status of each data type (Affiliates, Referrals, Payout, Visits, and Customers) as they are moved to FluentAffiliate.
* **Completion:** Once finished, a "Migration Completed" message will display a summary of the total metrics migrated. Click **Close** to return to the dashboard.

## Data Cleanup

This section also includes a **Wipe Data** tool to clean up your FluentAffiliate data. To use it, select the data you wish to remove, confirm your choice, and wait for the process to finish.

**Warning:** Data cleanup is irreversible. Always make sure to back up your data before proceeding.
