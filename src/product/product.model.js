import mongoose, { Schema } from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true``
    },
    stock: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: Schema.ObjectId,
        ref: "category",
        require: true
    }
}, {
    versionKey: false //Deshabilita el __v (version del documento)
})

export default mongoose.model('product', productSchema)