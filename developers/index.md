---
layout: home

hero:
  name: "FluentAffiliate"
  text: "Developer Documentation"
  tagline: "Build powerful affiliate marketing solutions with WordPress"
  image:
    src: /developers/public/developer-docs-hero-image.png
    alt: FluentAffiliate Developer Documentation
  actions:
    - theme: brand
      text: Get Started
      link: /developers/quick-start/
    - theme: alt
      text: View Hooks
      link: /developers/hooks/
---

<div class="feature-cards">

<div class="feature-card">
  <div class="card-left">
    <div class="card-icon">🏗️</div>
    <h3>Architecture</h3>
    <p>Understand FluentAffiliate's database structure, models, ORM features, and core development concepts for building robust affiliate solutions.</p>
  </div>
  <div class="card-right">
    <a href="/developers/database/">Database Schema</a>
    <a href="/developers/database/models/">Database Models</a>
    <a href="/developers/database/orm/">Fluent ORM</a>
    <a href="/developers/database/query-builder/">Query Builder</a>
  </div>
</div>

<div class="feature-card">
  <div class="card-left">
    <div class="card-icon">🪝</div>
    <h3>Developer Hooks</h3>
    <p>53+ action and filter hooks across all modules for complete customization of affiliate workflows, referral tracking, and payout processing.</p>
  </div>
  <div class="card-right">
    <a href="/developers/hooks/">Hooks Overview</a>
    <a href="/developers/hooks/actions/">Action Hooks</a>
    <a href="/developers/hooks/filters/">Filter Hooks</a>
    <a href="/developers/global-functions/">Global Functions</a>
  </div>
</div>

<div class="feature-card">
  <div class="card-left">
    <div class="card-icon">⚡</div>
    <h3>API</h3>
    <p>RESTful API documentation, authentication methods, and integration patterns for external access and custom applications.</p>
  </div>
  <div class="card-right">
    <a href="/developers/api/">REST API</a>
    <a href="/developers/api/authentication/">Authentication</a>
    <a href="/developers/api/endpoints/">Endpoints</a>
    <a href="/developers/examples/integrations/">Integration Examples</a>
  </div>
</div>

</div>

<style>
.feature-cards {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin: 3rem 0;
}

.feature-card {
  display: flex;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  overflow: hidden;
  min-height: 180px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.feature-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-left {
  flex: 1;
  padding: 2.5rem;
  background: var(--vp-c-bg-soft);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  line-height: 1;
}

.card-left h3 {
  margin: 0 0 1.25rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.card-left p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  font-size: 0.95rem;
}

.card-right {
  flex: 1;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: var(--vp-c-bg);
  justify-content: center;
}

.card-right a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.card-right a:hover {
  color: var(--vp-c-brand-2);
  background: var(--vp-c-bg-soft);
  border-left-color: var(--vp-c-brand-1);
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .feature-card {
    flex-direction: column;
    min-height: auto;
  }

  .card-left, .card-right {
    flex: none;
  }

  .card-left {
    padding: 2rem;
    text-align: center;
    align-items: center;
  }

  .card-right {
    padding: 2rem;
  }

  .card-icon {
    font-size: 2.5rem;
  }
}
</style>
---

## Getting Started

New to FluentAffiliate development? Start with our comprehensive guide that covers everything from setup to your first custom implementation.

[Quick Start Guide →](/developers/quick-start/)

---

*FluentAffiliate is a self-hosted affiliate marketing plugin for WordPress. Build custom solutions with complete data ownership and unlimited scalability.*
