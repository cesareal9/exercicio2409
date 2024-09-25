import { Router } from "express";
import {
  store,
  index,
  show,
  update,
  destroy,
  signup,
  login,
  
} from "../controllers/animal_controller.js";

import check_token from "../middleware/check_token.js";
import check_role from "../middleware/check_role.js"

const router = Router();


router.post("/", check_token, check_role(["ADM"]), store); // Somente adm
router.get("/", check_token, check_role(["USU"]), index); // Somente usuário
router.get("/:id", check_token, show);
router.put("/:id", check_token, update);
router.delete("/:id", check_token, destroy);

router.post("/signup", signup);
router.post("/login", login);

export default router;