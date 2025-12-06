// ---------------------------------------------
// SERVER.JS — BOOK AVAILABILITY BACKEND (ESM VERSION)
// ---------------------------------------------

import express from "express";
const app = express();

app.use(express.json());

// ---------------------------------------------
// MOCK DATABASE (in-memory)
// ---------------------------------------------
let books = {
    "Clean Code": {
        author: "Robert C. Martin",
        copies: 3,
        reserved: 1,
        waitlist: []
    },
    "Data Structures and Algorithms": {
        author: "Mark Weiss",
        copies: 5,
        reserved: 5,
        waitlist: ["user1@example.com"]
    },
    "Artificial Intelligence Basics": {
        author: "Tom Taulli",
        copies: 2,
        reserved: 0,
        waitlist: []
    }
};

// ---------------------------------------------
// 1. CHECK BOOK AVAILABILITY
// ---------------------------------------------
app.get("/books/availability/:title", (req, res) => {
    const title = decodeURIComponent(req.params.title);

    if (!books[title]) {
        return res.status(404).json({
            status: "error",
            message: "Book not found in library."
        });
    }

    const book = books[title];
    const available = book.copies - book.reserved;

    res.json({
        title,
        author: book.author,
        total_copies: book.copies,
        available,
        waitlist_length: book.waitlist.length,
        status: available > 0 ? "available" : "unavailable"
    });
});

// ---------------------------------------------
// 2. RESERVE A BOOK
// ---------------------------------------------
app.post("/books/reserve", (req, res) => {
    const { title, email } = req.body;

    if (!title || !email) {
        return res.status(400).json({
            status: "error",
            message: "Missing title or email."
        });
    }

    if (!books[title]) {
        return res.status(404).json({
            status: "error",
            message: "Book not found."
        });
    }

    const book = books[title];
    const available = book.copies - book.reserved;

    if (available > 0) {
        book.reserved++;
        return res.json({
            status: "success",
            message: `Book '${title}' reserved for ${email}.`
        });
    } else {
        book.waitlist.push(email);
        return res.json({
            status: "waitlisted",
            message: `No copies available. ${email} added to waitlist.`
        });
    }
});

// ---------------------------------------------
// 3. GET WAITLIST
// ---------------------------------------------
app.get("/books/waitlist/:title", (req, res) => {
    const title = decodeURIComponent(req.params.title);

    if (!books[title]) {
        return res.status(404).json({
            status: "error",
            message: "Book not found."
        });
    }

    res.json({
        title,
        waitlist: books[title].waitlist
    });
});

// ---------------------------------------------
// SERVER START
// ---------------------------------------------
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Library API running on http://localhost:${PORT}`);
});
