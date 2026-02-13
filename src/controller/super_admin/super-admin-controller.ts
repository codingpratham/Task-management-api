import { Request, Response } from "express";
import prisma from "../../utiles/prisma";

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        user: {
          select: {
            onboard: true,
            email: true,
          }
        },
        _count: {
          select: { tasks: true }
        }
      }
    });
    res.status(200).json(projects);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await prisma.user.findMany({
      where: { role: "admin" },
      include: { onboard: true }
    });
    res.status(200).json(admins);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await prisma.user.findMany({
      where: { role: "employee" },
      include: { onboard: true }
    });
    res.status(200).json(employees);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProjectDetails = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        tasks: {
          include: {
            user: {
              select: { onboard: true, email: true }
            }
          }
        },
        user: {
          select: { onboard: true, email: true }
        }
      }
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
