# API Usage Examples

This document provides practical examples for using the AXIS Config Engine API.

> 💡 **Tip:** Replace the token values with your actual tokens from the `.env` file.

## Prerequisites

Make sure the server is running and you have:
- Admin token from your `.env` file
- Service token from your `.env` file

## Using cURL

### 1. Create/Update Configuration (Admin)

```bash
curl -X POST http://localhost:3000/api/v1/config \
  -H "Content-Type: application/json" \
  -H "X-Auth-Token: axis_admin_secret_xyz" \
  -d '{
    "service_name": "billing-service",
    "environment": "production",
    "key": "STRIPE_API_KEY",
    "value": "sk_prod_xxxxxxxxxxxxxx"
  }'
```

### 2. Get Configuration (Service)

```bash
curl -X GET http://localhost:3000/api/v1/config/billing-service/production/STRIPE_API_KEY \
  -H "X-Auth-Token: axis_service_read_abc"
```

### 3. Health Check

```bash
curl -X GET http://localhost:3000/health
```

## Using JavaScript (fetch)

### Create/Update Configuration

```javascript
const createConfig = async () => {
  const response = await fetch('http://localhost:3000/api/v1/config', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': 'axis_admin_secret_xyz'
    },
    body: JSON.stringify({
      service_name: 'billing-service',
      environment: 'production',
      key: 'STRIPE_API_KEY',
      value: 'sk_prod_xxxxxxxxxxxxxx'
    })
  });
  
  const data = await response.json();
  console.log(data);
};
```

### Get Configuration

```javascript
const getConfig = async () => {
  const response = await fetch(
    'http://localhost:3000/api/v1/config/billing-service/production/STRIPE_API_KEY',
    {
      headers: {
        'X-Auth-Token': 'axis_service_read_abc'
      }
    }
  );
  
  const data = await response.json();
  console.log(data);
};
```

## Using Python (requests)

### Create/Update Configuration

```python
import requests

url = "http://localhost:3000/api/v1/config"
headers = {
    "Content-Type": "application/json",
    "X-Auth-Token": "axis_admin_secret_xyz"
}
data = {
    "service_name": "billing-service",
    "environment": "production",
    "key": "STRIPE_API_KEY",
    "value": "sk_prod_xxxxxxxxxxxxxx"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```

### Get Configuration

```python
import requests

url = "http://localhost:3000/api/v1/config/billing-service/production/STRIPE_API_KEY"
headers = {
    "X-Auth-Token": "axis_service_read_abc"
}

response = requests.get(url, headers=headers)
print(response.json())
```

## Common Use Cases

### Multiple Environments

```bash
# Development environment
curl -X POST http://localhost:3000/api/v1/config \
  -H "Content-Type: application/json" \
  -H "X-Auth-Token: axis_admin_secret_xyz" \
  -d '{
    "service_name": "billing-service",
    "environment": "development",
    "key": "STRIPE_API_KEY",
    "value": "sk_test_xxxxxxxxxxxxxx"
  }'

# Production environment
curl -X POST http://localhost:3000/api/v1/config \
  -H "Content-Type: application/json" \
  -H "X-Auth-Token: axis_admin_secret_xyz" \
  -d '{
    "service_name": "billing-service",
    "environment": "production",
    "key": "STRIPE_API_KEY",
    "value": "sk_prod_xxxxxxxxxxxxxx"
  }'
```

### Multiple Services

```bash
# Billing service
curl -X POST http://localhost:3000/api/v1/config \
  -H "Content-Type: application/json" \
  -H "X-Auth-Token: axis_admin_secret_xyz" \
  -d '{
    "service_name": "billing-service",
    "environment": "production",
    "key": "DATABASE_URL",
    "value": "mongodb://billing-db:27017/billing"
  }'

# Auth service
curl -X POST http://localhost:3000/api/v1/config \
  -H "Content-Type: application/json" \
  -H "X-Auth-Token: axis_admin_secret_xyz" \
  -d '{
    "service_name": "auth-service",
    "environment": "production",
    "key": "DATABASE_URL",
    "value": "mongodb://auth-db:27017/auth"
  }'
```

## Error Handling Examples

### Missing Authentication Token

```bash
curl -X GET http://localhost:3000/api/v1/config/billing-service/production/STRIPE_API_KEY
# Response: {"status":"error","message":"No authentication token provided"}
```

### Invalid Token

```bash
curl -X POST http://localhost:3000/api/v1/config \
  -H "Content-Type: application/json" \
  -H "X-Auth-Token: invalid_token" \
  -d '{
    "service_name": "billing-service",
    "environment": "production",
    "key": "STRIPE_API_KEY",
    "value": "sk_prod_xxxxxxxxxxxxxx"
  }'
# Response: {"status":"error","message":"Unauthorized: Invalid admin token"}
```

### Configuration Not Found

```bash
curl -X GET http://localhost:3000/api/v1/config/non-existent/production/KEY \
  -H "X-Auth-Token: axis_service_read_abc"
# Response: {"status":"error","message":"Configuration not found"}
```

### Missing Required Fields

```bash
curl -X POST http://localhost:3000/api/v1/config \
  -H "Content-Type: application/json" \
  -H "X-Auth-Token: axis_admin_secret_xyz" \
  -d '{
    "service_name": "billing-service",
    "environment": "production"
  }'
# Response: {"status":"error","message":"Missing required fields: service_name, environment, key, value"}
```

---

<p align="center">
  <i>Part of the AXIS Config Engine project</i><br>
  <b>Developed by Melihcan Akın</b> | <a href="https://www.smartyazilim.com.tr">Smart Yazılım</a>
</p>
