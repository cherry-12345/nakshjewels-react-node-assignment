# Naksh Jewels – Mini E-Commerce Module

This project is a mini e-commerce application built using React 18, Redux Toolkit, Node.js, and Express as part of the Naksh Jewels ReactJS & Node.js Internship Assessment.

The application demonstrates frontend state management, backend API design, validation, error handling, and a complete Docker-based setup using docker-compose.

---

## Features

### Frontend
- Product listing page using backend API
- Product cards with image, name, price, and Add to Cart button
- Cart page with quantity update and remove item functionality
- Global state management using Redux Toolkit
- Responsive design with custom CSS
- Functional components only (no UI libraries)

### Backend
- REST APIs for products and cart
- Validation middleware using express-validator
- Centralized error handling
- In-memory data storage (as allowed by assignment)
- Environment variable support via `.env`

### DevOps
- Dockerfile for frontend
- Dockerfile for backend
- docker-compose setup to run the entire app with a single command

---

## Project Structure

```

naksh-jewels-ecommerce/
├── frontend/
│   ├── src/
│   │   ├── components/      # ProductCard, CartItem
│   │   ├── pages/           # ProductListing, CartPage
│   │   ├── store/           # Redux store and slices
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

````

---

## Getting Started

### Prerequisites
- Docker and Docker Compose  
  **OR**
- Node.js 20+ and npm (for local development)

---

## Option 1: Run with Docker (Recommended)

From the project root:

```bash
docker-compose up --build
````

### Services

| Service  | URL                                                    |
| -------- | ------------------------------------------------------ |
| Frontend | [http://localhost:3000](http://localhost:3000)         |
| Backend  | [http://localhost:5000/api](http://localhost:5000/api) |

To stop:

```bash
docker-compose down
```

---

## Option 2: Local Development

### Backend

```bash
cd backend
npm install
npm start
```

Server runs at: [http://localhost:5000](http://localhost:5000)

Create a `.env` file based on the example:

```bash
copy .env.example .env
```

### Frontend

```bash
cd frontend
npm install
npm start
```

App runs at: [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

### Base URL

* Local: `http://localhost:5000/api`
* Docker: `http://localhost:5000/api`

### GET /api/products

Returns all products.

Example:

```bash
curl http://localhost:5000/api/products
```

Response:

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

---

### POST /api/cart

Validates and adds an item to the cart.

Request:

```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
```

Validation rules:

* `productId`: required, positive integer, must exist
* `quantity`: required, integer between 1 and 99

Success response:

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

Error response:

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

## Quick Verification Checklist

* Frontend loads and displays product cards correctly
* Add to Cart updates cart state and UI
* Cart quantity update and remove item work as expected
* GET `/api/products` returns product list
* POST `/api/cart` validates payload and handles errors
* `docker-compose up --build` runs both frontend and backend successfully

---

## Design Decisions

### Backend

* **In-memory storage**: Used as allowed by the assignment. In production, this could be replaced with Redis or a database.
* **Validation strategy**: express-validator for declarative and consistent request validation.
* **Error handling**: Centralized middleware for predictable API error responses.
* **API design**: RESTful conventions with consistent response format.

### Frontend

* **State management**: Redux Toolkit chosen to demonstrate scalable state management patterns.
* **Component design**: Functional components with hooks following React best practices.
* **Styling approach**: Custom CSS only, no external UI libraries as per requirements.
* **Focus**: UI kept minimal to emphasize functionality, code quality, and architecture.

---

## Tech Stack

| Layer    | Technology                             |
| -------- | -------------------------------------- |
| Frontend | React 18, Redux Toolkit, Axios         |
| Styling  | Custom CSS                             |
| Backend  | Node.js 20, Express, express-validator |
| DevOps   | Docker, Docker Compose                 |

---

## Author

Developed by **Charan Katkam**
Full Stack Developer

Built for the Naksh Jewels ReactJS & Node.js Internship Assessment
