import {
  UserModel,
  MomentModel,
  OrderModel,
  CollectionModel,
  OrderModel
} from "./server/database/schema"

import mongoose from "mongoose"
const { Types } = mongoose

mongoose.connect("mongodb://root:example@localhost:27017/test?authSource=admin&w=1", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// CollectionModel.find({}).exec((err, collections) => {
//   collections.forEach(u => console.log(u))
//   process.exit(0)
// })

// OrderModel.find({}).exec((err, orders) => {
//   orders.forEach(u => console.log(u))
//   process.exit(0)
// })

// CollectionModel.deleteMany({})
//   .exec()
//   .then((err, res) => console.log(err))

// UserModel.deleteOne({ provider: { $eq: "facebook" } })
//   .exec()
//   .then((err, res) => console.log(err))

// _id: 5dc682c91620d30ea92caa90,
// providerId: '2508116415941264',
// provider: 'facebook',
// email: 'jonpreece@hotmail.co.uk',
// password: null,
// role: 'Photographer',
// __v: 0

// UserModel.find({}).exec((err, users) => {
//   users.forEach(u => console.log(u))
//   process.exit(0)
// })

// CollectionModel.updateMany({
//   price: 799
// }).exec()

UserModel.updateOne({ _id: "5da8bc05990b274744e81e66" }, { role: "Admin" }).exec()

// MomentModel.deleteMany({}).then((err, res) => console.log(err))
// CollectionModel.deleteMany({}).then((err, res) => console.log(err))
// OrderModel.deleteMany({}).then((err, res) => console.log(err))
// UserModel.deleteOne({ _id: "5dc1db8eab248e420280abf7" }, console.log)

// MomentModel.find({}).exec((err, moments) => {
//   moments.forEach(u => console.log(u))
//   process.exit(0)
// })

// OrderModel.find({}).exec((err, orders) => {
//   orders.forEach(u => console.log(u))
//   process.exit(0)
// })

// OrderModel.findOne({ customerId: Types.ObjectId("5d3c3e6d438835640d81bd12") })
//   .populate({
//     path: "moments",
//     select: ["filename", "resizedLocation", "mimeType", "price"]
//   })
//   .exec((err, orders) => {
//     console.log(orders)

//     process.exit(0)
//   })

// OrderModel.deleteMany({}).exec((err, orders) => {
//   process.exit(0)
// })

// UserModel.find({}).exec((err, users) => {
//   console.log(users)
//   process.exit(0)
// })

// UserModel.findOne({
//   id: "2038428602910050"
// })
//   .select("profile")
//   .exec((err, users) => console.log(users))
