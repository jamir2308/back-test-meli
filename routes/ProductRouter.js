import express from 'express';
import { getItems, getItem } from '../controllers/ProductController.js';

export const productRouter = express.Router();

productRouter.get('/', (req, res) => {
    res.send('Pagina de Inicio');
});

productRouter.get('/api/items', async (req, res, next) => {
    const { q } = req.query;
    try {
        const responseDTO = await getItems(q);
        res.json(responseDTO);
    } catch (error) {
        next(error);
    }
});

productRouter.get('/api/items/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const responseDTO = await getItem(id);
        res.json(responseDTO);
    } catch (error) {
        next(error);
    }
});

productRouter.get('/trm', async (req, res, next) => {
    try {
        res.json({value: 4200});
    } catch (error) {
        next(error);
    }
});

// Middleware de manejo de errores
productRouter.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: 'Error al obtener la informacion'
    });
});