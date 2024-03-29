'use strict'

import { checkUpdate } from "../utils/validator.js"
import Category from "./category.model.js"
import Product from "../product/product.model.js"

export const test = (req, res) =>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const saveC = async(req, res) =>{
    try {
        //Capturar la data
        let data = req.body
        const existCategory = await Category.findOne({name: data.name})
        if (existCategory){
            return res.status(400).send({message: 'The category already exists'})
        }
        //Crear la instancia de categoria
        let category = new Category(data)
        //Guardar la categoria
        await category.save()
        //Responde si sale bien
        return res.send({message: 'Category saved successully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error saving Category'})
    }
}

export const updateC = async(req, res) =>{
    try {
        //Capturar la data
        let data = req.body
        //capturar el id de la categotia a actualizar
        let {id} = req.params
        //validar que vengan datos
        /*let update = checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'Have sumitted some data that cannot be updated or missing data'})*/
        //Actualizar
        let updateCategory = await Category.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate(['name', 'description'])
        //validar la actualizacion
        if(!updateCategory) return res.status(404).send({message: 'Category not found and not updated'})
        //Responder si todo sale bien
        return res.send({message: 'Category updated successfully', updateCategory})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating categoty'})
    }
}

export const listC = async(req, res) => {
    try {
        // Obtener todos las categorias de la base de datos
        let categories = await Category.find().populate(['name', 'description']);

        // Validar si no se encontraron animales
        if (!categories || categories.length === 0) {
            return res.status(404).send({ message: 'No categories found' });
        }

        // Responder con la lista de categorias
        return res.send({ message: 'Categories found', categories });
    } catch(err) {
        console.error(err);
        return res.status(500).send({ message: 'Error listing categories' });
    }
}

export const deleteCategory = async (req, res) => {
    const session = await Category.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;
        const { transferCategoryId } = req.body; // ID de la categoría a la que se transferirán los productos

        // Verificar si la categoría a eliminar existe
        const categoryToDelete = await Category.findById(id);

        if (!categoryToDelete) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        // Buscar los productos asociados a la categoría a eliminar
        const productsToUpdate = await Product.find({ category: id });

        // Actualizar la categoría de los productos
        if (transferCategoryId && productsToUpdate.length > 0) {
            await Product.updateMany(
                { category: id },
                { $set: { category: transferCategoryId } }
            );
        }

        // Eliminar la categoría
        await Category.deleteOne({ _id: id });

        await session.commitTransaction();
        session.endSession();

        return res.json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: 'Error al eliminar la categoría' });
    }
};