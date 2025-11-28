# Fullstack Assignment – React + FastAPI  
This project is a complete full-stack application built using **React (Vite)** for the frontend and **FastAPI** for the backend. It includes user authentication, protected routes, and a fully functional task management dashboard.

---

## 🚀 Tech Stack

### **Frontend**
- React (Vite)
- TailwindCSS
- Axios
- React Router
- JWT Authentication

### **Backend**
- FastAPI
- Python
- SQLite (SQLAlchemy ORM)
- Argon2 password hashing
- JWT Authentication
- Pydantic models

---

## 🎯 Features

### 🔐 Authentication
- User registration  
- User login  
- JWT-based auth  
- Protected dashboard  
- Logout functionality  

### 🗂️ Task Dashboard
- Add task  
- Edit task  
- Delete task  
- Search tasks  
- Filter by status (pending / in-progress / done)  
- Auto-refresh after CRUD operations  
- Clean responsive UI  

### 🛠️ Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register user |
| POST | `/auth/login` | Login user |
| GET | `/profile/` | Get logged-in user profile |
| GET | `/tasks/` | Get all tasks (with search + filter) |
| POST | `/tasks/` | Create new task |
| PUT | `/tasks/{id}` | Update task |
| DELETE | `/tasks/{id}` | Delete task |

---

## 📁 Project Structure

fullstack-assignment/
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── package.json
│
└── backend/
├── app/
│ ├── routers/
│ ├── models.py
│ ├── schemas.py
│ ├── deps.py
│ ├── auth.py
│ ├── config.py
│ └── main.py
├── assignment.db
├── requirements.txt
└── .env
