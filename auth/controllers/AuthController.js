import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/UserModel.js";

// register: Fungsi ini digunakan untuk mendaftarkan pengguna baru. 
// Menerima permintaan HTTP POST dengan data username dan password. 
// Memeriksa apakah username sudah ada di database. Jika belum, 
// maka password akan di-hash menggunakan bcrypt dan pengguna baru akan disimpan di database.

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// login: Fungsi ini digunakan untuk proses login pengguna. 
// Menerima permintaan HTTP POST dengan data username dan password. 
// Memeriksa apakah username ada di database dan membandingkan password 
// yang di-input dengan password yang di-hash dalam database. Jika 
// validasi berhasil, maka token JWT akan di-generate dan dikirim sebagai respons.

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    // Check if username exists
    const user = await User.findOne({  username });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password1" });
    }
    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid username or password2" });
    }
    // Generate JWT token
    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fungsi `verifyToken` digunakan untuk memverifikasi token JWT yang diberikan. 
// Jika verifikasi berhasil, status 200 dikirim kembali; jika gagal, 
// status 401 dikirim kembali. Fungsi ini membantu memastikan keaslian t
// oken sebelum memberikan akses ke sumber daya yang dilindungi.

export const verifyToken = async (req, res) => {
  const { token } = req.body;
  try {
    jwt.verify(token, "secret");
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
};
