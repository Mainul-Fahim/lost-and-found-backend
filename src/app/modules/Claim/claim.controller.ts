import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { claimService } from "./claim.service";
import { Request, Response } from "express";

const createClaim = catchAsync(async (req: Request, res: Response) => {
 
    const result = await claimService.createClaim(req);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Claim created successfully",
        data: result
    });
});

const getAllClaim = catchAsync(async (req: Request, res: Response) => {
    const result = await claimService.getClaims();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Claims retrieved successfully',
        data: result,
    });
});

const updateClaim = catchAsync(async (req: Request, res: Response) => {
    const { claimId } = req.params;
    console.log(claimId);
    const result = await claimService.updateClaimStatus(claimId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Claim updated successfully",
        data: result
    })
})

export const claimController = {
    createClaim,
    getAllClaim,
    updateClaim 
 
}