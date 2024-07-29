import express from 'express';
import recipeCrtl from '../controllers/recipeCrtl.mjs';

const router = express.Router();

/////////// ROUTES
//Create
router.post('/', recipeCrtl.CreateRecipe);


//Read
router.get('/', recipeCrtl.ReadRecipe);


//Update by ID
router.put('/:id', recipeCrtl.UpdateRecipe);


//Delete by ID
router.delete('/:id', recipeCrtl.DeleteRecipe);

export default router;
