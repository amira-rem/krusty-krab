
# Final Project — Fullstack Web App (React + Express + MongoDB)

## Overview
This project is a fullstack website with a backend API, a React SPA frontend, and a protected admin dashboard (EJS).
I focused more on the backend than the frontend since the course is mainly backend-oriented.

## Project Structure
~~~txt
final-project/
├─ backend/
└─ frontend/


## Tech Stack

### Backend
- Node.js / Express
- MongoDB / Mongoose
- JWT Authentication + bcrypt (password hashing)
- EJS (Admin dashboard)
- Security: helmet, express-rate-limit, express-mongo-sanitize, xss-clean, cookie-parser, CORS

### Frontend
- React (Vite)
- React Router (SPA)
- Context API (state management)


## Data Model (MongoDB Collections)

### User
- username (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- role (String: "admin" | "user")
- createdAt / updatedAt (timestamps)

### Recipe
- name (String, required)
- description (String)
- ingredients (Array or String)
- createdBy (ObjectId -> User)
- createdAt / updatedAt (timestamps)

Relationship:
- 1 User can create many Recipes

## Main Features
- Authentication: Register / Login
- Protected API routes using JWT
- Recipes: Create and List recipes (POST, GET)
- Admin dashboard (EJS) protected by admin role
- Admin login page: /admin/login (sets cookie for admin session)

## Run Locally

### Backend
1) Go to backend folder
~~~bash
cd backend
~~~


2) Install dependencies and start server
~~~bash
npm install
npm run dev
~~~

### Frontend
1) Go to frontend folder
~~~bash
cd frontend
~~~

2) Install dependencies and start frontend
~~~bash
npm install
npm run dev
~~~

## Environment Variables (Backend)


~~~env
PORT=3000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
~~~

## Useful URLs
- Frontend: http://localhost:5173
- Backend health check: http://localhost:3000/health
- Admin login: http://localhost:3000/admin/login
- Admin dashboard (after admin login): http://localhost:3000/admin

## API Endpoints

### Auth
- POST /api/auth/register  
  Body:
  ~~~json
  { "username": "amira", "email": "amira@mail.com", "password": "strongpassword" }
  ~~~

- POST /api/auth/login  
  Body:
  ~~~json
  { "email": "amira@mail.com", "password": "strongpassword" }
  ~~~

- GET /api/auth/me  
  Header:
  ~~~txt
  Authorization: Bearer <token>
  ~~~

### Recipes
- GET /api/recipes

- POST /api/recipes  
  Header:
  ~~~txt
  Authorization: Bearer <token>
  ~~~
  Body example:
  ~~~json
  {
    "name": "Krabby Patty",
    "description": "Classic burger",
    "ingredients": ["bun", "patty", "lettuce"]
  }
  ~~~

## Security
- Password hashing with bcrypt
- JWT authentication for protected routes
- express-validator for request validation
- Helmet for secure HTTP headers
- Rate limiting to mitigate brute-force attacks
- Mongo sanitize to prevent NoSQL injection
- XSS clean to reduce XSS attacks
- CORS configured with allowed origin and credentials
- Admin area protected by role-based access

## Notes
- The first registered user becomes admin automatically (solo-project friendly).

## Author
- Amira Remli
