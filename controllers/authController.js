const User = require('../models/user'); // Import model User
const bcrypt = require('bcryptjs'); // Import bcryptjs untuk hashing password
const jwt = require('jsonwebtoken'); // Import jsonwebtoken untuk membuat token JWT

// Handler untuk registrasi pengguna baru
exports.register = async (req, res) => {
  console.log("Request Body:", req.body);
  const { username, password, email, name, phone } = req.body; // Mengambil data dari request body


  
  try {
    // Hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Membuat user baru di database
    const user = await User.create({ username, password: hashedPassword,  email,  name,  phone });
    
    // Mengembalikan respons sukses dengan data user yang baru dibuat
    res.json({ message: "User registered successfully", user });
  } catch (error) {
    // Jika ada kesalahan, kirim respons error dengan status 500 (Internal Server Error)
    res.status(500).json({ error: error.message });
  }
};


// Handler untuk login pengguna
exports.login = async (req, res) => {
  const { username, password } = req.body; // Mengambil data dari request body
  
  try {
    // Mencari user berdasarkan username di database
    const user = await User.findOne({ where: { username } });
    
    // Jika user tidak ditemukan, kirim respons 404 (Not Found)
    if (!user) return res.status(404).json({ error: "User not found" });

    // Membandingkan password yang dimasukkan dengan password yang sudah di-hash di database
    const validPassword = await bcrypt.compare(password, user.password);
    
    // Jika password tidak cocok, kirim respons 400 (Bad Request)
    if (!validPassword) return res.status(400).json({ error: "Invalid password" });

    // Membuat token JWT dengan payload id dan username, serta batas waktu 1 jam
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Mengembalikan respons sukses dengan token yang dibuat
    res.json({ message: "Login successful", token });
  } catch (error) {
    // Jika terjadi kesalahan, kirim respons error dengan status 500 (Internal Server Error)
    res.status(500).json({ error: error.message });
  }
};