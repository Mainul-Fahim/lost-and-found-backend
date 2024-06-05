"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/User/user.routes");
const foundItem_route_1 = require("../modules/FoundItem/foundItem.route");
const claim_route_1 = require("../modules/Claim/claim.route");
const lostItem_route_1 = require("../modules/LostItem/lostItem.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/',
        route: user_routes_1.userRoutes
    },
    {
        path: '/',
        route: foundItem_route_1.foundItemRoutes
    },
    {
        path: '/',
        route: claim_route_1.claimRoutes
    },
    {
        path: '/',
        route: lostItem_route_1.lostItemRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
