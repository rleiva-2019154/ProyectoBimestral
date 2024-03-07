import mongoose, { Schema, model } from "mongoose"

const billSchema = Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    shoppingCart: {
        type: Schema.ObjectId,
        ref: 'shoppingCart',
        required: true
    },
    total: {
        type: Number,
        required: true
    }
},
{
    versionKey: false
}
)

export default mongoose.model('bill', billSchema)