import { Router } from 'express';
// import { productsManager as manager } from '../dao/productsManager.js';
import { productsManager as manager } from '../dao/index.js';
import { getController } from '../controllers/web/products.controller.js';

export const webRouter = Router();
webRouter.get('/products', getController);

webRouter.get('/realtimeproducts', async (req, res) => {
    // const products = await manager.findAll();
    const products = await manager.find().lean()
    res.render('realTimeProducts.handlebars', {
        products,
        titulo: 'Realtime Products'
    });
});

webRouter.get('/chat', (req,res)=>{
    res.render('chat.handlebars', {titulo:'Chat'})
})