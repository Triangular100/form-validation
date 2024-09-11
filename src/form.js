function validateEmail() {
  const input = document.getElementById('email');
  const error = document.getElementById('email-error');
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  input.classList.add('interacted');

  if (input.validity.typeMismatch) {
    error.textContent = 'Please enter a valid email address.';
    error.classList.add('show');
  } else if (input.validity.valueMissing) {
    error.textContent = 'Email address is required.';
    error.classList.add('show');
  } else if (!emailRegex.test(input.value)) {
    input.setCustomValidity('Please enter a valid email address.');
    error.textContent = 'Please enter a valid email address.';
    error.classList.add('show');
  } else {
    input.setCustomValidity('');
    error.textContent = '';
    error.classList.remove('show');
  }
}

function addValidateEmailEvent() {
  const emailInput = document.getElementById('email');
  emailInput.addEventListener('blur', () => validateEmail());
}

function validateCountry() {
  const input = document.getElementById('country');
  const error = document.getElementById('country-error');
  input.classList.add('interacted');

  if (input.validity.valueMissing) {
    error.textContent = 'Country is required.';
    error.classList.add('show');
  } else {
    error.textContent = '';
    error.classList.remove('show');
  }
}

function addValidateCountryEvent() {
  const countryInput = document.getElementById('country');
  countryInput.addEventListener('change', () => validateCountry());
}

function validateZip() {
  const input = document.getElementById('zip');
  const error = document.getElementById('zip-error');
  // Can be massively improved
  // For the sake of this project, will just validate zip is 5 digits
  const zipRegex = /^\d{5}$/;

  input.classList.add('interacted');

  if (input.validity.valueMissing) {
    error.textContent = 'Zip code is required.';
    error.classList.add('show');
  } else if (!zipRegex.test(Number(input.value))) {
    input.setCustomValidity('Please enter a valid zip code.');
    error.textContent = 'Please enter a valid zip code.';
    error.classList.add('show');
  } else {
    input.setCustomValidity('');
    error.textContent = '';
    error.classList.remove('show');
  }
}

function addValidateZipEvent() {
  const zipInput = document.getElementById('zip');
  zipInput.addEventListener('blur', () => validateZip());
}

function validatePasswordConfirmation(checkInteracted = false) {
  const confPassInput = document.getElementById('confirm-password');
  if (checkInteracted && !confPassInput.classList.contains('interacted')) {
    return;
  }

  const passInput = document.getElementById('password');
  const error = document.getElementById('confirm-password-error');

  confPassInput.classList.add('interacted');

  if (confPassInput.validity.valueMissing) {
    error.textContent = 'Password is required.';
    error.classList.add('show');
    return;
  }
  if (passInput.value !== confPassInput.value) {
    passInput.setCustomValidity('Passwords must match.');
    confPassInput.setCustomValidity('Passwords must match.');
    error.textContent = 'Passwords must match.';
    error.classList.add('show');
  } else {
    passInput.setCustomValidity('');
    confPassInput.setCustomValidity('');
    error.textContent = '';
    error.classList.remove('show');
  }
}

function validatePassword() {
  const input = document.getElementById('password');
  const error = document.getElementById('password-error');
  const hasDigitRegex = /\d/;
  const hasCapitalRegex = /[A-Z]/;
  const hasLowerCaseRegex = /[a-z]/;

  input.classList.add('interacted');

  if (input.validity.valueMissing) {
    error.textContent = 'Password is required.';
    error.classList.add('show');
  } else if (input.validity.tooShort) {
    input.setCustomValidity('Password must be at least 8 characters long.');
    error.textContent = 'Password must be at least 8 characters long.';
    error.classList.add('show');
  } else if (!hasDigitRegex.test(input.value)) {
    input.setCustomValidity('Password must have at least one number.');
    error.textContent = 'Password must have at least one number.';
    error.classList.add('show');
  } else if (!hasCapitalRegex.test(input.value)) {
    input.setCustomValidity(
      'Password must have at least one uppercase letter.'
    );
    error.textContent = 'Password must have at least one uppercase letter.';
    error.classList.add('show');
  } else if (!hasLowerCaseRegex.test(input.value)) {
    input.setCustomValidity(
      'Password must have at least one lowercase letter.'
    );
    error.textContent = 'Password must have at least one lowercase letter.';
    error.classList.add('show');
  } else {
    input.setCustomValidity('');
    error.textContent = '';
    error.classList.remove('show');
  }

  validatePasswordConfirmation(true);
}

function validatePasswordAndConfirmationPassword() {
  validatePassword();
  validatePasswordConfirmation();
}

function addValidatePasswordEvent() {
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  passwordInput.addEventListener('blur', () => validatePassword());
  confirmPasswordInput.addEventListener('blur', () =>
    validatePasswordConfirmation()
  );
}

function validateForm() {
  validateEmail();
  validateCountry();
  validateZip();
  validatePasswordAndConfirmationPassword();
}

function addValidateFormEvent() {
  const form = document.getElementById('form-validation');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateForm();
  });
}

export default function addValidateFormEvents() {
  addValidateEmailEvent();
  addValidateCountryEvent();
  addValidateZipEvent();
  addValidatePasswordEvent();
  addValidateFormEvent();
}
