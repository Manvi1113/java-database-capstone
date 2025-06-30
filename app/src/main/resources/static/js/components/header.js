function renderHeader() {
    const headerDiv = document.getElementById("header");
  
    if (window.location.pathname.endsWith("/")) {
      localStorage.removeItem("userRole");
      localStorage.removeItem("token");
    }
  
    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");
  
    if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
      localStorage.removeItem("userRole");
      alert("Session expired or invalid login. Please log in again.");
      window.location.href = "/";
      return;
    }
  
    let headerContent = `<nav class="header"><div class="nav-left"><a href="/">ClinicSys</a></div><div class="nav-right">`;
  
    if (role === "admin") {
      headerContent += `
        <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
        <a href="#" id="logoutBtn">Logout</a>`;
    } else if (role === "doctor") {
      headerContent += `<a href="/doctor/dashboard">Home</a> <a href="#" id="logoutBtn">Logout</a>`;
    } else if (role === "patient") {
      headerContent += `<a href="/login">Login</a> <a href="/signup">Sign Up</a>`;
    } else if (role === "loggedPatient") {
      headerContent += `<a href="/patient/dashboard">Home</a> <a href="/appointments">Appointments</a> <a href="#" id="logoutPatientBtn">Logout</a>`;
    }
  
    headerContent += `</div></nav>`;
    headerDiv.innerHTML = headerContent;
  
    attachHeaderButtonListeners();
  }
  
  function attachHeaderButtonListeners() {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", logout);
    }
  
    const logoutPatientBtn = document.getElementById("logoutPatientBtn");
    if (logoutPatientBtn) {
      logoutPatientBtn.addEventListener("click", logoutPatient);
    }
  }
  
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/";
  }
  
  function logoutPatient() {
    localStorage.removeItem("token");
    localStorage.setItem("userRole", "patient");
    window.location.href = "/patient/dashboard";
  }
  
  renderHeader();
  