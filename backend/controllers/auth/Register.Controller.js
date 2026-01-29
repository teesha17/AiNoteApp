import { User } from "../../models/index.js";
import bcrypt from "bcrypt";

export const Register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      passwordHash: hash
    });

    res.json({ message: "Registered successfully" });

  } catch {
    res.status(500).json({ message: "Register error" });
  }
};