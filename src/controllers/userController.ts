import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.models';

// resgister user
export const registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: "Error creating user" });
    }
};

// login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body); // 

    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        console.log(user); // Log user untuk memeriksa apakah ditemukan

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};



//   logout user
export const logoutUser = (_: Request, res: Response) => {
    res.clearCookie('token');
    res.json({ message: "Logged out successfully" });
};
