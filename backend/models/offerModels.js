import mongoose from "mongoose"

const offerSchema = new mongoose.Schema(
  {
    title:{
     type:String,
     required:true
    },
    category: {
      type: String,
      required: false,
      default: "",
    },
    discountPercentage: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
   
  },
  {
    timestamps: true,
  }
)

const offer = mongoose.model("Offer", offerSchema)

export default offer
