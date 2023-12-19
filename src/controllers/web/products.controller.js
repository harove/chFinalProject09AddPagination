import util from 'node:util'
// import { productsManager as manager } from "../dao/productsManager.js"
import { productsManager as manager } from "../../dao/index.js"

export async function getController(req, res) {
    const sort = 'asc'
    const query = {} 
    const options = {page:1, limit:10, sort:{price:sort}}

    try {
        const response = await manager.paginate(query, options)
        const {docs, prevPage, nextPage,  ...rest} = response
        const paginatedProducts = {
            status: 'success',
            payload: docs.map(doc => doc.toObject()),
            ...rest,
            prevLink: rest.hasPrevPage ? `/api/products?page=${rest.prevPage}&limit=${rest.limit}` : null,
            nextLink: rest.hasNextPage ? `/api/products?page=${rest.nextPage}&limit=${rest.limit}` : null,
        }
        res.render('home.handlebars', {
            payload:paginatedProducts,
            titulo: 'Products',
            render:true
        });
    } catch (error) {
        res.send(error.message)
    }
}





