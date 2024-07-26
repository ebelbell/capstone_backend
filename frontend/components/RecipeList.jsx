//Imports
import { useState, useEffect } from "react";
import axios from 'axios';

function addRecipe() {
    const [recipeName, setRecipes] = useState([]); 
}

useEffect(() => {
    const fetchRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/recipe');
            setRecipes(response.data);
        } catch (err) {
        console.log('Cannot fetch recipes: ', err); 
        }
    };
    fetchRecipes();
}, []);

export default RecipeList;