const prisma = require("../db/config");

// Create or find author by full name
const findOrCreateAuthor = async (authorName) => {
  const [first, ...rest] = authorName.trim().split(" ");
  const family = rest.join(" ") || "";

  const author =
    (await prisma.author.findFirst({ where: { first_name: first, family_name: family } })) ||
    (await prisma.author.create({ data: { first_name: first, family_name: family } }));

  return author;
};

// Create or find multiple genres by name array
const findOrCreateGenres = async (genreIdsOrNames) => {
  const genres = [];

  for (const g of genreIdsOrNames) {
    let genre;
    if (typeof g === "number") {
      genre = await prisma.genre.findUnique({ where: { id: g } });
    } else {
      genre = (await prisma.genre.findFirst({ where: { name: g.trim() } })) ||
              (await prisma.genre.create({ data: { name: g.trim() } }));
    }
    if (genre) genres.push(genre);
  }

  return genres;
};

const addBook = async (req, res) => {
  try {
    const { title, summary, isbn, authorName, genreIds } = req.body;

    if (!title?.trim() || !summary?.trim() || !isbn?.trim() || !authorName?.trim() || !genreIds?.length) {
      return res.status(400).json({ message: "All fields are required and must be valid" });
    }

    const author = await findOrCreateAuthor(authorName);
    const genres = await findOrCreateGenres(genreIds);

    const newBook = await prisma.book.create({
      data: {
        title: title.trim(),
        summary: summary.trim(),
        isbn: isbn.trim(),
        authorId: author.id,
        genres: { connect: genres.map((g) => ({ id: g.id })) },
      },
      include: { author: true, genres: true },
    });

    return res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const showBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({ include: { author: true, genres: true } });
    return res.status(200).json(books);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateBook = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, summary, isbn, authorName, genreIds } = req.body;

    const book = await prisma.book.findUnique({ where: { id }, include: { genres: true } });
    if (!book) return res.status(404).json({ message: "Book not found" });

    let authorId = book.authorId;
    if (authorName?.trim()) {
      const author = await findOrCreateAuthor(authorName);
      authorId = author.id;
    }

    let genreConnect = undefined;
    if (genreIds?.length) {
      const genres = await findOrCreateGenres(genreIds);
      genreConnect = genres.map((g) => ({ id: g.id }));
    }

    const updated = await prisma.book.update({
      where: { id },
      data: {
        title: title?.trim(),
        summary: summary?.trim(),
        isbn: isbn?.trim(),
        authorId,
        ...(genreConnect && { genres: { set: [], connect: genreConnect } }),
      },
      include: { author: true, genres: true },
    });

    return res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) return res.status(404).json({ message: "Book not found" });

    await prisma.book.delete({ where: { id } });
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addBook, showBooks, updateBook, deleteBook };
