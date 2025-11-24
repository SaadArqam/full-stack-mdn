const prisma = require("../db/config");

const addBook = async (req, res) => {
  try {
    const { title, summary, isbn, authorId, genreId } = req.body;

    if (
      !title ||
      title.trim() === "" ||
      !summary ||
      summary.trim() === "" ||
      !isbn ||
      isbn.trim() === "" ||
      !authorId ||
      !genreId
    ) {
      return res.status(401).json({ message: "Invalid book details" });
    }

    const newBook = await prisma.book.create({
      data: {
        title,
        summary,
        isbn,
        author: { connect: { id: Number(authorId) } },
        genres: {
          connect: [{ id: Number(genreId) }],
        },
      },
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
    console.error("Error finding book:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateBook = async (req, res) => {
  const id = Number(req.params.id);
  const { title, summary, isbn } = req.body;

  try {
    const bookExists = await prisma.book.findUnique({ where: { id } });
    if (!bookExists) {
      return res.status(404).json({ message: "Book not found" });
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data: { title, summary, isbn },
    });

    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addBook, showBook, updateBook };
