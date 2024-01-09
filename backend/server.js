import express from "express";
import products from "./data/products.js";
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get("/api/products", (req, res) => {
//   res.json(products);
// });

// app.get("/api/products/:id", (req, res) => {
//   const product = products.find((p) => p._id === req.params.id);
//   res.json(product);
// });

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use(notFound);
app.use(errorHandler);

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.listen(port, () => console.log(`Server running on port ${port}`));
