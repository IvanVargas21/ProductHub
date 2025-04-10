import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import productRoutes from './routes/productRoutes.js';

dotenv.config();
// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming data
app.use(express.json());
app.use(cors());  
app.use(morgan('dev')); // Log the requests to console
app.use(helmet()); // Use Helmet middleware = adds security headers

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost: ${PORT}`);
})