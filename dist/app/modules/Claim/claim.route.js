"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.claimRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const claim_controller_1 = require("./claim.controller");
const claim_validation_1 = require("./claim.validation");
const router = express_1.default.Router();
router.post("/claims", (0, auth_1.default)(), (0, validateRequest_1.default)(claim_validation_1.claimValidation.createClaim), claim_controller_1.claimController.createClaim);
router.put("/claims/:claimId", (0, auth_1.default)(), (0, validateRequest_1.default)(claim_validation_1.claimValidation.updateClaim), claim_controller_1.claimController.updateClaim);
router.get("/claims", (0, auth_1.default)(), claim_controller_1.claimController.getAllClaim);
exports.claimRoutes = router;
