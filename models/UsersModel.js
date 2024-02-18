import { connection } from "../database/Config.js";

const UsersModel = {
    getAllUsers: async () => {
        const [result, metadata] = await connection.query('SELECT * FROM users');
        return result;
    },

    getUser: async (id) => {
        const [result, metadata] = await connection.query(`SELECT * FROM users WHERE id = ${id}`);
        return result;
    },

    createUser: async (first_name, last_name, username, password, email, admin ) => {
        const [result, metadata] = await connection.query(`INSERT INTO users (first_name, last_name, username, password, email, admin) VALUES ('${first_name}', '${last_name}', '${username}', '${password}', '${email}', ${admin})`);
        return result;
    },

    updateUser: async (id, first_name, last_name, username, password, email, admin ) => {
        const [result, metadata] = await connection.query(`UPDATE users SET first_name = '${first_name}', last_name = '${last_name}', username = '${username}', password = '${password}', email = '${email}', admin = ${admin} WHERE id = ${id}`);
        return result;
    },

    deleteUser: async (id) => {
        const [result, metadata] = await connection.query(`DELETE FROM users WHERE id = ${id}`);
        return result;
    },
}

export default UsersModel;