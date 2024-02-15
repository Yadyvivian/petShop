# PetShop - 🐾🐱🐶🐟

Esta es una aplicación para una tienda de mascotas construida con Node.js y Express.js para el backend, y utiliza MySQL como base de datos. La aplicación incluye autenticación local utilizando Passport.js.

## Instalación

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/Yadyvivian/petShop.git
    ```

2. Ve al directorio del proyecto:

    ```bash
    cd petshop
    ```

3. Instala las dependencias utilizando npm:

    ```bash
    npm i
    ```

4. Configura tu base de datos MySQL. Copia el archivo `petshop.sql` y renómbralo como `.env`. Luego, edita las variables de entorno para configurar la conexión a tu base de datos MySQL en `server.js`:

    ```plaintext
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tucontraseña
    DB_DATABASE=petshop
    ```

5. Ejecuta el script SQL proporcionado en tu gestor de base de datos MySQL para crear las tablas necesarias.

## Uso

Para iniciar la aplicación, utiliza el siguiente comando:

```bash
npm run server
 ```
Esto iniciará el servidor en tu máquina local. Puedes acceder a la aplicación a través de tu navegador web visitando http://localhost:3000.

Problemas y Soluciones
Si encuentras algún problema durante la instalación o ejecución, asegúrate de haber seguido todos los pasos correctamente y verifica que las dependencias estén instaladas correctamente. Además, revisa los mensajes de error en la consola para obtener más información sobre cualquier problema que pueda surgir.

Contribuciones
¡Las contribuciones son bienvenidas! Si encuentras algún error o tienes sugerencias de mejora, no dudes en abrir un problema o enviar un pull request.

¡Disfruta explorando y trabajando con la aplicación de la tienda de mascotas!

Contribuidores iniciales
Laudy Navarrete,
Viviana Sánchez
