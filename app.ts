import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';

// Import routes
import menuRoutes from './routes/menu';
import orderRoutes from './routes/orders';
import feedbackRoutes from './routes/feedback';
// import authRoutes from './routes/auth'; // Uncomment if you implement auth

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/api', (_req, res) => {
    res.send('Canteen Companion API is running...');
});

// API routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/feedback', feedbackRoutes);
// app.use('/api/auth', authRoutes); // Uncomment if you implement auth

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;