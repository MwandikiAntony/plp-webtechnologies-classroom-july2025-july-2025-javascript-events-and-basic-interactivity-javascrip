// ------------------------------
// Part 1: Event Handling & DOM Selection
// ------------------------------
const modeToggleBtn = document.getElementById('modeToggle');
const body = document.body;

const faqQuestions = document.querySelectorAll('.faq-question');

const userForm = document.getElementById('userForm');
const formMessage = document.getElementById('formMessage');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// ------------------------------
// Part 2: Interactive Elements
// ------------------------------

// 1. Dark Mode Toggle
modeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  modeToggleBtn.textContent = body.classList.contains('dark-mode') 
    ? 'Switch to Light Mode' 
    : 'Switch to Dark Mode';
});

// 2. Collapsible FAQ
faqQuestions.forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    answer.classList.toggle('active');
  });
});

// ------------------------------
// Part 3: Custom Form Validation
// ------------------------------

// Helper function to show error
function showError(input, message) {
  const errorElem = input.nextElementSibling;
  errorElem.textContent = message;
  input.classList.add('invalid');
}

// Helper function to clear error
function clearError(input) {
  const errorElem = input.nextElementSibling;
  errorElem.textContent = '';
  input.classList.remove('invalid');
}

// Validate Name: Required, at least 3 chars
function validateName() {
  const name = nameInput.value.trim();
  if (name.length < 3) {
    showError(nameInput, 'Name must be at least 3 characters.');
    return false;
  }
  clearError(nameInput);
  return true;
}

// Validate Email: basic email regex
function validateEmail() {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError(emailInput, 'Please enter a valid email.');
    return false;
  }
  clearError(emailInput);
  return true;
}

// Validate Password: at least 6 chars, one number
function validatePassword() {
  const pwd = passwordInput.value;
  const pwdRegex = /^(?=.*[0-9]).{6,}$/;
  if (!pwdRegex.test(pwd)) {
    showError(passwordInput, 'Password must be 6+ chars and contain a number.');
    return false;
  }
  clearError(passwordInput);
  return true;
}

// Real-time validation feedback
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

// Handle form submission
userForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (isNameValid && isEmailValid && isPasswordValid) {
    formMessage.style.color = 'green';
    formMessage.textContent = 'Registration successful! 🎉';
    userForm.reset();
  } else {
    formMessage.style.color = 'red';
    formMessage.textContent = 'Please fix errors before submitting.';
  }
});
