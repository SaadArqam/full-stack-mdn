const prisma = require("../db/config");

const addGenre = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name || name.trim() === "") {
      return res.status(401).json({ message: "Invalid genre name" });
    }
    const newGenre = await prisma.genre.create({
      data: {
        name,
      },
    });
    return res.status(200).json(newGenre);
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const showGenre = async (req, res) => {
  try {
    const allGenre = await prisma.genre.findMany();
    return res.status(200).json(allGenre);
  } catch (error) {
    console.error("Error finding genre:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = { addGenre, showGenre };
