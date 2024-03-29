import mongoose from 'mongoose'
import validator from 'validator'

const lessonsSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'users'
  },
  lessonName: {
    type: String
    // required: [true, '課程不能為空']
  },
  price: {
    type: Number,
    min: [0, '價格格式不正確']
    // required: [true, '課程價格不能為空']
  },
  date: {
    type: Date,
    default: Date.now
  },
  applicant: {
    type: String
  },
  phone: {
    type: String
  },
  sell: {
    type: Boolean,
    default: false
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
  memo: {
    type: String
  }
}, { versionKey: false })

export default mongoose.model('lessons', lessonsSchema)
