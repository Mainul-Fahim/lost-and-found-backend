"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lostItemRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const lostItem_controller_1 = require("./lostItem.controller");
const lostItem_validation_1 = require("./lostItem.validation");
const router = express_1.default.Router();
router.post("/lost-item-categories", (0, auth_1.default)(), (0, validateRequest_1.default)(lostItem_validation_1.LostItemValidation.createLostItemCategory), lostItem_controller_1.LostItemController.createLostItemCategory);
router.post("/lost-items", (0, auth_1.default)(), (0, validateRequest_1.default)(lostItem_validation_1.LostItemValidation.createLostItem), lostItem_controller_1.LostItemController.createLostItem);
router.put("/lost-items/:id", (0, auth_1.default)(), lostItem_controller_1.LostItemController.updateLostItem);
router.delete("/lost-items/:id", (0, auth_1.default)(), lostItem_controller_1.LostItemController.deleteLostItem);
router.get('/lost-items', lostItem_controller_1.LostItemController.getAllLostItems);
router.get('/lost-items-category', lostItem_controller_1.LostItemController.getAllLostItemCategory);
exports.lostItemRoutes = router;
