const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./src/routes/auth_routes');
const userRoutes = require('./src/routes/user_routes');
const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:5173'}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);


app.get('/', (req, res) => {
  res.send('Server chal raha hai!');
});

connectDB().then(() => {
    app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
});

