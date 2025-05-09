// Example 1: Basic usage with enum and types
enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

interface User {
  status: Status;
  age: number;
  isPremium: boolean;
  purchaseAmount: number;
}

const getStatusMessage = (status: Status): string => {
  return swish(status, {
    [Status.ACTIVE]: "User is active",
    [Status.INACTIVE]: "User is inactive",
    [Status.PENDING]: "User is pending",
    "_": "Unknown status"
  });
};

// Example 2: With expressions and type checking
const getUserType = (user: User): string => {
  return swish(user.age, {
    "age < 18": "Minor",
    "age >= 18 && age < 65": "Adult",
    "age >= 65": "Senior",
    "_": "Invalid age"
  });
};

// Example 3: With multiple conditions and interfaces
interface Discount {
  percentage: number;
  description: string;
}

const getDiscount = (user: User): Discount => {
  return swish(user, {
    "isPremium && purchaseAmount > 1000": {
      percentage: 30,
      description: "Premium user with large purchase"
    },
    "isPremium": {
      percentage: 20,
      description: "Premium user discount"
    },
    "purchaseAmount > 1000": {
      percentage: 10,
      description: "Large purchase discount"
    },
    "_": {
      percentage: 0,
      description: "No discount available"
    }
  });
}; 