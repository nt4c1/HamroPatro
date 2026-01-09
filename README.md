# 🏫 School Management REST API

A simple **Node.js + Express + PostgreSQL** RESTful service to manage **Students, Teachers, Classes, and Subjects** for a hypothetical school.

This project demonstrates:

* REST API design
* Relational data modeling
* Sequelize ORM usage
* Role-based access control (dummy header-based)
* Aggregation & dashboard APIs

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **Sequelize ORM**
* **pg** (PostgreSQL driver)

---

## 📁 Project Structure

```
HamroPatro/
│
├── src/
│   ├── app.js                  # App entry point
│   ├── db.js                   # Sequelize DB connection
│   ├── seed.js                 # Seed teachers, subjects, students
│   │
│   ├── models/
│   │   ├── s.model.js
│   │   ├── t.model.js
│   │   └── ta.model.js
│   │
│   ├── routes/
│   │   ├── s.routes.js
│   │   ├── t.routes.js
│   │   ├── dashboard.js
│   │   └── stats.js
│   │
│   └── middleware/
│       └── role.js         # X-Role header validation
│
├── package.json
└── README.md
```

---

## 🧩 Data Model

### Student (s) Table (Strict – 5 Columns Only)

| Field          | Description              |
| -------------- | ------------------------ |
| name           | Student name             |
| classNumber    | Class number (e.g. 1, 2) |
| section        | Section (A, B, etc.)     |
| rollNumber     | Roll number              |
| contactDetails | Phone / contact info     |

> ⚠️ Only **teachers** are allowed to modify student data.

---

### Teacher (t) & Teaching Assignment (ta)

A teacher can teach **multiple subjects across multiple classes & sections**.

This is normalized using a separate **TeachingAssignment** table:

```js
t → ta ← Class + Section + Subject
```

**Why normalization?**

* Avoids data duplication
* Enables aggregation & dashboard queries
* Scales better than JSON storage

---

## 🔐 Authorization (Dummy Role Check)

This project uses a **very simple (just-role) authorization check** via request headers.

There is **no authentication system** (no login, no JWT). The middleware only checks the role value.

### Required Header

```
X-Role: teacher
```

* If `X-Role` is exactly `teacher` → student write operations are allowed
* Any other value or missing header → `403 Forbidden`

> This approach is intentionally minimal to demonstrate **role-based access control logic**, not security.

---

## 🚀 Running the Project

### 1️⃣ Install Dependencies

```bash
npm install
```

---

### 2️⃣ Setup PostgreSQL

Create a database:

```sql
CREATE DATABASE school_db;
```

Update `src/db.js` if needed:

```js
new Sequelize("school_db", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});
```

---

### 3️⃣ Seed Database

Seeds:

* Teachers
* Teaching Assignments (subjects + classes)
* Students

```bash
node src/seed.js
```

---

### 4️⃣ Start Server

```bash
node src/app.js
```

Server runs on:

```
http://localhost:3000
```

---

## 📡 API Endpoints

### Students

| Method | Endpoint          | Description                    |
| ------ | ----------------- | ------------------------------ |
| GET    | /api/students     | List all students (filterable) |
| GET    | /api/students/:id | Get student by ID              |
| POST   | /api/students     | Add student (teacher only)     |
| PUT    | /api/students     | Update student (teacher only)  |
| PATCH  | /api/students/:id | Partial update (teacher only)  |
| DELETE | /api/students/:id | Delete student (teacher only)  |

---

### Teachers

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | /api/teachers     | List all teachers |
| GET    | /api/teachers/:id | Get teacher by ID |

---

### Dashboard

```http
GET /api/dashboard
```

Returns per-class view:

* Subjects
* Assigned teachers
* Total students

Example:

```json
{
  "1A_id": {
    "class": "1A",
    "subjects": [
      { "subject": "Math", "teacher": "Ms. Smith" }
    ],
    "total_students": 35
  }
}
```

---

### Stats (Bonus)

```http
GET /api/stats
```

Returns:

* Total students
* Total teachers
* Average class size
* Most popular subject

> Computed **in-memory** using repository data (as required).

---

## 🧪 Testing with curl

### Add Student (Teacher Only)

```bash
curl -X POST http://localhost:3000/api/students \
-H "Content-Type: application/json" \
-H "X-Role: teacher" \
-d '{"name":"Ram","classNumber":1,"section":"A","rollNumber":10,"contactDetails":"9841XXXXXX"}'
```

---

## ✅ Assignment Coverage

✔ RESTful API design
✔ Relational modeling
✔ Role-based access
✔ Aggregation endpoints
✔ Dashboard API
✔ Clean folder structure
✔ Seed data included

---

## 📌 Notes

* Authentication is mocked via headers for simplicity
* Designed for clarity & interview evaluation
* Easily extendable to JWT or OAuth

---

## 👤 Author

**Ankit Subedi**

---

## ⭐ Final Thoughts

This project prioritizes **clarity, correctness, and scalability**, making it suitable for interviews, assignments, and backend evaluations.
