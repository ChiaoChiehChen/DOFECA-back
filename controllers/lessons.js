import lessons from '../models/lessons.js'

//  新增商品
export const lessonsCreate = async (req, res) => {
  try {
    console.log(req)
    // const result = await lessons.create({ ...req.body, user: req.user._id, lesson: req.body.lessons })
    const result = await lessons.create({ lessonName: req.body.lessonName, price: req.body.price })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    // console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      res.status(500).send({ success: false, message: '5555555' })
    }
  }
}

// 所有課程
export const getLessons = async (req, res) => {
  try {
    const result = await lessons.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 新增預約
export const getSignUP = async (req, res) => {
  // console.log(req.user)
  console.log(req.body)
  try {
    const result = await lessons.create({ user: req.user._id, lessons: req.body })
    console.log('result' + result)
    await req.user.save()
    // console.log('123')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到商品' })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const getAllLessons = async (req, res) => {
  try {
    const result = await lessons.find().populate(('user', ['account', 'name']))
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getMyLessons = async (req, res) => {
  try {
    // models-orders 有ref
    const result = await lessons.find({ user: req.user._id }).populate('products.product')
    res.status(200).send({ success: false, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
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
