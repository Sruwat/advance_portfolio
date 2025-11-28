/**
 * Configuration for Form Submission System
 * Update these values if you change your server setup
 */

export const CONFIG = {
  // API Base URL - Change this if you move to a different server
  API_BASE_URL: process.env.VITE_API_URL || 'http://localhost:5000/api',

  // Form Settings
  FORMS: {
    CONTACT: {
      ENABLED: true,
      REQUIRED_FIELDS: ['name', 'email', 'message'],
      AUTO_CLEAR_ON_SUCCESS: true,
      SUCCESS_MESSAGE_DURATION: 2000, // milliseconds
    },
    HIRE_ME: {
      ENABLED: true,
      REQUIRED_FIELDS: ['name', 'email', 'company'],
      AUTO_CLEAR_ON_SUCCESS: true,
      SUCCESS_MESSAGE_DURATION: 2000, // milliseconds
    },
  },

  // Admin Dashboard Settings
  ADMIN: {
    AUTO_REFRESH_INTERVAL: 30000, // milliseconds
    ADMIN_URL: 'http://localhost/portfolio/backend/admin.html',
  },

  // Export Settings
  EXPORT: {
    FILENAME_PREFIX: 'portfolio_submissions',
    FORMAT: 'csv', // Only CSV is currently supported
  },

  // Validation Rules
  VALIDATION: {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MAX_EMAIL_LENGTH: 255,
    MAX_SUBJECT_LENGTH: 200,
    MAX_MESSAGE_LENGTH: 5000,
    MAX_COMPANY_LENGTH: 100,
    MAX_POSITION_LENGTH: 100,
    MAX_BUDGET_LENGTH: 50,
    MAX_TIMELINE_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 5000,
  },
};

export default CONFIG;
