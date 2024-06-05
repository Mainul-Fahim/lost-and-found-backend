import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { foundItemValidation } from './foundItem.validation';
import { foundItemController } from './foundItem.controller';


const router = express.Router();


router.post("/found-item-categories",auth(),validateRequest(foundItemValidation.createFoundItemCategory),foundItemController.createFoundItemCategory);
router.post("/found-items",auth(),validateRequest(foundItemValidation.createFoundItem),foundItemController.createFoundItem);
router.put("/found-items/:id",auth(),foundItemController.updateFoundItem);
router.delete("/found-items/:id",auth(),foundItemController.deleteFoundItem);
router.get('/found-items',foundItemController.getAllFoundItems);
router.get('/found-items-category',foundItemController.getAllFoundItemCategory);

export const foundItemRoutes = router;