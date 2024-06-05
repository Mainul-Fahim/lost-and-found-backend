import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { foundItemService } from "./foundItem.service";
import pick from "../../../shared/pick";
import { foundItemFilterableFields } from "./foundItem.constant";


const createFoundItemCategory = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await foundItemService.createFoundItemCategory(req);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Found item category created successfully",
        data: result
    });
});

const createFoundItem = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await foundItemService.createFoundItem(req);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Found item created successfully",
        data: result
    });
});

const updateFoundItem = catchAsync(async (req: Request, res: Response) => {
    
    const { id } = req.params;
    
    // @ts-ignore
    const result = await foundItemService.updateFoundItem(req,id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Found item updated successfully",
        data: result
    });
});

const deleteFoundItem = catchAsync(async (req: Request, res: Response) => {
    
    const { id } = req.params;
    
    // @ts-ignore
    const result = await foundItemService.deleteFoundItem(req,id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Found item deleted successfully",
        data: result
    });
});


const getAllFoundItems = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.query)
    const filters = pick(req.query, foundItemFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

    const result = await foundItemService.getAllFoundItems(filters, options)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Found items retrieved successfully",
        meta: result.meta,
        data: result.data
    })
});

const getAllFoundItemCategory = catchAsync(async (req: Request, res: Response) => {


    const result = await foundItemService.getAllFoundItemCategory()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Found items category retrieved successfully",
        data: result
    })
});

export const foundItemController = {
    createFoundItemCategory,
    createFoundItem,
    updateFoundItem,
    deleteFoundItem,
    getAllFoundItems,
    getAllFoundItemCategory
 
}