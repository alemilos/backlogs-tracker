# Backlogs Tracker API

A simple **Backlogs Tracker API** built with **Node.js (Express)** and **MySQL2 (Promise-based)**.  
This project is designed for a **Sapienza University of Rome** exam named **Sicurezza** and intentionally contains **SQL Injection vulnerabilities** in some database queries.

---

## 🚀 Features

- **Authentication**
  - User registration
  - User login (⚠️ vulnerable query)
  - Session/token-based authentication (via Passport.js)
- **Boards**
  - CRUD boards associated with users
  - Fetch boards by title (⚠️ vulnerable query)
- **Tasks**
  - CRUD tasks within boards
- **Error Handling**
  - Centralized error handler that bubbles low level errors to the frontend layer.
- **Validation**
  - Joi validations for each endpoint

---

## ⚠️ Vulnerabilities

This project is **intentionally vulnerable** to demonstrate **SQL Injection attacks** via raw SQL concatenation with user input.

- **`user.model.js`**

  ```js
  async selectOneByUsernamePassword(username, password)

  ```

- **`board.model.js`**
  ```js
  async getByTitle(userId, title)
  ```

The `MySQL2` database is voluntarily vulnerable by allowing `multipleStatements`

---

## 🛠️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/alemilos/backlogs-tracker.git
cd backlogs-tracker-api
```

### macOS

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The server will be available at:

```
http://localhost:8000
```

---

### Linux / Docker

Make sure **Docker** and **Docker Compose** are installed. Then build and start the containers:

```bash
sudo docker-compose up --build
```

This will start:

- **MySQL** database (`backlogs-mysql`)
- **API server** (`backlogs-api`)

The server will be available at:

```
http://localhost:8000
```

> ⚠️ Note: The Docker setup automatically creates the database `backlogs_tracker` with an empty root password for demonstration purposes.

## 📑 Database Schema

The app uses 3 main tables:

- Users → `(id, username, email, password, role)`

- Boards → `(id, userId, title, icon, color)`

- Tasks → `(id, boardId, title, description, difficulty, duration, color, status)`

---

## 🎯 Purpose

This project is not production-ready.
It is deliberately insecure and meant for educational purposes only to demonstrate:

- How SQL Injection vulnerabilities arise in Node.js & MySQL apps
- How attackers can exploit unsafe query building
- How proper query parameterization (prepared statements) should be used instead
