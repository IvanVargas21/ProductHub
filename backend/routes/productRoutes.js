import express from "express";
import { getAllProducts, createProduct } from "../controllers/productController";

const router = express.Router();

router.get("/test", (req, res)=>{
    res.send("test route");
})

router.get("/", getAllProducts())

router.post("/", createProduct())

console.log("productRoutes.js loaded");
export default router;