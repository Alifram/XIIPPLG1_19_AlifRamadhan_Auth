const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', // Sesuaikan dengan host database
    user: 'root', // Sesuaikan dengan username database
    password: '', // Sesuaikan dengan password database
    database: 'library_db' // Sesuaikan dengan nama database
});

db.connect((err) => {
    if (err) {
        console.error("Database connection error:", err);
        process.exit(1); // Keluar jika koneksi gagal
    }
    console.log("Connected to MySQL database");
});

module.exports = db;

