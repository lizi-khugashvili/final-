const express = require("express");
const { getDB } = require("../db");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const db = getDB();

    const { items, totalPrice, customerName, customerEmail, customerPhone } = req.body;

    if (!customerName || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "customerName and items are required"
      });
    }

    const orderResult =await db.run(
      `
      INSERT INTO orders (customerName, customerEmail, customerPhone, totalPrice)
      VALUES (?, ?, ?, ?)
      `,
      [
        customerName,
        customerEmail || "",
        customerPhone || "",
        totalPrice || 0
      ]
    );

    const orderId =orderResult.lastID;

    for (const item of items) {
      await db.run(
        `
        INSERT INTO order_items (orderId, bookId, quantity, unitPrice)
        VALUES (?, ?, ?, ?)
        `,
        [orderId, item.bookId, item.quantity, item.unitPrice]
      );
    }

    const newOrder= await db.get("SELECT * FROM orders WHERE id = ?", [orderId]);

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create order",
      error: error.message
    });
  }
});

module.exports = router;