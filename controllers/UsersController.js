import UsersModel from '../models/UsersModel.js';


const UsersController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await UsersModel.getAllUsers();
            res.json(users);
        } catch (error) {
            console.log(error)
        }
    },
    getUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const users = await UsersModel.getUser(userId);
            if (!Array.isArray(users) || users.length === 0) {
                res.status(404).json({ message: `Este usuario con id ${id} no se encuentra` });
                return;
            }
            res.json(users);
        } catch (error) {
            console.log(error)
        }
    },

    addUser: async (req, res) => {
        const { first_name, last_name, username, password, email, admin } = req.body;
        if (!first_name || !last_name || !username || !password || !email || (admin === undefined)) {
            res.status(400).json({ message: 'Por favor introduzca los datos de usuario' });
            return;
        }
        await UsersModel.createUser(first_name, last_name, username, password, email, admin);
        res.status(200).json({ message: 'Creado!' });
        return;
    },

    updateUser: async (req, res) => {
        try {
            const id = req.params.id;
            const { first_name, last_name, username, password, email, admin } = req.body;
            if (!first_name || !last_name || !username || !password || !email || (admin === undefined)) {
                res.status(400).json({ message: 'Por favor introduzca los datos de usuario' });
                return;
            }
            console.log("ANTES de la vaina");
            await UsersModel.updateUser(id, first_name, last_name, username, password, email, admin);
            res.status(200).json({ message: 'Actualizao!!!' });
                return;
            console.log("Despues de la vaina");
        } catch (error) {
            console.log(error)
        }        
    },
    
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id;
            await UsersModel.deleteUser(id);
        } catch (error) {
            console.log(error)
        }
    },
};

export default UsersController;