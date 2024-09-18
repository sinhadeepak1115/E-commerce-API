const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", require("./routes/auth"));

//public route
app.use("/test", require("./routes/test"));

//protected route
app.use("/products", require("./routes/products"));
app.use("/user", require("./routes/user"));
app.use("/cart", require("./routes/cart"));
app.use("/payment", require("./routes/payment"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
