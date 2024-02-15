import CategoriesModel from '../models/CategoriesModel.js';

export const CategoriesController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await CategoriesModel.getAllCategories();
            res.json(categories);
        } catch (error) {
            console.log(error);
        }
    },
    getCategorie: async (req, res) => {
        try {
            const categorieId = req.params.id;
            const categories = await CategoriesModel.getCategorie(categorieId);
            if (!Array.isArray(categories) || categories.length === 0) {
                res.status(404).json({ message: `Esta categoria con id ${id} no se encuentra` });
                return;
            }
            res.json(categories);
        } catch (error) {
            console.log(error);
        }
    },

    addCategorie: async (req, res) => {
        const { name, description } = req.body;
        if (!name || !description ) {
            res.status(400).json({ message: 'Por favor introduzca los datos de categoria' });
            return;
        }
        await CategoriesModel.createCategorie(name, description);
        res.status(200).json({ message: 'Creado!' });
        return;

    },

    updateCategorie: async (req, res) => {
        try {
            const id = req.params.id;
            const { name, description } = req.body;
            if (!name || !description ) {
                res.status(400).json({ message: 'Por favor introduzca los datos de la categoria' });
                return;
            }
            console.log("ANTES de");
            await CategoriesModel.updateCategorie(id, name, description);
            res.status(200).json({ message: 'Actualizado!' });
            return;
        } catch (error) {
            console.log(error);
        }
    },

    deleteCategorie: async (req, res) => {
        try {
            const id = req.params.id;
            await CategoriesModel.deleteCategorie(id);
        } catch (error) {
            console.log(error);
        }
    },
};

export default CategoriesController;