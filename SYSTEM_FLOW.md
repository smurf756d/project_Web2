# Smart Kitchen Hub - System Flow Documentation

## Table of Contents
1. [System Architecture Overview](#system-architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Frontend Flow](#frontend-flow)
4. [Backend Flow](#backend-flow)
5. [Authentication Flow](#authentication-flow)
6. [Recipe Generation Flow](#recipe-generation-flow)
7. [Database Schema](#database-schema)
8. [API Endpoints](#api-endpoints)
9. [User Roles & Permissions](#user-roles--permissions)

---

## System Architecture Overview

The Smart Kitchen Hub is a full-stack web application designed to help users generate recipes using AI and manage their saved recipes. The system follows a **client-server architecture** with separation of concerns:

```
┌─────────────────────────────────────┐
│         Frontend (React/Vite)       │
│  - User Interface Components        │
│  - State Management                 │
│  - Authentication Handling          │
└──────────────┬──────────────────────┘
               │ HTTP/CORS
┌──────────────▼──────────────────────┐
│      Backend (Express/Node.js)      │
│  - API Routes & Controllers         │
│  - Business Logic & Validation      │
│  - Authentication & Authorization   │
└──────────────┬──────────────────────┘
               │ Database Driver
┌──────────────▼──────────────────────┐
│    Database (MongoDB Atlas)         │
│  - User Data                        │
│  - Recipes & Preferences            │
└─────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
- **Framework**: React with Vite
- **Routing**: React Router
- **HTTP Client**: Axios
- **Styling**: CSS Modules
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: Passport.js (Local + Google OAuth)
- **Validation**: Express Middleware
- **AI Integration**: Google Generative AI (Gemini 2.5 Flash)
- **Documentation**: Swagger/OpenAPI

### Database
- **Database**: MongoDB Atlas
- **ODM**: Mongoose

---

## Frontend Flow

### Page Structure & Navigation

```
App (Root Component)
├── Home Page
│   ├── Hero Section
│   ├── Most Liked Recipes
│   ├── Recent Recipes
│   └── Recent Users
│
├── Authentication Pages
│   ├── AuthPage (Login/Register)
│   │   ├── LoginForm
│   │   ├── RegisterForm
│   │   └── SocialButtons (Google)
│
├── User Dashboard (Protected)
│   ├── StatsCards (Overview)
│   ├── DietPreferencesCard
│   ├── MyRecipesCard
│   ├── QuickGenerateCard
│   └── RecommendedRecipes
│
├── Generate Recipe Page (Protected)
│   ├── IngredientForm
│   ├── RecipePreview
│   └── RecipeRefineBox
│
├── My Recipes Page (Protected)
│   └── RecipeCard (List)
│
├── Favorites Page (Protected)
│   └── Favorite Recipes
│
├── Admin Dashboard (Admin Only)
│   ├── Statistics
│   ├── User Management
│   └── Recipe Management
│
└── Help & Tips Page
```

### User Interaction Flow

1. **User Lands on Homepage**
   - Unauthenticated users see public content
   - Navigation bar displays login/register options

2. **Authentication Process**
   - User clicks "Login" or "Register"
   - Redirected to AuthPage component
   - Can authenticate via:
     - Email & Password (Local)
     - Google OAuth

3. **Post-Login Dashboard**
   - User sees personalized dashboard
   - Access to recipe generation feature
   - View saved recipes and preferences

4. **Recipe Generation**
   - User inputs ingredients, diet, cooking time, cuisine
   - Form validates client-side
   - Sends request to backend
   - AI generates recipe
   - User can refine or save recipe

---

## Backend Flow

### Server Initialization

```javascript
1. Load environment variables (dotenv)
2. Connect to MongoDB
3. Configure Passport authentication
4. Setup middleware:
   - CORS
   - JSON body parser
   - Session management
   - Error handling
5. Mount routes:
   - /api/auth
   - /api/recipes
   - /api/dashboard
6. Start listening on PORT (default: 5000)
```

### Request Processing Pipeline

```
Request
   ↓
CORS Middleware ✓
   ↓
Session Middleware ✓
   ↓
Route Matching ✓
   ↓
Validation Middleware ✓
   ↓
Authentication Middleware (if protected) ✓
   ↓
Authorization Middleware (if needed) ✓
   ↓
Controller Logic ✓
   ↓
Service Layer (Business Logic) ✓
   ↓
Database Operations ✓
   ↓
Error Handling ✓
   ↓
Response
```

### Middleware Stack

| Middleware | Purpose |
|-----------|---------|
| `authenticate.js` | Verifies JWT token in Authorization header |
| `authorize.js` | Checks user role/permissions |
| `validate.js` | Validates request data against schemas |
| `errorHandler.js` | Catches and formats errors |

---

## Authentication Flow

### Local Authentication (Email/Password)

```
1. User Registration
   ├─ POST /api/auth/register
   ├─ Validate email & password
   ├─ Hash password (bcrypt)
   ├─ Create User document
   └─ Return JWT token

2. User Login
   ├─ POST /api/auth/login
   ├─ Validate credentials
   ├─ Compare password hash
   ├─ Generate JWT token
   └─ Return token + user data
```

### Google OAuth Authentication

```
1. User clicks "Login with Google"
   ├─ Redirected to GET /api/auth/google
   ├─ Passport handles OAuth flow
   
2. Google Authorization
   ├─ User grants permissions
   ├─ Google redirects with code
   
3. Token Exchange
   ├─ Passport exchanges code for tokens
   ├─ User profile fetched
   
4. User Creation/Update
   ├─ Check if user exists in DB
   ├─ Create new user OR update existing
   ├─ Generate JWT token
   ├─ Redirect to frontend with token in URL
   
5. Frontend Processing
   ├─ Extracts token from URL
   ├─ Stores token in localStorage
   ├─ Fetches user profile
   ├─ Stores user data in localStorage
   └─ Redirects to dashboard
```

### JWT Token Flow

```
Request Header: Authorization: Bearer <JWT_TOKEN>
                                    ↓
                        Verify token with SECRET
                                    ↓
                        Extract user ID from token
                                    ↓
                        Attach user to request object
                                    ↓
                        Proceed to protected route
```

---

## Recipe Generation Flow

### High-Level Flow

```
User Input Form
    ↓
Validation (Client & Server)
    ├─ Ingredients: non-empty array
    ├─ Diet: one of [Healthy, Vegan, Keto, Any]
    ├─ Cooking Time: one of [0-30 mins, 30-60 mins, 60+ mins]
    └─ Cuisine: one of [Any, Italian, Asian, Arabic]
    ↓
POST /api/recipes/generate
    ↓
Backend Service: generateRecipe()
    ├─ Clean ingredient input
    ├─ Build AI prompt
    ├─ Call Google Generative AI (Gemini)
    └─ Parse AI response (JSON)
    ↓
Generate Recipe Image
    └─ Map cuisine to Unsplash image URL
    ↓
Return Recipe JSON to Frontend
    ├─ title, ingredients, steps
    ├─ cookingTime, calories, diet
    ├─ image URL
    └─ sourceIngredients
    ↓
Display Recipe Preview to User
    ├─ Option to SAVE
    ├─ Option to REFINE
    └─ Option to DISCARD
```

### Recipe Refinement Flow

```
User Feedback Message
    ↓
POST /api/recipes/refine
    ├─ Current Recipe (JSON)
    └─ User Message (string)
    ↓
Backend: refineRecipe()
    ├─ Build refinement prompt
    ├─ Include original recipe data
    ├─ Include user feedback
    ├─ Call Gemini API
    └─ Parse refined recipe
    ↓
Return Modified Recipe
    ├─ Updated ingredients
    ├─ Updated steps
    ├─ New image (if needed)
    └─ Updated metadata
    ↓
Display Refined Recipe to User
```

### Recipe Saving Flow

```
User clicks "Save Recipe"
    ↓
POST /api/recipes (Protected)
    ├─ User ID from JWT token (authenticated)
    └─ Recipe data
    ↓
Validation
    ├─ User is authenticated
    └─ Recipe doesn't already exist
    ↓
Database Operation: saveRecipe()
    ├─ Check for duplicates
    ├─ Create new Recipe document
    ├─ Set createdBy field
    ├─ Set timestamp
    └─ Return saved recipe
    ↓
Response to Frontend
    ├─ Saved recipe with _id
    └─ Success message
    ↓
Frontend Updates
    ├─ Add to user's recipe list
    └─ Show success notification
```

---

## Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  fullName: String (required),
  email: String (required, unique),
  passwordHash: String (required if provider="local"),
  role: String (enum: ["user", "admin"], default: "user"),
  provider: String (enum: ["local", "google"]),
  googleId: String,
  facebookId: String,
  profileImage: String,
  preferences: {
    dietType: String,
    allergies: [String],
    favoriteCuisines: [String]
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Recipe Collection

```javascript
{
  _id: ObjectId,
  title: String (required),
  image: String,
  ingredients: [String],
  instructions: String,
  steps: [String],
  cookingTime: String,
  calories: String,
  diet: String,
  cuisine: String,
  sourceIngredients: [String],
  ratings: {
    average: Number,
    count: Number
  },
  likes: Number,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### UserPreference Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  dietType: String,
  allergies: [String],
  favoriteCuisines: [String],
  cookingLevel: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Endpoints

### Authentication Routes

```
POST   /api/v1/auth/register          - Register new user
POST   /api/v1/auth/login             - Login user
GET    /api/v1/auth/profile           - Get user profile (Protected)
GET    /api/v1/auth/google            - Initiate Google OAuth
GET    /api/v1/auth/google/callback   - Google OAuth callback
```

### Recipe Routes

```
POST   /api/v1/recipes/generate       - Generate recipe using AI
POST   /api/v1/recipes/refine         - Refine existing recipe
POST   /api/v1/recipes                - Save recipe (Protected)
GET    /api/v1/recipes                - Get all recipes
GET    /api/v1/recipes/my-recipes     - Get user's recipes (Protected)
GET    /api/v1/recipes/:id            - Get recipe by ID
PATCH  /api/v1/recipes/:id            - Update recipe (Protected)
DELETE /api/v1/recipes/:id            - Delete recipe (Protected)
```

### Dashboard Routes

```
GET    /api/v1/dashboard              - Get dashboard stats (Protected)
GET    /api/v1/dashboard/user-stats   - Get user statistics (Protected)
```

---

## User Roles & Permissions

### Regular User Role
- ✓ Register and login
- ✓ Generate recipes
- ✓ Refine recipes
- ✓ Save recipes
- ✓ View own recipes
- ✓ Update own profile
- ✓ Set diet preferences
- ✗ Access admin panel

### Admin Role
- ✓ All user permissions
- ✓ View all users
- ✓ View all recipes
- ✓ Modify any recipe
- ✓ Delete any recipe
- ✓ Access admin dashboard
- ✓ View system statistics

---

## Environment Variables Required

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://...

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=7d

# Session
SESSION_SECRET=your_session_secret

# AI/Gemini
GEMINI_API_KEY=your_gemini_api_key

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

---

## Data Flow Diagram

### Complete User Journey

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USER AUTHENTICATION                                      │
├─────────────────────────────────────────────────────────────┤
│ Frontend: AuthPage               Backend: authController    │
│   ↓ Register/Login                 ↓ Validate Input         │
│   ↓ Social OAuth                   ↓ Hash Password/Compare  │
│   ↓ Store JWT in localStorage      ↓ Generate JWT          │
│   ↓ Redirect to Dashboard          ↓ Return Token          │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. RECIPE GENERATION                                        │
├─────────────────────────────────────────────────────────────┤
│ Frontend: GenerateRecipe   Backend: generateRecipeController│
│   ↓ User Input Form           ↓ Validate Inputs            │
│   ↓ Client Validation         ↓ Build AI Prompt            │
│   ↓ API Call with JWT         ↓ Call Gemini API            │
│   ↓ Display Preview           ↓ Parse JSON Response        │
│                               ↓ Generate Image URL         │
│                               ↓ Return Recipe              │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. RECIPE MANAGEMENT                                        │
├─────────────────────────────────────────────────────────────┤
│ Frontend: MyRecipes        Backend: generateRecipeController│
│   ↓ Refine Recipe             ↓ Refine via Gemini          │
│   ↓ Save Recipe               ↓ Save to Database           │
│   ↓ View Saved Recipes        ↓ Fetch from Database        │
│   ↓ Update/Delete             ↓ Update/Delete in DB        │
│                               ↓ Return Updated Data        │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. DATABASE OPERATIONS                                      │
├─────────────────────────────────────────────────────────────┤
│ MongoDB Collections:                                        │
│   • Users (Stored credentials, profile info)               │
│   • Recipes (Generated & saved recipes)                    │
│   • UserPreferences (Diet, allergies, cuisines)            │
└─────────────────────────────────────────────────────────────┘
```

---

## Error Handling Flow

```
API Request
    ↓
Try Block
    ├─ Validation Error → 400 Bad Request
    ├─ Authentication Error → 401 Unauthorized
    ├─ Authorization Error → 403 Forbidden
    ├─ Resource Not Found → 404 Not Found
    ├─ AI Generation Error → 500 Server Error
    └─ Database Error → 500 Server Error
    ↓
Catch Block
    └─ Format error message
        └─ Include status code
        └─ Include error details
        └─ Log error
    ↓
Error Middleware
    └─ Standardize error response
    ↓
Send JSON Error Response
```

---

## Performance & Security Considerations

### Security Features
- ✓ JWT-based authentication
- ✓ Password hashing with bcrypt
- ✓ CORS enabled for frontend domains only
- ✓ Session management with cookies
- ✓ Input validation on all endpoints
- ✓ Protected routes with authentication middleware

### Optimization
- ✓ MongoDB indexing on frequently queried fields
- ✓ Image compression via Unsplash API
- ✓ Request size limit: 20MB
- ✓ CORS origin whitelist

---

## Summary

The Smart Kitchen Hub system provides a seamless experience for users to:
1. **Authenticate** securely via local or OAuth methods
2. **Generate recipes** using AI based on ingredients and preferences
3. **Refine recipes** with conversational feedback
4. **Manage recipes** by saving, viewing, and organizing them
5. **Personalize** the experience through diet preferences

The architecture maintains clear separation between frontend, backend, and database, ensuring scalability and maintainability.
