import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Router } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "Comprehensive API documentation for the Task Management System with Role-Based Access Control",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string" },
            role: { type: "string", enum: ["employee", "admin", "super_admin"] },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Onboard: {
          type: "object",
          properties: {
            name: { type: "string" },
            phone: { type: "string" },
            address: { type: "string" },
            image: { type: "string" },
            isVerified: { type: "boolean" },
          },
        },
        Project: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            deadline: { type: "string", format: "date-time" },
            status: { type: "string", enum: ["pending", "approved", "rejected"] },
            priority: { type: "string", enum: ["low", "medium", "high"] },
            userId: { type: "string" },
          },
        },
        Task: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            status: { type: "string", enum: ["pending", "approved", "rejected"] },
            priority: { type: "string", enum: ["low", "medium", "high"] },
            deadline: { type: "string", format: "date-time" },
            userId: { type: "string" },
            projectId: { type: "string" },
          },
        },
        Team: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            userIds: { type: "array", items: { type: "string" } },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string" },
            error: { type: "string" },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/**/*.ts", "./src/controller/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
const router = Router();
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
