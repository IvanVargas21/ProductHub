import express from "express";
import { 
    getProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} from "../controllers/productController.js";

const router = express.Router();

// router.get("/test", (req, res)=>{
//     res.send("test route");
// })

router.get("/", getProducts)
router.get("/:id", getProduct)
router.post("/", createProduct)
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

console.log("productRoutes.js loaded");

export default router;