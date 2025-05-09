// Example 1: Basic usage with enum
const Status = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending'
};

const getStatusMessage = (status) => {
  return swish(status, {
    [Status.ACTIVE]: "User is active",
    [Status.INACTIVE]: "User is inactive",
    [Status.PENDING]: "User is pending",
    ["_"]: "Unknown status"
  });
};

// Example 2: With expressions
const getUserType = (user) => {
  return swish(user.age, {
    [age => age < 18]: "Minor",
    [age => age >= 18 && age < 65]: "Adult",
    [age => age >= 65]: "Senior",
    ["_"]: "Invalid age"
  });
};

// Example 3: With multiple conditions
const getDiscount = (user) => {
  return swish(user, {
    [user => user.isPremium && user.purchaseAmount > 1000]: "30% discount",
    [user => user.isPremium]: "20% discount",
    [user => user.purchaseAmount > 1000]: "10% discount",
    ["_"]: "No discount"
  });
};

// Example 4: With functions
const calculateTax = (income) => {
  return swish(income, {
    [income => income <= 1000]: income * 0.05,
    [income => income <= 5000]: income * 0.10,
    [income => income <= 10000]: income * 0.15,
    ["_"]: income * 0.20
  });
};

// Example 5: With strings
const getGreeting = (language) => {
  return swish(language, {
    ["pt"]: "Olá!",
    ["en"]: "Hello!",
    ["es"]: "¡Hola!",
    ["_"]: "Hi!"
  });
};

// Example 6: With objects
const getConfig = (environment) => {
  return swish(environment, {
    ["development"]: {
      apiUrl: "http://localhost:3000",
      debug: true,
      logLevel: "verbose"
    },
    ["staging"]: {
      apiUrl: "https://staging-api.example.com",
      debug: true,
      logLevel: "info"
    },
    ["production"]: {
      apiUrl: "https://api.example.com",
      debug: false,
      logLevel: "error"
    },
    ["_"]: {
      apiUrl: "http://localhost:3000",
      debug: false,
      logLevel: "error"
    }
  });
};

// Example 7: With arrays
const getFirstItem = (array) => {
  return swish(array.length, {
    [0]: null,
    [1]: array[0],
    ["_"]: array[0]
  });
};

// Example 8: With logical operators
const getAccessLevel = (user) => {
  return swish(user, {
    [user => user.isAdmin && user.isVerified]: "Full Access",
    [user => user.isAdmin]: "Admin Access",
    [user => user.isVerified]: "Verified Access",
    ["_"]: "Basic Access"
  });
};

// Example 9: With dates
const getTimeOfDay = () => {
  const hour = new Date().getHours();
  return swish(hour, {
    [hour => hour >= 5 && hour < 12]: "Morning",
    [hour => hour >= 12 && hour < 18]: "Afternoon",
    [hour => hour >= 18 && hour < 22]: "Evening",
    ["_"]: "Night"
  });
};

// Example 10: With regex
const validateEmail = (email) => {
  return swish(email, {
    [email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)]: "Valid email",
    ["_"]: "Invalid email"
  });
}; 