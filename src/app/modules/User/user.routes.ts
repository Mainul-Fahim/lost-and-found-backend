import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { userValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';


const router = express.Router();


router.post("/register",validateRequest(userValidation.createUser),userController.createUser);
router.post("/create-admin",validateRequest(userValidation.createUser),userController.createAdmin);
router.post('/login',userController.loginUser);
router.patch('/:id/activate',auth(ENUM_USER_ROLE.ADMIN),userController.activateOrDeactivateUser);
router.put('/:id',auth(ENUM_USER_ROLE.ADMIN),userController.updateUser);
router.post('/change-password',userController.changePassword);
router.get('/my-profile',auth(),userController.getMyProfile);
router.put('/my-profile',auth(),validateRequest(userValidation.updateProfile),userController.updateMyProfile);
router.get('/my-lostItems',auth(),userController.getMyLostItems);
router.get('/my-foundItems',auth(),userController.getMyFoundItems);
router.get('/my-claimItems',auth(),userController.getMyClaimItems);
router.get('/all-users',auth(ENUM_USER_ROLE.ADMIN),userController.getAllUsers);
router.get('/website-activity',auth(ENUM_USER_ROLE.ADMIN),userController.websiteActivity);
router.post('/refresh-token',userController.refreshToken)

export const userRoutes = router;