const express = require("express");
const { registerUser, loginUser } = require("../controllers/UserController");
const upload = require("../middlewares/upload");

const UserRouter = express.Router();

UserRouter.post("/register", upload.single("profilePicture"), registerUser);
UserRouter.post("/login", loginUser);

module.exports = UserRouter;
