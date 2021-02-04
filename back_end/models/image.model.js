const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("images", ImageSchema);
