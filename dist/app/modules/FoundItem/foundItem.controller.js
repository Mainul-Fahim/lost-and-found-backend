"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foundItemController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const foundItem_service_1 = require("./foundItem.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const foundItem_constant_1 = require("./foundItem.constant");
const createFoundItemCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const result = yield foundItem_service_1.foundItemService.createFoundItemCategory(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Found item category created successfully",
        data: result
    });
}));
const createFoundItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const result = yield foundItem_service_1.foundItemService.createFoundItem(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Found item created successfully",
        data: result
    });
}));
const updateFoundItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // @ts-ignore
    const result = yield foundItem_service_1.foundItemService.updateFoundItem(req, id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Found item updated successfully",
        data: result
    });
}));
const deleteFoundItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // @ts-ignore
    const result = yield foundItem_service_1.foundItemService.deleteFoundItem(req, id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Found item deleted successfully",
        data: result
    });
}));
const getAllFoundItems = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.query)
    const filters = (0, pick_1.default)(req.query, foundItem_constant_1.foundItemFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield foundItem_service_1.foundItemService.getAllFoundItems(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Found items retrieved successfully",
        meta: result.meta,
        data: result.data
    });
}));
const getAllFoundItemCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield foundItem_service_1.foundItemService.getAllFoundItemCategory();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Found items category retrieved successfully",
        data: result
    });
}));
exports.foundItemController = {
    createFoundItemCategory,
    createFoundItem,
    updateFoundItem,
    deleteFoundItem,
    getAllFoundItems,
    getAllFoundItemCategory
};
