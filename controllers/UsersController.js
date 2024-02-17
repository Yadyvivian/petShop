import UsersModel from '../models/UsersModel.js';
import passport from '../session/passportConfig.js';
import verify from '../session/verifyAuthentication.js';


const UsersController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await UsersModel.getAllUsers();
            res.json(users);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Hubo un error al leer el usuario' });
        }
    },
    
    getUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const users = await UsersModel.getUser(userId);
            if (!Array.isArray(users) || users.length === 0) {
                res.status(404).json({ message: `El usuario con id: ${userId}, no se encuentra` });
                return;
            }
            res.json(users);
        } catch (error) {
            console.log(error)
        }
    },

    addUser: async (req, res) => {
        try {
            verify.verifyAuthentication(req,res);
            const { first_name, last_name, username, password, email, admin } = req.body;
            if (!first_name || !last_name || !username || !password || !email || (admin === undefined)) {
            res.status(400).json({ message: 'Por favor introduzca los datos de usuario' });
            return;
        }
        await UsersModel.createUser(first_name, last_name, username, password, email, admin);
        res.status(200).json({ message: 'Creado!' });
        return;
        } catch (error) {
            verify.errorMessage(res,'Hubo un error al crear este usuario', error);
        }  
    },

    updateUser: async (req, res) => {
        try {
            verify.verifyAuthentication(req,res);
            const id = req.params.id;
            const { first_name, last_name, username, password, email, admin } = req.body;
            if (!first_name || !last_name || !username || !password || !email || (admin === undefined)) {
                res.status(400).json({ message: 'Por favor introduzca los datos de usuario' });
                return;
            }
            console.log("ANTES de ...");
            await UsersModel.updateUser(id, first_name, last_name, username, password, email, admin);
            res.status(200).json({ message: 'Actualizado!' });
                return;
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Hubo un error al Actualizar el usuario' });
        }        
    },
    
    deleteUser: async (req, res) => {
        try {
            verify.verifyAuthentication(req,res);
            const id = req.params.id;
            await UsersModel.deleteUser(id);
            res.status(200).json({ message: 'Usuario eliminado correctamente' });

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Hubo un error al eliminar el usuario' });
        }
    },

    login: (req, res, next) => {
        passport.authenticate('local', (err, user) => {
            if (err) { return next(err); }
            if (!user) { 
                return res.status(401).json({ message: 'Authentication failed' });
            }
            req.logIn(user, (err) => {
                if (err) { return next(err); }
                return res.status(200).json({ message: 'Authentication successful', user });
            });
        })(req, res, next);
    },
    

    logout: (req, res) => {
        req.logout((err) => {
            if (err) {
                return res.status(500).json({ message: 'Error during logout' });
            }
            return res.status(200).json({ message: 'Logout successfully done' });
        });        
    },
}

export default UsersController;