import { connection } from "../database/Config.js";

const ProductsModel = {
    getAllProducts: async () => {
        const [result, metadata] = await connection.query('SELECT * FROM products');
        return result;
    },

    getProduct: async (id) => {
        const [result, metadata] = await connection.query(`SELECT * FROM products WHERE id = ${id}`);
        return result;
    },

    createProduct: async (name, price, description, image, category, create_date, units_stock) => {
        const [result, metadata] = await connection.query(`INSERT INTO products (name, price, description, image, category, create_date, units_stock) VALUES ('${name}', ${price}, '${description}', '${image}', '${category}', '${create_date}', ${units_stock})`);
        return result;
    },

    updateProduct: async (id, name, price, description, image, category, create_date, units_stock) => {
        const [result, metadata] = await connection.query(`UPDATE products SET name = '${name}', price = ${price}, description = '${description}', image = '${image}', category = '${category}', create_date = '${create_date}', units_stock = ${units_stock} WHERE id = ${id}`);
        return result;
    },

    deleteProduct: async (id) => {
        const [result, metadata] = await connection.query(`DELETE FROM products WHERE id = ${id}`);
        return result;
    },
}

export default ProductsModel;