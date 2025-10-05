const express = require('express');
const app = express();

const productsRoutes = require('./routes/productsRoutes');

app.use(express.json());

app.use('/api/products', productsRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
