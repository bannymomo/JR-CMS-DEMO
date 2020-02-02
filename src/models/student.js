const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const schema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: email =>
          !Joi.string()
            .email()
            .validate(email).error,
        msg: "Invalid email format"
      }
    },
    __v: {
      type: Number,
      select: false
    },
    courses: [
      { type: String, ref: "Course" } //must match course model's name
    ]
  },
  { timestamps: true, toJSON: { virtuals: true }, id: false }
);
schema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`;
});
const model = mongoose.model("Student", schema);

module.exports = model;
