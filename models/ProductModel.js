import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
