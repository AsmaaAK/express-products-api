require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const productsRoutes = require('./routes/productsRoutes');

app.use(express.json());
app.use('/api/products', productsRoutes);

mongoose.connect(process.env.DB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
