import { Request } from "express";
import prisma from "../../../shared/prisma";

const createClaim = async (req: Request) => {

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


    console.log(userInfo,req.body);
    // @ts-ignore
    req?.body?.userId = userInfo.id

    const claimInfo = await prisma.claim.create({
        data: req.body
    });

    

    return claimInfo;
};

const getClaims = async () => {

    

      const claimInfo = await prisma.claim.findMany({
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
                    category:true
                }
            }
        }
      });
   

    return claimInfo;
};

const updateClaimStatus = async (id: string, data: Request)=> {
    await prisma.claim.findUniqueOrThrow({
        where: {
            id,
        }
    });

    const result = await prisma.claim.update({
        where: {
            id
        },
        // @ts-ignore
        data
    });

    return result;
};


export const claimService = {
    createClaim,
    getClaims,
    updateClaimStatus

}