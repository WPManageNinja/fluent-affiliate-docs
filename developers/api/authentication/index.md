# API Authentication

FluentAffiliate Core Advanced

FluentAffiliate provides multiple authentication methods to securely access the REST API. Choose the method that best fits your use case, from simple cookie authentication for WordPress integrations to API keys for server-to-server communication.

## Overview

Authentication is required for most FluentAffiliate API endpoints to ensure data security and proper access control. The plugin supports four authentication methods, each designed for different scenarios and security requirements.

### 🔐 **Authentication Methods**

| Method | Use Case | Security Level | Setup Complexity |
|--------|----------|----------------|------------------|
| **WordPress Cookies** | Frontend JavaScript, WordPress plugins | Medium | Low |
| **Application Passwords** | External apps, testing | High | Medium |
| **API Keys** | Server-to-server, automation | High | Medium |
| **JWT Tokens** | Modern SPAs, mobile apps | Very High | High |

## WordPress Cookie Authentication

### 🍪 **When to Use**

- Frontend JavaScript in WordPress themes/plugins
- AJAX requests from logged-in users
- WordPress admin integrations
- Quick prototyping and testing

### 🍪 **How It Works**

WordPress cookie authentication uses the standard WordPress login cookies. When a user is logged into WordPress, their session cookies automatically authenticate API requests.

**Requirements:**
- User must be logged into WordPress
- Requests must include WordPress nonce for security
- Same-origin requests (no CORS issues)

**Example Implementation:**
```javascript
// Get nonce from WordPress
const nonce = wpApiSettings.nonce; // Available in wp-admin
// Or from localized script
const nonce = fluentAffiliateApi.nonce;

// Make authenticated request
fetch('/wp-json/fluent-affiliate/v1/affiliates', {
    method: 'GET',
    headers: {
        'X-WP-Nonce': nonce,
        'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
})
.then(response => response.json())
.then(data => console.log(data));
```

**PHP Example (WordPress Plugin):**
```php
// In your WordPress plugin
$response = wp_remote_get(
    home_url('/wp-json/fluent-affiliate/v1/affiliates'),
    [
        'headers' => [
            'X-WP-Nonce' => wp_create_nonce('wp_rest'),
            'Cookie' => $_SERVER['HTTP_COOKIE']
        ]
    ]
);

$data = json_decode(wp_remote_retrieve_body($response), true);
```

### 🍪 **Nonce Generation**

**In JavaScript (WordPress Admin):**
```javascript
// Nonce is automatically available
const nonce = wpApiSettings.nonce;
```

**In PHP:**
```php
// Generate nonce for current user
$nonce = wp_create_nonce('wp_rest');

// Localize for JavaScript
wp_localize_script('your-script', 'fluentAffiliateApi', [
    'nonce' => $nonce,
    'apiUrl' => home_url('/wp-json/fluent-affiliate/v1/')
]);
```

## Application Passwords

### 🔑 **When to Use**

- External applications and services
- Command-line tools and scripts
- Third-party integrations
- Development and testing

### 🔑 **Setup Process**

**Step 1: Enable Application Passwords**
Application passwords are available in WordPress 5.6+ and enabled by default.

**Step 2: Generate Application Password**
1. Go to **Users → Profile** in WordPress admin
2. Scroll to **Application Passwords** section
3. Enter application name (e.g., "FluentAffiliate API Client")
4. Click **Add New Application Password**
5. Copy the generated password (shown only once)

**Step 3: Use in API Requests**
```bash
# Basic Auth with username and application password
curl -X GET \
  https://yoursite.com/wp-json/fluent-affiliate/v1/affiliates \
  -u "username:xxxx xxxx xxxx xxxx xxxx xxxx"
```

### 🔑 **Implementation Examples**

**cURL:**
```bash
# Get all affiliates
curl -X GET \
  "https://yoursite.com/wp-json/fluent-affiliate/v1/affiliates" \
  -u "admin:abcd efgh ijkl mnop qrst uvwx" \
  -H "Content-Type: application/json"

# Create new affiliate
curl -X POST \
  "https://yoursite.com/wp-json/fluent-affiliate/v1/affiliates" \
  -u "admin:abcd efgh ijkl mnop qrst uvwx" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 123,
    "email": "new@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

**PHP:**
```php
$username = 'admin';
$app_password = 'abcd efgh ijkl mnop qrst uvwx';

$response = wp_remote_get(
    'https://yoursite.com/wp-json/fluent-affiliate/v1/affiliates',
    [
        'headers' => [
            'Authorization' => 'Basic ' . base64_encode($username . ':' . $app_password),
            'Content-Type' => 'application/json'
        ]
    ]
);

$data = json_decode(wp_remote_retrieve_body($response), true);
```

**Python:**
```python
import requests
from requests.auth import HTTPBasicAuth

username = 'admin'
app_password = 'abcd efgh ijkl mnop qrst uvwx'

response = requests.get(
    'https://yoursite.com/wp-json/fluent-affiliate/v1/affiliates',
    auth=HTTPBasicAuth(username, app_password),
    headers={'Content-Type': 'application/json'}
)

data = response.json()
```

**JavaScript (Node.js):**
```javascript
const axios = require('axios');

const username = 'admin';
const appPassword = 'abcd efgh ijkl mnop qrst uvwx';
const auth = Buffer.from(`${username}:${appPassword}`).toString('base64');

const response = await axios.get(
    'https://yoursite.com/wp-json/fluent-affiliate/v1/affiliates',
    {
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
        }
    }
);

console.log(response.data);
```

## API Keys

### 🗝️ **When to Use**

- Server-to-server communication
- Automated scripts and cron jobs
- Webhook endpoints
- High-security integrations

### 🗝️ **Setup Process**

**Step 1: Generate API Key**
1. Go to **FluentAffiliate → Settings → API**
2. Click **Generate New API Key**
3. Enter key name and permissions
4. Copy the generated key (shown only once)

**Step 2: Configure Permissions**
```php
// API key permissions
$permissions = [
    'read_affiliates' => true,
    'write_affiliates' => true,
    'read_referrals' => true,
    'write_referrals' => false,
    'read_analytics' => true
];
```

### 🗝️ **Implementation Examples**

**Header-based Authentication:**
```bash
curl -X GET \
  "https://yoursite.com/wp-json/fluent-affiliate/v1/affiliates" \
  -H "X-API-Key: fa_live_1234567890abcdef" \
  -H "Content-Type: application/json"
```

**Query Parameter (Less Secure):**
```bash
curl -X GET \
  "https://yoursite.com/wp-json/fluent-affiliate/v1/affiliates?api_key=fa_live_1234567890abcdef"
```

**PHP Implementation:**
```php
$api_key = 'fa_live_1234567890abcdef';

$response = wp_remote_get(
    'https://yoursite.com/wp-json/fluent-affiliate/v1/affiliates',
    [
        'headers' => [
            'X-API-Key' => $api_key,
            'Content-Type' => 'application/json'
        ]
    ]
);

if (is_wp_error($response)) {
    // Handle error
    error_log('API request failed: ' . $response->get_error_message());
} else {
    $data = json_decode(wp_remote_retrieve_body($response), true);
}
```

**JavaScript (Frontend):**
```javascript
const apiKey = 'fa_live_1234567890abcdef';

fetch('https://yoursite.com/wp-json/fluent-affiliate/v1/affiliates', {
    method: 'GET',
    headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(data => console.log(data))
.catch(error => console.error('API error:', error));
```

### 🗝️ **API Key Management**

**Key Rotation:**
```php
// Rotate API key programmatically
$old_key = 'fa_live_old_key';
$new_key = fluentAffiliate('api')->rotateKey($old_key);

// Update your applications with new key
update_option('my_app_api_key', $new_key);
```

**Key Permissions:**
```php
// Check key permissions
$permissions = fluentAffiliate('api')->getKeyPermissions($api_key);

if (!$permissions['write_affiliates']) {
    wp_die('Insufficient permissions for this operation');
}
```

## JWT Tokens (Pro Feature)

### 🎫 **When to Use**

- Single Page Applications (SPAs)
- Mobile applications
- Microservices architecture
- Stateless authentication

### 🎫 **Token Lifecycle**

**Step 1: Obtain Token**
```bash
curl -X POST \
  "https://yoursite.com/wp-json/fluent-affiliate/v1/auth/token" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "your_password"
  }'
```

**Response:**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "expires_in": 3600,
  "refresh_token": "def50200..."
}
```

**Step 2: Use Token**
```bash
curl -X GET \
  "https://yoursite.com/wp-json/fluent-affiliate/v1/affiliates" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
```

**Step 3: Refresh Token**
```bash
curl -X POST \
  "https://yoursite.com/wp-json/fluent-affiliate/v1/auth/refresh" \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "def50200..."
  }'
```

### 🎫 **Implementation Example**

**JavaScript (SPA):**
```javascript
class FluentAffiliateAuth {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.token = localStorage.getItem('fa_token');
        this.refreshToken = localStorage.getItem('fa_refresh_token');
    }

    async login(username, password) {
        const response = await fetch(`${this.baseUrl}/auth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            this.token = data.token;
            this.refreshToken = data.refresh_token;
            localStorage.setItem('fa_token', this.token);
            localStorage.setItem('fa_refresh_token', this.refreshToken);
        }

        return data;
    }

    async apiRequest(endpoint, options = {}) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        });

        if (response.status === 401) {
            // Token expired, try to refresh
            await this.refreshAccessToken();
            // Retry original request
            return this.apiRequest(endpoint, options);
        }

        return response.json();
    }

    async refreshAccessToken() {
        const response = await fetch(`${this.baseUrl}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: this.refreshToken })
        });

        const data = await response.json();
        
        if (response.ok) {
            this.token = data.token;
            localStorage.setItem('fa_token', this.token);
        }
    }
}

// Usage
const auth = new FluentAffiliateAuth('https://yoursite.com/wp-json/fluent-affiliate/v1');
await auth.login('username', 'password');
const affiliates = await auth.apiRequest('/affiliates');
```

## Security Best Practices

### 🛡️ **General Security**

**1. Use HTTPS Always**
```bash
# ✅ Secure
https://yoursite.com/wp-json/fluent-affiliate/v1/

# ❌ Insecure
http://yoursite.com/wp-json/fluent-affiliate/v1/
```

**2. Store Credentials Securely**
```php
// ✅ Use environment variables
$api_key = getenv('FLUENT_AFFILIATE_API_KEY');

// ✅ Use WordPress constants
define('FLUENT_AFFILIATE_API_KEY', 'your_key_here');

// ❌ Don't hardcode in files
$api_key = 'fa_live_1234567890abcdef';
```

**3. Implement Rate Limiting**
```php
// Check rate limits in your application
if ($response_headers['X-RateLimit-Remaining'] < 10) {
    // Slow down requests
    sleep(1);
}
```

**4. Validate SSL Certificates**
```php
$response = wp_remote_get($url, [
    'sslverify' => true, // Always verify SSL
    'timeout' => 30
]);
```

### 🛡️ **Error Handling**

**Handle Authentication Errors:**
```javascript
async function makeApiRequest(endpoint, options) {
    try {
        const response = await fetch(endpoint, options);
        
        if (response.status === 401) {
            throw new Error('Authentication failed');
        } else if (response.status === 403) {
            throw new Error('Insufficient permissions');
        } else if (response.status === 429) {
            throw new Error('Rate limit exceeded');
        }
        
        return await response.json();
    } catch (error) {
        console.error('API request failed:', error.message);
        throw error;
    }
}
```

## Testing Authentication

### 🧪 **Quick Tests**

**Test with cURL:**
```bash
# Test API key
curl -I -H "X-API-Key: your_key" \
  https://yoursite.com/wp-json/fluent-affiliate/v1/affiliates

# Test application password
curl -I -u "username:app_password" \
  https://yoursite.com/wp-json/fluent-affiliate/v1/affiliates
```

**Expected Response Headers:**
```http
HTTP/1.1 200 OK
Content-Type: application/json
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
```

## Next Steps

Now that you understand authentication:

1. **[API Endpoints](/developers/api/endpoints/)** - Detailed endpoint documentation
2. **[Code Examples](/developers/examples/)** - Real-world implementation examples
3. **[Webhooks Guide](/developers/api/webhooks/)** - Event-driven integrations

---

*Proper authentication is crucial for secure API access. Choose the method that best fits your security requirements and use case.*
