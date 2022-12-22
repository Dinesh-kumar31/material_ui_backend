const mongoose = require('mongoose');
const schema = mongoose.Schema

const shopSchema = new schema({
    shopName:{
        default: '',
        type: String
    },
    contactNo: {
        default:'',
        type: String
    },
    address: {
        street: {
            default: '',
            type: String
        },
        city: {
            default: '',
            type: String
        },
        state: {
            default: '',
            type: String
        },
        pincode: {
            default: '',
            type: String
        }
    }
});

const shop = mongoose.model('shop', shopSchema)

module.exports = {
    shop
}