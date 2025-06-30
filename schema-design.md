# Smart Clinic System - Database Schema Design

---

## 🗃️ MySQL Database Design

The relational database (MySQL) is used to store structured and transactional data such as patients, doctors, appointments, and admin accounts.

### 1. `patients` Table
| Column Name     | Data Type        | Constraints                      |
|------------------|------------------|----------------------------------|
| patient_id       | INT              | PRIMARY KEY, AUTO_INCREMENT      |
| name             | VARCHAR(100)     | NOT NULL                         |
| email            | VARCHAR(100)     | UNIQUE, NOT NULL                 |
| password         | VARCHAR(255)     | NOT NULL                         |
| phone            | VARCHAR(15)      | NOT NULL                         |
| created_at       | DATETIME         | DEFAULT CURRENT_TIMESTAMP        |

### 2. `doctors` Table
| Column Name     | Data Type        | Constraints                      |
|------------------|------------------|----------------------------------|
| doctor_id        | INT              | PRIMARY KEY, AUTO_INCREMENT      |
| name             | VARCHAR(100)     | NOT NULL                         |
| specialization   | VARCHAR(100)     | NOT NULL                         |
| email            | VARCHAR(100)     | UNIQUE, NOT NULL                 |
| phone            | VARCHAR(15)      | NOT NULL                         |
| availability     | BOOLEAN          | DEFAULT TRUE                     |

### 3. `appointments` Table
| Column Name     | Data Type        | Constraints                                |
|------------------|------------------|--------------------------------------------|
| appointment_id   | INT              | PRIMARY KEY, AUTO_INCREMENT                |
| patient_id       | INT              | FOREIGN KEY REFERENCES `patients`(patient_id) ON DELETE CASCADE |
| doctor_id        | INT              | FOREIGN KEY REFERENCES `doctors`(doctor_id) ON DELETE CASCADE  |
| appointment_time | DATETIME         | NOT NULL                                   |
| status           | ENUM('booked', 'completed', 'cancelled') | DEFAULT 'booked' |

### 4. `admin` Table
| Column Name     | Data Type        | Constraints                      |
|------------------|------------------|----------------------------------|
| admin_id         | INT              | PRIMARY KEY, AUTO_INCREMENT      |
| username         | VARCHAR(50)      | UNIQUE, NOT NULL                 |
| password         | VARCHAR(255)     | NOT NULL                         |
| email            | VARCHAR(100)     | NOT NULL                         |

> ⚙️ **Design Justification**:
- Appointments table uses foreign keys to link patients and doctors.
- ENUM is used for appointment status for better data integrity.
- Email is unique across users to prevent duplicate accounts.

---

## 🍃 MongoDB Collection Design

MongoDB is used for unstructured or semi-structured data. In this system, prescriptions are stored as JSON documents to allow flexibility.

### 🗂️ Collection: `prescriptions`

#### Sample Document:
```json
{
  "prescription_id": "RX20240601",
  "patient_id": 12,
  "doctor_id": 5,
  "date": "2025-06-30T10:30:00Z",
  "medications": [
    {
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "3 times a day"
    },
    {
      "name": "Paracetamol",
      "dosage": "650mg",
      "frequency": "2 times a day"
    }
  ],
  "notes": "Take after meals. Follow up in 5 days."
}
