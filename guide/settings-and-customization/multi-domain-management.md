# Multi-Domain Management

FluentAffiliate offers a powerful **Multi-Domain Management** feature that lets you track affiliate sales, referrals, and commissions across multiple websites—all from a single, centralized dashboard.

Imagine you have three sites:
* **siteX.com** (your main site)
* **siteY.com** (your blog)
* **siteZ.com** (your online store)

With Multi-Domain Management, you can monitor all affiliate activity from siteY and siteZ right within the FluentAffiliate dashboard on siteX. It's a streamlined way to keep everything organized, efficient, and under one roof.

### How It Works

The entire system is built on a "hub and spoke" model. Your **Main Site** (where the full FluentAffiliate plugin is installed) acts as the central hub for all data. Your other websites, or **Child Sites**, act as spokes. To connect these spokes to the hub, you will use a simple, free helper plugin called the [**FluentConnect Addon**](https://github.com/WPManageNinja/fluent-affiliate-connector) on each child site.

### Step 1: Enable Multi-Domain on Your Main Site

Your first step is to enable the multi-domain functionality within your main FluentAffiliate dashboard and prepare it to accept a new connection.

1.  To begin, navigate from your WordPress dashboard to **FluentAffiliate → Settings → Domain Management**.
2.  Find the **Enable Multi Domain Affiliate** option and click the toggle switch to activate the service. This tells your main site that it's ready to manage other domains.
3.  Next, click the **+ Connect a new site** button to begin the process of linking a new child site.

![Enable Multi Domain](/guide/public/images/settings-and-customization/multi-domain/multi-domain-manage-1.webp)

4.  A pop-up titled "Connect a new site" will appear. It will have a field asking for the child site's 'config JSON'. For now, simply keep this pop-up open on your main site. We need to go get this special code from your child site first.

![Cofig JSON popup](/guide/public/images/settings-and-customization/multi-domain/multi-domain-manage-2.webp)

### Step 2: Install FluentConnect on Your Child Site

Now, open a new browser tab and log in to the WordPress dashboard of the child site you wish to connect. The goal here is to install the helper plugin and generate the unique connection code.

1.  On your child site's dashboard, you need to install the **FluentConnect Addon**. This lightweight plugin is designed specifically to create a secure bridge between your child site and your main FluentAffiliate dashboard. You can download this addon by clicking the "[Learn more about this module](https://github.com/WPManageNinja/fluent-affiliate-connector)" link on the main site's Domain Management page. Then, go to **Plugins > Add New**, upload the addon's .zip file, and activate it.

![Installing FluentConnect Addon](/guide/public/images/settings-and-customization/multi-domain/multi-domain-manage-3.webp)

2.  Once the addon is activated, a new menu item will appear. Navigate to **Settings → FluentAffiliate Connector** from the left sidebar.
3.  This screen is dedicated to the connection process. You will see a large text box labeled **This site config (Copy this code and paste in your main site)**. This JSON code is a unique fingerprint for your child site. Highlight and copy this entire code.

![Config JSON](/guide/public/images/settings-and-customization/multi-domain/multi-domain-manage-4.webp)

### Step 3: Generate the Connection Token on the Main Site

With the config JSON copied, return to the browser tab with your main site's dashboard, where the pop-up should still be open.

1.  Paste the JSON code you just copied from your child site into the text field labeled "Please provide the child site's config JSON".
2.  Click the **Issue New Connect Config** button. Your main site will now securely communicate with your child site using the code you provided.

![Issue New Connect](/guide/public/images/settings-and-customization/multi-domain/multi-domain-manage-5.webp)

3.  After a moment, you will see a **Success** message and a new field will appear containing a secure token. This token is a one-time key to authorize the connection. Click the **Copy** button to copy this server token.

![Server Token](/guide/public/images/settings-and-customization/multi-domain/multi-domain-manage-6.webp)

### Step 4: Finalize the Connection on the Child Site

For the final step, go back to your child site's dashboard to complete the secure handshake.

1.  Return to the **FluentAffiliate Connector** page (`Settings → FluentAffiliate Connector`). Paste the new token you copied from your main site into the field labeled **Connection Token from Main Website**.
2.  Click the **Validate Token and Enable Connection** button. The addon will verify the token with your main site.

![Validate Token and Enable Connection](/guide/public/images/settings-and-customization/multi-domain/multi-domain-manage-7.webp)

3.  Once validated, the page will refresh to confirm the link is active, displaying the message: **Your site is connected with [Main Site Name]**. The connection is now complete!

With the connection finalized, you can return to your main site's **Domain Management** page. You will now see your newly connected child site listed in the **All Connected Sites** table. You can now add a description and logo for the site so that your affiliates can easily identify and promote this new site as well.