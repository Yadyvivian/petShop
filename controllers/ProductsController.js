import ProductsModel from '../models/ProductsModel.js';


const ProductsController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await ProductsModel.getAllProducts();
            res.json(products);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Hubo un error al leer el producto' });
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
        try {
            const { name, price, description, image, category, create_date, units_stock } = req.body;
            if (!name || !price || !description || !image || !category || !create_date || !units_stock) {
            res.status(400).json({ message: 'Por favor introduzca los datos del producto' });
            return;
        }
        await ProductsModel.createProduct(name, price, description, image, category, create_date, units_stock);
        res.status(200).json({ message: 'Creado!' });
        return;
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Hubo un error al crear este producto' });
        }   
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
            res.status(500).json({ message: 'Hubo un error al Actualizar el producto' });
        }        
    },
    
    deleteProduct: async (req, res) => {
        try {
            const id = req.params.id;
            await ProductsModel.deleteProduct(id);
            res.status(200).json({ message: 'Producto eliminado correctamente' });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Hubo un error al eliminar el producto' });
        }
    },
};

export default ProductsController;