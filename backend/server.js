const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserRouter = require("./routes/UserRoutes");
const ProductRouter = require("./routes/productRouteer");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", UserRouter);
app.use("/api/products", ProductRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
