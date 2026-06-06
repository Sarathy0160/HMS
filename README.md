# Hotel Room Booking System

A full-stack hotel room booking system built with React.js, Vite, Node.js, Express, and MongoDB.

## Project structure

```
hotel-room-booking/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── App.css
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   ├── .env.sample
│   └── package.json
├── .gitignore
└── README.md
```

## Backend API endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Rooms
- `GET /api/rooms`
- `GET /api/rooms/:id`
- `POST /api/rooms` (admin only)
- `PUT /api/rooms/:id` (admin only)
- `DELETE /api/rooms/:id` (admin only)

### Bookings
- `POST /api/bookings`
- `GET /api/bookings/user/:userId`
- `GET /api/bookings` (admin only)
- `PUT /api/bookings/:id` (admin only)
- `DELETE /api/bookings/:id`

### Users
- `GET /api/users` (admin only)

## Run locally

### Backend

1. Navigate to backend folder:
   ```bash
   cd hotel-room-booking/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.sample` to `.env` and provide values:
   ```bash
   cp .env.sample .env
   ```
4. Start the backend:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to frontend folder:
   ```bash
   cd hotel-room-booking/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```

## Render deployment

This project includes `render.yaml` for Render service definitions. You can deploy both the backend and frontend from the same repository using Render's GitHub integration.

### Backend (Web Service)
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `MONGO_URI`
  - `JWT_SECRET`
  - `PORT`
  - `FRONTEND_URL` (set to your frontend Render URL)

### Frontend (Static Site)
- Root directory: `frontend`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Environment variable:
  - `VITE_API_URL` (set to your backend Render URL plus `/api`)

For local frontend development, copy `frontend/.env.sample` to `frontend/.env` and set `VITE_API_URL=http://localhost:5000/api`.

### Render setup steps
1. Go to [render.com](https://render.com) and connect your GitHub repository.
2. Create a new Web Service using the repository root and select the `backend` folder.
3. Create a new Static Site using the repository root and select the `frontend` folder.
4. Add environment variables in Render Dashboard or `render.yaml`:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT` (optional, default is `5000`)
   - `FRONTEND_URL`
   - `VITE_API_URL`
5. Deploy both services and verify the frontend can call the backend URL.

## Authentication

The frontend stores:
- `hotel_token` in `localStorage`
- `hotel_user` in `localStorage`

Role-based navigation is handled client-side using the stored user role.

## Sample commands for GitHub

```bash
git init
cd hotel-room-booking
git add .
git commit -m "Hotel Room Booking System"
git branch -M main
git remote add origin <github-repo-url>
git push -u origin main
```

## API testing examples

Use these examples in Postman or any API tool.

### Register

POST `http://localhost:5000/api/auth/register`

Body (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

POST `http://localhost:5000/api/auth/login`

Body (JSON):
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Add room (admin)

POST `http://localhost:5000/api/rooms`

Headers:
- Authorization: `Bearer <token>`

Body (JSON):
```json
{
  "roomNumber": "101",
  "roomType": "Deluxe",
  "price": 120,
  "description": "Comfortable deluxe room with sea views.",
  "capacity": 2,
  "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  "available": true
}
```

### Create booking

POST `http://localhost:5000/api/bookings`

Headers:
- Authorization: `Bearer <token>`

Body (JSON):
```json
{
  "roomId": "<room-id>",
  "checkInDate": "2026-06-15",
  "checkOutDate": "2026-06-18"
}
```

## Sample MongoDB documents

See `SAMPLE_DOCUMENTS.md` for example document shapes.
