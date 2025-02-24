const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

// Register User
const registerUser = async (req, res) => {
  try {
    const { username, email, password, address, phone } = req.body;
    const profilePicture = req.file;

    if (!username || !email || !password || !address || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let profilePictureUrl = "";
    if (profilePicture) {
      const uploadedResponse = await cloudinary.uploader.upload(
        profilePicture.path,
        {
          folder: "userprofiles",
        }
      );
      profilePictureUrl = uploadedResponse.secure_url;
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        address,
        phone,
        profilePicture: profilePictureUrl,
      },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error registering user", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in user" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
