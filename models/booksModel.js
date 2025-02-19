const db = require('../config/database');

module.exports = {
    getAllBooks: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM books', (err, result) => {
                if (err) {
                    console.error("SQL Error:", err);
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    },

    getBooksById: (id) => {
        return new Promise((resolve, reject) => {
            console.log("Memanggil getBooksById dengan ID:", id); // Debugging
            
            if (!id) {
                return reject(new Error("ID tidak boleh kosong"));
            }

            const bookId = parseInt(id, 10);
            if (isNaN(bookId)) {
                return reject(new Error("ID harus berupa angka"));
            }

            db.query('SELECT * FROM books WHERE id = ?', [bookId], (err, result) => {
                if (err) {
                    console.error("SQL Error:", err);
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    },

    addBook: (title, writer, user_id, category_id, publisher, year) => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO books (title, writer, user_id, category_id, publisher, year) VALUES (?, ?, ?, ?, ?, ?)',
                [title, writer, user_id, category_id, publisher, year],
                (err, result) => {
                    if (err) {
                        console.error("SQL Error:", err);
                        reject(new Error(err));
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },

    updateBook: (id, title, writer, user_id, category_id, publisher, year) => {
        return new Promise((resolve, reject) => {
            console.log("Memanggil updateBook dengan ID:", id); // Debugging

            if (!id) {
                return reject(new Error("ID tidak boleh kosong"));
            }

            const bookId = parseInt(id, 10);
            if (isNaN(bookId)) {
                return reject(new Error("ID harus berupa angka"));
            }

            db.query(
                'UPDATE books SET title = ?, writer = ?, user_id = ?, category_id = ?, publisher = ?, year = ? WHERE id = ?',
                [title, writer, user_id, category_id, publisher, year, bookId],
                (err, result) => {
                    if (err) {
                        console.error("SQL Error:", err);
                        reject(new Error(err));
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },

    deleteBook: (id) => {
        return new Promise((resolve, reject) => {
            console.log("Memanggil deleteBook dengan ID:", id); // Debugging

            if (!id) {
                return reject(new Error("ID tidak boleh kosong"));
            }

            const bookId = parseInt(id, 10);
            if (isNaN(bookId)) {
                return reject(new Error("ID harus berupa angka"));
            }

            db.query('DELETE FROM books WHERE id = ?', [bookId], (err, result) => {
                if (err) {
                    console.error("SQL Error:", err);
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    }
};
