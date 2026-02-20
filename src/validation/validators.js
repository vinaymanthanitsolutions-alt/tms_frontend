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

/**
 * Validates project code format (P001, P002, etc.)
 * @param {string} projectCode - The project code to validate
 * @returns {string} - Error message or empty string if valid
 */
export const validateProjectCode = (projectCode) => {
  if (!projectCode || projectCode.trim() === "") {
    return "Project code is required";
  }

  const projectCodeRegex = /^P\d+$/;
  if (!projectCodeRegex.test(projectCode.trim())) {
    return "Project code must start with 'P' followed by numbers (e.g., P001, P1234)";
  }

  return "";
};

/**
 * Validates project title (max 8 words)
 * @param {string} title - The project title to validate
 * @returns {string} - Error message or empty string if valid
 */
export const validateProjectTitle = (title) => {
  if (!title || title.trim() === "") {
    return "Project title is required";
  }

  const wordCount = title.trim().split(/\s+/).length;
  if (wordCount > 8) {
    return "Project title must not exceed 8 words";
  }

  return "";
};

/**
 * Validates project description (minimum 80 words)
 * @param {string} description - The project description to validate
 * @returns {string} - Error message or empty string if valid
 */
export const validateProjectDescription = (description) => {
  if (!description || description.trim() === "") {
    return "Project description is required";
  }

  const wordCount = description.trim().split(/\s+/).length;
  if (wordCount < 80) {
    return `Project description must be at least 80 words (current: ${wordCount} words)`;
  }

  return "";
};

/**
 * Validates project deadline (required and cannot be in the past)
 * @param {string} deadline - The deadline date to validate
 * @returns {string} - Error message or empty string if valid
 */
export const validateProjectDeadline = (deadline) => {
  if (!deadline || deadline.trim() === "") {
    return "Project deadline is required";
  }

  const selectedDate = new Date(deadline);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return "Deadline cannot be in the past";
  }

  return "";
};
