import User from '../model/users.js';
import bcrypt from 'bcryptjs'; 

import jwt from 'jsonwebtoken';


const JWT_SECRET ='b2d1e68f1cf85a2db96c5d05e1e0f06e36d47e16b5e8b69a51b58c78d4e6c2b4';

async function handleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        if (req.body.role && req.body.role === 'admin') {
            const adminExists = await User.findOne({ role: 'admin' });
            if (adminExists) {
                return res.status(400).json({ message: "An admin already exists, only one admin is allowed" });
            }
        }

        const role = req.body.role && req.body.role === 'admin' ? 'admin' : 'user';

        const hashedPassword = await bcrypt.hash(password, 10); 

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role 
            }
        });

    } catch (error) {
        console.error("Error in handleUserSignup:", error);
        return res.status(500).json({ message: "Server error, please try again later." });
    }
}

export async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role 
            }
        });

    } catch (error) {
        console.error("Error in handleUserLogin:", error);
        return res.status(500).json({ message: "Server error, please try again later." });
    }
}

export default handleUserSignup;
