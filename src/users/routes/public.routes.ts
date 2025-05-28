import { Router } from "express";
import { isAuth } from "../../middlewares/isAuth";
import { notAuth, auth } from "../controller/public.controller";
const router: Router = Router();

router.get("/private/:id", isAuth, auth);
router.get("/public", notAuth);

export default router;
