import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './db/connect.js';
import connectToRoutes from './routes/complaints.js';

dotenv.config();

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
server.use(express.static(path.join(__dirname, '..', 'client')));

server.use('/', connectToRoutes);


const port = process.env.PORT ?? 3000;

(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    server.listen(port, () => {
      console.log(`you listen about port ${port}`);
    });
  } catch (e) {
    console.error('Failed to start server:', e);
    process.exit(1);
  }
})();
