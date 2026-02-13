/**
 * Validates email format
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength
 * @param {string} password - The password to validate
 * @returns {object} - Object with isValid and errors array
 */
export const validatePassword = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push(
      "Password must contain at least one special character (!@#$%^&*)",
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validates employee code format
 * @param {string} employeeCode - The employee code to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateEmployeeCode = (employeeCode) => {
  const code = String(employeeCode).trim();
  return /^[A-Za-z]{3}\d{3,5}$/.test(code);
};

/**
 * Validates phone number format
 * @param {string} phoneNumber - The phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validatePhoneNumber = (phoneNumber) => {
  const phone = String(phoneNumber).trim();
  // Must have exactly 10 digits and first digit should be 6 or greater
  return /^[6-9]\d{9}$/.test(phone);
};

export const validateTeamId = (teamId) => {
  const id = String(teamId).trim();
  return /^T\d{3,5}$/.test(id);
};