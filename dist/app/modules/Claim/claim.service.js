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
exports.claimService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createClaim = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
    console.log(userInfo, req.body);
    // @ts-ignore
    (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userId = userInfo.id;
    const claimInfo = yield prisma_1.default.claim.create({
        data: req.body
    });
    return claimInfo;
});
const getClaims = () => __awaiter(void 0, void 0, void 0, function* () {
    const claimInfo = yield prisma_1.default.claim.findMany({
        include: {
            foundItem: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            createdAt: true,
                            updatedAt: true,
                        }
                    },
                    category: true
                }
            }
        }
    });
    return claimInfo;
});
const updateClaimStatus = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.claim.findUniqueOrThrow({
        where: {
            id,
        }
    });
    const result = yield prisma_1.default.claim.update({
        where: {
            id
        },
        // @ts-ignore
        data
    });
    return result;
});
exports.claimService = {
    createClaim,
    getClaims,
    updateClaimStatus
};
