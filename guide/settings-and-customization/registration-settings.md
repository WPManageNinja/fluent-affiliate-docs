---
title: Registration Settings
description: Learn how to configure affiliate registration settings in FluentAffiliate. Set up registration requirements, approval processes, and customize the affiliate signup experience.
---

# Registration Settings

The Registration Settings section gives you complete control over your affiliate registration form. You can enable or disable registrations, set approval requirements, and customize the form fields to collect the information you need from new affiliates.

## Accessing Registration Settings

To configure these options, navigate from your WordPress dashboard to **FluentAffiliate → Settings → Registration Settings → Registration Fields**.

### General Registration Options

At the top of the page, you will find the two primary settings that control your entire affiliate registration process.

* **Enable Affiliate Registration:** This acts as the master switch for your affiliate program's public registration.
    * When this option is **enabled**, the affiliate registration form will be active and accessible, allowing new users to sign up.
    * If you **disable** this option, it will prevent any new users from registering as affiliates.

* **Require admin approval for new affiliates:** This setting gives you direct control over your affiliate vetting and approval workflow.
    * **When Enabled (Manual Approval):** If you check this box, you have full control over who joins your program. New applicants will have their status set to "pending." You will then need to navigate to their individual affiliate profile to manually review their application and approve them. This is the recommended setting if you want to screen your affiliates before they can start promoting your site.
    * **When Disabled (Automatic Approval):** If you leave this box unchecked, the approval process is hands-off. Any user who successfully completes the registration form will instantly become an active affiliate and can begin generating referral links immediately.

![Registration Settings](/images/settings-and-customization/registration-settings/registration-field/registration-settings.webp)

## Managing Registration Fields

This section allows you to customize the registration form that potential affiliates will fill out. You can enable, disable, and edit the fields as needed.

#### Activating or Hiding Fields
For many fields, such as "How will you promote us?" or "Website URL," you can simply click the toggle switch to activate (show) or hide the field on the registration form.

![Registration Fields](/images/settings-and-customization/registration-settings/registration-field/registration-field-1.webp)

#### Editing Fields
For core system fields like "Full name" or "Email Address," you can click the **Edit** button to modify their properties. This will open the **Edit Registration Field** pop-up.

In this pop-up, you can modify the following options:
* **Label:** Change the display name of the field.
* **Placeholder:** Set the placeholder text that appears inside the input field.
* **Required:** Choose whether the field is mandatory for the user to fill out.
* **Status:** Use this toggle to enable or disable the field on the form.

> [!Note]
> As noted in the pop-up, some system-defined fields have strict rules and might only allow you to edit their labels or placeholders. Other fields, like the Terms and Conditions agreement, give you a full visual text editor to perfectly format your text.

## Adding Custom Fields (Pro)

Every affiliate program asks for something different. Maybe you need a tax ID, a payout preference, an audience size, or the main social channel someone promotes on. Instead of chasing down this information over email after you approve an affiliate, FluentAffiliate allows you to collect it right up front!

You can add your own custom fields directly to the registration form so you get all the details you need immediately.

Here is how to build your custom fields:

1. Scroll to the bottom of the Registration Fields list and click the **+ Add Custom Field** button.

![Add Custom Fields](/images/settings-and-customization/registration-settings/registration-field/add-custom-field-1.webp)

2. A form called **"Add Custom Registration Field"** will slide in from the right side of your screen.
3. First, choose your **Field Type** from the dropdown menu. You have eight options to build the perfect form:
   * Use **Text**, **Textarea**, **Number**, **Date**, and **URL** for open-ended answers.
   * Use **Dropdown**, **Radio**, and **Multi Select** when you want to provide specific choices and keep answers tidy. (These choice fields include an options editor so you control exactly what applicants can pick).
4. Fill in the **Label** (which is required) to name your field.
5. Add a **Placeholder** text and a **Help Message** to guide your affiliates on what they need to enter.
6. Choose if the field is **Required** by selecting the "Yes" or "No" radio button.
7. Ensure the **Status** is checked to "Enable this field".
8. Click the **Save** button.

![Add Custom Registartion](/images/settings-and-customization/registration-settings/registration-field/add-custom-registartion-field-3.webp)

Whatever an affiliate submits through these custom fields will show up right on their profile in your admin dashboard, inside the **Affiliate Info** panel. This means all their answers live right next to the person they belong to!

> For Developers: New filters allow an add-on to validate submitted values, enrich the admin detail view, and extend the portal settings form. This means custom fields can be wired directly into your own custom workflow!

After making any customizations, remember to click the **Save Settings** button at the bottom of the main page to apply all your changes.