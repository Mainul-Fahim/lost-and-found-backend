import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { LostItemFilterableFields } from "./lostItem.constants";
import { LostItemService } from "./lostItem.service";



const createLostItemCategory = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await LostItemService.createLostItemCategory(req);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Lost item category created successfully",
        data: result
    });
});

const createLostItem = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await LostItemService.createLostItem(req);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Lost item created successfully",
        data: result
    });
});

const updateLostItem = catchAsync(async (req: Request, res: Response) => {
    
    const { id } = req.params;
    
    // @ts-ignore
    const result = await LostItemService.updateLostItem(req,id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Lost item updated successfully",
        data: result
    });
});

const deleteLostItem = catchAsync(async (req: Request, res: Response) => {
    
    const { id } = req.params;
    
    // @ts-ignore
    const result = await LostItemService.deleteLostItem(req,id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Lost item deleted successfully",
        data: result
    });
});

const getAllLostItems = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.query)
    const filters = pick(req.query, LostItemFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

    const result = await LostItemService.getAllLostItems(filters, options)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Lost items retrieved successfully",
        meta: result.meta,
        data: result.data
    })
});

const getAllLostItemCategory = catchAsync(async (req: Request, res: Response) => {


    const result = await LostItemService.getAllLostItemCategory()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Lost items category retrieved successfully",
        data: result
    })
});

export const LostItemController = {
    createLostItemCategory,
    createLostItem,
    updateLostItem,
    deleteLostItem,
    getAllLostItems,
    getAllLostItemCategory
}