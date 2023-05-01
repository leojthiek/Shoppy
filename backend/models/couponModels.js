import mongoose from "mongoose"

const couponSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requires: true,
      unique: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    discountAmount: {
      type: Number,
      required: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
  
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
)



const Coupon = mongoose.model("Coupon", couponSchema)
export default Coupon
