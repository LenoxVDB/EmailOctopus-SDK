<div align="center">

  # EmailOctopus SDK (Node.js)

</div>

<div align="center">
  
[![NPM Downloads](https://img.shields.io/npm/d18m/emailoctopus-sdk.svg)](https://www.npmjs.com/package/emailoctopus-sdk)
  
</div>


## Disclamer: This package is intended for learning purposes only and will only be maintained if issues are reported.

A modern, lightweight Node.js SDK for the EmailOctopus API — send, manage, and automate email campaigns with ease.

I built this SDK for EmailOctopus to make integrations with their official API fast and developer-friendly.

- Official EmailOctopus API docs (reference): https://emailoctopus.com/api-documentation/v2#section/Introduction
- License: MIT

## Features
- Simple, promise-based API powered by Axios
- First-class modules for common resources:
  - Lists
  - Contacts
  - Tags
  - Fields
  - Campaigns
  - Automations
- Environment-based auth via `EMAIL_OCTOPUS_API_KEY`
- Consistent error propagation (Axios errors include `response` when available)

> Note: This is a community SDK. It is not an official package from EmailOctopus. For the full, authoritative specification of endpoints and parameters, always refer to the official docs linked above.

## Installation
```bash
npm install emailoctopus-sdk
```

## Quick start
1) Create a `.env` (or set an environment variable) with your API key:
```env
EMAIL_OCTOPUS_API_KEY=YOUR_API_KEY_HERE
```

2) Import and use the client:
```js
import ApiClient from 'emailoctopus-sdk';

const eo = new ApiClient(); // reads EMAIL_OCTOPUS_API_KEY from process.env

// Example: fetch lists
const lists = await eo.list.getAll({ limit: 50 });
console.log(lists);
```

### CommonJS usage
This package is ESM. In CommonJS, use dynamic import:
```js
(async () => {
  const { default: ApiClient } = await import('emailoctopus-sdk');
  const eo = new ApiClient();
  const lists = await eo.list.getAll();
  console.log(lists);
})();
```

## Configuration
- Auth: provided via `process.env.EMAIL_OCTOPUS_API_KEY`
- Base URL (internal): `https://api.emailoctopus.com/`
- Content-Type: `application/json`
- Auth header: `Authorization: Bearer <API_KEY>`

If anything differs from the latest EmailOctopus requirements, follow the official docs and adjust accordingly.

## Usage by module
Below are the most commonly used calls exposed by this SDK. Parameter names mirror the EmailOctopus API. For optional filters and full schemas, consult the official docs.

### Lists
```js
// Get all lists (supports pagination)
await eo.list.getAll({ limit: 100, starting_after: 'cursor' });

// Create a new list
await eo.list.create('Newsletter');

// Get a specific list
await eo.list.getList('00000000-0000-0000-0000-000000000000');

// Update a list
await eo.list.update('00000000-0000-0000-0000-000000000000', 'New Name');

// Delete a list
await eo.list.delete('00000000-0000-0000-0000-000000000000');
```

### Contacts
```js
// Get contacts in a list
await eo.contact.getContacts('LIST_ID', {
  limit: 100,
  starting_after: 'cursor',
  tag: 'VIP',
  status: 'subscribed', // 'subscribed' | 'unsubscribed' | 'pending'
  'created_at.lte': '2024-12-31T23:59:59Z',
  'created_at.gte': '2024-01-01T00:00:00Z',
  'last_updated_at.lte': '2025-12-31T23:59:59Z',
  'last_updated_at.gte': '2025-01-01T00:00:00Z',
});

// Create or update a contact (idempotent upsert)
await eo.contact.createOrUpdate('LIST_ID', 'user@example.com',
  { FIRSTNAME: 'Ada' },        // fields by tag
  { VIP: true },               // tags object: { tagName: boolean }
  'subscribed'                 // status optional
);

// Create a new contact
await eo.contact.create('LIST_ID', 'user@example.com',
  { FIRSTNAME: 'Ada' },        // fields
  ['VIP', 'EARLY_ADOPTER'],    // tags array
  'pending'                    // status
);

// Update a contact by id/hash
await eo.contact.update('LIST_ID', 'CONTACT_ID_OR_MD5_EMAIL',
  'new@example.com',
  { FIRSTNAME: 'Grace' },
  { VIP: false },
  'subscribed'
);

// Get a single contact
await eo.contact.getContact('LIST_ID', 'CONTACT_ID_OR_MD5_EMAIL');

// Delete a contact
await eo.contact.delete('LIST_ID', 'CONTACT_ID_OR_MD5_EMAIL');
```

Tip: Some endpoints accept the contact id OR the MD5 of the lowercase email. Example to derive hash:
```js
import crypto from 'crypto';
const hash = crypto.createHash('md5').update('user@example.com'.toLowerCase()).digest('hex');
```

### Tags
```js
// List tags on a list
await eo.tag.getAll('LIST_ID', { limit: 100, starting_after: 'cursor' });

// Create a tag
await eo.tag.create('LIST_ID', 'VIP');

// Update a tag (rename)
await eo.tag.update('LIST_ID', 'VIP'); // supply the new tag value in the same argument

// Delete a tag
await eo.tag.delete('LIST_ID', 'VIP');
```

### Fields
```js
// Create a basic field
await eo.field.create('LIST_ID', 'First name', 'FIRSTNAME', 'text', 'Friend');

// Create a choice field
await eo.field.createChoiceField(
  'LIST_ID', 'Interests', 'INTERESTS', 'choice_multiple', ['Tech', 'Art'], null
);

// Update a field
await eo.field.update('LIST_ID', 'FIRSTNAME', 'First name', 'text', 'Friend');

// Delete a field
await eo.field.delete('LIST_ID', 'FIRSTNAME');
```

### Campaigns
```js
// Get campaigns
await eo.campaign.getAll({ limit: 100, starting_after: 'cursor' });

// Get a campaign
await eo.campaign.getCampaign('CAMPAIGN_ID');

// Contacts report for a campaign
await eo.campaign.getCampaignContactReports('CAMPAIGN_ID', { status: 'opened' });

// Links report
await eo.campaign.getCampaignLinksReport('CAMPAIGN_ID');

// Summary report
await eo.campaign.getCampaignSummaryReport('CAMPAIGN_ID');
```

### Automations
```js
// Start an automation for a specific contact
await eo.automation.start('AUTOMATION_ID', 'CONTACT_ID_OR_MD5_EMAIL');
```

## Error handling
All methods throw on HTTP or network errors (Axios). Typical pattern:
```js
try {
  const data = await eo.list.getAll();
  console.log(data);
} catch (err) {
  if (err.response) {
    // Server responded with a status outside 2xx
    console.error('API error:', err.response.status, err.response.data);
  } else {
    // Network or unexpected error
    console.error('Unexpected error:', err.message);
  }
}
```

## Pagination
Many list endpoints support `limit` and `starting_after`. Use `starting_after` with the last item’s cursor/id from the previous page to continue.

## Development
- Node.js 18+ recommended (ESM-only package)
- Env var via `.env` is loaded with `dotenv`

## Links
- EmailOctopus API reference: https://emailoctopus.com/api-documentation/v2#section/Introduction
- Issues: https://github.com/LenoxVDB/EmailOctopus-SDK/issues

## License
MIT © Lenox Van den Berg



