# AiNote — Full‑Stack Notes App (Dockerized)

A full‑stack AI-powered notes application with **React (Vite) frontend**, **Node.js + Express backend**, and **MongoDB**, fully containerized using **Docker Compose**.

---

## Project Overview

AiNote allows users to:

* Register & log in securely
* Create, edit, delete notes
* Search notes semantically
* Store notes persistently in MongoDB
* Run frontend, backend, and database using **one Docker command**

---

## Tech Stack

**Frontend:** React + Vite + Material UI + Tailwind CSS
**Backend:** Node.js + Express
**Database:** MongoDB
**Auth:** JWT Token Authentication
**Containerization:** Docker + Docker Compose

---

## How to Run the Project (Docker)

### 1️⃣ Install Requirements

Make sure you have installed:

* Docker
* Docker Compose

Verify:

```bash
docker --version
docker compose version
```

---

### 2️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd AiNoteApp
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/ainote
JWT_SECRET=your_secret_key
```

---

### 4️⃣ Start Full System (Frontend + Backend + DB)

```bash
docker compose up --build
```

---

### 5️⃣ Open the App

| Service     | URL                                            |
| ----------- | ---------------------------------------------- |
| Frontend    | [http://localhost:5173](http://localhost:5173) |
| Backend API | [http://localhost:5000](http://localhost:5000) |
| MongoDB     | Running internally                             |

---

## Assumptions Made During Development

* Users have Docker installed

---

## Improvements Possible With More Time

### Security Enhancements

* HTTPS with SSL certificates
* Refresh tokens & session expiration handling
* API rate limiting & request throttling
* Secure secrets using Docker Secrets or Vault

### Performance & Scaling

* Redis caching for faster note search
* MongoDB indexing optimization
* Load balancing & horizontal scaling
* Background job processing

### Product & UX Improvements

* Tagging and note folders
* AI auto‑summarization of notes
* Rich‑text editor support
* Dark mode & accessibility improvements
* Mobile responsive enhancements
* Theme customization for notes

### AI Features Expansion

* AI note suggestions
* Auto‑categorization of notes
* Voice‑to‑text note creation

