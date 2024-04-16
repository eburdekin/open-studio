import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  //   _id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     required: true,
  //   },
  class_name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  class_description: {
    type: String,
    required: true,
  },
  class_image: {
    type: String,
    required: true,
    maxlength: 255,
  },
  capacity: {
    type: Number,
    min: 0,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
  },
});

const Class = mongoose.model("Class", classSchema);

export default Class;
