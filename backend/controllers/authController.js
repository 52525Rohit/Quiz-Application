import bcrypt from "bcryptjs";
import User from "../models/userSchema.js";

export async function signup(req, res) {
    try {
        const { fullName, email, password, confirmPassword } = req.body;
        if (!fullName || !email || !password || !confirmPassword) throw new Error("All fields are required...!");
        if (password !== confirmPassword) throw new Error("Passwords do not match...!");

        const exists = await User.findOne({ email });
        if (exists) throw new Error("Email already registered...!");

        const hashed = await bcrypt.hash(password, 10);
        await User.create({ fullName, email, password: hashed });
        res.json({ msg: "Registered Successfully...!", fullName, email });
    } catch (error) {
        res.json({ error: error.message });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new Error("Email and password are required...!");

        const user = await User.findOne({ email });
        if (!user) throw new Error("NOT_REGISTERED");

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Incorrect password...!");

        res.json({ msg: "Login Successful...!", fullName: user.fullName, email });
    } catch (error) {
        res.json({ error: error.message });
    }
}
