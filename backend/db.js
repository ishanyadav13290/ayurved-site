const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://cipibay368:9paracommando@ayurved.j3fag6r.mongodb.net/ayurved");

const usersSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cart: { type: Array },
    prevOrders:{type:Array},
    isAdmin:{type:Boolean}
})
const productsSchema = mongoose.Schema({
    name: { type: String, required:true },
    category: { type: String},
    description:{type:String},
    price: { type: String, required:true },
    image: { type: String },
})
const orderedProductsSchema = mongoose.Schema({
    "fullName": { type: String },
"streetAddress": { type: String },
"zipCode": { type: String },
"city": { type: String },
"emailAddress": { type: String },
"phoneNumber":{type:Number},
"orderedProducts":{ type: Array },
"paymentMode": { type: String },
"totalAmt": {type:String}
})




const UsersModel = mongoose.model("user", usersSchema)
const ProductsModel = mongoose.model("product", productsSchema)
const orderedProductsModel = mongoose.model("order", orderedProductsSchema)

module.exports = {
    connection,
    UsersModel,
    ProductsModel,
    orderedProductsModel
}