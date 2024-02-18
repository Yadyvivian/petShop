import { createPool } from 'mysql2/promise';

const CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'petshop',
    port: 3306
};

export const connection = createPool(CONFIG);


