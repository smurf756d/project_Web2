# Smart Kitchen Hub Backend

Backend API for the Smart Kitchen Hub project.

---

# Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
-Mongoose
- JWT Authentication
- Google OAuth
- Passport.js
- Swagger API Documentation

---

# Features

- User registration
- User login
- JWT authentication
- Google OAuth login
- Protected routes
- Role-based authorization
- Swagger API documentation
- MongoDB Atlas integration

---

# Project Structure

```bash
src/
│
├── config/
│   ├── db.js
│   └── passport.js
│
├── controllers/
│   └── authController.js
│
├── docs/
│   └── swagger.js
│
├── middleware/
│   ├── authenticate.js
│   ├── authorize.js
│   ├── errorHandler.js
│   └── validate.js
│
├── models/
│   └── User.js
│
├── routes/
│   └── authRoutes.js
│
├── services/
│   └── authService.js
│
├── utils/
│   ├── generateToken.js
│   └── validators.js
│
└── server.js