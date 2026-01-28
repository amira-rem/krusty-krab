# Krusty Krab Recipes API 🦀🍔

This project is a small **CRUD API** for **recipes** (Krusty Krab menu) built with:
- ExpressJS
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- Simple EJS pages that consume the API

## 1) Install
```bash
npm install
```

## 2) Configure environment
Create a `.env` file (copy from `.env.example`) and set `MONGO_URI`.
⚠️ Your Atlas URI should include the DB name, e.g. `/krusty-krab`.

## 3) Seed data (optional)
```bash
npm run seed
```

## 4) Run
```bash
npm run dev
# or
npm start
```

Server default: http://localhost:3000

## API Routes
### Auth
- `POST /api/auth/register`  { email, password }
- `POST /api/auth/login`     { email, password }

### Recipes (public read, protected write)
- `GET    /api/recipes`
- `GET    /api/recipes/:id`
- `POST   /api/recipes`      (JWT)
- `PATCH  /api/recipes/:id`  (JWT)
- `DELETE /api/recipes/:id`  (JWT)

## Pages
- `/` or `/menu`  => list recipes (fetches from `/api/recipes`)
- `/login`        => login, stores JWT in localStorage
- `/admin`        => create/update/delete recipes (needs login)

## Quick cURL test
1) Register:
```bash
curl -X POST http://localhost:3000/api/auth/register   -H "Content-Type: application/json"   -d '{"email":"admin@kk.com","password":"123456"}'
```

2) Login:
```bash
curl -X POST http://localhost:3000/api/auth/login   -H "Content-Type: application/json"   -d '{"email":"admin@kk.com","password":"123456"}'
```

3) Create recipe (replace TOKEN):
```bash
curl -X POST http://localhost:3000/api/recipes   -H "Content-Type: application/json"   -H "Authorization: Bearer TOKEN"   -d '{"name":"Krabby Patty","price":5.99,"ingredients":["bun","patty","pickles"]}'
```

---
Have fun ☕😄
