import { Request, Response } from "express";
import { loginSchema, loginType, registerSchema ,registerType} from "../../types/auth";
import prisma from "../../utiles/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async(req:Request, res:Response)=>{
    const {success,error,data}= registerSchema.safeParse(req.body);

    if(!success){
        return res.status(400).json({error:error})
    }

    const schema:registerType = data;

    try {
       const existingUser = await prisma.user.findFirst({
        where:{
            email:schema.email
        }
       })

       if(existingUser){
        return res.status(400).json({error:"User already exists"})
       }

       const hashesdPassword = await bcrypt.hash(schema.password,10)

       const user = await prisma.user.create({
        data:{
            email:schema.email,
            password:hashesdPassword,
            role:schema.role
        }
       })

       const token = jwt.sign({id:user.id},process.env.JWT_SECRET as string)

       res.cookie("token",token,{
        httpOnly:true,
        maxAge:1000*60*60*24*30,
        sameSite:"none",
        secure:true
       })

       res.status(200).json({
        message:"User created successfully",
        user:user,
        token:token
       })
    } catch (error : Error | any) {
        return res.status(500).json({error:error.message})
        console.log(error);
    }
}

export const login = async(req:Request , res:Response)=>{
    const {success,error,data}= loginSchema.safeParse(req.body);
    if(!success){
        return res.status(400).json({error:error})
    }

    const schema : loginType = data;

    try {
        const user = await prisma.user.findFirst({
            where:{
                email:schema.email
            }
        })

        if(!user){
            return res.status(400).json({error:"User not found"})
        }

        const isPasswordValid = await bcrypt.compare(schema.password , user.password)

        if(!isPasswordValid){
            return res.status(400).json({error:"Invalid password"})
        }

        const token = jwt.sign({id:user.id},process.env.JWT_SECRET as string)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:1000*60*60*24*30,
            sameSite:"none",
            secure:true
        })

        res.status(200).json({
            message:"Login successful",
            user:user,
            token:token
        })
 
    } catch (error : Error | any) {
        res.status(500).json({error:error.message})
        console.log(error);
    }
}

export const logout = async(req:Request, res:Response)=>{
    res.clearCookie("token");
    res.status(200).json({message:"Logout successful"})

}