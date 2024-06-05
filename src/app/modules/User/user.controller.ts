import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { userService } from "./user.sevice";
import { IAuthUser } from "../../interfaces/common";


const createUser = catchAsync(async (req: Request, res: Response) => {
console.log(req.body);
    const result = await userService.createUser(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Created successfuly!",
        data: result
    })
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    console.log(req.body);
        const result = await userService.createAdmin(req.body);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin Created successfuly!",
            data: result
        })
    });

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.loginUser(req.body);

    const { refreshToken, userData } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: {
            id: userData.id, 
            name: userData.name, 
            email: userData.email, 
            token: result.accessToken,
        }
    })
});

const changePassword = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const { ...passwordData } = req.body;
  
    await userService.changePassword(user as IAuthUser, passwordData);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Password changed successfully!',
      data: {
        status: 200,
        message: 'Password changed successfully!',
      },
    });
  });

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await userService.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Access token genereated successfully!",
        data: result
        // data: {
        //     accessToken: result.accessToken,
        //     needPasswordChange: result.needPasswordChange
        // }
    })
});

const getMyProfile = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

    const user = req.user;

    const result = await userService.getMyProfile(user as IAuthUser);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile retrieved successfully",
        data: result
    })
});

const updateMyProfile = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

    const user = req.user;
     
    // @ts-ignore
    const result = await userService.updateMyProfile(user as IAuthUser, req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile updated successfully",
        data: result
    })
});

const getMyLostItems = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

    const user = req.user;
     
    // @ts-ignore
    const result = await userService.getMyLostItems(user as IAuthUser, req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My lost Items fetched successfully",
        data: result
    })
});

const getMyFoundItems = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

    const user = req.user;
     
    // @ts-ignore
    const result = await userService.getMyFoundItems(user as IAuthUser, req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My found Items fetched successfully",
        data: result
    })
});

const getMyClaimItems = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

    const user = req.user;
     
    // @ts-ignore
    const result = await userService.getMyClaimItems(user as IAuthUser, req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My Claim Items fetched successfully",
        data: result
    })
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {


    const result = await userService.getAllUsers();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Users retrieved successfully",
        data: result
    })
});

const updateUser = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

    const user = req.user;
    const { id } = req.params;
     
    // @ts-ignore
    const result = await userService.updateMyProfile(user as IAuthUser, req,id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User updated successfully",
        data: result
    })
});

const activateOrDeactivateUser = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

    const { id } = req.params;
    const isActive = req.body.isActive;
    console.log(id, isActive);
    // @ts-ignore
    const result = await userService.activateOrDeactivateUser(isActive,id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `User ${isActive ? 'activated' : 'deactivated'}`,
        data: result
    })
});

const websiteActivity = catchAsync(async (req: Request, res: Response) => {


    const result = await userService.websiteActivity();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Website activity retrieved successfully",
        data: result
    })
});

export const userController = {
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