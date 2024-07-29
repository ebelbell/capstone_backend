// imports
import Recipe from '../models/recipeSchema.mjs';

//Create functions 
const CreateRecipe = async (req, res) => {
    try {
        console.log(req.body);
        //create a new recipe
        let newRecipe = new Recipe(req.body);
        //console.log(newRecipe);

        //save a new recipe to the database
        await newRecipe.save();
        console.log('Recipe saved successfully!');

        //send json response back to the user, which will display the confirmation and details of their saved recipe
        res.json(newRecipe);
        // res.send('create route');

    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Server error'});
    }
}

//Read
const ReadRecipe = async(req, res) => {
    try {
        let savedRecipe = await Recipe.find({});
        res.json(savedRecipe);
       //res.send('read route');
    } catch (err) {
        console.log(err);
        res.send(500).json({msg: `Server error`});
    }
}

//Update
const UpdateRecipe = async(req, res) => {
    try {
        let updateRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updateRecipe);
        //res.send('update route')
    } catch (err) {
        console.log(err);
        res.send(500).json({msg: `Server error`});
    }
}

//Delete
const DeleteRecipe = async(req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.json({msg: 'Deleted successfully'});
        //res.send('delete route')
    } catch (err) {
        console.log(err);
        res.send(500).json({msg: `Server error`});
    }
}

export default { CreateRecipe, ReadRecipe, UpdateRecipe, DeleteRecipe };