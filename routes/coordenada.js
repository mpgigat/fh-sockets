import { Router } from "express";
import {check} from "express-validator";

import coordenadasController from "../controllers/coordenada.js";

const router= Router();

router.get("/",coordenadasController.coordenadaGet)


router.post("/",coordenadasController.coordenadaPost)
  


export default router