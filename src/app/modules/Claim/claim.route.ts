import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { claimController } from './claim.controller';
import { claimValidation } from './claim.validation';



const router = express.Router();


router.post("/claims",auth(),validateRequest(claimValidation.createClaim),claimController.createClaim);
router.put("/claims/:claimId",auth(),validateRequest(claimValidation.updateClaim),claimController.updateClaim);
router.get("/claims",auth(),claimController.getAllClaim);


export const claimRoutes = router;