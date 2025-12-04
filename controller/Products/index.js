const mongoose = require('mongoose');
const { Product } = require('../../models/product');

const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({
        success: true,
        count: products.length,
        message: "Products fetched successfully",
        products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch products",
        error: error.message,
      });
    }
};

const insertProduct = async (req, res) => {
    try {
        const { name, price, stock, category } = req.body;
        if (!name || !price || !stock || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, message: "Product inserted successfully", product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to insert product", error: error.message });
    }
}

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const { name, price, stock, category } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, stock, category },
      {
        new: true,
        runValidators: true, // ensures schema validation
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Delete product, id:", id); 

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

//Devide Product Category Wise

const getProductsByCategory = async (req, res) => {
    try {
      const { category } = req.params;
      console.log("category::",category);
      
      const products = await Product.find({ category });
      console.log("products::",products);
      
      res.status(200).json({
        success: true,
        count: products.length,
        message: "Products fetched successfully",
        products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch products",
        error: error.message,
      });
    }
};

module.exports = {
    getAllProducts,
    insertProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory
}