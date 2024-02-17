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
    }
));

// Para mantener la sesion de usuario
// Configurar serialización y deserialización de usuarios para Passport
passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {

    const [results, metadata] = await connection.query(`SELECT * FROM users WHERE id = '${id}'`);

    console.log("resultado: " + JSON.stringify(results));

    if (results.length === 0) {
        return done({ message: 'Usuario no econtrado' }, null);
    }

    const user = results[0];
    done(null, user);
});

export default passport;