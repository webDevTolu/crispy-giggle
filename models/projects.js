const { mongoose } = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  body: {
    type: String,
  },
  codeUrl: {
    type: String,
  },
  liveUrl: {
    type: String,
  },
  previewImageUrl: {
    type: String,
  },
  heroImageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Projects", projectSchema);
