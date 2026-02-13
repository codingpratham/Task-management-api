import { Router } from "express";
import { login, logout, onBoarding, register } from "../../controller/auth/auth-controller";
import { authmiddleware, onBoardCheck } from "../../middleware/middleware";
import { upload } from "../../utiles/multer";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, role]
 *             properties:
 *               email: { type: string, example: "user@example.com" }
 *               password: { type: string, example: "password123" }
 *               role: { type: string, enum: [employee, admin, super_admin], example: "employee" }
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
 *       400:
 *         description: Validation error
 */
router.post("/register",register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "admin@example.com" }
 *               password: { type: string, example: "password123" }
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login",login)

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.get("/logout",logout)

/**
 * @swagger
 * /auth/onboarding:
 *   post:
 *     summary: Complete user onboarding
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, phone, address, image]
 *             properties:
 *               name: { type: string }
 *               phone: { type: string }
 *               address: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Onboarding successful
 */
router.post('/onboarding',authmiddleware,onBoardCheck,upload.single("image"),onBoarding)


export default router;