import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./../../services/userService/index";
import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.status(200).json(users);
});

router.post("/create", async (req: Request, res: Response) => {
  const user = await createUser(req.body.name, req.body.email);
  if (user == null || user == undefined) {
    res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

router.get("/:id", async (req: Request, res: Response) => {
  const user = await getUserById(parseInt(req.params.id));
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

router.put("/update/:id", async (req: Request, res: Response) => {
  const user = await getUserById(parseInt(req.params.id));
  if (user) {
    const updatedUser = await updateUser(
      parseInt(req.params.id),
      req.body.name,
      req.body.email
    );
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const user = await deleteUser(parseInt(req.params.id));
  if (user) {
    res.status(200).json({ message: "User deleted" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = router;
