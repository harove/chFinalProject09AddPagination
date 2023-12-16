// import { productsManager as manager } from "../dao/productsManager.js"
import { productsManager as manager } from "../dao/index.js"


export async function postController(req, res) {
    const pojo = req.body
    try {
        const entity = await manager.create(pojo)
        res['newProduct']()
        // res.status(201).json(pojo)
        res.status(201).json(entity.toObject())
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


export async function getController(req, res) {
    const {limit} = req.query
    // const pojos = await manager.findAll({limit})
    const pojos = await manager.find().lean()
    res.json(pojos)
}

export async function getByIdController(req, res) {
    const id = req.params.id
    try {
        // const pojo = await manager.getById(id)
        const pojo = await manager.findById({_id: id}).lean()
        res.json(pojo)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}

export async function updateController(req, res) {
    const id = req.params.id
    const fields = req.body
    try {
        // const pojos = await manager.update(id,fields)
        // res.json(pojos)
        const actualizado = await manager.findByIdAndUpdate(id, {$set: fields}, { new: true})
        console.log({actualizado})
        if (!actualizado){
            res.status(404).json({message: 'usuario no encontrado'})
        }
        res.json({actualizado})
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}

export async function deleteController(req, res) {
    const id = req.params.id
    try {
        // const pojo = await manager.delete(id)
        const pojo = await manager.findByIdAndDelete(id)
        if (!pojo){
            res.status(404).json({message: 'usuario no encontrado'})
        }
        res['newProduct']()
        res.json(pojo)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}
