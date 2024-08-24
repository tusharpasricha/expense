// models/expense.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  source: { type: Schema.Types.ObjectId, ref: "Source", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

module.exports = mongoose.model("Expense", expenseSchema);
