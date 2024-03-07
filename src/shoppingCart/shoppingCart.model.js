import mongoose, { Schema } from "mongoose"

const shoppingCartSchema =  mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['CREATED', 'CANCELLED', 'COMPLETED'],
        default: 'CREATED',
        required: true
    },
    product: {
        type: Schema.ObjectId,
        ref: 'product',
        required: true
       
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
        
    },
    
}, {
    versionKey: false
}

)

export default mongoose.model('shoppingCart', shoppingCartSchema)