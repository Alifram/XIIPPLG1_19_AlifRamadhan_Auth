const express = require('express');
const router = express.Router();
const bookController = require('../controllers/booksController');
// const authMiddleware = require('../middleware/authMiddleware');



//  router.get('/', authMiddleware.verifyToken, bookController.getAllBooks);
// router.get('/:id', authMiddleware.verifyToken, bookController.getBooksById);
// router.post('/', authMiddleware.verifyToken, bookController.store);
// router.put('/:id', authMiddleware.verifyToken, bookController.update);
// router.delete('/:id', authMiddleware.verifyToken, bookController.delete);

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBooksById);
router.post('/', bookController.store);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.delete);

module.exports = router;