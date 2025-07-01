// File: js/adminDashboard.js
import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors, saveDoctor } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

// Load doctors on page load
document.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();
  document.getElementById("addDocBtn").addEventListener("click", () => openModal("addDoctor"));
  document.getElementById("searchBar").addEventListener("input", filterDoctorsOnChange);
  document.getElementById("filterTime").addEventListener("change", filterDoctorsOnChange);
  document.getElementById("filterSpecialty").addEventListener("change", filterDoctorsOnChange);
});

async function loadDoctorCards() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";
  const doctors = await getDoctors();
  if (doctors.length === 0) {
    contentDiv.innerHTML = "<p>No doctors found.</p>";
    return;
  }
  doctors.forEach(doc => contentDiv.appendChild(createDoctorCard(doc)));
}

async function filterDoctorsOnChange() {
  const name = document.getElementById("searchBar").value;
  const time = document.getElementById("filterTime").value;
  const specialty = document.getElementById("filterSpecialty").value;
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";
  const doctors = await filterDoctors(name, time, specialty);
  if (doctors.length === 0) {
    contentDiv.innerHTML = "<p>No doctors found with the given filters.</p>";
    return;
  }
  doctors.forEach(doc => contentDiv.appendChild(createDoctorCard(doc)));
}

window.adminAddDoctor = async function () {
  const name = document.getElementById("docName").value;
  const email = document.getElementById("docEmail").value;
  const password = document.getElementById("docPassword").value;
  const phone = document.getElementById("docPhone").value;
  const specialty = document.getElementById("docSpecialty").value;
  const availability = [...document.querySelectorAll("input[name='availability']:checked")].map(cb => cb.value);
  const token = localStorage.getItem("token");
  const doctor = { name, email, password, phone, specialization: specialty, availability };

  try {
    const result = await saveDoctor(doctor, token);
    if (result.success) {
      alert("Doctor added successfully.");
      document.getElementById("modal").style.display = "none";
      loadDoctorCards();
    } else {
      alert("Failed to add doctor: " + result.message);
    }
  } catch (error) {
    alert("Error adding doctor.");
  }
};


// doctorDashboard.js
import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";

let selectedDate = new Date().toISOString().split("T")[0];
let token = localStorage.getItem("token");
let patientName = null;

const tableBody = document.getElementById("patientTableBody");

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("todayButton").addEventListener("click", () => {
    selectedDate = new Date().toISOString().split("T")[0];
    document.getElementById("datePicker").value = selectedDate;
    loadAppointments();
  });

  document.getElementById("datePicker").addEventListener("change", e => {
    selectedDate = e.target.value;
    loadAppointments();
  });

  document.getElementById("searchBar").addEventListener("input", e => {
    patientName = e.target.value || "null";
    loadAppointments();
  });

  loadAppointments();
});

async function loadAppointments() {
  try {
    const appointments = await getAllAppointments(selectedDate, patientName, token);
    tableBody.innerHTML = "";
    if (!appointments || appointments.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5">No Appointments found for today.</td></tr>`;
      return;
    }
    appointments.forEach(appointment => tableBody.appendChild(createPatientRow(appointment)));
  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan="5">Error loading appointments.</td></tr>`;
  }
}