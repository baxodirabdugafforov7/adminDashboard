# 📊 Business Analytics Dashboard – Backend

This is the **Spring Boot** backend service for the **Business Analytics Dashboard** project. It provides a RESTful API for managing sales data, performing CRUD operations, and powering data visualizations on the frontend.

---

## 🚀 Features

- RESTful API with full CRUD (Create, Read, Update, Delete) for sales records.
- In-memory H2 database for quick setup and testing.
- CORS-enabled API for frontend-backend communication.
- Auto-generated JSON responses for frontend charts and tables.
- Organized project structure following Spring Boot best practices.

---

## 📁 Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com.example.dashboard/
│   │       ├── controller/     → REST controllers (e.g., SalesController.java)
│   │       ├── model/          → Data model/entity classes (e.g., Sale.java)
│   │       ├── repository/     → JPA repositories (e.g., SaleRepository.java)
│   │       └── DashboardApplication.java
│   └── resources/
│       ├── application.properties
│       └── data.sql            → Optional: Initial data load
```

---

## ⚙️ Getting Started

### Prerequisites

- Java 17+
- Maven

### Running the Application

```bash
# Build and run the project
./mvnw spring-boot:run
```

The server will start at: `http://localhost:8081`

### H2 Console

To view your in-memory database, go to:

```
http://localhost:8081/h2-console
```

- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: *(leave blank)*

---

## 🌐 API Endpoints

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| GET    | /api/sales     | List all sales records   |
| POST   | /api/sales     | Create new sales record  |
| PUT    | /api/sales/{id}| Update existing record   |
| DELETE | /api/sales/{id}| Delete a record by ID    |

---

## 📦 Dependencies

- Spring Boot
- Spring Web
- Spring Data JPA
- H2 Database
- Lombok (for cleaner code)

---

## 🧠 Future Improvements

- PostgreSQL or MySQL integration
- User authentication (JWT)
- Advanced filtering and reporting
- Docker support

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
