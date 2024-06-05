"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foundItemValidation = void 0;
const zod_1 = require("zod");
const createFoundItemCategory = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is required!"
        }).min(1, { message: "name is required" }),
    })
});
const createFoundItem = zod_1.z.object({
    body: zod_1.z.object({
        foundItemName: zod_1.z.string({
            required_error: "foundItemName is required!"
        }),
        description: zod_1.z.string({
            required_error: "description is required!"
        }),
        location: zod_1.z.string({
            required_error: "location is required!"
        }),
    })
});
exports.foundItemValidation = {
    createFoundItemCategory,
    createFoundItem
};
