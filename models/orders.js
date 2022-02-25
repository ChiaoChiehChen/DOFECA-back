import mongoose from 'mongoose'
import validator from 'validator'

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'users'
  },
  products: {
    type: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: 'products',
          required: [true, '缺少商品 ID']
        },
        quantity: {
          type: Number,
          required: [true, '缺少商品數量']
        }
      }
    ]
  },
  date: {
    type: Date,
    default: Date.now
  },
  recipient: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    // required: [true, '信箱不能為空'],
    unique: true,
    validate: {
      validator (email) {
        return validator.isEmail(email)
      },
      message: '信箱格式錯誤'
    }
  },
  delivery: {
    type: String
  },
  payment: {
    type: String
  },
  address: {
    type: String,
    default: ''
  },
  memo: {
    type: String
  }
}, { versionKey: false })

export default mongoose.model('orders', orderSchema)
