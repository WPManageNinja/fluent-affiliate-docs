---
title: Ultimate Affiliate Migration
description: Migrate your affiliate program from Ultimate Affiliate Pro to FluentAffiliate. Import affiliates, referrals, visits, payouts, and creatives seamlessly using WP-CLI or the built-in Web UI migrator.
---

# Ultimate Affiliate Migration

The Migrator Settings in FluentAffiliate allow you to seamlessly import your entire affiliate program from other affiliate plugins without disruption. Currently, FluentAffiliate supports migration from **Ultimate Affiliate Pro**, helping you bring over your existing data so you can upgrade to a modern affiliate management experience without losing your historical records.

This guide will walk you through everything you need to transfer your affiliates, referrals, visits, payouts, customers, creatives, and affiliate groups from Ultimate Affiliate Pro directly into FluentAffiliate — quickly, safely, and without any data loss.

## Accessing the Migrator Settings

To get started, navigate from your WordPress dashboard to **FluentAffiliate → Settings → Migrator Settings**.

![Migrator Settings Overview](/images/settings-and-customization/ultimate-affiliate/migrator-settings-1.webp)

> [!WARNING]
> If you already have data inside FluentAffiliate, please wipe the current data to avoid any conflicts before you begin your new migration.

## Method 1: Migration Using WP-CLI (Recommended)

If you have a large database, we highly recommend using the WordPress CLI for smoother and faster performance.

To start the migration, simply run the following command on your site:

```bash
wp fluent_affiliate migrate_from_ultimate_affiliate
```

> [!NOTE]
> Running this **CLI** migration will automatically remove all existing data from FluentAffiliate before the import begins. This command will seamlessly migrate all of your Ultimate Affiliate data including affiliates, referrals, payouts, and visits straight into FluentAffiliate.

## Method 2: Migration Using the Web UI

If you prefer a guided, visual approach, you can run the migration directly from your dashboard screen.

1. On the Migrator Settings screen, locate the **Please select an option** dropdown.
2. Choose **Ultimate Affiliate** from the list.
3. Click the dark **Migrate** button.
4. A popup window titled **Ultimate Affiliate Migration** will appear. This window gives you a clear snapshot of exactly what will be moved over, including your **Total Affiliate Groups**, **Total Affiliates**, **Total Referrals**, **Total Payouts**, **Total Visits**, **Total Customers**, and **Total Creatives**.
5. If you need to restart a previous migration attempt, you can check the **Reset Current Migration** box.
6. Finally, click the **Confirm** button to start the process.

![Ultimate Affiliate Migration Popup](/images/settings-and-customization/ultimate-affiliate/migrator-settings-2.webp)

## Data Cleanup

This section also includes a **Wipe Data** tool to clean up your FluentAffiliate data. To use it, select the data you wish to remove, confirm your choice, and wait for the process to finish.


> [!WARNING]
> Data cleanup is irreversible. Always make sure to back up your data before proceeding.


![Ultimate Affiliate Migration Popup](/images/settings-and-customization/ultimate-affiliate/wipe-data-cleanup-3.webp)


## Troubleshooting Common Issues

If you run into any hiccups during the process, here are a few quick solutions:

* **Migration Not Starting:** Ensure you have sufficient permissions and that all prerequisites are met.
* **Process Stuck:** Try refreshing the page and starting the process again.
* **Data Not Appearing:** Verify that the migration completed successfully and double-check your source data.
