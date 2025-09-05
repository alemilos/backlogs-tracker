# Backlogs Tracker Frontend

A **React.js frontend** for the Backlogs Tracker application.  
Built with a focus on a **clean, brutalist-inspired design** (light colors, figjam-like style), this interface allows users to interact with the **Backlogs Tracker API** by handling authentication, boards, and tasks.

---

## ✨ Features

- **User Authentication**
  - Register and log in
  - Session management with context providers
- **Boards**
  - Create, read, update, and delete boards
- **Tasks**
  - CRUD operations for tasks inside boards
- **UI/UX**
  - Minimal, figjam/brutalist-inspired design with light colors
  - Smooth modals, notifications, and responsive layout

---

## 🛠️ Tech Stack

- **React.js (Vite)** → fast development & bundling
- **Zustand** → lightweight state management
- **TailwindCSS** → styling
- **Axios** → API communication
- **React Toastify** → notifications

---

## 🚀 Installation & Setup

From the main repository `https://github.com/alemilos/backlogs-tracker.git`:

`cd backlogs-tracker-frontend`

Install dependencies:

`npm install`

Run the development server:

`npm run dev`

The app will be available at:

`http://localhost:5173`

---

## ⚠️ Vulnerabilities in Context

This frontend connects directly to the intentionally vulnerable **Backlogs Tracker API**.
Because of this, certain inputs can be used to trigger SQL Injection on the backend:

`Login page → username input field`

`Main search bar → board title lookup`

Both fields send raw user input to vulnerable backend queries, making them the primary entry points for attacks.

---

## 🧭 Helper Button for CIA Violations

In the top-right corner of the UI, there is an Helper button.
Clicking it displays example queries that demonstrate how the application violates the **CIA security principles**:

**Confidentiality** → queries that expose private user data

**Integrity** → queries that allow unauthorized modifications

**Availability** → queries that disrupt or delete essential data and prevent application usage for users.

This feature is meant to help analyze and categorize the different impacts of SQL Injection attacks.

---

## 🎨 Design

The design is brutalist-inspired, with a figjam-like look:

- Light color palette

- Minimal components

- Custom typography with Josefin Sans

---

## 📑 Purpose

This frontend is part of the Backlogs Tracker project for the **Sicurezza** exam at **Sapienza University of Rome**.
It is connected to the intentionally vulnerable **Backlogs Tracker API** and serves as the main UI for testing user interactions.
