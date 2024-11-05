import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/user.models"; 
import { loginUser } from "../controllers/userController"; 
// import jwt from "jsonwebtoken"; 
jest.mock("bcrypt");
jest.mock("../models/user.models");

describe("AuthController", () => {
    beforeAll(() => {
        process.env.JWT_SECRET = "testsecret"; 
    });

    it("should return a token on successful login", async () => {
        const mockUser = {
            _id: "user_id",
            username: "user",
            password: "password",
        };
        (User.findOne as jest.Mock).mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);

        const req = {
            body: { username: "user", password: "password" },
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
            body: { username: "user", password: "password" },
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
