const express = require("express");
const { getDB } =require("../db");

const router= express.Router();


router.get("/", async (req, res) => {
  try {
    const db =getDB();
    const { search, genre } = req.query;

    let sql = "SELECT * FROM books WHERE 1=1";
    const params =[];

    if (search) {
      sql += " AND title LIKE ?";
      params.push(`%${search}%`);
    }

    if (genre && genre !=="All Genres") {
      sql += " AND genre = ?";
      params.push(genre);
    }

    sql += " ORDER BY id DESC";

    const books = await db.all(sql, params);
    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch books",
      error: error.message
    });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const db = getDB();
    const id = Number(req.params.id);

    const book = await db.get("SELECT * FROM books WHERE id = ?", [id]);

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch book",
      error: error.message
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const db =getDB();

    const {
      title,
      author,
      description,
      price,
      genre,
      inStock,
      coverEmoji
    } = req.body;

    if (!title || !author || price ===undefined) {
      return res.status(400).json({
        message: "title, author and price are required"
      });
    }

    const result = await db.run(
      `
      INSERT INTO books (title, author, description, price, genre, inStock, coverEmoji)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        title,
        author,
        description || "",
        price,
        genre || "",
        inStock=== undefined ? 1:inStock? 1 : 0,
        coverEmoji || "📘"
      ]
    );

    const newBook =await db.get("SELECT * FROM books WHERE id = ?", [
      result.lastID
    ]);

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create book",
      error: error.message
    });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const db = getDB();
    const id = Number(req.params.id);

    const existingBook = await db.get("SELECT * FROM books WHERE id = ?", [id]);

    if (!existingBook) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    const {
      title,
      author,
      description,
      price,
      genre,
      inStock,
      coverEmoji
    } = req.body;

    const updatedTitle = title ?? existingBook.title;
    const updatedAuthor = author ?? existingBook.author;
    const updatedDescription = description ?? existingBook.description;
    const updatedPrice = price ?? existingBook.price;
    const updatedGenre = genre ?? existingBook.genre;
    const updatedInStock =
      inStock !==undefined ?(inStock ? 1 : 0) : existingBook.inStock;
    const updatedCoverEmoji = coverEmoji ?? existingBook.coverEmoji;

    await db.run(
      `
      UPDATE books
      SET title =?, author = ?, description = ?, price = ?, genre = ?, inStock = ?, coverEmoji = ?
      WHERE id = ?
      `,
      [
        updatedTitle,
        updatedAuthor,
        updatedDescription,
        updatedPrice,
        updatedGenre,
        updatedInStock,
        updatedCoverEmoji,
        id
      ]
    );

    const updatedBook = await db.get("SELECT * FROM books WHERE id = ?", [id]);

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update book",
      error: error.message
    });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const db = getDB();
    const id = Number(req.params.id);

    const existingBook = await db.get("SELECT * FROM books WHERE id = ?", [id]);

    if (!existingBook) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    await db.run("DELETE FROM books WHERE id = ?", [id]);

    res.json({
      message: "Book deleted successfully",
      deletedBook: existingBook
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete book",
      error: error.message
    });
  }
});

module.exports = router;