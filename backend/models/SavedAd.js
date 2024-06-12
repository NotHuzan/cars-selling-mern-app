const mongoose = require("mongoose");

const savedAdSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },

  ads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});

const SavedAd = mongoose.model("savedAd", savedAdSchema);

module.exports = SavedAd;
