import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getActivites,
  getActivityById,
  postActivites,
  updataActivity,
  deleteActivity,
} from "./controller/activites-controller.ts";
const router = new Router();

router.get("/api/v1/activities", getActivites);

router.get("/api/v1/activities/:id", getActivityById);

router.post("/api/v1/activities", postActivites);

router.put("/api/v1/activities/:id", updataActivity);

router.delete("/api/v1/activities/:id", deleteActivity);

export default router;
