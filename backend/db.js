const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://cipibay368:9paracommando@ayurved.j3fag6r.mongodb.net/ayurved");

const usersSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cart: { type: Array },
    prevOrders:{type:Array}
})
const productsSchema = mongoose.Schema({
    name: { type: String, required:true },
    category: { type: String, required:true },
    price: { type: String, required:true },
    image: { type: String },
})


const UsersModel = mongoose.model("user", usersSchema)
const ProductsModel = mongoose.model("product", productsSchema)

module.exports = {
    connection,
    UsersModel,
    ProductsModel,
}