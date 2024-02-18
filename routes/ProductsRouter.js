import { Router } from "express";
import ProductsController from "../controllers/ProductsController.js";

const ProductsRouter = Router();

ProductsRouter.route("/").get(ProductsController.getAllProducts);
ProductsRouter.route("/:id").get(ProductsController.getProduct);
ProductsRouter.route("/").post(ProductsController.addProduct);
ProductsRouter.route("/:id").put(ProductsController.updateProduct);
ProductsRouter.route("/:id").delete(ProductsController.deleteProduct);

export default ProductsRouter;