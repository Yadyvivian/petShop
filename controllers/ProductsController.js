import ProductsModel from '../models/ProductsModel.js';


const ProductsController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await ProductsModel.getAllProducts();
            res.json(products);
        } catch (error) {
            console.log(error)
        }
    },
    
    getProduct: async (req, res) => {
        try {
            const productsId = req.params.id;
            const products = await ProductsModel.getProduct(productsId);
            if (!Array.isArray(products) || products.length === 0) {
                res.status(404).json({ message: `Este producto con id ${id} no se encuentra` });
                return;
            }
            res.json(products);
        } catch (error) {
            console.log(error)
        }
    },

    addProduct: async (req, res) => {
        const { name, price, description, image, category, create_date, units_stock } = req.body;
        if (!name || !price || !description || !image || !category || !create_date || !units_stock) {
            res.status(400).json({ message: 'Por favor introduzca los datos del producto' });
            return;
        }
        await ProductsModel.createProduct(name, price, description, image, category, create_date, units_stock);
        res.status(200).json({ message: 'Creado!' });
        return;
    },

    updateProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const { name, price, description, image, category, create_date, units_stock } = req.body;
            if (!name || !price || !description || !image || !category || !create_date || !units_stock) {
                res.status(400).json({ message: 'Por favor introduzca los datos del producto' });
                return;
            }
            console.log("ANTES de   ");
            await ProductsModel.updateProduct(id, name, price, description, image, category, create_date, units_stock);
            res.status(200).json({ message: 'Actualizado!' });
                return;
        } catch (error) {
            console.log(error)
        }        
    },
    
    deleteProduct: async (req, res) => {
        try {
            const id = req.params.id;
            await ProductsModel.deleteProduct(id);
        } catch (error) {
            console.log(error)
        }
    },
};

export default ProductsController;