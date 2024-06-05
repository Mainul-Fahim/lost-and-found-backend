
import { z } from "zod";



const createClaim = z.object({
    body: z.object({
        foundItemId: z.string({
            required_error: "foundItemId is required!"
        }),
        distinguishingFeatures: z.string({
            required_error: "distinguishingFeatures is required!"
        }),
        lostDate: z.string({
            required_error: "lostDate is required!"
        }),
    })
});

const updateClaim = z.object({
    body: z.object({
        status: z.string({
            required_error: "Status is required!"
        }),
    })
});




export const claimValidation = {
    createClaim,
    updateClaim
}