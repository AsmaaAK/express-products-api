require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const http = require('http'); 
const { Server } = require('socket.io');
const app = express();

const productsRoutes = require('./routes/productsRoutes');

app.use(express.json());
app.use('/api/products', productsRoutes);

// إنشاء السيرفر
const server = http.createServer(app);

// Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected: ', socket.id);

  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg); 
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected: ', socket.id);
  });
});

app.set('io', io);

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.DB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000; 
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
