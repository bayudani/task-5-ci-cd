import express from 'express';
import { getAllBooks, createBook, updateBook, deleteBook } from '../controllers/bookController';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Ambil semua buku
 *     description: Mengambil semua data buku dari database.
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Daftar buku berhasil diambil.
 *       500:
 *         description: Terjadi kesalahan saat mengambil buku.
 */
router.get('/', authenticateJWT, getAllBooks);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Tambah buku baru
 *     description: Mengambil data buku baru dan menyimpannya ke database.
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishYear:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Buku berhasil ditambahkan.
 *       400:
 *         description: Terjadi kesalahan saat menambahkan buku.
 */
router.post('/', authenticateJWT, createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update buku
 *     description: Memperbarui data buku berdasarkan ID.
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID dari buku yang akan diperbarui
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishYear:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Buku berhasil diperbarui.
 *       404:
 *         description: Buku tidak ditemukan.
 *       400:
 *         description: Terjadi kesalahan saat memperbarui buku.
 */
router.put('/:id', authenticateJWT, updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Hapus buku
 *     description: Menghapus buku berdasarkan ID.
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID dari buku yang akan dihapus
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Buku berhasil dihapus.
 *       404:
 *         description: Buku tidak ditemukan.
 *       400:
 *         description: Terjadi kesalahan saat menghapus buku.
 */
router.delete('/:id', authenticateJWT, deleteBook);

export default router;
