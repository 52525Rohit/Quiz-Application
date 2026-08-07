# Quiz Application

A full-stack quiz app: React frontend (Redux Toolkit) + Express/MongoDB backend, with user signup/login.

## Stack

- **Frontend**: React 18, Redux Toolkit, React Router, Axios (`frontend/`)
- **Backend**: Express, Mongoose, bcryptjs, CORS, Morgan (`backend/`)

## Setup

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```
MONGO_URI=<your MongoDB connection string>
PORT=5500
```

```bash
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs at `http://localhost:3000`, backend at `http://localhost:5500`.

## API

Base path: `/api`

| Method | Route            | Description        |
| ------ | ---------------- | ------------------- |
| POST   | `/signup`         | Register a user     |
| POST   | `/login`          | Log in a user        |
| GET    | `/questions`      | Fetch quiz questions |
| POST   | `/questions`      | Add questions        |
| DELETE | `/questions`      | Delete all questions |
| GET    | `/result`         | Fetch results         |
| POST   | `/result`         | Store a result        |
| DELETE | `/result`         | Delete all results    |
| DELETE | `/result/:id`     | Delete a result by id |
