import express from 'express';

import { createRequire } from 'module';
import mysql2 from 'mysql2';

//dependencias de passport para loggin
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';

const readJSON = createRequire(import.meta.url);
const products = readJSON('./data/products.json');

/**********************************/

// Configuración de la conexión a la base de datos
const connection = mysql2.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '1234', 
    database: 'petshop' 
  });

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return;
    }
    console.log('Conexión a la base de datos MySQL establecida correctamente');
  });


/**********************************/

//   ************       login    

// Configurar la estrategia Local de Passport
passport.use(new LocalStrategy(
    (username, password, done) => {
      // Consultar el usuario en la base de datos
      connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
        if (error) { return done(error); }
  
        // Verificar si lo encontro
        if (results.length === 0) {
          return done(null, false, { message: 'Usuario no econtrado' });
        }
  
        const user = results[0];

        console.log("Usuario encontrado: " + JSON.stringify(user));

        //Verifica contraseña
        if (String(password) !== String(user.password)) {
            console.log("Contraseña incorrecta");
            return done(null, false, { message: 'Contraseña incorrecta' });
        }

        //verifica si es administrador
        if(user.admin!==1){
            console.log("No es admin");
            return done(null, false, { message: 'Usted no es administrador' });
        }      
        
        // Autenticación exitosa, devolve el usuario
        return done(null, user);          
      });
    }
  ));

// Para mantener la sesion de usuario
// Configurar serialización y deserialización de usuarios para Passport

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser((id, done) => {
    connection.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
        if (error || results.length === 0) {
            return done(error, null);
        }

        const user = results[0];
        done(null, user);
    });
});
  

// ******       Puerto

const app = express();
app.use(express.json());

const PORT = 3000;

// Configurar middleware de Passport
app.use(session({
    secret: 'secret', 
    resave: false,
    saveUninitialized: false
  }));
app.use(passport.initialize());
app.use(passport.session());

// Agregar las rutas de inicio de sesión y cierre de sesión
app.post('/login', passport.authenticate('local', {
  successRedirect: '/ruta-protegida',
  failureRedirect: '/login-fallido'
}));

app.get('/login-fallido', (req, res) => {
    res.send('Login Fallido!!!');
  });

app.get('/logout', (req, res) => {
    //console.log("Desloggeado!") -> prueba
    req.logout(() => {
        console.log("Desloggeado!!")
      });
});

// Configurar una ruta protegida
app.get('/ruta-protegida', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Usuario autenticado exitosamente');
  } else {
    res.send('No se pudo utenticar');
    //res.redirect('/login');
  }
});

/********************************* */

//   ************       Users

//       user  ->    get  

// Consulta todos los registros de Users
app.get('/users', (req, res) => {
connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).send('Error interno del servidor');
        return;
    }
    res.json(results);
});
});

// Consulta un registro de Users por id
app.get('/users/:id', (request, response) => {
    const userId = request.params.id;

    connection.query('SELECT * FROM users WHERE id= ?', [userId], (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            response.status(500).send('Error interno del servidor');
            return;
        }
        response.json(results);
    });
    });

//       user  ->    put
// put: actualiza un usuario existente por su id

app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;
  
  connection.query('UPDATE users SET ? WHERE id = ?', [updatedUserData, userId], (error, results) => {
      if (error) {
          console.error('Error al ejecutar la consulta:', error);
          res.status(500).send('Error interno del servidor');
          return;
      }
      res.send('Usuario actualizado correctamente');
  });
});

//       user  ->    delete
// delete: Eliminar un usuario por su id

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  connection.query('DELETE FROM users WHERE id = ?', userId, (error, results) => {
      if (error) {
          console.error('Error al ejecutar la consulta:', error);
          res.status(500).send('Error interno del servidor');
          return;
      }
      res.send('Usuario eliminado correctamente');
  });
});

/********************************* */

//   ************       categories    

app.get('/categories', (req, res) => {
  connection.query('SELECT * FROM categories', (error, results) => {
      if (error) {
          console.error('Error al ejecutar la consulta:', error);
          res.status(500).send('Error interno del servidor');
          return;
      }
      res.json(results);
  });
  });

  //       categories  ->    get  
  
app.get('/categories/:id', (request, response) => {
  const categoriesId = request.params.id;

  connection.query('SELECT * FROM categories WHERE id= ?', [categoriesId], (error, results) => {
      if (error) {
          console.error('Error al ejecutar la consulta:', error);
          response.status(500).send('Error interno del servidor');
          return;
      }
      response.json(results);
  });
  });

app.get('/products', (request, response) => {
    response.send(products);
});

/********************************* */

app.post('/products', (request, response) => {
    const newProduct = request.body;
    const previousId = products.products[products.products.length - 1].id;
    products.products.push({...newProduct, id: previousId + 1});
    response.send('Product has been added');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

