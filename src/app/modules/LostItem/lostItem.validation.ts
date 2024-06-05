
import { z } from "zod";


const createLostItemCategory = z.object({
    body: z.object({
        name: z.string({
            required_error: "name is required!"
        }).min(1, { message: "name is required" }),
    })
});

const createLostItem = z.object({
    body: z.object({
        LostItemName: z.string({
            required_error: "LostItemName is required!"
        }),
        description: z.string({
            required_error: "description is required!"
        }),
        location: z.string({
            required_error: "location is required!"
        }),
    })
});



export const LostItemValidation = {
    createLostItemCategory,
    createLostItem
}