import express from "express";
import {
    getProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
} from "../controllers/ProductController.js";

// Rute ini menangani endpoint terkait produk, seperti /products untuk 
// mengambil semua produk, /products/:id untuk mengambil produk berdasarkan ID,
//  /products dengan metode POST untuk menyimpan produk baru, /products/:id 
//  dengan metode PATCH untuk memperbarui produk, dan /products/:id dengan 
//  metode DELETE untuk menghapus produk.

const router = express.Router();

// GET all products
router.get('/products', getProducts);

// GET product by ID
router.get('/products/:id', getProductById);

// POST create a new product
router.post('/products', saveProduct);

// PUT update a product by ID
router.put('/products/:id', updateProduct);

// DELETE product by ID
router.delete('/products/:id', deleteProduct);

export default router;