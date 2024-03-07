'use strict'

import { checkUpdate, encrypt } from "../utils/validator.js"
import { generateJwt } from "../utils/jwt.js"
import ShoppingCart from "./shoppingCart.model.js"
import Product from "../product/product.model.js"
import User from "../user/user.model.js"

export const test = (req, res) =>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const addCart = async (req, res) => {
    try {
        const data = req.body;

        // Verificar si el usuario existe
        const user = await User.findById(data.user);
        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }

        // Verificar si el producto existe
        const product = await Product.findById(data.product);
        if (!product) {
            return res.status(400).send({ message: "Product not found" });
        }

        // Verificar si el stock del producto está disponible
        if (product.stock === 0) {
            return res.status(400).send({ message: "Product out of stock" });
        }

        // Verificar que la cantidad no sea negativa
        if (data.amount <= 0) {
            return res.status(400).send({ message: "Amount must be positive" });
        }

        // Buscar si ya existe un carrito para este usuario y producto
        let shoppingCart = await ShoppingCart.findOne({ user: data.user, product: data.product });

        if (shoppingCart) {
            // Si ya existe, sumamos el amount existente con el nuevo amount
            shoppingCart.amount = +shoppingCart.amount + +data.amount;
        }
        
         else {
            // Si no existe, creamos un nuevo carrito de compra
            shoppingCart = new ShoppingCart({
                date: new Date(),
                amount: data.amount,
                status: "CREATED",
                product: data.product,
                user: data.user
            });
        }

        // Verificar si la cantidad total en el carrito supera el stock disponible
        if (shoppingCart.amount > product.stock) {
            return res.status(400).send({ message: "Insufficient stock" });
        }

        // Guardar o actualizar el carrito de compra
        await shoppingCart.save();

        return res.send({ message: "Shopping cart updated/added successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Error adding/updating shopping cart" });
    }
}

export const deleteCart = async(req, res)=>{
    try{
      //Capturar el id de la categoria a eliminar
      let { id } = req.params
      //Eliminar
      let deletedCart = await ShoppingCart.deleteOne({_id: id})
      //Validar que se elimino
      if(deletedCart.deleteCount === 0)return res.status(404).send({message: 'Shopping Cart not found and not deleted'})
      //Responder
      return res.send({message: 'Deleted Shopping Cart successfully'})
    }catch(err){
      console.error(err)
      return res.status(404).send({message: 'Error deleting Shopping Cart'})
    }
}