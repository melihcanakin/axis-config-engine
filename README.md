<h1 align="center">AXIS Config Engine</h1>

<p align="center">
  A lightweight, centralized configuration server for distributed applications.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active%20Development-brightgreen?style=for-the-badge" alt="Status"/>
  <img src="https://img.shields.io/badge/Version-1.0.0-blueviolet?style=for-the-badge" alt="Version"/>
  <img src="https://img.shields.io/badge/License-ISC-darkgray?style=for-the-badge" alt="License"/>
</p>

---

## Why AXIS?

Managing configuration across multiple services, environments (dev, staging, prod), and instances is complex. Hard-coding API keys or scattering `.env` files across repositories leads to security risks, management overhead, and downtime during updates.

`AXIS` was built to solve this by providing a single, secure, and dynamic source of truth for all configuration data. It's a "pull-based" model: your services fetch their config from `AXIS` at boot time or poll it for real-time changes.

This decouples your configuration from your application code, allowing you to change settings (e.g., rotate an API key, toggle a feature flag) without a single line of code or a new deployment.

## Core Features

* **Centralized Vault:** A single API to store, manage, and retrieve all your configuration.
* **Environment-Aware:** Natively segments configurations by `service_name` and `environment`.
* **Dynamic Reloading:** Applications can poll `AXIS` for updated values without restarting.
* **Secure:** Protects your sensitive data (API keys, DB strings) behind a token-protected API.
* **Lightweight:** Built with Node.js, Express, and MongoDB for minimal footprint and fast performance.
* **Simple REST API:** Designed to be dead-simple to integrate with any application, in any language.

## Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Token%20Auth-Static-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="Token Auth"/>
</p>

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from template:

**Linux/Mac:**
```bash
cp .env.example .env
```

**Windows:**
```bash
copy .env.example .env
```

4. Configure your `.env` file with:
   - MongoDB connection URI
   - Admin authentication token
   - Service authentication token

## Usage

### Start the server

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Reference

All endpoints are protected and require a `X-Auth-Token` in the header.

> 📚 **For detailed usage examples** with cURL, JavaScript, and Python, see [EXAMPLES.md](EXAMPLES.md)

---

#### 1. Create or Update a Configuration (Upsert)

This endpoint will create a new configuration value or update it if it already exists (based on the unique key of `service:env:key`).

**`POST /api/v1/config`**

**Headers:**
```
X-Auth-Token: YOUR_SECURE_ADMIN_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "service_name": "billing-service",
  "environment": "production",
  "key": "STRIPE_API_KEY",
  "value": "sk_prod_xxxxxxxxxxxxxx_new"
}
```

**Success Response (201 Created):**
```json
{
  "status": "success",
  "message": "Configuration upserted successfully.",
  "data": {
    "_id": "60c72b2f5f1a2e001c9d8e0a",
    "service_name": "billing-service",
    "environment": "production",
    "key": "STRIPE_API_KEY",
    "value": "sk_prod_xxxxxxxxxxxxxx_new",
    "last_updated": "2025-11-16T00:52:00.000Z"
  }
}
```

---

#### 2. Get a Specific Configuration Value

This is the primary endpoint your applications will use to fetch their configuration.

**`GET /api/v1/config/:service/:env/:key`**

**Headers:**
```
X-Auth-Token: YOUR_SECURE_SERVICE_TOKEN
```

**Example Request:**
```
GET /api/v1/config/billing-service/production/STRIPE_API_KEY
```

**Success Response (200 OK):**
```json
{
  "key": "STRIPE_API_KEY",
  "value": "sk_prod_xxxxxxxxxxxxxx_new",
  "environment": "production",
  "service_name": "billing-service"
}
```

**Error Response (404 Not Found):**
```json
{
  "status": "error",
  "message": "Configuration not found"
}
```

---

## Security Model

AXIS uses a two-tier token authentication system:

* **Admin Token** (`ADMIN_AUTH_TOKEN`): Full access - can create, update, and read configurations
* **Service Token** (`SERVICE_AUTH_TOKEN`): Read-only access - can only fetch configurations

All tokens are validated via the `X-Auth-Token` header. Unauthorized requests return a `401 Unauthorized` response.

> ⚠️ **Important:** Store your tokens securely in environment variables. Never commit them to version control.

---

## Project Structure

```
axis-config-engine/
├── config/
│   └── db.js              # MongoDB connection logic
├── middleware/
│   └── auth.js            # Two-tier authentication system
├── models/
│   └── Config.js          # Mongoose schema with unique indexing
├── routes/
│   └── api/
│       └── config.js      # REST API endpoints
├── .env.example           # Environment template
├── .gitignore             # Git ignore rules
├── EXAMPLES.md            # Detailed usage examples
├── index.js               # Main server entry point
├── LICENSE                # ISC License
├── package.json           # Dependencies
└── README.md              # This file
```

---

## Use Cases

* **Microservices Architecture:** Centralize config for dozens of services
* **Multi-Environment Deployments:** Manage dev, staging, and production configs separately
* **Secret Rotation:** Update API keys, tokens, or passwords without redeploying
* **Feature Flags:** Toggle features on/off dynamically
* **A/B Testing:** Serve different configurations to different service instances

---

## Requirements

* Node.js >= 14.x
* MongoDB >= 4.x
* npm or yarn

---

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/melihcanakin/axis-config-engine/issues).

---

## License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <b>Developed by Melihcan Akın</b><br>
  <i>Software Architect & Founder at <a href="https://www.smartyazilim.com.tr" target="_blank">Smart Yazılım</a></i>
</p>

<p align="center">
  <a href="https://www.smartyazilim.com.tr" target="_blank">
    <img src="https://img.shields.io/badge/Smart%20Yazılım-Visit%20Website-0078D4?style=for-the-badge&logo=microsoft-edge&logoColor=white" alt="Smart Yazılım"/>
  </a>
</p>
