import { Router } from 'express';
// import { productsManager as manager } from '../dao/productsManager.js';
import { productsManager as manager } from '../dao/index.js';

export const webRouter = Router();
webRouter.get('/products', async (req, res) => {
    // const products = await manager.findAll();
    const products = await manager.find().lean()
    res.render('home.handlebars', {
        products,
        titulo: 'Products'
    });
});

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