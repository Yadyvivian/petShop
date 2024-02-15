import { Router } from "express";
import CategoriesController from "../controllers/CategoriesController.js";

const CategoriesRouter = Router();

CategoriesRouter.route("/").get(CategoriesController.getAllCategories);
CategoriesRouter.route("/:id").get(CategoriesController.getCategorie);
CategoriesRouter.route("/").post(CategoriesController.addCategorie);
CategoriesRouter.route("/:id").put(CategoriesController.updateCategorie);
CategoriesRouter.route("/:id").delete(CategoriesController.deleteCategorie);

export default CategoriesRouter;