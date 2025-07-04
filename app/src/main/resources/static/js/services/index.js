// Import required modules
import { openModal } from '../components/modals.js';
import { API_BASE_URL } from '../config/config.js';
import { selectRole } from '../render.js';

// Define API endpoints
const ADMIN_API = `${API_BASE_URL}/admin`;
const DOCTOR_API = `${API_BASE_URL}/doctor/login`;

// Setup button event listeners
window.onload = function () {
  const adminBtn = document.getElementById('adminLogin');
  const doctorBtn = document.getElementById('doctorLogin');

  if (adminBtn) {
    adminBtn.addEventListener('click', () => {
      openModal('adminLogin');
    });
  }

  if (doctorBtn) {
    doctorBtn.addEventListener('click', () => {
      openModal('doctorLogin');
    });
  }
};

// Admin login handler
window.adminLoginHandler = async function () {
  const username = document.getElementById('adminUsername')?.value;
  const password = document.getElementById('adminPassword')?.value;

  if (!username || !password) {
    alert('Please enter both username and password.');
    return;
  }

  const admin = { username, password };

  try {
    const response = await fetch(ADMIN_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(admin)
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      selectRole('admin');
    } else {
      alert('Invalid credentials!');
    }
  } catch (error) {
    console.error('Admin login error:', error);
    alert('Something went wrong. Please try again.');
  }
};

// Doctor login handler
window.doctorLoginHandler = async function () {
  const email = document.getElementById('doctorEmail')?.value;
  const password = document.getElementById('doctorPassword')?.value;

  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  const doctor = { email, password };

  try {
    const response = await fetch(DOCTOR_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctor)
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      selectRole('doctor');
    } else {
      alert('Invalid credentials!');
    }
  } catch (error) {
    console.error('Doctor login error:', error);
    alert('Something went wrong. Please try again.');
  }
};
