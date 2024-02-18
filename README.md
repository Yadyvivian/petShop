# PetShop - 🐾🐱🐶🐟

This is an example application for a pet store built with Node.js and Express.js for the backend, using MySQL as the database. The application includes local authentication using Passport.js.

## Installation

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/Yadyvivian/petShop.git
    ```

2. Go to the project directory:

    ```bash
    cd petshop
    ```

3. Install dependencies using npm:

    ```bash
    npm i
    ```

4. Configure your MySQL database. Copy the `petshop.sql` file and rename it to `.env`. Then, edit the environment variables to configure the connection to your MySQL database in cd database open `config.js`:

    ```plaintext
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_DATABASE=petshop
    ```

5. Run the provided SQL script in your MySQL database management system to create the necessary tables.

## Usage

To start the application, use the following command:

```bash
npm run server
 ```
This will start the server on your local machine. You can access the application through your web browser by visiting http://localhost:3000.

Issues and Solutions
If you encounter any issues during installation or execution, make sure you have followed all the steps correctly and verify that the dependencies are installed correctly. Also, check the error messages in the console for more information on any problems that may arise.

Contributions
Contributions are welcome! If you find any bugs or have suggestions for improvement, feel free to open an issue or submit a pull request.

Enjoy exploring and working with the pet store application!

Initial Contributors
Laudy Navarrate
Viviana Sánchez
