const { mongoose } = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  testimony: {
    type: String,
  },
  position: {
    type: String,
  },
});

module.exports = mongoose.model("Testimony", testimonialSchema);
