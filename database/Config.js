//importa la función createPool de la librería mysql2/promise, 
//que se utiliza para crear un grupo de conexiones a la base de datos
import { createPool } from 'mysql2/promise';

//objeto CONFIG: contiene configuración necesaria para establecer la conexión a la base de datos
const CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'petshop',
    port: 3306
};

export const connection = createPool(CONFIG);
//función createPool: crea un grupo de conexiones a la base de datos MySQL utilizando la configuración definida en CONFIG
//La conexión creada se exporta como connection, 
//lo que permite que otros módulos puedan importar y usar esta conexión para hacer consultas a la base de datos

