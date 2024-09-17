const Sources = require("../models/sources");
const Income = require("../models/income");
const Category = require("../models/category");
const Expense = require("../models/expense");
const User = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//-------------------------------------------------------------------------------------------------------------
exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  console.log("Sign up attempt: "+ username)

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("User already exist")
      return res.status(400).send({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: "User Registered" });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).send({ error: "Error registering user" });
  }
};
exports.logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("log in attempt", username);
    
    if (!username || !password) {
      return res.status(400).send({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    console.log("token to be sent", token);
    
    res.json({ token });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.profile = async (req, res) => {
  res.json({ message: "This is protected data", user: req.user });
};
//-------------------------------------------------------------------------------------------------------------

exports.getIncomesByYear = async (req, res) => {
  const { year, month } = req.query;
  const userId = req.user.id;

  try {
    if (!year || isNaN(year)) {
      return res.status(400).json({ error: "Invalid year parameter" });
    }
    const yearInt = parseInt(year, 10);

    let startDate, endDate;

    if (month && !isNaN(month)) {
      const monthInt = parseInt(month, 10) - 1; // JS months are 0-indexed
      startDate = new Date(yearInt, monthInt, 1); // 1st of the specified month
      endDate = new Date(yearInt, monthInt + 1, 1); // 1st of the next month
    } else {
      // Default to the full year
      startDate = new Date(yearInt, 0, 1); // January 1st of the year
      endDate = new Date(yearInt + 1, 0, 1); // January 1st of the next year
    }

    const incomes = await Income.find({
      date: {
        $gte: startDate,
        $lt: endDate,
      },
      user: userId,
    }).populate("source");

    res.status(200).json(incomes);
  } catch (error) {
    console.error("Error fetching incomes by year and month:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getExpensesByYear = async (req, res) => {
  const { year, month } = req.query;
  const userId = req.user.id;

  try {
    if (!year || isNaN(year)) {
      return res.status(400).json({ error: "Invalid year parameter" });
    }
    const yearInt = parseInt(year, 10);

    let startDate, endDate;

    if (month && !isNaN(month)) {
      const monthInt = parseInt(month, 10) - 1; // JS months are 0-indexed
      startDate = new Date(yearInt, monthInt, 1); // 1st of the specified month
      endDate = new Date(yearInt, monthInt + 1, 1); // 1st of the next month
    } else {
      // Default to the full year
      startDate = new Date(yearInt, 0, 1); // January 1st of the year
      endDate = new Date(yearInt + 1, 0, 1); // January 1st of the next year
    }

    const expenses = await Expense.find({
      date: {
        $gte: startDate,
        $lt: endDate,
      },
      user: userId,
    })
      .populate("source")
      .populate("category");

    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses by year and month:", error);
    res.status(500).json({ error: error.message });
  }
};

//-------------------------------------------------------------------------------------------------------------

exports.addSource = (req, res, next) => {
  let { source, amount } = req.body;
  const userId = req.user.id;

  const newSource = new Sources({
    source: source,
    amount: amount,
    user: userId,
  });

  newSource
    .save()
    .then((response) => {
      res.status(200).json({
        success: true,
        result: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: err }],
      });
    });
};

exports.getAllSources = (req, res, next) => {
  const userId = req.user.id;
  Sources.find({ user: userId })
    .then((allSources) => {
      res.status(200).json({
        success: true,
        allSources: allSources,
      });
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: err }],
      });
    });
};

exports.deleteSource =
  ("/deleteSource/:id",
  (req, res, next) => {
    const userId = req.user.id;
    const sourceId = req.params.id;
    console.log(sourceId);

    // Find and remove the source by ID
    Sources.findByIdAndDelete({ _id: sourceId, user: userId })
      .then((deletedSource) => {
        if (!deletedSource) {
          return res.status(404).json({
            success: false,
            errors: [{ message: "Source not found" }],
          });
        }

        res.status(200).json({
          success: true,
          message: "Source deleted successfully",
          deletedSource: deletedSource,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          errors: [{ error: err }],
        });
      });
  });

exports.editSource =
  ("/editSource/:id",
  (req, res, next) => {
    const userId = req.user.id;
    const sourceId = req.params.id;
    const { source, amount } = req.body;

    if (!source || !amount) {
      return res.status(400).json({
        success: false,
        errors: [{ message: "Source name and amount are required" }],
      });
    }

    Sources.findByIdAndUpdate(
      { _id: sourceId, user: userId },
      { source: source, amount: amount },
      { new: true }
    )
      .then((updatedSource) => {
        if (!updatedSource) {
          return res.status(404).json({
            success: false,
            errors: [{ message: "Source not found" }],
          });
        }

        res.status(200).json({
          success: true,
          message: "Source updated successfully",
          updatedSource: updatedSource,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          errors: [{ error: err.message }],
        });
      });
  });

//---------------------------------------------------------------Income

exports.addIncome =
  ("/addIncome",
  (req, res, next) => {
    const { sourceId, amount, date } = req.body;
    const userId = req.user.id;

    const income = new Income({
      source: sourceId,
      amount: parseFloat(amount),
      date: new Date(date),
      user: userId,
    });

    income
      .save()
      .then((savedIncome) => {
        Sources.findByIdAndUpdate(sourceId, {
          $inc: { amount: parseFloat(amount) },
        })
          .then(() => {
            res.status(200).json({
              success: true,
              savedIncome: savedIncome,
            });
          })
          .catch((err) => {
            res.status(500).json({
              success: false,
              errors: [{ error: err }],
            });
          });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          errors: [{ error: err }],
        });
      });
  });

exports.getAllIncomes =
  ("/getAllIncomes",
  async (req, res) => {
    const userId = req.user.id;
    try {
      const allIncomes = await Income.find({ user: userId }).populate("source");
      res.status(200).json({
        success: true,
        allIncomes: allIncomes,
      });
    } catch (error) {
      console.error("Error fetching incomes:", error);
      res.status(500).json({
        errors: [{ error: "Internal Server Error" }],
      });
    }
  });

//---------------------------------------------------Category--------------------------------------
exports.addCategory =
  ("/addCategory",
  async (req, res) => {
    const userId = req.user.id;
    try {
      const { category } = req.body;
      const newCategory = await Category.create({ category, user: userId });
      res.status(201).json({
        success: true,
        result: newCategory,
      });
    } catch (error) {
      console.error("Error adding category:", error);
      res.status(500).json({
        errors: [{ error: "Internal Server Error" }],
      });
    }
  });

exports.deleteCategory =
  ("deleteCategory/:id",
  async (req, res) => {
    const userId = req.user.id;
    console.log("here");
    try {
      const categoryId = req.params.id;
      console.log(categoryId);
      const deletedCategory = await Category.findByIdAndDelete({
        _id: categoryId,
        user: userId,
      });
      if (!deletedCategory) {
        res.status(404).json({
          success: false,
          errors: [{ error: "Category not found" }],
        });
        return;
      }
      res.status(200).json({
        success: true,
        result: deletedCategory,
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({
        errors: [{ error: "Internal Server Error" }],
      });
    }
  });

exports.editCategory =
  ("/editCategory/:id",
  async (req, res) => {
    const userId = req.user.id;
    try {
      const categoryId = req.params.id;
      const { category } = req.body;
      const updatedCategory = await Category.findByIdAndUpdate(
        { _id: categoryId, user: userId },
        { category },
        { new: true }
      );
      if (!updatedCategory) {
        res.status(404).json({
          success: false,
          errors: [{ error: "Category not found" }],
        });
        return;
      }
      res.status(200).json({
        success: true,
        updatedCategory,
      });
    } catch (error) {
      console.error("Error editing category:", error);
      res.status(500).json({
        errors: [{ error: "Internal Server Error" }],
      });
    }
  });

exports.getAllCategories =
  ("/getAllCategories",
  async (req, res) => {
    const userId = req.user.id;
    try {
      const allCategories = await Category.find({ user: userId });
      res.status(200).json({
        success: true,
        allCategories,
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({
        errors: [{ error: "Internal Server Error" }],
      });
    }
  });

//-----------------------expense

exports.addExpense =
  ("/addExpense",
  (req, res, next) => {
    const { sourceId, categoryId, amount, date } = req.body;
    const userId = req.user.id;

    const expense = new Expense({
      source: sourceId,
      category: categoryId,
      amount: parseFloat(amount),
      date: new Date(date),
      user: userId,
    });
    console.log(expense);

    expense
      .save()
      .then((savedExpense) => {
        // Optionally update the source with the new expense amount if needed
        Sources.findByIdAndUpdate(sourceId, {
          $inc: { amount: -parseFloat(amount) },
        })
          .then(() => {
            res.status(200).json({
              success: true,
              savedExpense: savedExpense,
            });
          })
          .catch((err) => {
            res.status(500).json({
              success: false,
              errors: [{ error: err }],
            });
          });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          errors: [{ error: err }],
        });
      });
  });

exports.getAllExpenses =
  ("/getAllExpenses",
  async (req, res) => {
    const userId = req.user.id;
    try {
      const allExpenses = await Expense.find({ user: userId }).populate(
        "source category"
      );
      res.status(200).json({
        success: true,
        allExpenses: allExpenses,
      });
    } catch (error) {
      console.error("Error fetching expenses:", error);
      res.status(500).json({
        errors: [{ error: "Internal Server Error" }],
      });
    }
  });
