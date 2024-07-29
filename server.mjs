//Imports
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';
import cors from 'cors';
import recipeRoute from './routes/recipeRoute.mjs'
//import router from './routes/recipeRoute.mjs';

//schemas
//import Recipe from './models/recipeSchema.mjs';

//configs
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
//await mongoose.connect(process.env.MONGO_URI) //connect to the mongoose database


//Connect to DB
connectDB();


//Middleware - to pass JSON
app.use(express.json());
app.use(cors());

//Routes
app.use('/recipe', recipeRoute)

//Error checking middleware
app.use((err, _req, res, _next) => {
    res.status(500).json({msg: "Error encountered."})
});

//Listen to our express server
app.listen(PORT, () => {
  console.log(`Server is listening on Port: ${PORT}`);
});