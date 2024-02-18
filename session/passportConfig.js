import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { connection } from "../database/Config.js";

//Configurar la estrategia Local usando Passport
//función LocalStrategy: realiza la lógica de autenticación, consulta la base de datos para obtener usuario con el proporcionado
passport.use(new LocalStrategy(
    
    async (username, password, done) => {
      // Consultar el usuario en la base de datos
      const [results, metadata] = await connection.query(`SELECT * FROM users WHERE username = '${username}'`);
      console.log("resultado: " + JSON.stringify(results));

        // Verificar si lo encontro usuario en la base de datos con el nombre de usuario proporcionado
        if (results.length === 0) {
            console.log("Usuario no econtrado");
            return done(null, false);
          }
          const user = results[0];
          console.log("Usuario encontrado: " + JSON.stringify(user));
  
          //Verifica si la contraseña coincide con la almacenada en la base de datos
          if (String(password) !== String(user.password)) {
              console.log("Contraseña incorrecta");
              return done(null, false);
          }
  
          //Verifica el rol de administrador
          if(user.admin!==1){   //si no es admin
              console.log("Usted no es administrador");
              return done(null, false);
          }      
          //si si es admin:
          // Autenticación exitosa, devuelve el usuario
          return done(null, user);
    }
));

// Usada cuando se logea exitosamente: Para mantener la sesion de usuario
//Se configura la serialización y deserialización de usuarios para mantener y recuperar la sesión del usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Usada para devolver el id del usuario autenticado
passport.deserializeUser(async (id, done) => {
    done(null, id);
});

export default passport;