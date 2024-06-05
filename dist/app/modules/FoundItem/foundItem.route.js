"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foundItemRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const foundItem_validation_1 = require("./foundItem.validation");
const foundItem_controller_1 = require("./foundItem.controller");
const router = express_1.default.Router();
router.post("/found-item-categories", (0, auth_1.default)(), (0, validateRequest_1.default)(foundItem_validation_1.foundItemValidation.createFoundItemCategory), foundItem_controller_1.foundItemController.createFoundItemCategory);
router.post("/found-items", (0, auth_1.default)(), (0, validateRequest_1.default)(foundItem_validation_1.foundItemValidation.createFoundItem), foundItem_controller_1.foundItemController.createFoundItem);
router.put("/found-items/:id", (0, auth_1.default)(), foundItem_controller_1.foundItemController.updateFoundItem);
router.delete("/found-items/:id", (0, auth_1.default)(), foundItem_controller_1.foundItemController.deleteFoundItem);
router.get('/found-items', foundItem_controller_1.foundItemController.getAllFoundItems);
router.get('/found-items-category', foundItem_controller_1.foundItemController.getAllFoundItemCategory);
exports.foundItemRoutes = router;
