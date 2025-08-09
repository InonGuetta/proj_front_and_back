// import express from 'express';
// import connectToRoutes from './routes/complaints.js';

// const port = 3000;
// const server = express();
// server.use(express.json());
// server.use('/',connectToRoutes);



// server.listen(port, ()=>{
//     console.log(`you listen about port ${port}`);  
// })

import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connect.js';
import connectToRoutes from './routes/complaints.js';

dotenv.config();

const server = express();
server.use(express.json());
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
