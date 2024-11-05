import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/user.models"; // Sesuaikan dengan jalur model Anda
import { loginUser } from "../controllers/userController"; // Sesuaikan dengan jalur controller Anda
// import jwt from "jsonwebtoken"; // Pastikan ini ada jika Anda menggunakannya dalam pengujian

jest.mock("bcrypt");
jest.mock("../models/user.models");

describe("AuthController", () => {
    beforeAll(() => {
        process.env.JWT_SECRET = "testsecret"; // Set variabel lingkungan untuk pengujian
    });

    it("should return a token on successful login", async () => {
        const mockUser = {
            _id: "user_id",
            username: "testuser",
            password: "hashedpassword",
        };
        (User.findOne as jest.Mock).mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);

        const req = {
            body: { username: "testuser", password: "password" },
        } as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ token: expect.any(String) })
        );
    });

    it("should return 401 for invalid credentials", async () => {
        (User.findOne as jest.Mock).mockResolvedValue(null);

        const req = {
            body: { username: "testuser", password: "password" },
        } as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });
});
