# REST API

FluentAffiliate Core Advanced

FluentAffiliate provides a comprehensive REST API that allows you to interact with all affiliate data programmatically. The API follows RESTful conventions and integrates seamlessly with WordPress's REST API infrastructure.

## Overview

The FluentAffiliate REST API enables you to:
- **Manage Affiliates** - Create, read, update, and delete affiliate records
- **Track Referrals** - Create and manage referral data
- **Process Payouts** - Handle transaction and payout operations
- **Access Analytics** - Retrieve performance metrics and reports
- **Integrate Systems** - Connect external applications and services

### 🌐 **API Characteristics**

- **RESTful Design** - Standard HTTP methods and status codes
- **JSON Format** - All requests and responses use JSON
- **WordPress Integration** - Built on WordPress REST API framework
- **Authentication** - Multiple authentication methods supported
- **Rate Limiting** - Built-in rate limiting for API protection
- **Versioning** - API versioning for backward compatibility

## Base URL

All API endpoints are prefixed with the FluentAffiliate namespace:

```
https://yoursite.com/wp-json/fluent-affiliate/v1/
```

### 📋 **API Structure**

| Resource | Endpoint | Description |
|----------|----------|-------------|
| **Affiliates** | `/affiliates` | Affiliate management |
| **Referrals** | `/referrals` | Referral tracking |
| **Transactions** | `/transactions` | Financial transactions |
| **Groups** | `/groups` | Affiliate groups |
| **Analytics** | `/analytics` | Performance metrics |
| **Settings** | `/settings` | Plugin configuration |

## Authentication

FluentAffiliate supports multiple authentication methods for different use cases.

### 🔐 **Authentication Methods**

1. **WordPress Cookies** - For logged-in WordPress users
2. **Application Passwords** - For external applications
3. **API Keys** - For server-to-server communication
4. **JWT Tokens** - For modern applications (Pro feature)

**Example with Application Password:**
```bash
curl -X GET \
  https://yoursite.com/wp-json/fluent-affiliate/v1/affiliates \
  -u "username:application_password"
```

**Example with API Key:**
```bash
curl -X GET \
  https://yoursite.com/wp-json/fluent-affiliate/v1/affiliates \
  -H "X-API-Key: your_api_key_here"
```

## Core Endpoints

### 👥 **Affiliates Endpoint**

**Base URL:** `/affiliates`

**Get All Affiliates:**
```http
GET /wp-json/fluent-affiliate/v1/affiliates
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "user_id": 123,
      "email": "affiliate@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "status": "active",
      "commission_rate": 10.00,
      "commission_type": "percentage",
      "earnings": 150.00,
      "total_referrals": 5,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "total": 1,
    "per_page": 20,
    "current_page": 1,
    "last_page": 1
  }
}
```

**Get Single Affiliate:**
```http
GET /wp-json/fluent-affiliate/v1/affiliates/{id}
```

**Create Affiliate:**
```http
POST /wp-json/fluent-affiliate/v1/affiliates
Content-Type: application/json

{
  "user_id": 123,
  "email": "new@example.com",
  "first_name": "Jane",
  "last_name": "Smith",
  "status": "pending"
}
```

**Update Affiliate:**
```http
PUT /wp-json/fluent-affiliate/v1/affiliates/{id}
Content-Type: application/json

{
  "status": "active",
  "commission_rate": 15.00
}
```

### 📈 **Referrals Endpoint**

**Base URL:** `/referrals`

**Get All Referrals:**
```http
GET /wp-json/fluent-affiliate/v1/referrals?affiliate_id=1&status=approved
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "affiliate_id": 1,
      "order_id": "WC-12345",
      "order_total": 100.00,
      "commission_amount": 10.00,
      "commission_rate": 10.00,
      "commission_type": "percentage",
      "status": "approved",
      "type": "sale",
      "origin": "woocommerce",
      "created_at": "2024-01-15T14:30:00Z"
    }
  ]
}
```

**Create Referral:**
```http
POST /wp-json/fluent-affiliate/v1/referrals
Content-Type: application/json

{
  "affiliate_id": 1,
  "order_id": "WC-12346",
  "order_total": 150.00,
  "commission_amount": 15.00,
  "type": "sale",
  "origin": "api"
}
```

**Update Referral Status:**
```http
PATCH /wp-json/fluent-affiliate/v1/referrals/{id}/status
Content-Type: application/json

{
  "status": "approved",
  "notes": "Verified and approved"
}
```

### 💰 **Transactions Endpoint**

**Base URL:** `/transactions`

**Get Transactions:**
```http
GET /wp-json/fluent-affiliate/v1/transactions?affiliate_id=1&type=payout
```

**Create Payout:**
```http
POST /wp-json/fluent-affiliate/v1/transactions
Content-Type: application/json

{
  "affiliate_id": 1,
  "amount": 150.00,
  "type": "payout",
  "method": "paypal",
  "reference": "PP-12345"
}
```

### 📊 **Analytics Endpoint**

**Base URL:** `/analytics`

**Get Affiliate Performance:**
```http
GET /wp-json/fluent-affiliate/v1/analytics/affiliate/{id}?period=30days
```

**Response:**
```json
{
  "affiliate_id": 1,
  "period": "30days",
  "metrics": {
    "total_clicks": 150,
    "total_referrals": 8,
    "total_earnings": 120.00,
    "conversion_rate": 5.33,
    "average_order_value": 75.00
  },
  "daily_stats": [
    {
      "date": "2024-01-15",
      "clicks": 12,
      "referrals": 2,
      "earnings": 25.00
    }
  ]
}
```

**Get Overall Statistics:**
```http
GET /wp-json/fluent-affiliate/v1/analytics/overview?period=7days
```

## Query Parameters

### 🔍 **Common Parameters**

**Pagination:**
- `page` - Page number (default: 1)
- `per_page` - Items per page (default: 20, max: 100)

**Filtering:**
- `status` - Filter by status
- `search` - Search in relevant fields
- `date_from` - Start date (YYYY-MM-DD)
- `date_to` - End date (YYYY-MM-DD)

**Sorting:**
- `orderby` - Sort field (id, created_at, etc.)
- `order` - Sort direction (asc, desc)

**Example:**
```http
GET /wp-json/fluent-affiliate/v1/affiliates?status=active&orderby=created_at&order=desc&per_page=50
```

## Response Format

### 📋 **Standard Response Structure**

**Success Response:**
```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "per_page": 20,
    "current_page": 1,
    "last_page": 5
  }
}
```

**Error Response:**
```json
{
  "code": "invalid_request",
  "message": "Invalid affiliate ID provided",
  "data": {
    "status": 400,
    "details": "Affiliate with ID 999 does not exist"
  }
}
```

### 📊 **HTTP Status Codes**

| Code | Meaning | Usage |
|------|---------|-------|
| `200` | OK | Successful GET, PUT, PATCH |
| `201` | Created | Successful POST |
| `204` | No Content | Successful DELETE |
| `400` | Bad Request | Invalid request data |
| `401` | Unauthorized | Authentication required |
| `403` | Forbidden | Insufficient permissions |
| `404` | Not Found | Resource not found |
| `422` | Unprocessable Entity | Validation errors |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Internal Server Error | Server error |

## Rate Limiting

### ⚡ **Rate Limits**

FluentAffiliate implements rate limiting to protect against abuse:

- **Authenticated Users:** 1000 requests per hour
- **Unauthenticated Users:** 100 requests per hour
- **Burst Limit:** 60 requests per minute

**Rate Limit Headers:**
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642694400
```

## Webhooks

### 🔔 **Webhook Events**

FluentAffiliate can send webhooks for various events:

- `affiliate.created` - New affiliate registered
- `affiliate.approved` - Affiliate approved
- `referral.created` - New referral tracked
- `referral.approved` - Referral approved
- `transaction.created` - New transaction
- `payout.processed` - Payout completed

**Webhook Payload Example:**
```json
{
  "event": "referral.created",
  "timestamp": "2024-01-15T14:30:00Z",
  "data": {
    "referral": {
      "id": 123,
      "affiliate_id": 1,
      "order_total": 100.00,
      "commission_amount": 10.00
    }
  }
}
```

## SDK and Libraries

### 📚 **Official SDKs**

**PHP SDK:**
```php
use FluentAffiliate\SDK\Client;

$client = new Client([
    'base_url' => 'https://yoursite.com',
    'api_key' => 'your_api_key'
]);

$affiliates = $client->affiliates()->all();
$affiliate = $client->affiliates()->create($data);
```

**JavaScript SDK:**
```javascript
import FluentAffiliateAPI from 'fluent-affiliate-js';

const api = new FluentAffiliateAPI({
  baseURL: 'https://yoursite.com',
  apiKey: 'your_api_key'
});

const affiliates = await api.affiliates.getAll();
const affiliate = await api.affiliates.create(data);
```

## Error Handling

### 🚨 **Best Practices**

**Handle Different Error Types:**
```javascript
try {
  const response = await api.affiliates.create(data);
} catch (error) {
  if (error.status === 422) {
    // Handle validation errors
    console.log('Validation errors:', error.data.errors);
  } else if (error.status === 401) {
    // Handle authentication errors
    console.log('Authentication required');
  } else {
    // Handle other errors
    console.log('API error:', error.message);
  }
}
```

## Next Steps

Now that you understand the REST API:

1. **[Authentication Guide](/developers/api/authentication/)** - Detailed authentication setup
2. **[Endpoint Reference](/developers/api/endpoints/)** - Complete endpoint documentation
3. **[Code Examples](/developers/examples/)** - Real-world API usage examples

---

*The FluentAffiliate REST API provides powerful programmatic access to all affiliate functionality. Use it to build integrations, mobile apps, and custom solutions.*
