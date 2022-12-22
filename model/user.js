const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    firstName: {
        default: '',
        type: String
    },
    lastName: {
        default: "",
        type: String
    },
    email: {
        default: "",
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String, required: true
    },
    backup: {
        default: "",
        type: String
    },
    role: {
        default: 'user',
        type: String
    }
});

const user = mongoose.model('user', userSchema)

module.exports ={
    user
}