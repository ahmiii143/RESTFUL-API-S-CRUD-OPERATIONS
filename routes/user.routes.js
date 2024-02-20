import express from "express";

const router = express.Router();
import {
  userRegister,
  getUser,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";

router.post("/", userRegister);
router.get("/", getUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
