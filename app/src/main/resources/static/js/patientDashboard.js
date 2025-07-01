import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";
import { patientLogin, patientSignup } from "./services/patientServices.js";

document.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();

  document.getElementById("patientSignup")?.addEventListener("click", () => openModal("patientSignup"));
  document.getElementById("patientLogin")?.addEventListener("click", () => openModal("patientLogin"));

  document.getElementById("searchBar").addEventListener("input", filterDoctorsOnChange);
  document.getElementById("filterTime").addEventListener("change", filterDoctorsOnChange);
  document.getElementById("filterSpecialty").addEventListener("change", filterDoctorsOnChange);
});

async function loadDoctorCards() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";
  const doctors = await getDoctors();
  if (doctors.length === 0) {
    contentDiv.innerHTML = "<p>No doctors available.</p>";
    return;
  }
  doctors.forEach(doc => contentDiv.appendChild(createDoctorCard(doc)));
}

async function filterDoctorsOnChange() {
  const name = document.getElementById("searchBar").value;
  const time = document.getElementById("filterTime").value;
  const specialty = document.getElementById("filterSpecialty").value;
  const contentDiv = document.getElementById("content");
  const doctors = await filterDoctors(name, time, specialty);
  contentDiv.innerHTML = "";
  if (doctors.length === 0) {
    contentDiv.innerHTML = "<p>No doctors found with the given filters.</p>";
    return;
  }
  doctors.forEach(doc => contentDiv.appendChild(createDoctorCard(doc)));
}

window.signupPatient = async function () {
  const data = {
    name: document.getElementById("signupName").value,
    email: document.getElementById("signupEmail").value,
    password: document.getElementById("signupPassword").value,
    phone: document.getElementById("signupPhone").value,
    address: document.getElementById("signupAddress").value,
  };
  const result = await patientSignup(data);
  if (result.success) {
    alert("Signup successful!");
    document.getElementById("modal").style.display = "none";
    location.reload();
  } else {
    alert("Signup failed: " + result.message);
  }
};

window.loginPatient = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const response = await patientLogin({ email, password });
  if (response?.ok) {
    const result = await response.json();
    localStorage.setItem("token", result.token);
    localStorage.setItem("role", "patient");
    location.href = "loggedPatientDashboard.html";
  } else {
    alert("Invalid credentials");
  }
};
