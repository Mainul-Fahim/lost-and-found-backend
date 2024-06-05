"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.claimValidation = void 0;
const zod_1 = require("zod");
const createClaim = zod_1.z.object({
    body: zod_1.z.object({
        foundItemId: zod_1.z.string({
            required_error: "foundItemId is required!"
        }),
        distinguishingFeatures: zod_1.z.string({
            required_error: "distinguishingFeatures is required!"
        }),
        lostDate: zod_1.z.string({
            required_error: "lostDate is required!"
        }),
    })
});
const updateClaim = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.string({
            required_error: "Status is required!"
        }),
    })
});
exports.claimValidation = {
    createClaim,
    updateClaim
};
