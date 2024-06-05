
import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../helpars/paginationHelper";
import { IPaginationOptions } from "../../interfaces/pagination";
import { LostItemSearchAbleFields } from "./lostItem.constants";


const createLostItemCategory = async (req: Request) => {

    const result = await prisma.lostItemCategory.create({
        // @ts-ignore
        data: req.body
    });

    return result;
};

const getAllLostItemCategory = async () => {

    const result = await prisma.lostItemCategory.findMany();

    return result;
};

const createLostItem = async (req: Request) => {

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

    const categoryInfo = await prisma.lostItemCategory.findUniqueOrThrow({
        where: {
            // @ts-ignore
            id: req?.body?.categoryId,
        },
    });

    console.log(userInfo,req.body);
    // @ts-ignore
    req?.body?.userId = userInfo.id

    const LostItemInfo = await prisma.lostItem.create({
        // @ts-ignore
        data: req.body
    });

    const result = {};

    // @ts-ignore
    result.id = LostItemInfo.id
    // @ts-ignore
    result.userId = userInfo?.id
    // @ts-ignore
    result.user = userInfo
    // @ts-ignore
    result.categoryId = categoryInfo.id
    // @ts-ignore
    result.category = categoryInfo
    // @ts-ignore
    result.LostItemName = LostItemInfo.LostItemName
    // @ts-ignore
    result.description = LostItemInfo.description
    // @ts-ignore
    result.location = LostItemInfo.location
    // @ts-ignore
    result.createdAt = LostItemInfo.createdAt
    // @ts-ignore
    result.updatedAt = LostItemInfo.updatedAt
    

    return result;
};

const updateLostItem = async ( req: Request,id:string) => {
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


      const lostItemInfo = await prisma.lostItem.update({
            where: {
                userId: userInfo.id,
                id: id
            },
            // @ts-ignore
            data: req.body
        })
    

    return { ...lostItemInfo,user:userInfo };
}

const deleteLostItem = async ( req: Request,id:string) => {
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


     const lostItemInfo = await prisma.lostItem.delete({
           where: {
               userId: userInfo.id,
               id: id
           },
       })
   

   return { ...lostItemInfo,user:userInfo };
}

const getAllLostItems = async (params: any, options: IPaginationOptions) => {
    const { page, limit, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;

    const andCondions: Prisma.LostItemWhereInput[] = [];

    //console.log(filterData);
    if (params.searchTerm) {
        andCondions.push({
            OR: LostItemSearchAbleFields.map(field => ({
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

    const whereConditons: Prisma.LostItemWhereInput = andCondions.length > 0 ? { AND: andCondions } : {};

    const result = await prisma.lostItem.findMany({
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
            LostItemName: true,
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

    const total = await prisma.lostItem.count({
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


export const LostItemService = {
    createLostItemCategory,
    createLostItem,
    updateLostItem,
    deleteLostItem,
    getAllLostItems,
    getAllLostItemCategory

}