import mongoose from 'mongoose'

const lessonsOrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '商品不能為空']
  },
  price: {
    type: Number,
    min: [0, '價格格式不正確'],
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
}, { versionsKey: false })

export default mongoose.model('products', lessonsOrderSchema)
