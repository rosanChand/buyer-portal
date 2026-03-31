import { Router } from "express";
import { getAllProperties } from "../controllers/propertiesController";
import auth from "../middleware/auth";

const router = Router();

router.get("/", auth, getAllProperties);

export default router;
