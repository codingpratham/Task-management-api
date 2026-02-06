import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utiles/prisma";


declare global{
    namespace Express{
        interface Request{
            id: string;
        }
    }
}

export const authmiddleware = (req : Request , res:Response ,next:NextFunction)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
        console.log("Error from authMiddleware");
        
    }
    
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as {id:string};
        const payload = {id:decoded.id}
        req.id = payload.id
        next();
    } catch (error : Error | any) {
        res.status(401).json({message:"Unauthorized"})
        console.log(error);
    }
}

export const onBoardCheck = async(req:Request , res:Response ,next:NextFunction)=>{
    const id = req.id;

    if(!id){
        res.status(401).json({message:"Unauthorized"})
        console.log("Error from onBoardCheck");
    }

    try {

        const user = await prisma.onboard.findFirst({
            where:{
                userId:id
            }
        })

        if(!user){
            res.status(401).json({message:"Unauthorized"})
            console.log("Error from onBoardCheck");
        }

        if(!user?.isVerified){
            res.status(401).json({message:"Onboard not verified"})
            console.log("Error from onBoardCheck");
        }

        next();
        
        
    } catch (error : Error | any ) {
        res.status(401).json({message:"onBoardCheck Error"})
        console.log(error);
    }
}

