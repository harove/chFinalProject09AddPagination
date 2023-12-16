import { Schema, model } from 'mongoose'


const cartsSchema = new Schema({
    products: { type: Array, default: [] },
}, 
{
    strict: 'throw',
    versionKey: false,
})

export const manager = model('carts', cartsSchema)


