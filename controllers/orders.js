import orders from '../models/orders.js'
import users from '../models/users.js'

// 結帳
export const checkout = async (req, res) => {
  // console.log(req.body)
  try {
    if (req.user.cart.length === 0) {
      res.status(400).send({ success: false, message: '購物車是空的' })
      return
    }
    const hasNotSell = await users.aggregate([
      {
        $match: {
          _id: req.user._id
        }
      },
      {
        $project: {
          'cart.product': 1
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: 'cart.product',
          foreignField: '_id',
          as: 'cart.product'
        }
      },
      {
        $match: {
          'cart.product.sell': false
        }
      }
    ])
    if (hasNotSell.length > 0) {
      res.status(400).send({ success: false, message: '包含下架商品' })
      return
    }
    const result = await orders.create({ user: req.user._id, products: req.user.cart, recipient: req.body.recipient, phone: req.body.phone, email: req.body.email, delivery: req.body.delivery, payment: req.body.payment, address: req.body.address, memo: req.body.memo })
    // 使用者的訂單 })
    req.user.cart = []
    await req.user.save()
    res.status(200).send({ success: true, message: '', result: result._id })
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.log(error)
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      console.log(error)
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 使用者的訂單
export const getMyOrders = async (req, res) => {
  try {
    // models-orders 有ref
    const result = await orders.find({ user: req.user._id }).populate('products.product')
    res.status(200).send({ success: false, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 所有人訂單(管理者)
export const getAllOrders = async (req, res) => {
  try {
    // .populate('user', 'account name')
    const result = await orders.find().populate('user', ['account', 'name']).populate('products.product')
    res.status(200).send({ success: false, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
