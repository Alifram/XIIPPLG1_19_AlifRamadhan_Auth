const jwt = require('jsonwebtoken'); // Import library jsonwebtoken untuk menangani token JWT

module.exports = (req, res, next) => {
    // Mengambil token dari header Authorization
    const token = req.header('Authorization');

    // Jika tidak ada token, kembalikan respons dengan status 401 (Unauthorized)
    if (!token) return res.status(401).json({ error: "Access Denied, No Token Provided" });

    try {
        // Menghapus prefix "Bearer " jika ada, sehingga hanya tersisa tokennya
        const tokenWithoutBearer = token.replace("Bearer ", ""); 
        
        // Verifikasi token menggunakan secret key yang tersimpan di environment variable
        const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        
        // Menyimpan data pengguna yang telah diverifikasi ke dalam req.user
        req.user = verified; 
        
        // Melanjutkan ke middleware atau route berikutnya
        next();
    } catch (err) {
        // Jika token tidak valid, kembalikan respons dengan status 400 (Bad Request)
        res.status(400).json({ error: "Invalid Token" });
    }
};
