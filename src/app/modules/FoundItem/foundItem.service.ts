
import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../helpars/paginationHelper";
import { IPaginationOptions } from "../../interfaces/pagination";
import { foundItemSearchAbleFields } from "./foundItem.constant";

const createFoundItemCategory = async (req: Request) => {

    const result = await prisma.foundItemCategory.create({
        // @ts-ignore
        data: req.body
    });

    return result;
};

const getAllFoundItemCategory = async () => {

    const result = await prisma.foundItemCategory.findMany();

    return result;
};

const createFoundItem = async (req: Request) => {

    // @ts-ignore
    const {email} = req.user;

    const userInfo = await prisma.user.findUniqueOrThrow({
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

    const categoryInfo = await prisma.foundItemCategory.findUniqueOrThrow({
        where: {
            // @ts-ignore
            id: req?.body?.categoryId,
        },
    });

    console.log(userInfo,req.body);
    // @ts-ignore
    req?.body?.userId = userInfo.id

    const foundItemInfo = await prisma.foundItem.create({
        // @ts-ignore
        data: req.body
    });

    const result = {};

    // @ts-ignore
    result.id = foundItemInfo.id
    // @ts-ignore
    result.userId = userInfo?.id
    // @ts-ignore
    result.user = userInfo
    // @ts-ignore
    result.categoryId = categoryInfo.id
    // @ts-ignore
    result.category = categoryInfo
    // @ts-ignore
    result.foundItemName = foundItemInfo.foundItemName
    // @ts-ignore
    result.description = foundItemInfo.description
    // @ts-ignore
    result.location = foundItemInfo.location
    // @ts-ignore
    result.createdAt = foundItemInfo.createdAt
    // @ts-ignore
    result.updatedAt = foundItemInfo.updatedAt
    

    return result;
};

const updateFoundItem = async ( req: Request,id:string) => {
    // @ts-ignore
    const {email} = req.user;

   const userInfo = await prisma.user.findUniqueOrThrow({
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


     const foundItemInfo = await prisma.foundItem.update({
           where: {
               userId: userInfo.id,
               id: id
           },
           // @ts-ignore
           data: req.body
       })
   

   return { ...foundItemInfo,user:userInfo };
}

const deleteFoundItem = async ( req: Request,id:string) => {
    // @ts-ignore
    const {email} = req.user;

   const userInfo = await prisma.user.findUniqueOrThrow({
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


     const foundItemInfo = await prisma.foundItem.delete({
           where: {
               userId: userInfo.id,
               id: id
           },
       })
   

   return { ...foundItemInfo,user:userInfo };
}

const getAllFoundItems = async (params: any, options: IPaginationOptions) => {
    const { page, limit, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;

    const andCondions: Prisma.FoundItemWhereInput[] = [];

    //console.log(filterData);
    if (params.searchTerm) {
        andCondions.push({
            OR: foundItemSearchAbleFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    };

    if (Object.keys(filterData).length > 0) {
        andCondions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    };

    const whereConditons: Prisma.FoundItemWhereInput = andCondions.length > 0 ? { AND: andCondions } : {};

    const result = await prisma.foundItem.findMany({
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
                    id:true,
                    name:true,
                    email:true,
                    createdAt: true,
                    updatedAt: true,
                }
            },
            category: true,
            
        }

    });

    const total = await prisma.foundItem.count({
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
};


export const foundItemService = {
    createFoundItemCategory,
    createFoundItem,
    updateFoundItem,
    deleteFoundItem,
    getAllFoundItems,
    getAllFoundItemCategory

}