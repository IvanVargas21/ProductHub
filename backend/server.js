import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

// import productRoutes from './routes/productRoutes.js';
import {sql} from './config/db.js'

dotenv.config();
// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming data
app.use(express.json());
app.use(cors());  
app.use(morgan('dev')); // Log the requests to console
app.use(helmet()); // Use Helmet middleware = adds security headers

// app.use("/api/products", productRoutes);

async function initDB (){
    try {
        await sql `
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL, 
                image VARCHAR (255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log("Database Initialized Successfully")
    }catch(error){
        console.log("Error initDB", error)
    }
}

initDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost: ${PORT}`);
    })
})