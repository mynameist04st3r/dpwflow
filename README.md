# 🛠️ DPWFlow – Maintenance Tracker for Military Installations

## 🧩 Problem Statement

Barracks and base maintenance requests are currently submitted through various disconnected methods (paper forms, calls, emails), making it difficult to track progress, confirm receipt, or maintain accountability.

**DPWFlow** is a centralized web application that improves transparency, streamlines request submission, and provides real-time status updates for all stakeholders.

---

## 📌 Features

- Submit maintenance requests quickly from desktop or mobile.
- Scan QR codes in each building to auto-fill request info.
- View and manage all maintenance requests with filters by status, priority, and date.
- Admins can track assigned buildings and update request statuses.
- Role-based access control (guest, users, managers, admins).
- Built using React (Vite) frontend and Express/Knex backend.
- PostgreSQL database managed with Docker.

---

## 🛠️ Setup Instructions

### 🧱 Platforms and Tools

- **Docker**: Used for containerizing the PostgreSQL database and ensuring consistent environments.
- **Node.js**: Runs the Express backend server.
- **React + Vite**: Powers the frontend with fast hot-reload and simplified build tooling.

We recommend continuing to use React with Vite for future development to keep the setup lightweight and consistent across the project.


### 📦 NPM Packages

#### **Frontend (React Vite)**
- `@emotion/react`, `@emotion/styled`, `@mui/material`, `@mui/icons-material`
- `axios`, `chroma-js`, `react-dnd`, `react-dnd-html5-backend`
- `react-qr-code`, `react-router-dom`
- `@vitejs/plugin-react`, `@babel/preset-env`, `@babel/preset-react`
- `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
- `@types/react`, `@types/react-dom`
- `babel-jest`, `jest`, `jest-environment-jsdom`
- `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- `identity-obj-proxy`, `globals`

#### **Backend (Express API)**
- `express`, `knex`, `pg`, `cors`, `dotenv`, `express-session`
- `uuid`, `@faker-js/faker`, `@uswriting/bcrypt`
- `nodemon` (as a dev dependency)

---

## 🐳 Docker Setup

### 1. Start the PostgreSQL Database
```bash
docker run --name work_order_db_container \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=docker \
  -e POSTGRES_DB=work_order_db \
  -p 5432:5432 \
  -d postgres
```

### 2. Connect to the Database (optional)
```bash
docker exec -it work_order_db_container /bin/bash
psql -U postgres -d work_order_db
```

### 3. Create `.env` file in `/server`
```env
DB_CONNECTION_STRING=postgres://postgres:docker@localhost:5432/work_order_db
```

---

## 🔧 Local Development

### Backend (Express API)

```bash
cd server/
npm install
npx knex migrate:latest
npx knex seed:run
npm run dev   # or `npm start` for production
```

### Frontend (React Vite)

```bash
cd client/
npm install
npm run dev
```

---

## 🔌 Routes and Navigation

### 🌐 UI Paths
- `/` – Home
- `/maintenance-request` – Submit a new request
- `/dashboard` – Admin dashboard with sortable/filterable table
- `/my-requests` – View user-submitted requests
- `/my-buildings` – Admin view of assigned buildings (with QR printouts)

### 🔁 API Endpoints
- `GET /GetRequests/AllRequests` – Get all request data (joined)
- `PATCH /requests/updateRequest/:id` – Update request status/priority
- `GET /admin-buildings` – Return admin's assigned buildings
- Other routes include POST and GET for `requests`, `locations`, `users`

---

## 🧪 Running Tests

### API Tests

```bash
npm install --save-dev jest supertest
npx jest
```

Make sure `jest` and `supertest` are added under `devDependencies` in `package.json`.

### UI Tests

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```
Add `"test":"jest"` under `"scripts"` in `package.json`.

```bash
npm test
```
---

## 🌐 Deployment Notes

To run without Docker:

1. Ensure Postgres is installed and running locally.
2. Add the `.env` file in the `server/` directory.
3. Run backend and frontend setup steps above.

---
## Planning Links
### 🔗 Entity-Relationship Diagram (ERD)

[ERD](https://www.figma.com/board/gNr5v1onXELNPkCtKoYmeK/CAPSTONE)

### 🔗 Kanban Board

[Trello](https://trello.com/b/LvYCpjqh/capstone)

---

## 🧑‍💻 Authors

- Levi Ballew
- Camilo Cueto
- Isaiah Harlee
- Jason Jones
- Kiersten Morrow
- Robert Prickett
- Andrew Stamps  
- Paul Storrs

---