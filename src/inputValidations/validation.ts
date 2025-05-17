import { z } from 'zod';

export const signupSchema = z.object({
    username: z
    .string()
    .min(3,{message:"Username must be atleast 3 character long"})
    .regex(/^\S*$/,{message: "Spaces are not allowed in user name"})
    .max(12,{message:"Username must be at most 12 characters long"}),

    password: z
    .string()
    .min(6,{message:"Password must be at least 6 character long"})
    .regex(/[!@#$%^&*(),.?":{}|<>]/,{
        message:"Password must contain at least 1 special character",
    })
    .regex(/[A-Z]/,{message:"Password must contain atleast 1 uppercase character"})
    .regex(/[a-z]/,{message:'Password must contain one lower case letter'})
    .regex(/[0-9]/,{message:"Password must contain at least 1 digit"})
});


export const signinSchema = z.object({
    username:z.string(),
    
    password:z.string()
})