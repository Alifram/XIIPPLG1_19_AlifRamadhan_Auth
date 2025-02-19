const express = require('express');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = 3000;

app.use(express.json());
require('dotenv').config();


app.use('/auth', authRoutes); 
app.use('/books', bookRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));