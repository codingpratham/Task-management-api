import { Router } from "express";
import { createProject, getMyProjects, createTask, getTeamAnalytics, updateTaskStatus, createTeam, getTeams } from "../../controller/admin/admin-controller";
import { authmiddleware, adminMiddleware, onBoardCheck } from "../../middleware/middleware";

const router = Router();

router.use(authmiddleware, adminMiddleware, onBoardCheck);

/**
 * @swagger
 * /admin/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, deadline]
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               deadline: { type: string, format: date-time }
 *               priority: { type: string, enum: [low, medium, high] }
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Project' }
 */
router.post("/projects", createProject);

/**
 * @swagger
 * /admin/projects:
 *   get:
 *     summary: Get all projects for current admin
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Project' }
 */
router.get("/projects", getMyProjects);

/**
 * @swagger
 * /admin/tasks:
 *   post:
 *     summary: Create a new task and assign to employee
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, deadline, projectId, userId]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               deadline: { type: string, format: date-time }
 *               projectId: { type: string }
 *               userId: { type: string }
 *               priority: { type: string, enum: [low, medium, high] }
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Task' }
 */
router.post("/tasks", createTask);

/**
 * @swagger
 * /admin/analytics/{projectId}:
 *   get:
 *     summary: Get team analytics for a project
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project analytics summary
 */
router.get("/analytics/:projectId", getTeamAnalytics);

/**
 * @swagger
 * /admin/tasks/{id}:
 *   patch:
 *     summary: Update task status by ID
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               status: { type: string, enum: [pending, approved, rejected] }
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
router.patch("/tasks/:id", updateTaskStatus);

/**
 * @swagger
 * /admin/teams:
 *   post:
 *     summary: Create a new team
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, userIds]
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               userIds: { type: array, items: { type: string } }
 *     responses:
 *       201:
 *         description: Team created successfully
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Team' }
 */
router.post("/teams", createTeam);

/**
 * @swagger
 * /admin/teams:
 *   get:
 *     summary: Get all teams
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of teams with members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Team' }
 */
router.get("/teams", getTeams);

export default router;
