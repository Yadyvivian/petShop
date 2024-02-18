import express from 'express';
import UsersRouter from './routes/UsersRouter.js';
import ProductsRouter from './routes/ProductsRouter.js';
import CategoriesRouter from './routes/CategoriesRouter.js';
import passport from './session/passportConfig.js';
import session from 'express-session';

//Se crea una instancia de la aplicación Express y se asigna el número de puerto en el que se ejecutará el servidor
const app = express();
const port = 3000;

app.use(express.json());

//configurar middleware de Express-session y Passport.js
//La configuración de Express-session establece las opciones secret, resave y saveUninitialized
//se inicializa Passport y se utiliza el middleware de Passport.session() para integrar Passport con Express-session
app.use(session({
  secret: 'secret', 
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());  

//Cada enrutador maneja solicitudes que comiencen con la ruta especificada
app.use("/users/", UsersRouter);
app.use("/products/", ProductsRouter);
app.use("/categories/", CategoriesRouter);

//Se inicia servidor Express y se hace que escuche en el puerto especificado
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
