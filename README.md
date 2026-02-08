# Naksh Jewels – Mini E-Commerce Module

A mini e-commerce module built with **React 18**, **Redux Toolkit**, **Node.js**, and **Express** — containerized with **Docker**.

> Built as part of the Naksh Jewels ReactJS & Node.js Internship Assessment.

---

## Assessment Instructions (Provided)

**Purpose:** Evaluate real-world development skills, code quality, problem-solving ability, and basic DevOps understanding.

**Assignment Overview:** Build a mini e-commerce module using React (or Next.js) and Node.js. Focus on clean code, structure, and practical implementation. Time limit: 48 hours.

**Part A: Frontend (React / Next.js)**
- Product listing page (static JSON or API)
- Product card: image, name, price, Add to Cart
- Cart page: update quantity, remove item
- State management: Redux or Context API
- Responsive design (basic)

**Rules**
- Functional components only
- No UI libraries (Bootstrap, MUI, Ant, etc.)
- Clean folder structure
- Meaningful Git commits

**Part B: Backend (Node.js + Express)**
- GET /products API
- POST /cart API
- Validation middleware
- Proper error handling
- MongoDB or in-memory data
- Environment variables with .env

**Part C: Docker (Mandatory)**
- Dockerfile for frontend
- Dockerfile for backend
- docker-compose.yml
- Must run with docker-compose up

**Submission Guidelines**
- GitHub repository link
- README.md with setup + Docker instructions
- Screenshots or short demo video (optional)

**Evaluation Criteria**
- Code quality and structure
- Understanding of React & Node fundamentals
- Docker setup correctness
- Error handling & edge cases
- Communication and clarity

**Note:** Copy-pasted tutorial code, poor structure, or non-working Docker setup will lead to rejection.

---

## Features

- Product listing page using backend API
- Product cards with image, name, price, and Add to Cart button
- Cart page with quantity update and remove item functionality
- State management using Redux Toolkit
- Responsive design with custom CSS
- Validation middleware with express-validator
- Basic error handling
- In-memory data storage
- Docker containerization

---

## Project Structure

```
naksh-jewels-ecommerce/
├── frontend/
│   ├── src/
│   │   ├── components/      # ProductCard, CartItem
│   │   ├── pages/           # ProductListing, CartPage
│   │   ├── store/           # Redux store + slices
│   │   ├── services/        # API service
│   │   └── styles/          # CSS files
│   ├── Dockerfile
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/     # Product & Cart controllers
│   │   ├── routes/          # Express routes
│   │   ├── middlewares/     # Validation & error handling
│   │   └── data/            # In-memory product data
│   ├── server.js
│   ├── .env
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## Getting Started

### Prerequisites

- **Docker** and **Docker Compose** installed
- OR **Node.js 20+** and **npm** for local development

---

### Option 1: Docker (Recommended)

Run the entire application with a single command:

```bash
docker-compose up --build
```

| Service  | URL                           |
|----------|-------------------------------|
| Frontend | http://localhost:3000          |
| Backend  | http://localhost:5000/api      |

To stop:

```bash
docker-compose down
```

---

### Option 2: Local Development

#### Backend

```bash
cd backend
npm install
npm start
```

Server runs at `http://localhost:5000`.

Create a .env file based on the example:

```bash
copy .env.example .env
```

#### Frontend

```bash
cd frontend
npm install
npm start
```

App opens at `http://localhost:3000`.

---

## Assessment Breakdown (A, B, C) + Independent Tests

Follow these sections to validate each part independently.

### Part A: Frontend (React)

**Scope**
- Product listing page (API-driven)
- Product card: image, name, price, Add to Cart
- Cart page: update quantity, remove item
- State management: Redux Toolkit
- Responsive layout (basic)
- Functional components only, no UI libraries

**How to test (frontend only)**
1. Start backend (see Part B) so products load from API.
2. Start frontend:

```bash
cd frontend
npm install
npm start
```

3. Verify:
   - Product listing shows cards with image, name, and price.
   - Add to Cart adds item to cart state.
   - Cart page allows quantity updates and item removal.
   - Layout is usable on mobile width (~375px).

---

### Part B: Backend (Node.js + Express)

**Scope**
- `GET /api/products`
- `POST /api/cart`
- Validation middleware
- Error handling
- In-memory data source
- Environment variables via `.env`

**How to test (backend only)**
1. Create `.env`:

```bash
cd backend
copy .env.example .env
```

2. Start backend:

```bash
npm install
npm start
```

3. Verify endpoints:

```bash
curl http://localhost:5000/api/products
```

```bash
curl -X POST http://localhost:5000/api/cart ^
  -H "Content-Type: application/json" ^
  -d "{\"productId\":1,\"quantity\":2}"
```

4. Validation check:

```bash
curl -X POST http://localhost:5000/api/cart ^
  -H "Content-Type: application/json" ^
  -d "{\"productId\":1,\"quantity\":0}"
```

Expected: 400 with validation error payload.

---

### Part C: Docker (Mandatory)

**Scope**
- Dockerfile for frontend
- Dockerfile for backend
- `docker-compose.yml`
- App runs via `docker-compose up`

**How to test (Docker only)**
1. From repo root:

```bash
docker-compose up --build
```

2. Verify:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000/api/products

3. Stop:

```bash
docker-compose down
```

---

## Quick Verification Checklist

- Frontend loads and shows product cards with image, name, price.
- Add to Cart updates cart state and UI.
- Cart quantity update and remove item work as expected.
- `GET /api/products` returns product list.
- `POST /api/cart` accepts valid payload and rejects invalid payload.
- Docker setup runs both services with `docker-compose up --build`.

---

## API Endpoints

### Base URL
- Local: `http://localhost:5000/api`
- Docker: `http://localhost:5000/api`

### GET /api/products

Returns all products.

**Example:**
```bash
curl http://localhost:5000/api/products
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Royal Kundan Necklace Set",
      "price": 12499,
      "image": "...",
      "description": "..."
    }
  ]
}
```

### POST /api/cart

Add item to cart with validation.

**Request:**
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
```

**Validation:**
- `productId`: Required, positive integer
- `quantity`: Required, integer between 1-99
- Product must exist

**Success Response:**
```json
{
  "success": true,
  "message": "Item validated and added to cart",
  "data": {
    "productId": 1,
    "quantity": 2
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "errors": [
    {
      "field": "quantity",
      "message": "quantity must be an integer between 1 and 99"
    }
  ]
}
```

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, Redux Toolkit, Axios      |
| Styling   | Custom CSS (no UI libraries)        |
| Backend   | Node.js 20, Express, express-validator |
| DevOps    | Docker, Docker Compose              |

---

## Folder Structure

- `components/` - Reusable UI components
- `pages/` - Page-level components
- `store/` - Redux store and slices
- `services/` - API integration
- `controllers/` - Business logic
- `routes/` - API route definitions
- `middlewares/` - Validation and error handling

---

## Author

Built for the **Naksh Jewels Development Team** internship assessment.