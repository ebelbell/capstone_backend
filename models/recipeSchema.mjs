import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    recipeTitle: {
        type: String,
        required: true,
        
    },
    description: {
        type: String,
    },
    // an array of 'ObjectId that includes reference to allergen schema. 
    allergens: [{
        name: {
            type: String,
        }
    }],
});

export default mongoose.model('recipe', recipeSchema); // when the recipeSchema is referenced in the recipe collection, use the key value 'recipe'