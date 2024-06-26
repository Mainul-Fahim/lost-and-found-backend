
import { z } from "zod";

const createUser = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required"
        }),
        email: z.string({
            required_error: "Email is required"
        }),
        password: z.string({
            required_error: "Password is required"
        }),
        profile: z.object({
            bio: z.string({
                required_error: "Bio is required!"
            }),
            age: z.number({
                required_error: "Age is required!"
            }),
        })
    })
});

const updateProfile = z.object({
    body: z.object({
        bio: z.string({
            required_error: "Bio is required!"
        }),
        age: z.number({
            required_error: "Age is required!"
        }),
    })
});



export const userValidation = {
    createUser,
    updateProfile
}