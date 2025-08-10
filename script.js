/* 
 Sweet Treats Bakery 
 Interactive & Animated JavaScript
*/

// GLOBAL variable for spinner state
let spinnerActive = false;

/* ----- Animation Control Functions ----- */

// Toggle flip animation on treat box
function toggleFlip(elementId) {
  const box = document.getElementById(elementId);
  box.classList.toggle('flipped');
  return box.classList.contains('flipped'); // returns true if flipped
}

// Start spinner animation by showing spinner element
function startSpinner(spinnerId) {
  if (spinnerActive) return false; // already spinning
  const spinner = document.getElementById(spinnerId);
  spinner.classList.remove('hidden');
  spinnerActive = true;
  return true;
}

// Stop spinner animation by hiding spinner element
function stopSpinner(spinnerId) {
  if (!spinnerActive) return false; // already stopped
  const spinner = document.getElementById(spinnerId);
  spinner.classList.add('hidden');
  spinnerActive = false;
  return true;
}

// Show popup with animation by adding class
function showPopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.classList.add('show');
  popup.classList.remove('hidden');
  return true;
}

// Hide popup with animation by removing class
function hidePopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.classList.remove('show');
  // Delay adding hidden so animation can finish
  setTimeout(() => popup.classList.add('hidden'), 400);
  return true;
}

/* ----- Dropdown Menu ----- */

const dropdownBtn = document.getElementById('dropdown-btn');
const dropdownMenu = document.getElementById('dropdown-menu');

dropdownBtn.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});

// Close dropdown if clicking outside
window.addEventListener('click', (e) => {
  if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.remove('show');
  }
});

/* ----- Tabbed Interface ----- */

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active from all buttons and update aria-selected
    tabButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
      const day = b.dataset.day;
      document.getElementById('tab-' + day).classList.add('hidden');
    });

    // Activate clicked button & show corresponding content
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const day = btn.dataset.day;
    document.getElementById('tab-' + day).classList.remove('hidden');
  });
});

/* ----- FAQ Collapsible with Smooth Animation ----- */

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const expanded = button.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      answer.style.maxHeight = null;
      button.setAttribute('aria-expanded', 'false');
      answer.setAttribute('aria-hidden', 'true');
    } else {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      button.setAttribute('aria-expanded', 'true');
      answer.setAttribute('aria-hidden', 'false');
    }
  });
});

/* ----- Live Character Counter for Contact Message ----- */

const messageInput = document.getElementById('message');
const charCount = document.getElementById('char-count');

messageInput.addEventListener('input', () => {
  const currentLength = messageInput.value.length;
  charCount.textContent = `${currentLength}/500`;
});

/* ----- Contact Form Validation ----- */

const form = document.getElementById('contact-form');

form.addEventListener('submit', e => {
  e.preventDefault(); // Prevent reload

  clearErrors();
  document.getElementById('form-success').textContent = '';

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  let isValid = true;

  // Name: required, min 2 chars
  if (nameInput.value.trim().length < 2) {
    showError('name-error', 'Please enter your name (at least 2 characters).');
    isValid = false;
  }

  // Email: simple regex check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    showError('email-error', 'Please enter a valid email address.');
    isValid = false;
  }

  // Message: required, min 10 chars
  if (messageInput.value.trim().length < 10) {
    showError('message-error', 'Message should be at least 10 characters.');
    isValid = false;
  }

  if (isValid) {
    document.getElementById('form-success').textContent = 'Thank you for reaching out! We will get back to you soon.';
    form.reset();
    charCount.textContent = '0/500';
  }
});

function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.error').forEach(el => el.textContent = '');
}

/* ----- Back to Top Button ----- */

const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    backToTopBtn.classList.add('show');
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.classList.remove('show');
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ----- Other Event Listeners ----- */

// Flip button
document.getElementById('flip-btn').addEventListener('click', () => {
  const isFlipped = toggleFlip('treat-box');
});

// Treat box click flip for accessibility
document.getElementById('treat-box').addEventListener('click', () => {
  toggleFlip('treat-box');
});

// Keyboard accessibility: flip treat box on Enter or Space when focused
document.getElementById('treat-box').addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleFlip('treat-box');
  }
});

// Spinner control buttons
document.getElementById('spinner-start').addEventListener('click', () => {
  startSpinner('spinner');
});
document.getElementById('spinner-stop').addEventListener('click', () => {
  stopSpinner('spinner');
});

// Popup controls
document.getElementById('popup-btn').addEventListener('click', () => {
  showPopup('popup');
});
document.getElementById('popup-close').addEventListener('click', () => {
  hidePopup('popup');
});
