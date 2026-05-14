# 🍳 Smart Kitchen Hub

Smart Kitchen Hub is a full-stack MERN application that uses AI to generate recipes based on user ingredients and preferences.
The platform allows users to save recipes, manage favorites, and access personalized dashboard statistics, while admins can monitor platform activity through a dedicated admin dashboard.

---

# 🚀 Features

## 👤 User Features

* User registration and login
* JWT authentication
* Google OAuth login
* AI recipe generation
* AI recipe refinement
* Save and manage recipes
* Favorite recipes system
* User dashboard statistics
* Protected routes

---

## 🛠️ Admin Features

* Admin dashboard
* View total users and recipes
* View most used ingredients
* View most liked recipes
* Monitor recent recipes

---

# 🧱 Tech Stack

## Frontend

* React
* Vite
* React Router
* Axios
* CSS / Tailwind (if used)

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Passport.js
* JWT Authentication
* Swagger API Documentation

## AI Integration

* Google Generative AI (Gemini API)

---

# 📁 Project Structure

Smart-Kitchen-Hub/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── main.jsx
│
└── README.md

---

# ⚙️ Installation & Setup

## Requirements

Before starting, make sure you have:

* Node.js v18+
* MongoDB Atlas database
* Google Gemini API Key

---

# 🔐 Backend Environment Variables

Create a .env file inside the backend folder:

env
PORT=5000
MONGO_URI=your_mongodb_connection_string

CLIENT_URL=http://localhost:5173
CLIENT_SUCCESS_URL=http://localhost:5173/auth/success
CLIENT_FAILURE_URL=http://localhost:5173/auth/failure

SESSION_SECRET=your_session_secret
JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_google_generative_ai_key

---

# 📦 Install Dependencies

## Backend

cd backend
npm install

## Frontend

cd frontend
npm install

---

# ▶️ Running the Project

## Start Backend Server

cd backend
npm run dev

Backend runs on:

text
http://localhost:5000

---

## Start Frontend

cd frontend
npm run dev

Frontend runs on:

text
http://localhost:5173

---

# 🧪 Available Scripts

## Backend Scripts

npm run dev
npm start

## Frontend Scripts

npm run dev
npm run build
npm run preview
npm run lint

---

# 📚 API Documentation

Swagger API documentation is available at:

text
http://localhost:5000/api-docs

---

# 🔗 API Routes

## Authentication Routes

Base URL:

text
/api/v1/auth

| Method | Endpoint  | Description           |
| ------ | --------- | --------------------- |
| POST   | /register | Register new user     |
| POST   | /login    | Login user            |
| GET    | /profile  | Get user profile      |
| GET    | /google   | Google OAuth login    |
| GET    | /admin    | Admin protected route |

---

## Recipe Routes

Base URL:

text
/api/v1/recipes

| Method | Endpoint  | Description        |
| ------ | --------- | ------------------ |
| POST   | /generate | Generate AI recipe |
| POST   | /refine   | Refine recipe      |
| GET    | /         | Get all recipes    |
| GET    | /my       | Get user recipes   |
| POST   | /         | Save recipe        |
| PUT    | /:id      | Update recipe      |
| DELETE | /:id      | Delete recipe      |

---

## Dashboard Routes

Base URL:

text
/api/v1/dashboard

| Method | Endpoint | Description              |
| ------ | -------- | ------------------------ |
| GET    | /        | Get user dashboard stats |

---

## Admin Routes

Base URL:

text
/api/v1/admin

| Method | Endpoint               | Description           |
| ------ | ---------------------- | --------------------- |
| GET    | /stats                 | Dashboard statistics  |
| GET    | /users                 | Get all users         |
| GET    | /recent-recipes        | Get recent recipes    |
| GET    | /most-used-ingredients | Most used ingredients |
| GET    | /most-liked-recipes    | Most liked recipes    |

---

# 🗄️ Database Notes

* Recipe collection stores saved recipes and dashboard data.
* MyRecipe collection is used for backward compatibility.

---

# 🔒 Authentication Notes

* JWT token is required for protected routes.
* Admin pages require admin role authorization.
* Tokens are stored in local storage on the frontend.

---

# 👨‍💻 Team

Developed as a MERN Stack .
Web2/project application using AI-powered recipe generation.