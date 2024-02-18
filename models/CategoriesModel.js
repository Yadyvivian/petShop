import { connection } from "../database/Config.js";

const CategoriesModel = {
    getAllCategories: async () => {
        const [result, metadata] = await connection.query('SELECT * FROM categories');
        return result;
    },

    getCategorie: async (id) => {
        const [result, metadata] = await connection.query(`SELECT * FROM categories WHERE id = ${id}`);
        return result;
    },

    createCategorie: async (name, description) => {
        const [result, metadata] = await connection.query(`INSERT INTO categories (name, description) VALUES ('${name}', '${description}')`);
        return result;
    },

    updateCategorie: async (id, name, description) => {
        const [result, metadata] = await connection.query(`UPDATE categories SET name = '${name}', description = '${description}'`);
        return result;
    },

    deleteCategorie: async (id) => {
        const [result, metadata] = await connection.query(`DELETE FROM categories WHERE id = ${id}`);
        return result;
    },
}

export default CategoriesModel;