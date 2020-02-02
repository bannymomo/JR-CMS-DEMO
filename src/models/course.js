const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      uppercase: true,
      alias: "code"
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    __v: {
      type: Number,
      select: false
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, id: false } //如果在这里写__v select false,则该参数将不会存储在数据库当中
);

const model = mongoose.model("Course", schema);

module.exports = model;
