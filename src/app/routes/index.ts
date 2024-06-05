import express from 'express';
import { userRoutes } from '../modules/User/user.routes';
import { foundItemRoutes } from '../modules/FoundItem/foundItem.route';
import { claimRoutes } from '../modules/Claim/claim.route';
import { lostItemRoutes } from '../modules/LostItem/lostItem.route';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/',
        route: userRoutes
    },
    {
        path: '/',
        route: foundItemRoutes
    },
    {
        path: '/',
        route: claimRoutes
    },
    {
        path: '/',
        route: lostItemRoutes
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;