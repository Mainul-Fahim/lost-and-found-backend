"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LostItemValidation = void 0;
const zod_1 = require("zod");
const createLostItemCategory = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is required!"
        }).min(1, { message: "name is required" }),
    })
});
const createLostItem = zod_1.z.object({
    body: zod_1.z.object({
        LostItemName: zod_1.z.string({
            required_error: "LostItemName is required!"
        }),
        description: zod_1.z.string({
            required_error: "description is required!"
        }),
        location: zod_1.z.string({
            required_error: "location is required!"
        }),
    })
});
exports.LostItemValidation = {
    createLostItemCategory,
    createLostItem
};
