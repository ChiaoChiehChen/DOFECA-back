import mongoose from 'mongoose'
import validator from 'validator'

const subscribesSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, '信箱不能為空'],
    unique: true,
    validate: {
      validator (email) {
        return validator.isEmail(email)
      },
      message: '信箱格式錯誤'
    }
  }
}, { versionKey: false })

export default mongoose.model('subscribes', subscribesSchema)
