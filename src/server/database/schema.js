const mongoose = require('mongoose');
//setup schema  => setup model => use the model you created to query, update, delete entity in your database
/*
{
  content: "fdsafadsf",
  isCompleted: false,
  id: "fdfasfal1212fdfadsfadsf"
}
*/

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    choose: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = { userSchema, productSchema };
