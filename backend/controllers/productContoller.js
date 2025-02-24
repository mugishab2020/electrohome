const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cloudinary = require("../config/cloudinary");

exports.createProduct = async (req, res) => {
  const { name, category, available, discount } = req.body;
  const photo = req.file;
  console.log(req.body);
  if (!name || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  let photourl = "";
  if (photo) {
    const uploadedResponse = await cloudinary.uploader.upload(photo.path, {
      folder: "productPhoto",
    });
    photourl = uploadedResponse.secure_url;
  }
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        category,
        photo: photo.path,
        available,
        discount,
      },
    });

    res
      .status(201)
      .json({ message: "Product created successfully", newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProductsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const products = await prisma.product.findMany({
      where: {
        category: category,
      },
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in this category" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
