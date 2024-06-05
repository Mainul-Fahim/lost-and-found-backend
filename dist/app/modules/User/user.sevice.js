"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt = __importStar(require("bcrypt"));
const jwtHelpers_1 = require("../../helpars/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const authHelpers_1 = require("../../helpars/authHelpers");
const createUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const hashedPassword = yield bcrypt.hash(req.password, 12);
    const userData = {
        // @ts-ignore
        name: req.name,
        // @ts-ignore
        email: req.email,
        password: hashedPassword,
    };
    const finalResult = {};
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield transactionClient.user.create({
            data: userData
        });
        const { id, email, name, createdAt, updatedAt } = user;
        // @ts-ignore
        req.profile.userId = id;
        // @ts-ignore
        finalResult.id = id;
        // @ts-ignore
        finalResult.name = name;
        // @ts-ignore
        finalResult.email = email;
        // @ts-ignore
        finalResult.createdAt = createdAt;
        // @ts-ignore
        finalResult.updatedAt = updatedAt;
        const createdProfileData = yield transactionClient.userProfile.create({
            // @ts-ignore
            data: req.profile
        });
        return createdProfileData;
    }));
    // @ts-ignore
    finalResult.profile = result;
    // @ts-ignore
    return finalResult;
});
//create an admin
const createAdmin = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const hashedPassword = yield bcrypt.hash(req.password, 12);
    const userData = {
        // @ts-ignore
        name: req.name,
        // @ts-ignore
        email: req.email,
        password: hashedPassword,
        role: client_1.UserRole.ADMIN,
    };
    const finalResult = {};
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield transactionClient.user.create({
            data: userData
        });
        const { id, email, name, createdAt, updatedAt } = user;
        // @ts-ignore
        req.profile.userId = id;
        // @ts-ignore
        finalResult.id = id;
        // @ts-ignore
        finalResult.name = name;
        // @ts-ignore
        finalResult.email = email;
        // @ts-ignore
        finalResult.createdAt = createdAt;
        // @ts-ignore
        finalResult.updatedAt = updatedAt;
        const createdProfileData = yield transactionClient.userProfile.create({
            // @ts-ignore
            data: req.profile
        });
        return createdProfileData;
    }));
    // @ts-ignore
    finalResult.profile = result;
    // @ts-ignore
    return finalResult;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        }
    });
    const isCorrectPassword = yield bcrypt.compare(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new Error("Password incorrect!");
    }
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    }, config_1.default.jwt.refresh_token_secret, config_1.default.jwt.refresh_token_expires_in);
    return {
        accessToken,
        refreshToken,
        userData,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_token_secret);
    }
    catch (err) {
        throw new Error("You are not authorized!");
    }
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
        }
    });
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: userData.email,
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id: user === null || user === void 0 ? void 0 : user.userId,
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // checking old password
    if (isUserExist.password &&
        !(yield authHelpers_1.AuthUtils.comparePasswords(oldPassword, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Old Password is incorrect');
    }
    const hashPassword = yield (0, authHelpers_1.hashedPassword)(newPassword);
    yield prisma_1.default.user.update({
        where: {
            id: isUserExist.id
        },
        data: {
            password: hashPassword,
        }
    });
});
const getMyProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });
    const profileInfo = yield prisma_1.default.userProfile.findUnique({
        where: {
            userId: userInfo.id
        }
    });
    return Object.assign(Object.assign({}, profileInfo), { user: userInfo });
});
const updateMyProfile = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });
    const profileInfo = yield prisma_1.default.userProfile.update({
        where: {
            userId: userInfo.id
        },
        // @ts-ignore
        data: req.body
    });
    return Object.assign(Object.assign({}, profileInfo), { user: userInfo });
});
const getMyLostItems = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });
    const lostItems = yield prisma_1.default.lostItem.findMany({
        where: { userId: userInfo.id },
    });
    return { lostItems };
});
const getMyFoundItems = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });
    const foundItems = yield prisma_1.default.foundItem.findMany({
        where: { userId: userInfo.id },
    });
    return { foundItems };
});
const getMyClaimItems = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });
    const claimItems = yield prisma_1.default.claim.findMany({
        where: { userId: userInfo.id },
    });
    return { claimItems };
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma_1.default.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true
        }
    });
    return { users };
});
const updateUser = (user, req, id) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true
        }
    });
    let profileInfo;
    if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.role) === client_1.UserRole.ADMIN) {
        profileInfo = yield prisma_1.default.userProfile.update({
            where: {
                userId: id
            },
            // @ts-ignore
            data: req.body
        });
    }
    return Object.assign({}, profileInfo);
});
// Activate/Deactivate User (Admin only)
const activateOrDeactivateUser = (isActive, id) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield prisma_1.default.user.update({
        where: { id },
        data: { isActive },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true
        }
    });
    return Object.assign({}, updated);
});
// Website activity monitoring with lost item reports and reunion etc 
const websiteActivity = () => __awaiter(void 0, void 0, void 0, function* () {
    const lostItemCount = yield prisma_1.default.lostItem.count({
        where: {
            status: 'NOT_FOUND',
        },
    });
    const reunionCount = yield prisma_1.default.lostItem.count({
        where: {
            status: 'FOUND',
        },
    });
    const foundItemCount = yield prisma_1.default.foundItem.count();
    const claimItemCount = yield prisma_1.default.claim.count();
    const counts = {
        lostItems: lostItemCount,
        foundItems: foundItemCount,
        claimItems: claimItemCount,
        reunionCount: reunionCount,
    };
    return counts;
});
exports.userService = {
    createUser,
    createAdmin,
    loginUser,
    changePassword,
    refreshToken,
    getMyProfile,
    updateMyProfile,
    getMyLostItems,
    getMyFoundItems,
    getMyClaimItems,
    getAllUsers,
    updateUser,
    activateOrDeactivateUser,
    websiteActivity
};
