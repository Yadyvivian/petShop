import { connection } from "../database/Config.js";

//UsersModel: tiene los metodos para interactuar con la base de datos (en la tabla usuarios)
const UsersModel = {

    //metodo para seleccionar todos los usarios
    getAllUsers: async () => {
        const [result] = await connection.query('SELECT * FROM users');
        return result;
    },

    //metodo para seleccionar un usuario por su id
    getUser: async (id) => {
        const [result] = await connection.query(`SELECT * FROM users WHERE id = ${id}`);
        return result;
    },

    //metodo para insertar un nuevo usuario
    createUser: async (first_name, last_name, username, password, email, admin ) => {
        const [result] = await connection.query(`INSERT INTO users (first_name, last_name, username, password, email, admin) VALUES ('${first_name}', '${last_name}', '${username}', '${password}', '${email}', ${admin})`);
        return result;
    },

    //metodo para actualizar un usuario existente   
    updateUser: async (id, first_name, last_name, username, password, email, admin ) => {
        const [result] = await connection.query(`UPDATE users SET first_name = '${first_name}', last_name = '${last_name}', username = '${username}', password = '${password}', email = '${email}', admin = ${admin} WHERE id = ${id}`);
        return result;
    },

    //metodo para eliminar un usuario por el id
    deleteUser: async (id) => {
        const [result] = await connection.query(`DELETE FROM users WHERE id = ${id}`);
        return result;
    },
}

export default UsersModel;