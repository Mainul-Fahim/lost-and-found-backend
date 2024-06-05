
import { z } from "zod";


const createFoundItemCategory = z.object({
    body: z.object({
        name: z.string({
            required_error: "name is required!"
        }).min(1, { message: "name is required" }),
    })
});

const createFoundItem = z.object({
    body: z.object({
        foundItemName: z.string({
            required_error: "foundItemName is required!"
        }),
        description: z.string({
            required_error: "description is required!"
        }),
        location: z.string({
            required_error: "location is required!"
        }),
    })
});



export const foundItemValidation = {
    createFoundItemCategory,
    createFoundItem
}