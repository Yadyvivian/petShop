import { Router } from "express";
import UsersController from "../controllers/UsersController.js";

const UsersRouter = Router();

UsersRouter.route("/").get(UsersController.getAllUsers);
UsersRouter.route("/:id").get(UsersController.getUser);
UsersRouter.route("/").post(UsersController.addUser);
UsersRouter.route("/:id").put(UsersController.updateUser);
UsersRouter.route("/:id").delete(UsersController.deleteUser);
UsersRouter.route("/login").post(UsersController.login);
UsersRouter.route("/login/logout").get(UsersController.logout);

export default UsersRouter;