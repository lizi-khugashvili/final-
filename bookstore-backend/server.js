const express= require("express");
const cors= require("cors");
const { initDB }= require("./db");
const booksRoutes= require("./routes/books");
const ordersRoutes= require("./routes/orders");

const app = express();
const PORT= 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bookstore API is running");
});

app.use("/api/books", booksRoutes);
app.use("/api/orders", ordersRoutes);

async function startServer() {
  try {
    await initDB();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
}

startServer()