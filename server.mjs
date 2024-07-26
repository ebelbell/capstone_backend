//Imports
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';
import cors from 'cors';

//schemas
import recipe from './models/recipeSchema.mjs';

//set up configs
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
//await mongoose.connect(process.env.MONGO_URI) //connect to the mongoose database



//Connect to DB
connectDB();


//Middleware - to pass JSON
app.use(express.json())
app.use(cors())

/////////// ROUTES
//Create
app.post('/recipe', async (req, res) => {
    try {
        console.log(req.body);
        //create a new recipe
        let newRecipe = new recipe(req.body)
        //console.log(newRecipe);

        //save a new recipe to the database
        await newRecipe.save()
        console.log('Recipe saved successfully!');

        //send json response back to the user, which will display the confirmation and details of their saved recipe
        res.json(newRecipe)
        // res.send('create route');

    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Server error'});
    }
});



//Read
app.get('/recipe', async(req, res) => {
    try {
        let savedRecipe = await recipe.find({})
        res.json(savedRecipe);
       //res.send('read route');
    } catch (err) {
        console.log(err);
        res.send(500).json({msg: `Server error`})
    }
})


//Update
app.put('/recipe/:id', async(req, res) => {
    try {
        let updateRecipe = await recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(updateRecipe)
        //res.send('update route')
    } catch (err) {
        console.log(err);
        res.send(500).json({msg: `Server error`})
    }
})


//Delete
app.delete('/recipe/:id', async(req, res) => {
    try {
        await recipe.findByIdAndDelete(req.params.id)
        res.json({msg: 'Deleted successfully'})
        //res.send('delete route')
    } catch (err) {
        console.log(err);
        res.send(500).json({msg: `Server error`})
    }
})


//Listen to our express server
app.listen(PORT, () => {
  console.log(`Server is listening on Port: ${PORT}`);
});