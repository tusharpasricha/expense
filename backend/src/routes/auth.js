const express = require("express");
const {
  addSource,
  getAllSources,
  deleteSource,
  editSource,
} = require("../controllers/auth");
const { addIncome, getAllIncomes } = require("../controllers/auth");
const {
  addCategory,
  getAllCategories,
  deleteCategory,
  editCategory,
} = require("../controllers/auth");
const { addExpense, getAllExpenses } = require("../controllers/auth");
const { getIncomesByYear, getExpensesByYear } = require("../controllers/auth");
const { logIn, signUp, profile } = require("../controllers/auth");

const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    result: "working",
  });
});

// router.use(auth);

router.post("/logIn", logIn);
router.post("/signUp", signUp);
router.get("/profile", profile);

router.get("/incomes", auth, getIncomesByYear);
router.get("/expenses", auth, getExpensesByYear);

router.post("/addSource", auth, addSource);
router.get("/getAllSources", auth, getAllSources);
router.delete("/deleteSource/:id", auth, deleteSource);
router.put("/editSource/:id", auth, editSource);

router.post("/addIncome", auth, addIncome);
router.get("/getAllIncomes", auth, getAllIncomes);

router.post("/addCategory", auth, addCategory);
router.get("/getAllCategories", auth, getAllCategories);
router.delete("/deleteCategory/:id", auth, deleteCategory);
router.put("/editCategory/:id", auth, editCategory);

router.post("/addExpense", auth, addExpense);
router.get("/getAllExpenses", auth, getAllExpenses);

module.exports = router;
