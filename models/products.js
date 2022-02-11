import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '商品不能為空']
  },
  price: {
    type: Number,
    required: [true, '商品價格不能為空']
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  sell: {
    type: Boolean,
    default: false
  },
  category: {
    big: {
      type: String
    },
    small: {
      type: String
    }
  }
}, { versionsLey: false })

export default mongoose.model('products', productSchema)
