const booksModel = require('../models/booksModel');

module.exports = {
    getAllBooks: async (req, res) => {
        booksModel
        .getAllBooks()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({error: err.message});
        });
    },

    getBooksById: (req, res) => {
        const { id } = req.params;

        booksModel
        .getBooksById(id)
        .then((result) => {
            if(result.length === 0){
                res.status(404).json({message: "Data not found"});
            }
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({error: err.message});
        });
    },

    store: (req, res) => {
        const { title, writer, user_id, category_id, publisher, year } = req.body;

        if(!title || !writer || !user_id || !category_id || !publisher || !year){
            res.status(400).json({message: "All field must be filled"});
        }

        booksModel
        .addBook(title, writer, user_id, category_id, publisher, year)
        .then((result) => {
            res.json({ id: insertId, title, writer, user_id, category_id, publisher, year });
        })
        .catch((err) => {
            res.status(500).json({error: err.message});
        })
    },

    update: (req, res) => {
       const { id } = req.params;
         const { title, writer, user_id, category_id, publisher, year } = req.body;

        if(!title || !writer || !user_id || !category_id || !publisher || !year){
            res.status(400).json({message: "All field are required"});
        }

        booksModel
        .updateBook(id, title, writer, user_id, category_id, publisher, year)
        .then((result) => {
            if(result.affectedRows === 0){
                res.status(404).json({message: "Data not found"});
            }
            res.json({ message: 'Book data updated successfully' });
        })
        .catch((err) => {
            res.status(500).json({error: err.message});
        });
    },
    

    delete: (req, res) =>{
        const { id } = req.params;

        booksModel
        .deleteBook(id)
        .then((result) => {
            if(result.affectedRows === 0){
                res.status(404).json({message: "Data not found"});
            }
            res.json({ message: 'Book data deleted successfully' });
        })
        .catch((err) => {
            res.status(500).json({error: err.message});
        });
    }
}