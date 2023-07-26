import Product from "../models/ProductModel.js";
import path from "path";
import fs from "fs";

// getProducts: Mengambil semua produk dari database dan 
// mengirimkannya sebagai respons JSON.

export const getProducts = async(req, res)=>{
    try {
        const response = await Product.find();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// getProductById: Mengambil produk berdasarkan ID 
// yang diberikan dan mengirimkannya sebagai respons JSON.

export const getProductById = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const saveProduct = (req, res) => {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ msg: "No File Uploaded" });
    }
  
    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = `${Date.now()}${ext}`; // Use timestamp to generate a unique filename
    const url = `https://backend-id17.vercel.app/images/${fileName}`;
    // const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];
  
    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Invalid Images" });
    }
  
    if (fileSize > 5000000) {
      return res.status(422).json({ msg: "Image must be less than 5 MB" });
    }
  
    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }
  
      try {
        const newProduct = new Product({
          title: name,
          image: fileName,
          url: url,
        });
  
        await newProduct.save(); // Assuming ProductModel.js is a mongoose model
        res.status(201).json({ msg: "Product Created Successfully" });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
      }
    });
  };

// updateProduct: Memperbarui produk berdasarkan ID yang diberikan. Mengelola proses upload gambar, 
// memeriksa validasi file gambar, dan memperbarui informasi produk di dalam database.

export const updateProduct = async (req, res) => {
    const productId = req.params.id;
  
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ msg: "No Data Found" });
      }
  
      let fileName = "";
      if (!req.files || !req.files.file) {
        fileName = product.image;
      } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = `${file.md5}${ext}`;
        const allowedType = [".png", ".jpg", ".jpeg"];
  
        if (!allowedType.includes(ext.toLowerCase())) {
          return res.status(422).json({ msg: "Invalid Images" });
        }
        if (fileSize > 5000000) {
          return res.status(422).json({ msg: "Image must be less than 5 MB" });
        }
  
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);
  
        file.mv(`./public/images/${fileName}`, (err) => {
          if (err) return res.status(500).json({ msg: err.message });
        });
      }
  
      const name = req.body.title;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  
      await Product.findByIdAndUpdate(
        productId,
        { title: name, image: fileName, url: url },
        { new: true }
      );
  
      res.status(200).json({ msg: "Product Updated Successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
    }
  };

// deleteProduct: Menghapus produk berdasarkan ID yang diberikan. 
// Juga menghapus file gambar terkait dari sistem file.

export const deleteProduct = async (req, res) => {
    const productId = req.params.id;
  
    try {
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        return res.status(404).json({ msg: "No Data Found" });
      }
  
      const filepath = `./public/images/${product.image}`;
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
  
      res.status(200).json({ msg: "Product Deleted Successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
    }
  };
  
