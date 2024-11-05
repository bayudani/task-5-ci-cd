import { Request, Response } from "express";
import Book from '../models/book.models';

// ambil semua data buku
export const getAllBooks = async (_: Request, res: Response) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books" });
    }
};


// create a new book
export const createBook = async (req: Request, res: Response) => {
    const { title, author, publishYear } = req.body;
    const newBook = new Book({ title, author, publishYear });
    try {
        const savedBook = await newBook.save();
        res.status(200).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: "error create book" });
    }
};

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
export const updateBook = async (
    req: Request,
    res: Response
): Promise<void> => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (book) res.status(200).json(book);
    else res.status(404).json({ message: "Buku Tidak Ditemukan" });
};


// delete a book
export const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Book.findByIdAndDelete(id);
        res.json({ message: "book deleted" });
    } catch (error) {
        res.status(400).json({ message: "error deleting book" });
    }
};