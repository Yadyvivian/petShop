import express from 'express';
import UsersRouter from './routes/UsersRouter.js';
import ProductsRouter from './routes/ProductsRouter.js';
import CategoriesRouter from './routes/CategoriesRouter.js';
import passport from './session/passportConfig.js';
import session from 'express-session';

const app = express();
const port = 3000;

app.use(express.json());

// Configurar middleware de Passport
app.use(session({
  secret: 'secret', 
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/users/", UsersRouter);

app.use("/products/", ProductsRouter);

app.use("/categories/", CategoriesRouter);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
