import express from 'express';
import FileUpload from 'express-fileupload';
import cors from 'cors';
import connectDB from './config/Database.js';
import ProductRoute from './routes/ProductRoute.js';
import AuthRoute from './auth/routes/AuthRoute.js';

const app = express();
connectDB(); // Connect to MongoDB

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static('public'));
app.use(ProductRoute);
app.use('/auth', AuthRoute);

app.listen(5000, () => console.log('Server Up and Running...'));
