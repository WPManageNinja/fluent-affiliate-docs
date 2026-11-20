---
title: Social Media Share for Affiliates
description: Let affiliates share their referral links to Facebook, X, LinkedIn, WhatsApp and more straight from the FluentAffiliate portal. Learn how to enable and configure Social Media Share.
---

# Social Media Share for Affiliates

Promotion just got a whole lot easier for your affiliates.

With the Social Media Share feature, affiliates can quickly share their referral links directly to popular social platforms without leaving their dashboard. Instead of manually copying and pasting links, they can now promote your products with just a few clicks.

By reducing friction in the promotion process, this feature helps affiliates share more often, driving increased referral traffic and better engagement for your brand.

::: info
Social Media Share requires **FluentAffiliate Pro**.
:::

This guide will show you how to enable and configure the social sharing options for your affiliates.

## How to Enable Social Media Share

As the site administrator, you have full control over whether this feature is active and which specific social platforms your affiliates are allowed to use.

### Step 1: Navigate to Features & Addons

From your WordPress dashboard, go to **FluentAffiliate → Settings**.
On the left-hand menu, click on **Features & Addons**. Under the "Advanced Features" section, locate **Social Media Share** and click the **Settings** button next to it.

![Social Share](/images/miscellaneous/social-share/social-share-1.webp)

### Step 2: Enable the Feature

On the next screen, check the box labeled **Enable Social Media Share for Affiliates**.

![Social Share](/images/miscellaneous/social-share/social-share-2.webp)

### Step 3: Configure Your Platforms

Once the feature is enabled, a list of **Social Media Platforms** will appear.

* **Turn Platforms On/Off:** Use the toggle switches on the right side to decide which platforms (X/Twitter, Facebook, LinkedIn, WhatsApp and Email are on by default; Reddit, Telegram and Pinterest are also available to turn on) should be available to your affiliates.
* **Reorder the List:** You can change the display order of the icons by clicking and dragging the arrows on the left side of any platform name.
* **Save:** When you are happy with your selection, don't forget to click the **Save Settings** button at the bottom of the screen.

![Social Share](/images/miscellaneous/social-share/social-share-3.webp)

## Add Custom Social Platforms (Developer-Friendly Option)

If you want to show additional social networks in the Affiliate Portal (or rename/remove existing ones), you can do that using the `fluent_affiliate/social_media_links` filter.

This is useful when you want to:

* Add a new platform (for example, YouTube)
* Rename existing labels (change the `title` of a network)
* Hide any platform you do not want to show

### Recommended: Use FluentSnippets

To add custom PHP code safely, we recommend using **FluentSnippets** instead of editing your theme files directly.

**Steps:**

1. Install and activate FluentSnippets on your WordPress site.
2. Create a new PHP snippet.
3. Paste the code below.
4. Save and activate the snippet.

```php
add_filter('fluent_affiliate/social_media_links', function ($links) {
    // Ensure we are working with an array.
    if (!is_array($links)) {
        $links = [];
    }

    // Add a new custom network.
    // {url} and {title} are replaced with the affiliate's link and the page title.
    $links['bluesky'] = [
        'title'       => __('Bluesky', 'fluent-affiliate'),
        'icon_svg'    => '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" fill="currentColor"/></svg>',
        'placeholder' => 'https://bsky.app/intent/compose?text={title}%20{url}'
    ];

    // Remove a network if you do not want to expose it.
    unset($links['reddit']);

    return $links;
});
```

### What This Snippet Does

* Adds a new **Bluesky** option for affiliates. Each network needs a `title`, an `icon_svg` and a `placeholder` (the share URL, where `{url}` and `{title}` are filled in automatically). You can add any network this way.
* Removes **Reddit** from the available share list.

After activating the snippet, ask affiliates to refresh their Affiliate Portal page to see the updated options.

## How Affiliates Use the Share Feature

Once you have enabled and saved your settings, the social sharing options will instantly become available in the Affiliate Portal.

When an affiliate logs into their account and navigates to their **Dashboard** (or the **Links** tab), they will see their unique referral link. Right beneath the link field, a row of social media icons will now be visible.

![Social Share](/images/miscellaneous/social-share/social-share-4.webp)

To share their link, the affiliate simply clicks on their preferred platform's icon. This will automatically open a new window to that specific social network, pre-filling a post with their unique referral link ready to be shared with their audience.
