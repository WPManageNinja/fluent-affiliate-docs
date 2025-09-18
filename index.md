---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "FluentAffiliate"
  text: "WordPress Affiliate Management Plugin"
  tagline: Powerful, flexible, and easy-to-use affiliate management solution for WordPress
  image:
    src: /images/brand/FluentAffiliate-Plugin-Dashboard.webp
    alt: FluentAffiliate
    style:
      width: '100%'
      max-width: '800px'
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started/what-is-fluentaffiliate

---


<div class="custom-block tip">
  <p>
    <strong>Latest Version:</strong> Check out our <a href="/guide/changelog/changelog">changelog</a> to see what's new in FluentAffiliate.
  </p>
</div>

<div class="features">
  <div class="feature-item">
    <div class="feature-icon">🚀</div>
    <div class="feature-content">
      <h2>Getting Started</h2>
      <p>Learn the basics and set up your affiliate program</p>
      <a href="/guide/getting-started/what-is-fluentaffiliate" class="feature-link">Get Started →</a>
    </div>
  </div>

  <div class="feature-item">
    <div class="feature-icon">⚙️</div>
    <div class="feature-content">
      <h2>Admin Guide</h2>
      <p>Manage affiliates, referrals, and payouts</p>
      <a href="/guide/admin-portal/admin-dashboard-overview" class="feature-link">Learn More →</a>
    </div>
  </div>

  <div class="feature-item">
    <div class="feature-icon">💼</div>
    <div class="feature-content">
      <h2>Affiliate Guide</h2>
      <p>Everything affiliates need to know</p>
      <a href="/guide/affiliate-portal/how-to-register-as-an-affiliate" class="feature-link">Start Earning →</a>
    </div>
  </div>

  <div class="feature-item">
    <div class="feature-icon">🔌</div>
    <div class="feature-content">
      <h2>Integrations</h2>
      <p>Connect with your favorite plugins</p>
      <a href="/guide/integrations/integrations" class="feature-link">Explore →</a>
    </div>
  </div>

  <div class="feature-item">
    <div class="feature-icon">🎛️</div>
    <div class="feature-content">
      <h2>Settings</h2>
      <p>Configure your affiliate program</p>
      <a href="/guide/settings-and-customization/referral-settings" class="feature-link">Configure →</a>
    </div>
  </div>

  <div class="feature-item">
    <div class="feature-icon">❓</div>
    <div class="feature-content">
      <h2>Need Help?</h2>
      <p>Get support and find answers</p>
      <a href="https://wpmanageninja.com/support-tickets/" class="feature-link">Get Support →</a>
    </div>
  </div>
</div>

<style>
.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 2.5rem 0;
}

.feature-item {
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-2px);
  background-color: var(--vp-c-bg-soft-up);
}

.feature-icon {
  display: inline-block;
  font-size: 24px;
  margin-bottom: 16px;
}

.feature-content h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.feature-content p {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0 0 16px;
  line-height: 1.6;
}

.feature-link {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand);
  text-decoration: none;
  transition: color 0.25s;
}

.feature-link:hover {
  color: var(--vp-c-brand-dark);
}

@media (max-width: 768px) {
  .features {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .features {
    grid-template-columns: 1fr;
  }
}
</style>
