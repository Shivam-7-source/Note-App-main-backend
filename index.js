import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();

import noteRoutes from './routes/note.route.js';

const app = express();
const port = process.env.PORT || 4001;

// Middleware
app.use(express.json());
app.use(cors())
// DB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("DB Error:", err));

// Routes
app.use('/api/v1/noteapp', noteRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});