import { Router } from "express";
import { getMyTasks, updateMyTaskStatus, getMyNotifications } from "../../controller/employee/employee-controller";
import { authmiddleware, employeeMiddleware, onBoardCheck } from "../../middleware/middleware";

const router = Router();

router.use(authmiddleware, employeeMiddleware, onBoardCheck);

/**
 * @swagger
 * /employee/tasks:
 *   get:
 *     summary: Get tasks assigned to current employee
 *     tags: [Employee]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of assigned tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Task' }
 */
router.get("/tasks", getMyTasks);

/**
 * @swagger
 * /employee/tasks/{id}:
 *   patch:
 *     summary: Update assigned task status
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               status: { type: string, enum: [pending, approved, rejected] }
 *     responses:
 *       200:
 *         description: Task status updated
 */
router.patch("/tasks/:id", updateMyTaskStatus);

/**
 * @swagger
 * /employee/notifications:
 *   get:
 *     summary: Get notifications for current employee
 *     tags: [Employee]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of notifications
 */
router.get("/notifications", getMyNotifications);

export default router;
