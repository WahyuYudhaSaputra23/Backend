import mongoose from 'mongoose';

// Replace 'YOUR_MONGODB_URI' with your MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://faisalmanaf478:faisalmanaf478@cluster0.cq32jgp.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

export default connectDB;
