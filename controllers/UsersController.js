import UsersModel from '../models/UsersModel.js';
import passport from '../session/passportConfig.js';
import authenticated from '../session/verifyAuthentication.js';


const UsersController = {

    //Funcion para obtener datos de usuarios:
    getAllUsers: async (req,res) => {
        try {
            //UsersModel: para obtener todos los usuarios de la base de datos y los envía como una respuesta JSON
            const users = await UsersModel.getAllUsers();
            res.json(users);
        } catch (error) {
            console.log(error)
            //En caso de error, envía una respuesta con estado 500
            res.status(500).json({ message: 'Hubo un error al leer el usuario' });
        }
    },

    //funcion para obtener datos de usuario por id
    getUser: async (req, res) => {
        try {
            const userId = req.params.id;
            //UsersModel: busca usuario por id en la base de datos y lo envía como una respuesta JSON
            const users = await UsersModel.getUser(userId);
            if (!Array.isArray(users) || users.length === 0) {
                //Si el usuario no se encuentra, envía una respuesta con estado 404
                res.status(404).json({ message: `El usuario con id: ${userId}, no se encuentra` });
                return;
            }
            res.json(users);
        } catch (error) {
            console.log(error)
        }
    },

    //funcion para agregar un nuevo usuario
    addUser: async (req, res) => {
        try {
            //authenticated: pimero verifica si el usuario está autenticado
            //si no esta autenticado termina el proceso, si lo esta continua las sentencias 
            if (!authenticated(req,res)) return;
            const { first_name, last_name, username, password, email, admin } = req.body;
            if (!first_name || !last_name || !username || !password || !email || (admin === undefined)) {
            res.status(400).json({ message: 'Por favor introduzca los datos de usuario' });
            return;
        }
        //valida los datos del usuario recibidos en la solicitud y los agrega a la base de datos usando UsersModel
        await UsersModel.createUser(first_name, last_name, username, password, email, admin);
        res.status(200).json({ message: 'Creado!' });
        return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Hubo un error al crear este usuario'});              
        }  
    },

    //Funcion para actualizar un usuario
    updateUser: async (req, res) => {
        try {
            //primero verifica la autenticación del usuario
            if (!authenticated(req,res)) return;
            const id = req.params.id;
            const { first_name, last_name, username, password, email, admin } = req.body;
            if (!first_name || !last_name || !username || !password || !email || (admin === undefined)) {
                res.status(400).json({ message: 'Por favor introduzca los datos de usuario' });
                return;
            }
            //valida y actualiza los datos del usuario en la base de datos usando UsersModel
            await UsersModel.updateUser(id, first_name, last_name, username, password, email, admin);
            res.status(200).json({ message: 'Actualizado!' });
                return;
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Hubo un error al Actualizar el usuario' });
        }        
    },
    
    //funcion para eleminar usuario
    deleteUser: async (req, res) => {
        try {
            //primero verifica la autenticación del usuario
            if (!authenticated(req,res)) return;
            const id = req.params.id;
            //se elimina el usuario de la base de datos usando UsersModel
            await UsersModel.deleteUser(id);
            res.status(200).json({ message: 'Usuario eliminado correctamente' });

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Hubo un error al eliminar el usuario' });
        }
    },

    //funcion de solicitudde inicio de sesión
    login: (req, res, next) => {
        //Passport: para autenticar al usuario utilizando la estrategia local
        passport.authenticate('local', (error, user) => {
            if (error) { return next(error); }
            if (!user) { 
                return res.status(401).json({ message: 'No fue posible autenticar el usuario' });
            }
            //Si la autenticación es exitosa, coloca al usuario en la sesión
            // envía respuesta con estado 200 y los datos del usuario
            req.logIn(user, (error) => {
                if (error) { return next(error); }
                return res.status(200).json({ message: 'Usuario autenticado exitosamente', user });
            });
        })(req, res, next);
    },
    
    //funcion para solicitud de cierre de sesión del usuario
    logout: (req, res) => {
        //req.logout: quita usuario de sesion
        req.logout((error) => {
            if (error) {
                return res.status(500).json({ message: 'Error al salir de sesión' });
            }
            return res.status(200).json({ message: 'Sesión terminada exitosamente' });
        });        
    },
}

export default UsersController;