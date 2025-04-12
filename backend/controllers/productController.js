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
        console.log("Error in getProducts function", error)
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
    // Why Array?
    // sql function, designed to handle queries that may return multiple rows.
    // each row is an object.
    const newProduct = await sql `
      INSERT INTO products (name, image, price)
      VALUES (${name}, ${image}, ${price})
      RETURNING *
      `
      console.log("New product added ")
      res.status(201).json({
        success: true,
        message: "New Product Created Successfully",
        data: newProduct[0],
      })
  }catch(error){
    console.log("Error in createProduct function", error);
    res.status(500).json({
      success: false,
      message: "Error creating new product",
      error: error.message,
    })
  }

}

export const getProduct = async (req, res) => {
  const {id} = req. params;

  try {
    const product = await sql `
      SELECT * FROM products WHERE id=${id}
      `
      res.status(200).json({
        succes: true,
        message:" Get Product Success",
        data: product[0]
      })
  }catch(error){
    console.log("Error in getProduct function", error);
    res.status(500).json({
      success: false, 
      message: "Error getting product",
      error: error.message,
    })
  }
}

// RETURNING * - used ot return the values of the affected row(s) aftern an INSERT, UPDATE, or DELETE operation.
export const updateProduct = async (req, res) => {
  const {id} = req.params;
  const {name, image, price} = req.body;

  // if(!name || !image || !price) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Update Product Failed, All Fields are Required!",
  //   })
  // }

  try{
    const updateProduct = await sql `
      UPDATE products
      SET name=${name}, image=${image}, price=${price}
      WHERE id=${id}
      RETURNING *
    `;
    
    // if updateProduct[] = 0, not found
    if(updateProduct.length === 0) {
      return res.status(404).json({
        success: false, 
        message: "Product not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Update Product Success",
      data: updateProduct[0],
    })
  }catch(error){
    console.log("Error in updateProduct function", error);
    res.status(500).json({
      success: false,
      message: "Error updating product",
    })
  }
}
export const deleteProduct = async (req, res) => {
  const {id} = req.params;

  try {
    const deletedProduct = await sql `
      DELETE FROM products 
      WHERE id=${id}
      RETURNING *
      `;

      // if deletedProduct[] = 0, not found
      if(deletedProduct.length === 0){
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Delete Product Success",
        data: deletedProduct[0],
      })
  }catch(error){
    console.log("Error in deleteProduct function", error);
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    })
  }
}
