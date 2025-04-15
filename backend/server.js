import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import productRoutes from './routes/productRoutes.js';

import {sql} from './config/db.js'
import aj from './lib/arcjet.js';

dotenv.config();
// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// app.use() - Express Middleware runs every incoming reqs
// Parse incoming data
app.use(express.json());
app.use(cors());  
app.use(morgan('dev')); // Log the requests to console
app.use(helmet()); // Use Helmet middleware = adds security headers

// apply arcjet rate-limit to all routes.
app.use(async(req, res, next)=>{
    try {
        const decision = await aj.protect(req, {
            requested: 1  // each reqs consumes 1 token from rate-limiting bucket.
        });

        if (decision.isDenied) {
            if(decision.decision.isRateLimit()){
                res.status(429).json({error: "Too Many Requests"})
            }else if(decision.reason.isBot()){
                res.status(403).json({error: "Box access denied"})
            }else {
                res.status(403).json({error: "Forbidden"})
            }
            return;
        }

        // check for spoofed bots
        if (decision.isSpoofed) {
            res.status(403).json({error: "Spoofed bot detected"})
            return;
        }

        // if decision is allowed, continue to the next middleware or route handler
        next(); 
    }catch (error){
        console.error("Error in arcjet", error)
        return res.status(500).json({error: "Internal Server Error"})
    }
})

app.use("/api/products", productRoutes);

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