import {Request, Response} from 'express';
import {signupSchema,signinSchema} from '../inputValidations/validation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export const signup = async(req:Request,res:Response):Promise<void>=>{
    const validInput = signupSchema.safeParse(req.body);
    if(!validInput.success){
        //return proper error message
        res.status(411).json({
            message:"something went wrong on input parsing"
        });
        return;
    }

    const {username,password} = req.body;
    const hashPassword = await bcrypt.hash(password,10);

    try{
        const userRes = await prisma.user.create({
            data:{
                username:username,
                password:hashPassword
            }
        })
        res.send(userRes)
        
    }
    catch(e){
        //Send the error response in good manner
        res.status(500).json({message:"Internal Server Error"})
    }
};


