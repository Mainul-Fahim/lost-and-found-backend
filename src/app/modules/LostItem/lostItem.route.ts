import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { LostItemController } from './lostItem.controller';
import { LostItemValidation } from './lostItem.validation';



const router = express.Router();


router.post("/lost-item-categories",auth(),validateRequest(LostItemValidation.createLostItemCategory),LostItemController.createLostItemCategory);
router.post("/lost-items",auth(),validateRequest(LostItemValidation.createLostItem),LostItemController.createLostItem);
router.put("/lost-items/:id",auth(),LostItemController.updateLostItem);
router.delete("/lost-items/:id",auth(),LostItemController.deleteLostItem);
router.get('/lost-items',LostItemController.getAllLostItems);
router.get('/lost-items-category',LostItemController.getAllLostItemCategory);

export const lostItemRoutes = router;