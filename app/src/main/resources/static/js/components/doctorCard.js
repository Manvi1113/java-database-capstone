import { deleteDoctor } from "../services/doctorServices.js";
import { getPatientData } from "../services/patientServices.js";
import { showBookingOverlay } from "./modals.js";

export function createDoctorCard(doctor) {
  const card = document.createElement("div");
  card.classList.add("doctor-card");

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("doctor-info");

  const name = document.createElement("h3");
  name.textContent = doctor.name;

  const specialization = document.createElement("p");
  specialization.textContent = "Specialty: " + doctor.specialty;

  const email = document.createElement("p");
  email.textContent = "Email: " + doctor.email;

  const availability = document.createElement("p");
  availability.textContent = "Available: " + doctor.availability.join(", ");

  infoDiv.append(name, specialization, email, availability);

  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("card-actions");

  const role = localStorage.getItem("userRole");

  if (role === "admin") {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";
    removeBtn.addEventListener("click", async () => {
      const token = localStorage.getItem("token");
      if (confirm("Are you sure you want to delete this doctor?")) {
        await deleteDoctor(doctor.id, token);
        card.remove();
      }
    });
    actionsDiv.appendChild(removeBtn);
  } else if (role === "patient") {
    const bookBtn = document.createElement("button");
    bookBtn.textContent = "Book Now";
    bookBtn.addEventListener("click", () => {
      alert("Please login to book an appointment.");
    });
    actionsDiv.appendChild(bookBtn);
  } else if (role === "loggedPatient") {
    const bookBtn = document.createElement("button");
    bookBtn.textContent = "Book Now";
    bookBtn.addEventListener("click", async (e) => {
      const token = localStorage.getItem("token");
      const patientData = await getPatientData(token);
      showBookingOverlay(e, doctor, patientData);
    });
    actionsDiv.appendChild(bookBtn);
  }

  card.append(infoDiv, actionsDiv);
  return card;
}
