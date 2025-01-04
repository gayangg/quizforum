const length = (value, options = {}) => {
  if (!value) return false;

  const trimmedValue = value.trim();
  if (options.minLength && trimmedValue.length < options.minLength) {
    return false;
  }
  if (options.maxLength && trimmedValue.length > options.maxLength) {
    return false;
  }
  return true;
};

const notEmpty = (value) => {
  return value && value.trim().length > 0;
};

const email = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

const pattern = (value, pattern) => {
  return pattern.test(value.trim());
};

const question = (formData) => {
    const errors = {};

    if (!formData.question_text || formData.question_text.trim() === "") {
        errors.question_text = "Question text must not be empty.";
    }
    const passes = Object.keys(errors).length === 0;
    return [passes, errors];
};

const registration = (email, password) => {
  const errors = {};

  if (!email || !email.includes('@')) {
    errors.email = 'Invalid email address';
  }
  if (!password || password.length < 4) {
    errors.password = 'Password must be at least 4 characters long';
  }
  return errors;
};


export { length, notEmpty, email, pattern, question, registration };