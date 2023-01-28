const mongoose = require('mongoose');
//setup schema  => setup model => use the model you created to query, update, delete entity in your database
/*
{
  content: "fdsafadsf",
  isCompleted: false,
  id: "fdfasfal1212fdfadsfadsf"
}
*/

const dataSchema = new mongoose.Schema(
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

module.exports = dataSchema;
