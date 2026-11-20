---
title: MCP for AI Agents
description: Learn how to connect AI agents such as Claude, ChatGPT, Cursor and Codex to FluentAffiliate through the built-in MCP server. Turn it on, connect with FluentHub or an application password, and see which tools agents can use.
---

# MCP for AI Agents

Do you want to ask an AI assistant "which affiliates are waiting for approval?" or "how much do we owe in unpaid commissions?" instead of clicking through screens? FluentAffiliate now includes a built-in **MCP server** that lets AI agents such as Claude, ChatGPT, Cursor and OpenAI Codex read and manage your affiliate program through the Model Context Protocol (MCP).

An agent can work with your **affiliates**, **referrals**, **visits** and **payouts**. It always acts as the WordPress user who connects it, so it can only do what that user is already allowed to do in FluentAffiliate.

::: info
The MCP server is free and is **off by default**. The one-click FluentHub install button on this page needs an active Fluent Pro plugin such as **FluentAffiliate Pro**.
:::

## Requirements

Before you turn MCP on, make sure your site has:

* **WordPress 6.9 or newer.** The MCP server uses the WordPress Abilities API, which is part of WordPress 6.9 and later.
* **An MCP adapter.** FluentAffiliate does not bundle one. Install **FluentHub**, which brings the adapter, or the WordPress **MCP Adapter** plugin.
* **A site administrator account** to turn the feature on or off.

## Accessing the MCP Settings

To find these settings, go to your WordPress dashboard. From the FluentAffiliate menu, click on **Settings**, and select **MCP for AI Agents** from the left sidebar.

The page shows the status of each requirement, so you can see what is still missing. If WordPress is older than 6.9, the page tells you that the MCP server needs WordPress 6.9 or newer.

## Step 1: Install the MCP Adapter (FluentHub)

If no MCP adapter is active, the page tells you that the AI agent tools need FluentHub.

* **With FluentAffiliate Pro:** Click **Install FluentHub**. FluentAffiliate Pro downloads, installs and activates FluentHub for you in one click. If FluentHub is already installed but inactive, the button reads **Activate FluentHub**.
* **Without a Fluent Pro plugin:** Click **Download FluentHub**, install and activate it on the **Plugins** page, then reload the MCP settings page.

Once an adapter is active, you will see **MCP adapter detected** along with its version.

::: tip
Installing a plugin needs the **install plugins** permission. If the one-click install fails, the page shows the reason and a link to install FluentHub by hand.
:::

## Step 2: Enable MCP for AI Agents

Turn on the **Enable MCP for AI Agents** switch and save. From that moment, AI agents can connect to your site. Turn the switch off at any time to stop all agent access immediately.

Only a **site administrator** can turn MCP on or off.

## Step 3: Connect Your AI App

The settings page gives you two ways to connect. FluentHub sign-in is the easier one.

### Option 1: Connect With One URL (FluentHub)

FluentHub gives AI apps one URL for your site. You sign in through WordPress, so there is no password to copy. The same URL also gives the app access to your other Fluent plugins that have MCP turned on.

1. If the page says the FluentHub MCP server is off, a site administrator clicks **Turn on FluentHub sign-in**.
2. Copy the URL shown under **Connect with one URL**.
3. Add it to your AI app as a custom MCP server, and sign in with your WordPress account when the app asks.

Use **Manage connections in FluentHub** (or **Open FluentHub**) to review or remove connected apps.

### Option 2: Use an Application Password

You can also connect with a WordPress application password.

1. Click **Use an application password instead**.
2. Click **Open profile → Application Passwords** and create a new application password for your user.
3. Enter your WordPress username and the application password in the fields on the settings page. They stay in your browser and are not saved.
4. Copy the ready-made snippet for your app and paste it where your app expects it.

The page provides snippets for Claude Desktop, Claude Code, Cursor and OpenAI Codex. For any other MCP client that supports HTTP, use the endpoint URL and the **Basic** authorization header.

The endpoint of your FluentAffiliate MCP server is:

```text
https://your-site.com/wp-json/fluent-affiliate/mcp
```

Click **Test connection** to check that the server answers.

::: warning
Application passwords need **HTTPS**, and a security plugin can switch them off. If they are unavailable on your site, the page says so and you can connect with FluentHub sign-in instead.
:::

## Who Can Connect?

* **Site administrators** can connect and use every tool.
* **Affiliate managers** with at least one FluentAffiliate permission can connect. Each manager only sees and uses the tools their permissions allow. You can give managers their permissions under **Settings > [Permission Management](/guide/settings-and-customization/permission-management)**.
* **Affiliates** cannot connect.

If a user calls a tool they have no permission for, the agent gets a clear message telling it which permission is needed.

## What Can an AI Agent Do?

The server offers the following tools. Which ones an agent can use depends on the permissions of the connected user.

### Read Tools

| Tool | What it does | Permission needed |
| --- | --- | --- |
| **Get Affiliate Context** | The starting point for every session: who you are, your permissions, the currency, the site timezone, and what needs attention (pending affiliates, unpaid referrals, payouts to settle). | Any FluentAffiliate permission |
| **List Affiliates** | Lists affiliates with status, commission rate, earnings and counts. Filter by status, search, or unpaid earnings. | Read access to affiliates |
| **Get Affiliate** | Reads one affiliate: profile, commission rate, earnings, referral link and note. | Read access to affiliates |
| **List Referrals** | Lists referrals with affiliate, amount, order total, status and source. Filter by affiliate, status, type, payout or date. | Read access to referrals |
| **Get Referral** | Reads one referral, including its order, customer, products and when it becomes payable. | Read access to referrals |
| **List Visits** | Lists visits with landing page, referrer, UTM tags and the referral they led to. | Read access to visits |
| **List Payouts** | Lists payouts with method, status, total and how many transactions are still to settle. | Read access to payouts |
| **Get Payout** | Reads one payout with its transactions. | Read access to payouts |
| **Get Report** | Program results for a date range: referrals and commissions by status, order value, visits, conversion, new affiliates and top affiliates. | Any FluentAffiliate permission |

### Write Tools

| Tool | What it does | Permission needed |
| --- | --- | --- |
| **Create Affiliate** | Makes an existing WordPress user an affiliate. It does not create WordPress users. | Read and write access to affiliates |
| **Update Affiliate** | Approves, deactivates or changes an affiliate's status, commission rate and note. | Read and write access to affiliates |
| **Save Referral** | Creates a manual referral or changes an existing one. | Read and write access to referrals |
| **Update Referrals** | Sets the status of up to 100 referrals at once, for example to approve or reject pending ones. | Read and write access to referrals |
| **Create Payout** | Pays affiliates their unpaid referrals in one payout run. | Read and write access to payouts |
| **Update Transaction** | Records that you paid an affiliate by marking a payout transaction as paid, or back to processing. | Read and write access to payouts |
| **Remove Transaction** | Takes an unpaid transaction out of a payout so its referrals become unpaid again. | Read and write access to payouts |

## Built-in Safeguards

AI agents handle money and affiliate emails, so FluentAffiliate adds several protections:

* **Preview and confirm for money.** Save Referral, Update Referrals, Create Payout, Update Transaction and Remove Transaction take two steps. The first call changes nothing and returns a preview with a **confirm value**. The agent shows you the preview and only continues after you agree. A confirm value stays valid for at least 15 minutes, and only while what the preview showed has not changed.
* **Affiliate changes act at once.** Create Affiliate and Update Affiliate have no preview, and a status change emails the affiliate the same way an approval from the admin screen does. Agents are told to ask you first unless you requested that change.
* **Holding period respected.** The payout preview shows who gets how much and what the [holding period](/guide/settings-and-customization/referral-settings) keeps back.
* **Same rules as the admin screens.** Paid, processing or payout-held referrals cannot be changed, just as in the admin area.
* **Text written by others is data.** Affiliate names, notes, referral descriptions and similar text are treated as data, so an agent should never follow instructions hidden inside them.

::: tip
A manual payout marks its referrals as paid the moment it is created. You then pay each affiliate outside the site and record it with the **Update Transaction** tool.
:::

## Example Prompts

Once connected, you can ask things like:

* "Give me a summary of the affiliate program for the last 30 days."
* "List the affiliates who are still pending."
* "Show me the unpaid referrals for affiliate John."
* "Prepare a payout for all unpaid referrals and show me the preview."

## Troubleshooting

* **The settings page says the MCP server needs WordPress 6.9 or newer:** Update WordPress.
* **"FluentHub needs a newer MCP adapter":** Update FluentHub, then reload the page.
* **The agent sees no tools:** Make sure the **Enable MCP for AI Agents** switch is on and the connected user is a site administrator or an affiliate manager.
* **The agent gets a "disabled" error:** The switch is off. A site administrator needs to turn it on.
* **Application passwords are unavailable:** Your site needs HTTPS, and a security plugin may have turned them off. Use FluentHub sign-in instead.
