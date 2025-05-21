import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'

export const authMidlleware = (req:Request,res:Response,next:NextFunction)=>{
    try{
        const token = req.headers['authorization'];
        console.log(token);
        if (!token){
            res.status(401).json({message:"Authentication token not found"});
            return;
        }

        const decodedToken = jwt.verify(
            token as string,process.env.JWT_SECRET||""
        ) as JwtPayload

        if (decodedToken&&decodedToken.id){
            //@ts-ignore
            req.userId=decodedToken.id;
            next();
        }
        else{
            res.status(403).json({message:"Invalid authentication token"})
        }
    }
    catch(e){
        res.send("error in authorization"+e)
    }
}