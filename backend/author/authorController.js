const prisma = require("../db/config");

const addAuthor = async (req, res) => {
  const { first_name, family_name, date_of_birth, date_of_death } = req.body;

  try {
    if (
      !first_name ||
      first_name.trim() === "" ||
      !family_name ||
      family_name.trim() === "" ||
      !date_of_birth ||
      !date_of_death
    ) {
      return res.status(401).json({ message: "Invalid author details" });
    }

    const newAuthor = await prisma.author.create({
      data: {
        first_name,
        family_name,
        date_of_birth: new Date(date_of_birth),
        date_of_death: new Date(date_of_death),
      },
    });

    return res.status(201).json({ message: "Success", author: newAuthor });
  } catch (error) {
    console.error("Error creating author:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const showAuthor = async (req, res) => {
  try {
    const allAuthors = await prisma.author.findMany();
    return res.status(200).json(allAuthors);
  } catch (error) {
    console.error("Error finding author:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateAuthor = async (req, res) => {
  const id = Number(req.params.id);
  const { first_name, family_name, date_of_birth, date_of_death } = req.body;

  try {
    const authorExists = await prisma.author.findUnique({ where: { id } });
    if (!authorExists) {
      return res.status(404).json({ message: "Author not found" });
    }

    const updatedAuthor = await prisma.author.update({
      where: { id },
      data: {
        first_name,
        family_name,
        date_of_birth: date_of_birth ? new Date(date_of_birth) : null,
        date_of_death: date_of_death ? new Date(date_of_death) : null,
      },
    });

    return res.status(200).json(updatedAuthor);
  } catch (error) {
    console.error("Error updating author:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addAuthor, showAuthor, updateAuthor };
