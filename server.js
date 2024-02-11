import express from 'express';

import { createRequire } from 'module';
import mysql2 from 'mysql2';

const readJSON = createRequire(import.meta.url);
const products = readJSON('./data/products.json');

// Configuración de la conexión a la base de datos
const connection = mysql2.createConnection({
    host: 'localhost', // Cambia esto por la dirección de tu servidor MySQL
    user: 'root', // Cambia esto por tu nombre de usuario de MySQL
    password: '1234', // Cambia esto por tu contraseña de MySQL
    database: 'petshop' // Cambia esto por el nombre de tu base de datos MySQL
  });

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return;
    }
    console.log('Conexión a la base de datos MySQL establecida correctamente');
  });

const app = express();
app.use(express.json());

const PORT = 3000;

// Consulta todos los registros de Users
app.get('/users', (req, res) => {
connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).send('Error interno del servidor');
        return;
    }
    res.json(results);
});
});

// Consulta un registro de Users buscando por id
app.get('/users/:id', (request, response) => {
    const userId = request.params.id;

    connection.query('SELECT * FROM users WHERE id= ?', [userId], (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            response.status(500).send('Error interno del servidor');
            return;
        }
        response.json(results);
    });
    });

app.get('/products', (request, response) => {
    response.send(products);
});

app.get('/products/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const product = products.products.find(product => product.id === id);
    response.send(product);
});

app.post('/products', (request, response) => {
    const newProduct = request.body;
    const previousId = products.products[products.products.length - 1].id;
    products.products.push({...newProduct, id: previousId + 1});
    response.send('Product has been added');
});

app.put('/products/:id', (request, response) => {});

app.delete('/products/:id', (request, response) => {});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// acabar de completar la lógica pra put y delete
// cómo enchufar esto con mysql
// cómo aplicar arquitectura MVC a esto