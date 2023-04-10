import mongoose from "mongoose"

const cartSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  qty:{
    type:Number,
    required:true
  }
},
{
    timestamps:true
}
)

const Cart=mongoose.model('Cart',cartSchema)
export default Cart
