const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addBook = async (req, res) => {
  try {
    const { title, summary, isbn } = req.body;

    if (
      !title ||
      title.trim() === "" ||
      !summary ||
      summary.trim() === "" ||
      !isbn ||
      isbn.trim() === ""
    ) {
      return res.status(401).json({ message: "Invalid book details" });
    }

    const newBook = await prisma.book.create({
      data: {
    title,
    summary,
    isbn,
    author: {
      create: {
        first_name: "John",
        family_name: "Doe",
        name: "John Doe"
      }
    }
  }
    });

    return res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const showBook = async (req, res) => {
  try {
    const allBooks = await prisma.book.findMany();
    return res.status(200).json(allBooks);
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addBook,showBook};
