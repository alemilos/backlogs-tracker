# Backlogs Tracker Project

A full-stack **Backlogs Tracker application** built as part of the **Sicurezza exam at Sapienza University of Rome**.  
The project is intentionally designed with **SQL Injection vulnerabilities** to demonstrate attacks against the **CIA security principles** (Confidentiality, Integrity, Availability).

It consists of two main parts:

- **Backend (API)** → Node.js (Express) + MySQL2 + passport.js
- **Frontend (UI)** → React.js (Vite) + TailwindCSS + Zustand + Axios

---

## 📂 Project Structure

`backlogs_tracker`\

- `backlogs-tracker-api`

- `backlogs-tracker-frontend`

---

## 🔎 Overview

- The **API** handles:

  - User authentication (login & registration)
  - Boards (CRUD operations)
  - Tasks within boards (CRUD operations)
  - SQL Injection vulnerabilities intentionally left in `user.model.js` and `board.model.js`

- The **Frontend** provides:
  - Brutalist/figjam-inspired UI
  - Authentication pages (login/register)
  - Boards and tasks management
  - A **Helper button** (top-right) showing example queries that break **CIA principles**

---

## 🛠️ How to Run

Clone the repository:

`git clone https://github.com/alemilos/backlogs-tracker.git`

Navigate to the repo:

`cd backlogs-tracker`

### Backend (API)

`cd backlogs-tracker-api`

`npm install`

`npm run dev`

### Frontend (UI)

`cd backlogs-tracker-frontend`

`npm install`

`npm run dev`

---

## 📑 Documentation

API README
→ vulnerabilities, API endpoints, DB schema

Frontend README
→ UI features, helper button, CIA queries

---

## 🎯 Purpose

This project **is not** production-ready.
It is deliberately **insecure** and meant solely for cybersecurity education, showing:

- How SQL Injection vulnerabilities arise
- How they can be exploited from the frontend
- How they affect Confidentiality, Integrity, and Availability
