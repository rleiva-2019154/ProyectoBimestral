'use strict'

import { checkUpdate } from "../utils/validator.js"
import Product from "./product.model.js"

export const test = (req, res) =>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const saveP = async(req, res) =>{
    try {
        //Capturar la data
        let data = req.body
        const existProduct = await Product.findOne({name: data.name})
        if (existProduct){
            return res.status(400).send({message: 'The product already exists'})
        }
        //Crear la instancia de categoria
        let product = new Product(data)
        //Guardar la categoria
        await product.save()
        //Responde si sale bien
        return res.send({message: 'Product saved successully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error saving product'})
    }
}

export const updateP = async(req, res) =>{
    try {
        //Capturar la data
        let data = req.body
        //capturar el id del producto a actualizar
        let {id} = req.params
        //validar que vengan datos
        /*let update = checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'Have sumitted some data that cannot be updated or missing data'})*/
        //Actualizar
        let updateProduct = await Product.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate(['name', 'description'])
        //validar la actualizacion
        if(!updateProduct) return res.status(404).send({message: 'Product not found and not updated'})
        //Responder si todo sale bien
        return res.send({message: 'Product updated successfully', updateProduct})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating product'})
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar el producto por su ID
        const product = await Product.findById(id).populate('category');

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        return res.json({ product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const listP = async(req, res) => {
    try {
        // Obtener todos las products de la base de datos
        let products = await Product.find().populate(['name', 'description']);

        // Validar si no se encontraron products
        if (!products || products.length === 0) {
            return res.status(404).send({ message: 'No products found' });
        }

        // Responder con la lista de products
        return res.send({ message: 'products found', products });
    } catch(err) {
        console.error(err);
        return res.status(500).send({ message: 'Error listing products' });
    }
}

export const findSoldOutProducts = async (req, res) => {
    try {
        // Buscar productos con stock igual a cero
        const soldOutProducts = await Product.find({ stock: 0 });

        // Verificar si se encontraron productos agotados
        if (soldOutProducts.length === 0) {
            return res.send({ message: 'No hay productos agotados' });
        }

        // Responder con los productos agotados
        return res.send({ soldOutProducts });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al buscar productos agotados' });
    }
};

export const deleteP = async(req, res)=>{
    try{
      //Capturar el id del producto a eliminar
      let { id } = req.params
      //Eliminar
      let deleteProduct = await Product.deleteOne({_id: id})
      //Validar que se elimino
      if(deleteProduct.deleteCount === 0)return res.status(404).send({message: 'Product not found and not deleted'})
      //Responder
      return res.send({message: 'Deleted product successfully'})
    }catch(err){
      console.error(err)
      return res.status(404).send({message: 'Error deleting product'})
    }
}

export const inventoryControl = async (req, res) => {
    try {
        // Calcular la cantidad total de productos en stock
        const totalProducts = await Product.countDocuments();
        
        // Calcular la cantidad total de productos agotados
        const soldOutProductsCount = await Product.countDocuments({ stock: 0 });
        
        // Calcular la cantidad total de productos no agotados
        const availableProductsCount = totalProducts - soldOutProductsCount;

        // Responder con los resultados
        return res.json({
            totalProducts,
            soldOutProductsCount,
            availableProductsCount
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el control del inventario' });
    }
};

