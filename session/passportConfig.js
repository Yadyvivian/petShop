import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { connection } from "../database/Config.js";

// Configurar la estrategia Local de Passport
passport.use(new LocalStrategy(
    async (username, password, done) => {
      // Consultar el usuario en la base de datos
      const [results, metadata] = await connection.query(`SELECT * FROM users WHERE username = '${username}'`);
      console.log("resultado: " + JSON.stringify(results));

        // Verificar si lo encontro
        if (results.length === 0) {
            console.log("Usuario no econtrado");
            return done(null, false);
          }
    
          const user = results[0];
  
          console.log("Usuario encontrado: " + JSON.stringify(user));
  
          //Verifica contraseña
          if (String(password) !== String(user.password)) {
              console.log("Contraseña incorrecta");
              return done(null, false);
          }
  
          //verifica si es administrador
          if(user.admin!==1){
              console.log("Usted no es administrador");
              return done(null, false);
          }      
          
          // Autenticación exitosa, devolve el usuario
          return done(null, user);
    }
));

// Usada cuando se logea exitosamente: Para mantener la sesion de usuario
// Configurar serialización y deserialización de usuarios para Passport
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Usada para devolver el id del usuario autenticado
passport.deserializeUser(async (id, done) => {
    done(null, id);
});

export default passport;