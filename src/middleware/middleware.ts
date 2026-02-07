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

export const onBoardCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.id;

  if (!id) {
    console.log("Error from onBoardCheck: No user id");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await prisma.user.findFirst({
      where:{
        id:id
      },
      include:{
        onboard:true
      }
    });

    if (user?.onboard?.isVerified) {
      console.log("Error from onBoardCheck: User already verified");
      return res.status(401).json({ message: "user verified" });
      next()
    }

    return next();

  } catch (error) {
    console.log("Error from onBoardCheck", error);
    return res.status(500).json({ message: "onBoardCheck Error" });
  }
};


