# babel-plugin-swish

A Babel plugin for a more elegant switch statement syntax in JavaScript/TypeScript.

## Installation

```bash
npm install --save-dev babel-plugin-swish
```

## Usage

Add the plugin to your `.babelrc` or `babel.config.js`:

```json
{
  "plugins": ["swish"]
}
```

### Examples

#### Traditional Syntax
```javascript
switch (status) {
  case Status.ACTIVE:
    return "Active";
  case Status.INACTIVE:
    return "Inactive";
  default:
    return "Unknown";
}
```

#### New Syntax (Swish)
```javascript
swish(status, {
  [Status.ACTIVE]: "Active",
  [Status.INACTIVE]: "Inactive",
  ["_"]: "Unknown"
});
```

#### With Expressions
```javascript
swish(user.age, {
  [age => age < 18]: "Minor",
  [age => age >= 18 && age < 65]: "Adult",
  [age => age >= 65]: "Senior",
  ["_"]: "Invalid age"
});
```

#### With Objects
```javascript
swish(environment, {
  ["development"]: {
    apiUrl: "http://localhost:3000",
    debug: true
  },
  ["production"]: {
    apiUrl: "https://api.example.com",
    debug: false
  },
  ["_"]: {
    apiUrl: "http://localhost:3000",
    debug: true
  }
});
```

### Refactoring Examples

#### 1. Replacing if-else chains
```javascript
// Before
function getDiscount(user) {
  if (user.isPremium && user.purchaseAmount > 1000) {
    return "30% discount";
  } else if (user.isPremium) {
    return "20% discount";
  } else if (user.purchaseAmount > 1000) {
    return "10% discount";
  } else {
    return "No discount";
  }
}

// After
function getDiscount(user) {
  return swish(user, {
    [user => user.isPremium && user.purchaseAmount > 1000]: "30% discount",
    [user => user.isPremium]: "20% discount",
    [user => user.purchaseAmount > 1000]: "10% discount",
    ["_"]: "No discount"
  });
}
```

#### 2. Replacing multiple ternary operators
```javascript
// Before
const getStatus = (user) => 
  user.isActive ? "Active" :
  user.isPending ? "Pending" :
  user.isBlocked ? "Blocked" :
  "Unknown";

// After
const getStatus = (user) => swish(user, {
  [user => user.isActive]: "Active",
  [user => user.isPending]: "Pending",
  [user => user.isBlocked]: "Blocked",
  ["_"]: "Unknown"
});
```

#### 3. Replacing object lookups with complex conditions
```javascript
// Before
const getConfig = (env) => {
  const configs = {
    development: { debug: true, api: "http://localhost:3000" },
    staging: { debug: true, api: "https://staging-api.example.com" },
    production: { debug: false, api: "https://api.example.com" }
  };
  return configs[env] || configs.development;
};

// After
const getConfig = (env) => swish(env, {
  ["development"]: { debug: true, api: "http://localhost:3000" },
  ["staging"]: { debug: true, api: "https://staging-api.example.com" },
  ["production"]: { debug: false, api: "https://api.example.com" },
  ["_"]: { debug: true, api: "http://localhost:3000" }
});
```

#### 4. Replacing complex validation logic
```javascript
// Before
function validateUser(user) {
  if (!user.email || !user.password) {
    return { isValid: false, error: "Email and password are required" };
  }
  if (user.password.length < 8) {
    return { isValid: false, error: "Password must be at least 8 characters" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    return { isValid: false, error: "Invalid email format" };
  }
  return { isValid: true, error: null };
}

// After
function validateUser(user) {
  return swish(user, {
    [user => !user.email || !user.password]: {
      isValid: false,
      error: "Email and password are required"
    },
    [user => user.password.length < 8]: {
      isValid: false,
      error: "Password must be at least 8 characters"
    },
    [user => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)]: {
      isValid: false,
      error: "Invalid email format"
    },
    ["_"]: { isValid: true, error: null }
  });
}
```

#### 5. Replacing multiple condition checks
```javascript
// Before
function getAccessLevel(user) {
  if (user.isAdmin && user.isVerified) {
    return "Full Access";
  } else if (user.isAdmin) {
    return "Admin Access";
  } else if (user.isVerified) {
    return "Verified Access";
  } else {
    return "Basic Access";
  }
}

// After
function getAccessLevel(user) {
  return swish(user, {
    [user => user.isAdmin && user.isVerified]: "Full Access",
    [user => user.isAdmin]: "Admin Access",
    [user => user.isVerified]: "Verified Access",
    ["_"]: "Basic Access"
  });
}
```

#### 6. Replacing conditional data processing
```typescript
// Before
const processedData: string[] = [];

if (data.isValid) {
  processedData.push(data.value);
}

if (data.hasMetadata) {
  processedData.push(`meta:${data.metadata}`);
}

if (data.hasTags) {
  processedData.push(`tags:${data.tags.join(',')}`);
}

if (data.hasCategories) {
  processedData.push(`categories:${data.categories.join(',')}`);
}

if (data.hasPriority) {
  processedData.push(`priority:${data.priority}`);
}

// After
const processedData = swish(data, {
  [data => data.isValid]: [data.value],
  [data => data.hasMetadata]: [`meta:${data.metadata}`],
  [data => data.hasTags]: [`tags:${data.tags.join(',')}`],
  [data => data.hasCategories]: [`categories:${data.categories.join(',')}`],
  [data => data.hasPriority]: [`priority:${data.priority}`],
  ["_"]: []
}).flat();
```

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Build: `npm run build`

## License

MIT 