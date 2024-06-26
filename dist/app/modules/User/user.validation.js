"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required"
        }),
        email: zod_1.z.string({
            required_error: "Email is required"
        }),
        password: zod_1.z.string({
            required_error: "Password is required"
        }),
        profile: zod_1.z.object({
            bio: zod_1.z.string({
                required_error: "Bio is required!"
            }),
            age: zod_1.z.number({
                required_error: "Age is required!"
            }),
        })
    })
});
const updateProfile = zod_1.z.object({
    body: zod_1.z.object({
        bio: zod_1.z.string({
            required_error: "Bio is required!"
        }),
        age: zod_1.z.number({
            required_error: "Age is required!"
        }),
    })
});
exports.userValidation = {
    createUser,
    updateProfile
};
