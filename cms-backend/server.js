const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes);

const categoryRoutes = require('./routes/categories');
app.use('/api/categories', categoryRoutes);

const tagRoutes = require('./routes/tags');
app.use('/api/tags', tagRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'CMS Blog API po punon!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveri po ekzekutohet ne portin ${PORT}`);
});