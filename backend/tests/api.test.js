/**
 * Backend API Tests
 * Tests all product endpoints, cart operations, validation, and error handling
 */

const request = require("supertest");
const app = require("../server");

describe("Product API Endpoints", () => {
  describe("GET /api/products", () => {
    it("should return all products with success status", async () => {
      const res = await request(app).get("/api/products");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBeGreaterThan(0);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("should return products with all required fields", async () => {
      const res = await request(app).get("/api/products");
      const product = res.body.data[0];

      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("image");
      expect(product).toHaveProperty("description");
    });

    it("should filter products by price range", async () => {
      const res = await request(app).get("/api/products?minPrice=5000&maxPrice=15000");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);

      // All products should be within price range
      res.body.data.forEach((product) => {
        expect(product.price).toBeGreaterThanOrEqual(5000);
        expect(product.price).toBeLessThanOrEqual(15000);
      });
    });
  });

  describe("GET /api/products/:id", () => {
    it("should return a single product by ID", async () => {
      const res = await request(app).get("/api/products/1");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(1);
    });

    it("should return 404 for non-existent product", async () => {
      const res = await request(app).get("/api/products/999");

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain("not found");
    });

    it("should return 404 for invalid product ID", async () => {
      const res = await request(app).get("/api/products/invalid");

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});

describe("Cart API Endpoints", () => {
  describe("GET /api/cart", () => {
    it("should return empty cart initially", async () => {
      const res = await request(app).get("/api/cart");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.items).toEqual([]);
      expect(res.body.data.summary.itemCount).toBe(0);
      expect(res.body.data.summary.total).toBe(0);
    });
  });

  describe("POST /api/cart", () => {
    it("should add valid item to cart", async () => {
      const res = await request(app)
        .post("/api/cart")
        .send({ productId: 1, quantity: 2 });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.productId).toBe(1);
      expect(res.body.data.quantity).toBe(2);
    });

    it("should reject missing productId", async () => {
      const res = await request(app)
        .post("/api/cart")
        .send({ quantity: 2 });

      expect(res.statusCode).toBe(422);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeDefined();
    });

    it("should reject missing quantity", async () => {
      const res = await request(app)
        .post("/api/cart")
        .send({ productId: 1 });

      expect(res.statusCode).toBe(422);
      expect(res.body.success).toBe(false);
    });

    it("should reject negative quantity", async () => {
      const res = await request(app)
        .post("/api/cart")
        .send({ productId: 1, quantity: -5 });

      expect(res.statusCode).toBe(422);
      expect(res.body.success).toBe(false);
    });

    it("should reject zero quantity", async () => {
      const res = await request(app)
        .post("/api/cart")
        .send({ productId: 1, quantity: 0 });

      expect(res.statusCode).toBe(422);
      expect(res.body.success).toBe(false);
    });

    it("should reject quantity over 99", async () => {
      const res = await request(app)
        .post("/api/cart")
        .send({ productId: 1, quantity: 100 });

      expect(res.statusCode).toBe(422);
      expect(res.body.success).toBe(false);
    });

    it("should reject string as productId", async () => {
      const res = await request(app)
        .post("/api/cart")
        .send({ productId: "abc", quantity: 2 });

      expect(res.statusCode).toBe(422);
      expect(res.body.success).toBe(false);
    });

    it("should reject non-existent product", async () => {
      const res = await request(app)
        .post("/api/cart")
        .send({ productId: 999, quantity: 2 });

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain("not found");
    });

    it("should handle empty request body", async () => {
      const res = await request(app)
        .post("/api/cart")
        .send({});

      expect(res.statusCode).toBe(422);
      expect(res.body.success).toBe(false);
    });
  });

  describe("PUT /api/cart/:productId", () => {
    beforeEach(async () => {
      // Add item to cart first
      await request(app)
        .post("/api/cart")
        .send({ productId: 1, quantity: 2 });
    });

    it("should update cart item quantity", async () => {
      const res = await request(app)
        .put("/api/cart/1")
        .send({ quantity: 5 });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.quantity).toBe(5);
    });

    it("should reject invalid quantity", async () => {
      const res = await request(app)
        .put("/api/cart/1")
        .send({ quantity: 0 });

      expect(res.statusCode).toBe(422);
      expect(res.body.success).toBe(false);
    });

    it("should return 404 for item not in cart", async () => {
      const res = await request(app)
        .put("/api/cart/5")
        .send({ quantity: 3 });

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe("DELETE /api/cart/:productId", () => {
    beforeEach(async () => {
      // Add item to cart first
      await request(app)
        .post("/api/cart")
        .send({ productId: 2, quantity: 1 });
    });

    it("should remove item from cart", async () => {
      const res = await request(app).delete("/api/cart/2");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain("removed");
    });

    it("should return 404 for item not in cart", async () => {
      const res = await request(app).delete("/api/cart/999");

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe("DELETE /api/cart", () => {
    it("should clear entire cart", async () => {
      // Add items first
      await request(app).post("/api/cart").send({ productId: 1, quantity: 2 });
      await request(app).post("/api/cart").send({ productId: 2, quantity: 1 });

      const res = await request(app).delete("/api/cart");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain("cleared");

      // Verify cart is empty
      const cartRes = await request(app).get("/api/cart");
      expect(cartRes.body.data.items).toEqual([]);
    });
  });
});

describe("Error Handling", () => {
  describe("404 Handler", () => {
    it("should return 404 for non-existent routes", async () => {
      const res = await request(app).get("/api/invalid/route");

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain("not found");
    });
  });

  describe("Health Check", () => {
    it("should return server status", async () => {
      const res = await request(app).get("/health");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain("running");
      expect(res.body.timestamp).toBeDefined();
    });
  });
});

describe("Edge Cases", () => {
  it("should handle malformed JSON", async () => {
    const res = await request(app)
      .post("/api/cart")
      .set("Content-Type", "application/json")
      .send("{ invalid json }");

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it("should handle null values", async () => {
    const res = await request(app)
      .post("/api/cart")
      .send({ productId: null, quantity: null });

    expect(res.statusCode).toBe(422);
    expect(res.body.success).toBe(false);
  });

  it("should handle float numbers for quantity", async () => {
    const res = await request(app)
      .post("/api/cart")
      .send({ productId: 1, quantity: 2.5 });

    expect(res.statusCode).toBe(422);
    expect(res.body.success).toBe(false);
  });
});
