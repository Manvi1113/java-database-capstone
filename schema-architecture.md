This Spring Boot application uses both MVC and REST controllers. Thymeleaf templates are used for the Admin and Doctor dashboards, while REST APIs serve all other modules. The application interacts with two databases—MySQL (for patient, doctor, appointment, and admin data) and MongoDB (for prescriptions). All controllers route requests through a common service layer, which in turn delegates to the appropriate repositories. MySQL uses JPA entities while MongoDB uses document models.


User accesses the Admin Dashboard or Appointment pages.

The action is routed to the appropriate Thymeleaf or REST controller.

The controller calls the service layer.

The service layer applies business logic and coordinates processing.

Data is retrieved from or saved to MySQL or MongoDB via the corresponding repository.

The service layer returns the result to the controller.

The controller renders a Thymeleaf page or sends a REST response.