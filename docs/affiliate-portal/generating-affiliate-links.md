---
title: Generating Affiliate Links
description: Learn how to generate unique affiliate links in FluentAffiliate. Create promotional links, track performance, and maximize your earning potential with proper link generation techniques.
---

# Generating Affiliate Links

As an affiliate, you can create and share referral links in just a few clicks from your portal. You can also use a QR code version of your link for faster sharing on mobile, printed materials, or offline campaigns.

See the whole process step by step in this video:

<iframe class="video-embed" src="https://www.youtube.com/embed/rpXrrR6ytgY" title="How to Create Referral Links in WordPress with FluentAffiliate" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Generate a Link for Any Page

Use this option when you want to promote a specific page, product, service, or blog post.

1. Copy the full URL of the page you want to promote.
2. Paste it into the **Generate Affiliate Link** field in your **Links** tab.
3. Click **Generate**.

Your unique referral URL will appear in the **Generated Affiliate Link** area. Click **Copy** to use it in your campaigns.

![Generated Referral Link](/images/affiliate-portal/generating-links/qr-link-3.webp)

## Your Default Affiliate Link and QR Code

At the bottom of the **Links** page, you will always see your default referral link and QR code.

* **Main Referral Link:** Copy your default affiliate URL instantly.
* **QR Code Sharing:** Share your referral link visually for quick scanning.
* **Download QR Code:** Download the QR image and use it in social posts, flyers, business cards, or presentations.

## Enable and Customize Affiliate QR Code (Admin)

If affiliates do not see the QR code section, the site administrator needs to enable it first.

### Step 1: Enable the Feature

From your WordPress dashboard, go to **FluentAffiliate → Settings → Features & Addons**.

Under **Advanced Features**, find **Affiliate QR Code** and click **Settings**.

Then enable the option **Enable QR Code on Affiliate Portal** and save the settings.

![Affiliate QR Code settings](/images/affiliate-portal/generating-links/qr-link-1.webp)

### Step 2: Customize QR Code Appearance

Inside the Affiliate QR Code settings screen, you can customize:

* **QR Code Color:** The foreground color of the QR code.
* **Background Color:** The background color behind the QR code.
* **Live Preview:** See the final look before saving.

After saving, affiliates will see the updated QR code style in their **Links** section.

![Affiliate QR Code appearance settings](/images/affiliate-portal/generating-links/qr-link-2.webp)

## Customize the Default Affiliate Link Pattern

If you want affiliates to share a specific landing page (instead of your homepage), you can customize the default link pattern using the `fluent_affiliate/default_share_url` filter.

This is especially useful when you want to:

* Send all affiliates to a dedicated campaign page
* Show different landing pages based on affiliate group
* Keep the same referral tracking while changing the destination page

### How It Works

FluentAffiliate uses a base URL when showing the default affiliate link in the portal and when generating share URLs without a manually provided URL.

By default, this base URL is your site home URL.  
With this filter, you can replace that base URL with any page you want. FluentAffiliate will still append the affiliate referral parameter automatically.

### Recommended: Use FluentSnippets

To add this customization safely, we recommend using **FluentSnippets**.

**Steps:**

1. Install and activate FluentSnippets.
2. Create a new PHP snippet.
3. Paste one of the examples below.
4. Save and activate the snippet.

### Example 1: Use One Landing Page for All Affiliates

```php
add_filter('fluent_affiliate/default_share_url', function ($url, $affiliate) {
    return home_url('/special-offer/');
}, 10, 2);
```

### Example 2: Use Different Landing Pages by Affiliate Group

```php
add_filter('fluent_affiliate/default_share_url', function ($url, $affiliate) {
    if ($affiliate && $affiliate->group_id === 5) {
        return home_url('/vip-offer/');
    }
    return $url;
}, 10, 2);
```

### What You Get

* The default affiliate link in the **Links** tab points to your selected page.
* Generated share links follow the customized base URL when no explicit page URL is provided.
* Referral tracking remains intact because FluentAffiliate continues to append the referral parameter to the final URL.

With these options in place, affiliates can share smarter links and QR codes while you keep full control over link destination and sharing experience.
