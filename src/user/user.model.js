import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        require: true
    },
    password: {
        type: String,
        minLength: [8, 'Password must be characteres'],
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        require: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['ADMIN, CLIENT'],
        require: true
    }
})

export default mongoose.model('user', userSchema)