import User from '../model/users.js';
import bcrypt from 'bcryptjs'; // For password hashing

import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../config'; // Your JWT secret key


const JWT_SECRET ='b2d1e68f1cf85a2db96c5d05e1e0f06e36d47e16b5e8b69a51b58c78d4e6c2b4';
// Handle user signup
async function handleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;

        // 1. Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        // 2. Check if a user already exists with the same email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // 3. If creating admin, ensure only one admin exists
        if (req.body.role && req.body.role === 'admin') {
            const adminExists = await User.findOne({ role: 'admin' });
            if (adminExists) {
                return res.status(400).json({ message: "An admin already exists, only one admin is allowed" });
            }
        }

        // 4. Set default role as 'user' unless specified as 'admin'
        const role = req.body.role && req.body.role === 'admin' ? 'admin' : 'user';

        // 5. Hash the password before saving it in the database
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // 6. Create a new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword, // Save the hashed password
            role, // Add role (user or admin)
        });

        // 7. Respond with success and user details (excluding password)
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role // Return role in the response
            }
        });

    } catch (error) {
        // 8. Error handling: log the error and send a server error response
        console.error("Error in handleUserSignup:", error);
        return res.status(500).json({ message: "Server error, please try again later." });
    }
}

// Controller function to handle user login with role
export async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        // 1. Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // 2. Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // 3. Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 4. Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        // 5. Respond with token, user details, and role
        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role // Include role in the response
            }
        });

    } catch (error) {
        console.error("Error in handleUserLogin:", error);
        return res.status(500).json({ message: "Server error, please try again later." });
    }
}

export default handleUserSignup;
