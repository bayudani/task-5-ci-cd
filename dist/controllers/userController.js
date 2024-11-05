"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_models_1 = __importDefault(require("../models/user.models"));
// resgister user
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const newUser = new user_models_1.default({ username, password: hashedPassword });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(400).json({ message: "Error creating user" });
    }
};
exports.registerUser = registerUser;
// login user
const loginUser = async (req, res) => {
    console.log(req.body); // 
    try {
        const { username, password } = req.body;
        const user = await user_models_1.default.findOne({ username });
        console.log(user); // Log user untuk memeriksa apakah ditemukan
        if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.loginUser = loginUser;
//   logout user
const logoutUser = (_, res) => {
    res.clearCookie('token');
    res.json({ message: "Logged out successfully" });
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=userController.js.map