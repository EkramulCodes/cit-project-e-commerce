import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// 1. Initialize configuration
dotenv.config();
const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. MongoDB Connection Logic
// We wrap this so it doesn't try to reconnect multiple times in a serverless environment
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
  }
};

// 4. Sample Route (To test if the API is live)
app.get('/api/test', async (req, res) => {
  await connectDB();
  res.json({ message: "API is running and connected to MongoDB!" });
});

// 5. Port handling for local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Local server running on port ${PORT}`);
    connectDB();
  });
}

// 6. Export for Vercel
export default app;