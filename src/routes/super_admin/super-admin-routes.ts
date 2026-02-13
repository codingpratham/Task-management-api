import { Router } from "express";
import { getAllProjects, getAllAdmins, getAllEmployees, getProjectDetails } from "../../controller/super_admin/super-admin-controller";
import { authmiddleware, superAdminMiddleware, onBoardCheck } from "../../middleware/middleware";

const router = Router();

router.use(authmiddleware, superAdminMiddleware, onBoardCheck);

/**
 * @swagger
 * /super-admin/projects:
 *   get:
 *     summary: Get all projects in the system
 *     tags: [Super Admin]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of all projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Project' }
 */
router.get("/projects", getAllProjects);

/**
 * @swagger
 * /super-admin/admins:
 *   get:
 *     summary: Get all administrators
 *     tags: [Super Admin]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of all admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/User' }
 */
router.get("/admins", getAllAdmins);

/**
 * @swagger
 * /super-admin/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Super Admin]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of all employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/User' }
 */
router.get("/employees", getAllEmployees);

/**
 * @swagger
 * /super-admin/projects/{id}:
 *   get:
 *     summary: Get detailed project information
 *     tags: [Super Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Detailed information about the project
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Project' }
 *       404:
 *         description: Project not found
 */
router.get("/projects/:id", getProjectDetails);

export default router;
