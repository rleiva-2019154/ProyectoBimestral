import mongoose, { Schema, model} from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
}, {
    versionKey: false //Deshabilita el __v (version del documento)
})

export default mongoose.model('category', categorySchema)