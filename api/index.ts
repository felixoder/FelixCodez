import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route';
import projectRoutes from './routes/project.route';
import skillRoutes from './routes/skill.route';
import messageRoutes from './routes/message.route';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import path from 'path';

const app = express();

app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://debayanghosh408:14lSy1LPUAigcxTa@cluster0.lx4nxo6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Database is connected');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/skill', skillRoutes);
app.use('/api/message', messageRoutes);

// Serve static files from the 'client/dist' directory
const staticPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(staticPath));

// Define a catch-all route to serve the index.html file
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
