import {Request, Response} from 'express';
import {signupSchema,signinSchema} from '../inputValidations/validation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {PrismaClient} from "@prisma/client";
export const prisma = new PrismaClient();

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


export const signin = async (req:Request,res:Response)=>
{
    const validInput = signinSchema.safeParse(req.body);
    if (!validInput.success) {
        console.log("Some error in sigin input validation");
        res.send("Some error in sigin input validation");
    return;
    }

    const {username,password} = req.body;

    try{
        const user = await prisma.user.findFirst({where:{
            username:username
        }});
        if (!user){
            res.status(404).json({message:"User not found"});
            return;
        }
        console.log(user)
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            res.status(401).json({message:"Invalid Credentials"});
            return;
        }

        const token = jwt.sign(
            {id:user.id},
            process.env.JWT_SECRET || "",
            {expiresIn:"7days"}
        );

        res.status(200).json({
            message:"User logged in successfully",
            token,
            username
        })
    }
    catch(e){
        console.log("signin error:",e);
        res.status(500).json({message:"Internal Sever Error"})
    }
}