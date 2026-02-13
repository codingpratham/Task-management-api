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
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { id },
      include: { onboard: true }
    });

    if (!user?.onboard?.isVerified) {
      return res.status(403).json({ message: "User not onboarded or verified" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "onBoardCheck Error" });
  }
};

export const superAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.id;
  const user = await prisma.user.findUnique({ where: { id } });
  if (user?.role !== "super_admin") {
    return res.status(403).json({ message: "Super Admin access required" });
  }
  next();
};

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.id;
  const user = await prisma.user.findUnique({ where: { id } });
  if (user?.role !== "admin" && user?.role !== "super_admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

export const employeeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.id;
  const user = await prisma.user.findUnique({ where: { id } });
  if (user?.role !== "employee" && user?.role !== "admin" && user?.role !== "super_admin") {
    return res.status(403).json({ message: "Employee access required" });
  }
  next();
};


