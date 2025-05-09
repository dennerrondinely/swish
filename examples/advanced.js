// Example 1: Form validation
const validateForm = (form) => {
  return swish(form, {
    [form => !form.email || !form.password]: {
      isValid: false,
      errors: ["Email and password are required"]
    },
    [form => form.password.length < 8]: {
      isValid: false,
      errors: ["Password must be at least 8 characters"]
    },
    [form => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)]: {
      isValid: false,
      errors: ["Invalid email format"]
    },
    ["_"]: {
      isValid: true,
      errors: []
    }
  });
};

// Example 2: Notification system
const getNotificationMessage = (notification) => {
  return swish(notification, {
    [n => n.type === "error" && n.code === "AUTH_FAILED"]: {
      title: "Authentication Failed",
      message: "Please check your credentials and try again",
      severity: "error"
    },
    [n => n.type === "warning" && n.code === "SESSION_EXPIRED"]: {
      title: "Session Expired",
      message: "Your session has expired. Please login again",
      severity: "warning"
    },
    [n => n.type === "success" && n.code === "PAYMENT_SUCCESS"]: {
      title: "Payment Successful",
      message: "Your payment has been processed successfully",
      severity: "success"
    },
    ["_"]: {
      title: "Notification",
      message: notification.message || "Something happened",
      severity: notification.type || "info"
    }
  });
};

// Example 3: Permission system
const checkPermission = (user, resource, action) => {
  return swish([user.role, resource, action].join(':'), {
    ["admin:*:*"]: true,
    ["manager:reports:*"]: true,
    ["editor:content:read"]: true,
    [key => key === `user:profile:edit` && user.id === resource.id]: true,
    ["_"]: false
  });
};

// Example 4: Cache system
const getCacheStrategy = (request) => {
  return swish(request, {
    [req => req.method === "GET" && req.path.startsWith("/api/public")]: {
      strategy: "public",
      maxAge: 3600,
      staleWhileRevalidate: true
    },
    [req => req.method === "GET" && req.path.startsWith("/api/private")]: {
      strategy: "private",
      maxAge: 300,
      staleWhileRevalidate: false
    },
    [req => req.method === "GET" && req.path.startsWith("/static")]: {
      strategy: "static",
      maxAge: 86400,
      staleWhileRevalidate: true
    },
    ["_"]: {
      strategy: "no-cache",
      maxAge: 0,
      staleWhileRevalidate: false
    }
  });
};

// Example 5: Routing system
const getRouteHandler = (request) => {
  return swish([request.method, request.path].join(' '), {
    ["GET /api/users"]: handleGetUsers,
    ["POST /api/users"]: handleCreateUser,
    [path => path.match(/^PUT \/api\/users\/\d+$/)]: handleUpdateUser,
    [path => path.match(/^DELETE \/api\/users\/\d+$/)]: handleDeleteUser,
    ["_"]: handleNotFound
  });
};

// Example 6: Internationalization system
const getTranslation = (key, language, fallback = "en") => {
  return swish([language, key].join(':'), {
    [key => key.startsWith("pt:") && translations.pt[key.split(':')[1]]]: translations.pt[key.split(':')[1]],
    [key => key.startsWith("es:") && translations.es[key.split(':')[1]]]: translations.es[key.split(':')[1]],
    [key => key.startsWith("fr:") && translations.fr[key.split(':')[1]]]: translations.fr[key.split(':')[1]],
    [key => translations[fallback][key.split(':')[1]]]: translations[fallback][key.split(':')[1]],
    ["_"]: key.split(':')[1]
  });
};

// Example 7: Data validation system
const validateData = (data, schema) => {
  return swish([schema.type, typeof data].join(':'), {
    ["string:string"]: {
      isValid: true,
      error: null
    },
    ["number:number"]: {
      isValid: true,
      error: null
    },
    ["boolean:boolean"]: {
      isValid: true,
      error: null
    },
    ["array:object"]: {
      isValid: Array.isArray(data),
      error: Array.isArray(data) ? null : "Expected array"
    },
    ["object:object"]: {
      isValid: !Array.isArray(data),
      error: !Array.isArray(data) ? null : "Expected object"
    },
    ["_"]: {
      isValid: false,
      error: `Expected ${schema.type}`
    }
  });
};

// Example 8: Logging system
const getLogLevel = (error) => {
  return swish(error.constructor.name, {
    ["NetworkError"]: "error",
    ["ValidationError"]: "warn",
    ["BusinessError"]: "info",
    ["SecurityError"]: "error",
    ["_"]: "debug"
  });
};

// Example 9: Rate limiting system
const getRateLimit = (request) => {
  return swish(request.path, {
    [path => path.startsWith("/api/public")]: {
      limit: 100,
      window: 3600
    },
    [path => path.startsWith("/api/private")]: {
      limit: 50,
      window: 3600
    },
    [path => path.startsWith("/api/admin")]: {
      limit: 1000,
      window: 3600
    },
    ["_"]: {
      limit: 10,
      window: 3600
    }
  });
};

// Example 10: Feature flags system
const isFeatureEnabled = (feature, user) => {
  return swish([feature, user].join(':'), {
    ["beta:*"]: user.isBetaTester,
    ["premium:*"]: user.isPremium,
    ["admin:*"]: user.isAdmin,
    ["experimental:*"]: user.isDeveloper,
    ["_"]: false
  });
}; 