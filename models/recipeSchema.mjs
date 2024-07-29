import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    recipeTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ''
    },
    // an array of 'ObjectId that includes reference to allergen schema. 
    allergens: [{
        name: {
            type: String,
            required: true
        }
    }],
});

export default mongoose.model('Recipe', recipeSchema); // when the recipeSchema is referenced in the recipe collection, use the key value 'recipe'