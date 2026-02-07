# Naksh Jewels – Mini E-Commerce Module

A mini e-commerce module built with **React 18**, **Redux Toolkit**, **Node.js**, and **Express** — containerized with **Docker**.

> Built as part of the Naksh Jewels ReactJS & Node.js Internship Assessment.

---

## Features

- Product listing page using backend API
- Product cards with image, name, price, and Add to Cart button
- Cart page with quantity update and remove item functionality
- State management using Redux Toolkit
- Responsive design with custom CSS
- GET /products and POST /cart APIs
- Validation middleware with express-validator
- Error handling
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

#### Frontend

```bash
cd frontend
npm install
npm start
```

App opens at `http://localhost:3000`.

---

## API Endpoints

### `GET /api/products`

Returns list of all products.

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

### `POST /api/cart`

Validates cart item payload.

**Request:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Success (200):**
```json
{
  "success": true,
  "message": "Item validated",
  "data": {
    "productId": 1,
    "quantity": 2
  }
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "errors": [
    { "field": "quantity", "message": "quantity must be an integer between 1 and 99" }
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