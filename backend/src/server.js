require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const PORT = 5000;
const app = express();

const recipeRoutes = require("./routes/recipes");


app.use(express.json());


app.use("/api/recipes", recipeRoutes);


mongoose
.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));


app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
