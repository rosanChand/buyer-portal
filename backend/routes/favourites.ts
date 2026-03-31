import { Router } from "express";
import {
  getFavourites,
  addFavourite,
  removeFavourite,
} from "../controllers/favouritesController";
import { validateFavourite } from "../middleware/validate";
import auth from "../middleware/auth";

const router = Router();

router.get("/", auth, getFavourites);
router.post("/", auth, validateFavourite, addFavourite);
router.delete("/:propertyId", auth, removeFavourite);

export default router;
