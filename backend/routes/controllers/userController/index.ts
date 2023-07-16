import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../../services/userService/index";
import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: APIs relacionadas aos usuários
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get("/", async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.status(200).json(users);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: CREATED.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *        description: BAD REQUEST
 *
 */
router.post("/", async (req: Request, res: Response) => {
  const user = await createUser(req.body.name, req.body.email);
  if (user == null || user == undefined) {
    res.status(400).json({ message: "User not created" });
  }
  res.status(201).json(user);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: find by id user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID User
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: NOT FOUND
 */
router.get("/:id", async (req: Request, res: Response) => {
  const user = await getUserById(parseInt(req.params.id));
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Updated user.
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID User
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *        description: NOT FOUND
 *
 */
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

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Updated user.
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID User
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: NO CONTENT.
 *       404:
 *        description: NOT FOUND
 *
 */
router.delete("/delete/:id", async (req: Request, res: Response) => {
  const user = await deleteUser(parseInt(req.params.id));
  if (user) {
    res.status(204).json({ message: "User deleted" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = router;
