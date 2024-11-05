"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getAllBooks = void 0;
const book_models_1 = __importDefault(require("../models/book.models"));
// ambil semua data buku
const getAllBooks = async (_, res) => {
    try {
        const books = await book_models_1.default.find();
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving books" });
    }
};
exports.getAllBooks = getAllBooks;
// create a new book
const createBook = async (req, res) => {
    const { title, author, publishYear } = req.body;
    const newBook = new book_models_1.default({ title, author, publishYear });
    try {
        const savedBook = await newBook.save();
        res.status(200).json(savedBook);
    }
    catch (error) {
        res.status(400).json({ message: "error create book" });
    }
};
exports.createBook = createBook;
// // update a book
// export const updateBook = async (req:Request, res:Response) =>{
//     const {id} = req.params;
//     const {title, author, publishYear} = req.body;
//     try {
//         const updatedBook = await Book.findByIdAndUpdate(id, {title, author, publishYear}, {new: true});
//         if (!updatedBook) return res.status(404).json({message: "book not found"});
//         res.json(updatedBook);
//     } catch (error) {
//         res.status(400).json({message: "error update book"});
//     }
// };
const updateBook = async (req, res) => {
    const book = await book_models_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (book)
        res.status(200).json(book);
    else
        res.status(404).json({ message: "Buku Tidak Ditemukan" });
};
exports.updateBook = updateBook;
// delete a book
const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        await book_models_1.default.findByIdAndDelete(id);
        res.json({ message: "book deleted" });
    }
    catch (error) {
        res.status(400).json({ message: "error deleting book" });
    }
};
exports.deleteBook = deleteBook;
//# sourceMappingURL=bookController.js.map