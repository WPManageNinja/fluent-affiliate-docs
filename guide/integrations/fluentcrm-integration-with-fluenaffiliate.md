# FluentCRM Integration with FluentAffiliate

FluentCRM is a powerful email marketing automation plugin for WordPress. With FluentAffiliate, you can manage your email marketing campaigns and affiliate commissions seamlessly.

In this guide, we'll walk you through how to connect FluentCRM with FluentAffiliate step by step.

>[!Note]
> Make sure both the FluentCRM and FluentAffiliate plugins are installed and activated on your website.

## Enable FluentCRM in FluentAffiliate

First, let's enable the integration to get the two plugins working together.
1. Once FluentCRM is active, go to the **FluentAffiliate Dashboard**. 
2. From the top menu, click on **Settings**, and from the left sidebar, select the **Integration Settings** option. 
3. You will see a list of available integrations. Find **FluentCRM** in this list and click the **toggle** button next to it to turn it on.

Your **FluentCRM** integration with **FluentAffiliate** is now active, allowing you to automate affiliate-related email marketing tasks.

In the **Manage** section, you'll find additional settings to customize how the integration works.

![Integration Settings](/images/integrations/fluentcrm/fluentcrm-integration-settings.webp)

## Configure FluentCRM Settings

After enabling the integration, a pop-up will appear where you can configure the **settings**. 

1. Check the box for **Add Affiliates to FluentCRM Contact List**.
2. In the box that appears, search for and select the specific contact list where you want your new affiliates to be added. 
3. After selecting the options, simply click the **Save Settings** button to save your settings.

![FluentCRM Settings](/images/integrations/fluentcrm/fluentcrm-settings-configuration.webp)

## Set Up Automation

After configuring the basic settings, you can set up automated workflows to manage your affiliate communications. 

FluentCRM provides **Triggers** specifically designed for FluentAffiliate to run automations. 

To get all the **Triggers**, go to the **Automations** section from the FluentCRM navbar and click the **+ New Automation** button.

To learn the detailed process of creating a new automation funnel, read this [Documentation](https://fluentcrm.com/docs/introduction-to-fluentcrm-automation/).

![New Automation](/images/integrations/fluentcrm/automation-setup.webp)

Now, a pop-up page will appear with all the **Popular pre-built funnel templates** for creating automation, where the full funnel diagram will be ready automatically. 

If you want to create your automation funnel from scratch, simply click on the **Create from Scratch** tab (e.g., here, I have created a new automation from scratch).

![Pre-built Templates](/images/integrations/fluentcrm/prebuilt-templates.webp)

## Triggers for FluentAffiliate

Go to **FluentAffiliate** from the left sidebar, and all the Triggers for FluentAffiliate will appear. 

Now, choose your desired trigger. Here, you can give a **Title** to your Automation in the **Internal Label** field for easy referencing later. But if you leave it blank, the title will be automatically set based on your chosen trigger. All the triggers are:

* **New Affiliate Created:** If you select this trigger, the automation will start when a new affiliate is created in FluentAffiliate.

* **New referral created:** If you select this trigger, the automation will start when a new referral is created in FluentAffiliate.

* **New Payout Created:** If you select this trigger, this will start when a new payout is created in FluentAffiliate.
Create targeted campaigns for your affiliates.

![FluentAffiliate Trigger](/images/integrations/fluentcrm/fluentaffiliate-trigger.webp)

## Run Email Campaigns

FluentCRM allows you to run Email campaigns, particularly for FluentAffiliate contacts.

First, go to **All Campaigns** under the Emails section from the FluentCRM navbar, and click the **+ Create New Campaign** button.

To learn the detailed process of creating a new Email Campaign, read this [Documentation](https://fluentcrm.com/docs/setting-up-campaign/#create-a-new-campaign).

![Advanced Filters](/images/integrations/fluentcrm/create-campaigns.webp)

## By Advanced Filter

>[!Tip]
> To use this advanced filter to select the email campaign recipients, you need to have the [FluentCRM Pro Plugin](https://fluentcrm.com/docs/how-to-install-upgrade-and-activate-license/) installed and activated on your WordPress Site.

First, you need to contact FluentAffiliate manually or use automation to run an email campaign with an advanced filter. Select By Advanced Filter option and then choose the custom contact condition.

Now, click on the **+Add** button to start the filtering, where you will get many options to set the conditions. Here you will find the FluentAffiliate option, and click on it.

You can add more filters by clicking the **+Add** button, add filters against the existing filter by clicking the **+ OR** button, and delete any existing filter by clicking the **Trash** Icon.

![Advanced Filters](/images/integrations/fluentcrm/advanced-filter-settings.webp)

### Contact Management

If you want to filter out your FluentAffiliate contacts, go to the FluentCRM **Contact** section. Click the **toggle** button to enable the **Advanced Filter**. 

Next, click the **+Add** icon and select the FluentAffiliate option. Here you will find a filter condition. After that, set the condition filter and click the **Filter** button.

![Contact Filtering](/images/integrations/fluentcrm/contact-filtering-options.webp)

### Troubleshooting Common Issues

Here are solutions to common issues you might encounter:

- **Integration Toggle Not Visible:** Ensure both FluentCRM and FluentAffiliate are activated. If the issue continues, deactivate and reactivate both plugins, and then check again.
- **Contact Sync Not Working:** Verify that the contact sync option is enabled and that your FluentCRM settings are properly configured.
- **Automation Not Triggering:** Check if the triggers are properly set up and that the conditions are being met.

And that's it. This is an easy process to integrate FluentCRM with FluentAffiliate.


