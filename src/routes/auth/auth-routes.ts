import { Router } from "express";
import { login, logout, onBoarding, register } from "../../controller/auth/auth-controller";
import { authmiddleware, onBoardCheck } from "../../middleware/middleware";
import { upload } from "../../utiles/multer";

const router = Router();

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)

router.post('/onboarding',authmiddleware,onBoardCheck,upload.single("image"),onBoarding)


export default router;