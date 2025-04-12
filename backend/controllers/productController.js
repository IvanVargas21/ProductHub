import { sql } from "../config/db.js"

export const getProducts = async (req, res) => {   
    try {
      const products = await sql `
          SELECT * FROM products
          ORDER BY created_at DESC
      `
      console.log("Fetched products", products)
      res.status(200).json({
        success: true,
        message: "Fetch All Products Success",
        data: products,
      })
    }catch(error){
        console.log("Error in getProducts", error)
        res.status(500).json({
          message: "Error getting products",
          error: error.message,
        })
    }

}
export const createProduct = async (req, res) => {
  const { name, image, price } = req.body;

  if(!name || !image || !price){
    return res.status(400).json({
      success: false,
      message: "Create Product Failed, All Fields are Required!",
    })
  }

  try {

  }catch(error){
    console.log("Error in Create Product", error);
    res.status(500).json({
      success: false,
      message: "Create Product Failed",
      error: error.message,
    })
  }

}

export const getProduct = async (req, res) => {}
export const updateProduct = async (req, res) => {}
export const deleteProduct = async (req, res) => {}
