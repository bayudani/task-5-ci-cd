import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/userController';

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Mendaftarkan pengguna baru
 *     description: Mengambil data username dan password untuk mendaftar.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pengguna berhasil dibuat.
 *       400:
 *         description: Terjadi kesalahan saat membuat pengguna.
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login pengguna
 *     description: Mengambil data username dan password untuk login.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login berhasil dan token dihasilkan.
 *       401:
 *         description: Kredensial tidak valid.
 *       500:
 *         description: Terjadi kesalahan saat login.
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout pengguna
 *     description: Menghapus cookie token untuk logout.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Logout berhasil.
 */
router.post('/logout', logoutUser);

export default router;
