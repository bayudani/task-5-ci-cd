// src/__tests__/unit/bookController.test.ts
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app'; // Pastikan jalur ini benar
import User from '../models/user.models'; // Sesuaikan dengan jalur model Anda
import Book from '../models/book.models'; // Sesuaikan dengan jalur model Anda
import bcrypt from 'bcrypt'; // Pastikan bcrypt yang di-import benar

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.disconnect();
    await mongoose.connect(mongoUri);

    // Buat pengguna untuk autentikasi dengan password di-hash
    const hashedPassword = await bcrypt.hash('password123', 10);
    await User.create({
        username: 'testuser',
        password: hashedPassword
    });
});

afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
    if (mongoServer) {
        await mongoServer.stop();
    }
});

describe('BookController', () => {
    let token: string; // Variabel untuk menyimpan token autentikasi

    const mockBook = {
        title: 'Test Book',
        author: 'Test Author',
        publishYear: 2016, // Gantilah sesuai dengan kebutuhan Anda
    };

    beforeAll(async () => {
        // Mendapatkan token untuk autentikasi
        const res = await request(app)
            .post('/api/users/login')
            .send({ username: 'testuser', password: 'password123' });

        token = res.body.token; // Simpan token untuk digunakan dalam pengujian berikutnya
    });

    beforeEach(async () => {
        await Book.deleteMany({}); // Hapus semua buku sebelum setiap pengujian
    });

    describe('POST /api/books', () => {
        it('should create a new book successfully', async () => {
            const res = await request(app)
                .post('/api/books')
                .set('Authorization', `Bearer ${token}`) // Menambahkan token ke header
                .send(mockBook);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body.title).toBe(mockBook.title);
            expect(res.body.author).toBe(mockBook.author);
            expect(res.body.publishYear).toBe(mockBook.publishYear);
        });

        // Hapus pengujian untuk ISBN
    });

    describe('GET /api/books', () => {
        it('should return empty array when no books exist', async () => {
            const res = await request(app)
                .get('/api/books')
                .set('Authorization', `Bearer ${token}`); // Menambahkan token ke header

            expect(res.status).toBe(200);
            expect(res.body).toEqual([]);
        });

        it('should return all books', async () => {
            await request(app)
                .post('/api/books')
                .set('Authorization', `Bearer ${token}`)
                .send(mockBook);

            await request(app)
                .post('/api/books')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Another Book',
                    author: 'Another Author',
                    publishYear: 2022
                });

            const res = await request(app)
                .get('/api/books')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(2);
        });
    });

    describe('GET /api/books/:id', () => {
        it('should return book by id', async () => {
            const created = await request(app)
                .post('/api/books')
                .set('Authorization', `Bearer ${token}`)
                .send(mockBook);

            const res = await request(app)
                .get(`/api/books/${created.body._id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
            expect(res.body.title).toBe(mockBook.title);
        });

        it('should return 404 for non-existent id', async () => {
            const fakeId = new mongoose.Types.ObjectId().toString();
            const res = await request(app)
                .get(`/api/books/${fakeId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(404);
        });
    });

    describe('PUT /api/books/:id', () => {
        it('should update book successfully', async () => {
            const created = await request(app)
                .post('/api/books')
                .set('Authorization', `Bearer ${token}`)
                .send(mockBook);

            const updateData = { title: 'Updated Title' };

            const res = await request(app)
                .put(`/api/books/${created.body._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updateData);

            expect(res.status).toBe(200);
            expect(res.body.title).toBe('Updated Title');
        });

        it('should return 404 when updating non-existent book', async () => {
            const fakeId = new mongoose.Types.ObjectId().toString();
            const res = await request(app)
                .put(`/api/books/${fakeId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ title: 'New Title' });

            expect(res.status).toBe(404);
        });
    });

    describe('DELETE /api/books/:id', () => {
        it('should delete book successfully', async () => {
            const created = await request(app)
                .post('/api/books')
                .set('Authorization', `Bearer ${token}`)
                .send(mockBook);

            const res = await request(app)
                .delete(`/api/books/${created.body._id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body.message).toBe("book deleted");
        });

        it('should return 404 when deleting non-existent book', async () => {
            const fakeId = new mongoose.Types.ObjectId().toString();
            const res = await request(app)
                .delete(`/api/books/${fakeId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(404);
        });
    });
});
