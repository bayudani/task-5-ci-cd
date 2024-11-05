"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
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
router.post('/register', userController_1.registerUser);
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
router.post('/login', userController_1.loginUser);
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
router.post('/logout', userController_1.logoutUser);
exports.default = router;
//# sourceMappingURL=user.Routes.js.map