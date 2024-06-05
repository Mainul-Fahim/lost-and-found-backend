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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foundItemService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../helpars/paginationHelper");
const foundItem_constant_1 = require("./foundItem.constant");
const createFoundItemCategory = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.foundItemCategory.create({
        // @ts-ignore
        data: req.body
    });
    return result;
});
const getAllFoundItemCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.foundItemCategory.findMany();
    return result;
});
const createFoundItem = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // @ts-ignore
    const { email } = req.user;
    const userInfo = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });
    const categoryInfo = yield prisma_1.default.foundItemCategory.findUniqueOrThrow({
        where: {
            // @ts-ignore
            id: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.categoryId,
        },
    });
    console.log(userInfo, req.body);
    // @ts-ignore
    (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.userId = userInfo.id;
    const foundItemInfo = yield prisma_1.default.foundItem.create({
        // @ts-ignore
        data: req.body
    });
    const result = {};
    // @ts-ignore
    result.id = foundItemInfo.id;
    // @ts-ignore
    result.userId = userInfo === null || userInfo === void 0 ? void 0 : userInfo.id;
    // @ts-ignore
    result.user = userInfo;
    // @ts-ignore
    result.categoryId = categoryInfo.id;
    // @ts-ignore
    result.category = categoryInfo;
    // @ts-ignore
    result.foundItemName = foundItemInfo.foundItemName;
    // @ts-ignore
    result.description = foundItemInfo.description;
    // @ts-ignore
    result.location = foundItemInfo.location;
    // @ts-ignore
    result.createdAt = foundItemInfo.createdAt;
    // @ts-ignore
    result.updatedAt = foundItemInfo.updatedAt;
    return result;
});
const updateFoundItem = (req, id) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const { email } = req.user;
    const userInfo = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });
    const foundItemInfo = yield prisma_1.default.foundItem.update({
        where: {
            userId: userInfo.id,
            id: id
        },
        // @ts-ignore
        data: req.body
    });
    return Object.assign(Object.assign({}, foundItemInfo), { user: userInfo });
});
const deleteFoundItem = (req, id) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const { email } = req.user;
    const userInfo = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });
    const foundItemInfo = yield prisma_1.default.foundItem.delete({
        where: {
            userId: userInfo.id,
            id: id
        },
    });
    return Object.assign(Object.assign({}, foundItemInfo), { user: userInfo });
});
const getAllFoundItems = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andCondions = [];
    //console.log(filterData);
    if (params.searchTerm) {
        andCondions.push({
            OR: foundItem_constant_1.foundItemSearchAbleFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    ;
    if (Object.keys(filterData).length > 0) {
        andCondions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        });
    }
    ;
    const whereConditons = andCondions.length > 0 ? { AND: andCondions } : {};
    const result = yield prisma_1.default.foundItem.findMany({
        where: whereConditons,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        },
        select: {
            id: true,
            foundItemName: true,
            description: true,
            location: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                }
            },
            category: true,
        }
    });
    const total = yield prisma_1.default.foundItem.count({
        where: whereConditons
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
exports.foundItemService = {
    createFoundItemCategory,
    createFoundItem,
    updateFoundItem,
    deleteFoundItem,
    getAllFoundItems,
    getAllFoundItemCategory
};
