import { Request, Response } from "express";
import prisma from "../../utiles/prisma";

export const getMyTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.id },
      include: {
        project: {
          select: { name: true, description: true }
        }
      }
    });
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMyTaskStatus = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { status } = req.body;
  
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task || task.userId !== req.id) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status }
    });
    res.status(200).json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyTeamMembers = async (req: Request, res: Response) => {
  try {
    // Find teams where the user is a member
    const teams = await prisma.team.findMany({
      where: { userIds: { has: req.id } },
      include: { users: { select: { onboard: true, email: true } } }
    });
    res.status(200).json(teams);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await prisma.notifications.findMany({
      where: { userId: req.id },
      orderBy: { createdAt: "desc" }
    });
    res.status(200).json(notifications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
