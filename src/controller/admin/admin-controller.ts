import { Request, Response } from "express";
import prisma from "../../utiles/prisma";

export const createTeam=async(req:Request , res:Response)=>{
    const { teamName } = req.body;
    if (!teamName) {
        return res.status(400).json({ message: "Team name is required" });
    }

    try {
        const team = await prisma.teams.create({
            data: {
                
            },
        })
    } catch (error : Error | any) {
        res.status(500).json({ message: error.message });
        console.log(error);
        
    }
}