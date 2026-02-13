import { Router } from "express";
import authRouter from "./auth/auth-routes";
import superAdminRouter from "./super_admin/super-admin-routes";
import adminRouter from "./admin/admin-routes";
import employeeRouter from "./employee/employee-routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/super-admin", superAdminRouter);
router.use("/admin", adminRouter);
router.use("/employee", employeeRouter);

export default router;