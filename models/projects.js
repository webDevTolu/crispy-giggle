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
  codeStatus: {
    type: String,
    enum: ["PUBLIC", "PRIVATE"],
  },
  liveUrl: {
    type: String,
  },
  liveStatus: {
    type: String,
    enum: ["AVAILABLE", "UNAVAILABLE"],
  },
  previewImageUrl: {
    type: String,
  },
  heroImageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Projects", projectSchema);
