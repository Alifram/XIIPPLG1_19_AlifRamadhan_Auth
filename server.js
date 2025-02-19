const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes); 

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));