const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let sourcesSchema = new Schema({
  source: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
mongoose.model("Source", sourcesSchema);

module.exports = mongoose.model("Sources", sourcesSchema);
