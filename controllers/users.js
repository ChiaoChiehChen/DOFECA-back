import md5 from 'md5'
import jwt from 'jsonwebtoken'
import users from '../models/users.js'
import products from '../models/products.js'

export const register = async (req, res) => {
  try {
    await users.create(req.body)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '帳號已存在' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const login = async (req, res) => {
  try {
    const user = await users.findOne({ account: req.body.account, password: md5(req.body.password) }, '-password')
    if (user) {
      const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET, { expiresIn: '7 days' })
      user.tokens.push(token)
      await user.save()
      const result = user.toObject()
      delete result.tokens
      result.token = token
      result.cart = result.cart.length
      res.status(200).send({ success: true, message: '', result })
    } else {
      res.status(404).send({ success: false, message: '帳號或密碼錯誤' })
    }
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token !== req.token)
    await req.user.save()
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// token舊換新
export const extend = async (req, res) => {
  try {
    const idx = req.user.tokens.findIndex(token => token === req.token)
    const token = jwt.sign({ _id: req.user._id.toString() }, process.env.SECRET, { expiresIn: '7 days' })
    // 舊換新
    req.user.tokens[idx] = token
    // 修改過
    req.user.markModified('token')
    await req.user.save()
    res.status(200).send({ success: true, message: '', result: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 拿使用者資訊
export const getUserInfo = (req, res) => {
  try {
    const result = req.user.toObject()
    delete result.tokens
    result.cart = result.cart.length
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: true, message: '伺服器錯誤' })
  }
}

// 新增
export const addCart = async (req, res) => {
  try {
    // 先檢查商品是否存在
    const idx = req.user.cart.findIndex(item => item.product.toString() === req.body.product)
    if (idx > -1) {
      // 商品+=1
      req.user.cart[idx].quantity += req.body.quantity
    } else {
      // 再找商品id
      const result = await products.findById(req.body.product)
      if (!result || !result.sell) {
        res.status(404).send({ success: false, message: '商品不存在' })
        return
      }
      req.user.cart.push(req.body)
    }
    await req.user.save()
    res.status(200).send({ success: true, message: '', result: req.user.cart.length })
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

// 取得
export const getCart = async (req, res) => {
  try {
    const { cart } = await users.findById(req.user._id, 'cart').populate('cart.product')
    res.status(200).send({ success: true, message: '', result: cart })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 編輯購物車
export const updateCart = async (req, res) => {
  try {
    if (req.body.quantity === 0) {
      const idx = req.user.cart.findIndex(item => item.product.toString() === req.body.product)
      if (idx > -1) {
        req.user.cart.splice(idx, 1)
      }
      await req.user.save()
      res.status(200).send({ success: true, message: '' })
    } else {
      const idx = req.user.cart.findIndex(item => item.product.toString() === req.body.product)
      if (idx > -1) {
        req.user.cart[idx].quantity = req.body.quantity
      }
      await req.user.save()
      res.status(200).send({ success: true, message: '' })
    }
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
