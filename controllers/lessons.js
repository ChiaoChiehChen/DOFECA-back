import lessons from '../models/lessons.js'

//  新增課程
export const lessonsCreate = async (req, res) => {
  try {
    // console.log(req.body.sell)
    // const result = await lessons.create({ ...req.body, user: req.user._id, lesson: req.body.lessons })
    const result = await lessons.create({ lessonName: req.body.lessonName, price: req.body.price, sell: req.body.sell })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    // console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      console.log(error)
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 所有課程
export const getLessons = async (req, res) => {
  try {
    const result = await lessons.find({ sell: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 管理員看所有課程
export const getLessonsAll = async (req, res) => {
  try {
    const result = await lessons.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 新增報名
export const getSignUP = async (req, res) => {
  console.log(req)
  // console.log(req.user._id)
  try {
    const result = await lessons.create({ user: req.user._id, lessonName: req.body.lessonName, price: req.body.price, date: req.body.date, applicant: req.body.applicant, phone: req.body.phone, email: req.body.email, memo: req.body.memo })
    await req.user.save()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到商品' })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      // console.log(error.errors[key].message)
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const getAllLessons = async (req, res) => {
  try {
    const result = await lessons.find().populate('user', ['account', 'name'])
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getMyLessons = async (req, res) => {
  console.log(req.user)
  try {
    const result = await lessons.find({ user: req.user._id })
    res.status(200).send({ success: false, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤111' })
  }
}

export const delLessons = async (req, res) => {
  try {
    await lessons.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
