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

From the main repository `https://github.com/alemilos/backlogs-tracker.git`:

`cd backlogs-tracker-api`

Install dependencies:

`npm install`

Run the development server:

`npm run dev`

The server will be available at:

`http://localhost:8000`

---

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
