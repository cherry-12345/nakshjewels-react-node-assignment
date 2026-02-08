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
- Cart totals display (item count and total price)
- State management using Redux Toolkit
- Responsive design with custom CSS
- Full CRUD cart API (GET, POST, PUT, DELETE)
- GET /products and GET /products/:id APIs
- Comprehensive validation middleware with express-validator
- Centralized error handling with custom error classes
- In-memory data storage with multi-user support
- Docker containerization
- **Automated tests for backend (30+ tests) and frontend (40+ tests)**
- JSDoc comments and code documentation
- Professional README with API documentation

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

## Testing

The project includes comprehensive automated tests for both backend and frontend.

### Backend Tests

**Test Coverage:**
- All API endpoints (Products & Cart)
- Validation and error handling
- Edge cases (negative numbers, strings, null, malformed JSON)
- HTTP status codes
- 404 handling

**Run Backend Tests:**

```bash
cd backend
npm install
npm test
```

**Test Output:**
- Tests use Jest + Supertest
- Includes code coverage report
- Tests all CRUD operations
- Validates all error scenarios

**Example test results:**
```
PASS tests/api.test.js
  Product API Endpoints
    ✓ should return all products
    ✓ should return single product by ID
    ✓ should return 404 for non-existent product
  Cart API Endpoints
    ✓ should add valid item to cart
    ✓ should reject negative quantity
    ✓ should reject quantity over 99
    ✓ should reject non-existent product
  Error Handling
    ✓ should return 404 for non-existent routes
  Edge Cases
    ✓ should handle null values
    ✓ should handle float numbers

Test Suites: 1 passed
Tests: 30+ passed
Coverage: 90%+
```

### Frontend Tests

**Test Coverage:**
- Redux cart slice (all actions and reducers)
- Redux product slice (async thunks)
- State selectors (cart totals, item counts)
- Edge cases (quantity limits, empty cart)

**Run Frontend Tests:**

```bash
cd frontend
npm install
npm test
```

**Test Output:**
- Tests use Jest + React Testing Library
- Covers all Redux state management
- Tests async operations
- Validates edge cases

**Example test results:**
```
PASS src/store/slices/cartSlice.test.js
  Cart Slice
    ✓ should add new item to cart
    ✓ should increment quantity for existing item
    ✓ should not exceed max quantity of 99
    ✓ should remove item from cart
    ✓ should update item quantity
    ✓ should calculate correct totals

PASS src/store/slices/productSlice.test.js
  Product Slice
    ✓ should successfully load products
    ✓ should handle API errors
    ✓ should set loading states correctly

Test Suites: 2 passed
Tests: 40+ passed
```

### Run All Tests

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test -- --watchAll=false
```

### Test Files

**Backend:**
- `backend/tests/api.test.js` - Comprehensive API tests

**Frontend:**
- `frontend/src/store/slices/cartSlice.test.js` - Cart state tests
- `frontend/src/store/slices/productSlice.test.js` - Product state tests

---

## API Documentation

### Base URL
- **Local Development:** `http://localhost:5000/api`
- **Docker:** `http://localhost:5000/api`

### Response Format
All API responses follow a consistent structure:

**Success Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "errors": [ ... ] // Optional validation errors
}
```

---

### Product Endpoints

#### `GET /api/products`

Get all products with optional price filtering.

**Query Parameters (Optional):**
- `minPrice` (number): Filter products with price >= minPrice
- `maxPrice` (number): Filter products with price <= maxPrice

**Example Request:**
```bash
curl http://localhost:5000/api/products
```

**Example with filters:**
```bash
curl "http://localhost:5000/api/products?minPrice=2000&maxPrice=15000"
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "id": 1,
      "name": "Royal Kundan Necklace Set",
      "price": 12499,
      "image": "https://images.unsplash.com/...",
      "description": "Elegant kundan necklace set..."
    },
    ...
  ]
}
```

---

#### `GET /api/products/:id`

Get single product by ID.

**URL Parameters:**
- `id` (number): Product ID

**Example Request:**
```bash
curl http://localhost:5000/api/products/1
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Royal Kundan Necklace Set",
    "price": 12499,
    "image": "https://images.unsplash.com/...",
    "description": "Elegant kundan necklace set..."
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Product with ID 999 not found"
}
```

---

### Cart Endpoints

**Note:** All cart endpoints support multi-user functionality via the `x-user-id` header. If not provided, defaults to "default-user".

#### `GET /api/cart`

Get all items in cart with full product details and totals.

**Headers (Optional):**
- `x-user-id` (string): User identifier for multi-user support

**Example Request:**
```bash
curl http://localhost:5000/api/cart
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "name": "Royal Kundan Necklace Set",
        "price": 12499,
        "image": "...",
        "description": "...",
        "quantity": 2,
        "subtotal": 24998
      }
    ],
    "summary": {
      "itemCount": 2,
      "total": 24998
    }
  }
}
```

---

#### `POST /api/cart`

Add item to cart. If item already exists, quantity is added to existing quantity (max 99).

**Request Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Validation Rules:**
- `productId`: Required, positive integer
- `quantity`: Required, integer between 1-99
- Product must exist in inventory

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Item added to cart successfully",
  "data": {
    "productId": 1,
    "quantity": 2,
    "itemCount": 2
  }
}
```

**Validation Error (422):**
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": [
    {
      "field": "quantity",
      "message": "quantity must be an integer between 1 and 99"
    }
  ]
}
```

**Product Not Found (404):**
```json
{
  "success": false,
  "error": "Product with ID 999 not found"
}
```

**Edge Cases Handled:**
- Negative numbers → Validation error
- Strings/floats → Validation error
- Missing fields → Validation error
- Non-existent product → 404 error
- Quantity > 99 → Validation error

---

#### `PUT /api/cart/:productId`

Update quantity of a specific cart item.

**URL Parameters:**
- `productId` (number): Product ID to update

**Request Body:**
```json
{
  "quantity": 5
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:5000/api/cart/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 5}'
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Cart item updated successfully",
  "data": {
    "productId": 1,
    "quantity": 5,
    "itemCount": 5
  }
}
```

**Item Not in Cart (404):**
```json
{
  "success": false,
  "error": "Product 5 not found in cart"
}
```

---

#### `DELETE /api/cart/:productId`

Remove specific item from cart.

**URL Parameters:**
- `productId` (number): Product ID to remove

**Example Request:**
```bash
curl -X DELETE http://localhost:5000/api/cart/1
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Item removed from cart successfully",
  "data": {
    "productId": 1,
    "itemCount": 0
  }
}
```

---

#### `DELETE /api/cart`

Clear entire cart (remove all items).

**Example Request:**
```bash
curl -X DELETE http://localhost:5000/api/cart
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Cart cleared successfully"
}
```

---

### Health Check Endpoint

#### `GET /health`

Check server status.

**Example Request:**
```bash
curl http://localhost:5000/health
```

**Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-02-08T10:30:00.000Z"
}
```

---

### Error Handling

The API uses standard HTTP status codes and returns consistent error responses:

| Status Code | Description                          |
|-------------|--------------------------------------|
| 200         | Success                               |
| 201         | Resource created successfully         |
| 400         | Bad request (malformed payload)       |
| 404         | Resource not found                    |
| 422         | Validation failed                     |
| 500         | Internal server error                 |

**All errors include:**
- `success: false`
- `error`: Error message string
- `errors`: Array of validation errors (if applicable)
- `stack`: Stack trace (development mode only)

---

## Design Decisions

### Backend Architecture

**1. In-Memory Cart Storage**
- Used `Map` for O(1) lookup performance
- Structure: `{ userId: { productId: quantity } }`
- In production, this would be Redis or database
- Allows multi-user support via `x-user-id` header

**2. Validation Strategy**
- `express-validator` for declarative validation rules
- Type coercion (`.toInt()`) for robust edge case handling
- Centralized validation error handling

**3. Error Handling Pattern**
- Custom error classes (`NotFoundError`, `ValidationError`, etc.)
- Centralized error middleware
- Consistent error response format
- Stack traces only in development

**4. API Design**
- RESTful conventions (GET, POST, PUT, DELETE)
- Consistent response format
- Proper HTTP status codes
- Resource-oriented URLs

**5. Code Quality**
- JSDoc comments for all functions
- Descriptive function and variable names
- Separation of concerns (controllers, routes, middlewares)
- DRY principle (no code duplication)

### Frontend Architecture

**1. State Management**
- Redux Toolkit for cart state (persistent across pages)
- Async thunks for API calls with loading/error states
- Normalized state structure

**2. Component Design**
- Functional components with hooks
- Single responsibility principle
- Props for reusability
- No external UI libraries

**3. Styling Approach**
- Custom CSS with CSS variables for consistency
- Mobile-first responsive design
- BEM-like naming convention

---

## Testing the API

### Test All Edge Cases

**1. Valid Requests**
```bash
# Get all products
curl http://localhost:5000/api/products

# Add to cart
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
```

**2. Validation Errors**
```bash
# Missing fields
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{}'

# Invalid quantity (0)
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 0}'

# Invalid quantity (> 99)
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 100}'

# Negative number
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": -5}'

# String instead of number
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": "abc", "quantity": 2}'
```

**3. Not Found Errors**
```bash
# Non-existent product
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 999, "quantity": 2}'

# Non-existent route
curl http://localhost:5000/api/invalid
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