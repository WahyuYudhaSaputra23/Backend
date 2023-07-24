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

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', saveProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;