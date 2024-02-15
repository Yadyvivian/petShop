import express from 'express';
import UsersRouter from './routes/UsersRouter.js';
import ProductsRouter from './routes/ProductsRouter.js';
import CategoriesRouter from './routes/CategoriesRouter.js';

const app = express();
const port = 3000;

app.use(express.json()) 

app.use("/users/", UsersRouter);

app.use("/products/", ProductsRouter);

app.use("/categories/", CategoriesRouter);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
