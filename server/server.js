import express from 'express';
import connectToRoutes from './routes/complaints.js';


const port = 3000;
const server = express();
server.use(express.json());
server.use('/',connectToRoutes);



server.listen(port, ()=>{
    console.log(`you listen about port ${port}`);  
})