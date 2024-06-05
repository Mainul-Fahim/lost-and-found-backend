import { User, UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import * as bcrypt from 'bcrypt'
import { jwtHelpers } from "../../helpars/jwtHelpers";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import { IAuthUser } from "../../interfaces/common";
import { IChangePassword } from "./user.interface";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { AuthUtils, hashedPassword } from "../../helpars/authHelpers";

const createUser = async (req: Request): Promise<User> => {

    // @ts-ignore
    const hashedPassword: string = await bcrypt.hash(req.password, 12)

    const userData = {
        // @ts-ignore
        name: req.name,
        // @ts-ignore
        email: req.email,
        password: hashedPassword,
    }

    const finalResult = {}

    const result = await prisma.$transaction(async (transactionClient) => {
        const user = await transactionClient.user.create({
            data: userData
        });

        const { id, email, name, createdAt, updatedAt } = user

        // @ts-ignore
        req.profile.userId = id

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

        const createdProfileData = await transactionClient.userProfile.create({
            // @ts-ignore
            data: req.profile
        });

        return createdProfileData;
    });

    // @ts-ignore
    finalResult.profile = result;

    // @ts-ignore
    return finalResult;
};

//create an admin

const createAdmin = async (req: Request): Promise<User> => {

    // @ts-ignore
    const hashedPassword: string = await bcrypt.hash(req.password, 12)

    const userData = {
        // @ts-ignore
        name: req.name,
        // @ts-ignore
        email: req.email,
        password: hashedPassword,
        role: UserRole.ADMIN,
    }

    const finalResult = {}

    const result = await prisma.$transaction(async (transactionClient) => {
        const user = await transactionClient.user.create({
            data: userData
        });

        const { id, email, name, createdAt, updatedAt } = user

        // @ts-ignore
        req.profile.userId = id

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

        const createdProfileData = await transactionClient.userProfile.create({
            // @ts-ignore
            data: req.profile
        });

        return createdProfileData;
    });

    // @ts-ignore
    finalResult.profile = result;

    // @ts-ignore
    return finalResult;
};

const loginUser = async (payload: {
    email: string,
    password: string
}) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        }
    });

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);

    if (!isCorrectPassword) {
        throw new Error("Password incorrect!")
    }
    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        config.jwt.refresh_token_secret as Secret,
        config.jwt.refresh_token_expires_in as string
    );

    return {
        accessToken,
        refreshToken,
        userData,
    };
};

const refreshToken = async (token: string) => {
    let decodedData;
    try {
        decodedData = jwtHelpers.verifyToken(token, config.jwt.refresh_token_secret as Secret);
    }
    catch (err) {
        throw new Error("You are not authorized!")
    }

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
        }
    });

    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
    },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    );

    return {
        accessToken,
    };

};

const changePassword = async (
    user: JwtPayload | null,
    payload: IChangePassword
): Promise<void> => {
    const { oldPassword, newPassword } = payload;

    const isUserExist = await prisma.user.findUnique({
        where: {
            id: user?.userId,
        }
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }

    // checking old password
    if (
        isUserExist.password &&
        !(await AuthUtils.comparePasswords(oldPassword, isUserExist.password))
    ) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
    }

    const hashPassword = await hashedPassword(newPassword);

    await prisma.user.update({
        where: {
            id: isUserExist.id
        },
        data: {
            password: hashPassword,
        }
    })
};

const getMyProfile = async (user: IAuthUser) => {

    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });


    const profileInfo = await prisma.userProfile.findUnique({
        where: {
            userId: userInfo.id
        }
    })


    return { ...profileInfo, user: userInfo };
};


const updateMyProfile = async (user: IAuthUser, req: Request) => {
    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });


    const profileInfo = await prisma.userProfile.update({
        where: {
            userId: userInfo.id
        },
        // @ts-ignore
        data: req.body
    })


    return { ...profileInfo, user: userInfo };
}

const getMyLostItems = async (user: IAuthUser, req: Request) => {
    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });


    const lostItems = await prisma.lostItem.findMany({
        where: { userId: userInfo.id },
    });


    return { lostItems };
}

const getMyFoundItems = async (user: IAuthUser, req: Request) => {
    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });


    const foundItems = await prisma.foundItem.findMany({
        where: { userId: userInfo.id },
    });


    return { foundItems };
}

const getMyClaimItems = async (user: IAuthUser, req: Request) => {
    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });


    const claimItems = await prisma.claim.findMany({
        where: { userId: userInfo.id },
    });


    return { claimItems };
}

const getAllUsers = async () => {

    const users = await prisma.user.findMany({
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
}

const updateUser = async (user: IAuthUser, req: Request, id: string) => {
    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email,
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

    if (userInfo?.role === UserRole.ADMIN) {
        profileInfo = await prisma.userProfile.update({
            where: {
                userId: id
            },
            // @ts-ignore
            data: req.body
        })
    }


    return { ...profileInfo };
}

// Activate/Deactivate User (Admin only)

const activateOrDeactivateUser = async (isActive: any, id: string) => {

    const updated = await prisma.user.update({
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

    return { ...updated };
}

// Website activity monitoring with lost item reports and reunion etc 
const websiteActivity = async () => {

    const lostItemCount = await prisma.lostItem.count({
        where: {
          status: 'NOT_FOUND', 
        },
      });

      const reunionCount = await prisma.lostItem.count({
        where: {
          status: 'FOUND', 
        },
      });
  
      const foundItemCount = await prisma.foundItem.count();
      const claimItemCount = await prisma.claim.count();

      const counts = {
        lostItems: lostItemCount,
        foundItems: foundItemCount,
        claimItems: claimItemCount,
        reunionCount: reunionCount,
      };

    return counts;
}

export const userService = {
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
}