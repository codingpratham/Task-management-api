import { Request, Response } from "express";
import prisma from "../../utiles/prisma";
import { projectSchema } from "../../types/project";
import { taskSchema } from "../../types/task";

export const createProject = async (req: Request, res: Response) => {
  const { success, error, data } = projectSchema.safeParse(req.body);
  if (!success) return res.status(400).json({ error: error });

  try {
    const project = await prisma.project.create({
      data: {
        ...data,
        userId: req.id,
      },
    });
    res.status(201).json(project);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.id },
      include: { _count: { select: { tasks: true } } },
    });
    res.status(200).json(projects);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { success, error, data } = taskSchema.safeParse(req.body);
  if (!success) return res.status(400).json({ error: error });

  try {
    const task = await prisma.task.create({
      data: {
        ...data,
      },
    });

    // Create notification for employee
    await prisma.notifications.create({
      data: {
        userId: data.userId,
        message: `New task assigned: ${data.title}`,
      },
    });

    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeamAnalytics = async (req: Request, res: Response) => {
  const projectId = req.params.projectId as string;
  try {
    const totalTasks = await prisma.task.count({ where: { projectId } });
    const completedTasks = await prisma.task.count({ where: { projectId, status: "approved" } }); 
    const pendingTasks = await prisma.task.count({ where: { projectId, status: "pending" } });
    
    const productivity = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
      productivity: `${productivity.toFixed(2)}%`,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  const { name, userIds } = req.body;
  try {
    const team = await prisma.team.create({
      data: {
        name,
        description: "",
        users: {
          connect: userIds?.map((id: string) => ({ id })) || []
        }
      }
    });
    res.status(201).json(team);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await prisma.team.findMany({
      include: { users: { select: { onboard: true, email: true } } }
    });
    res.status(200).json(teams);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployees = async (req: Request, res: Response) => {
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

export const updateTaskStatus = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const { status } = req.body;
    try {
        const task = await prisma.task.update({
            where: { id },
            data: { status }
        });
        res.status(200).json(task);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}