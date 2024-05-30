const Sources = require('../models/sources')
const Income = require('../models/income')
const Category = require('../models/category')

exports.addSource =(req,res,next)=>{
    let {source,amount} = req.body;

    const newSource = new Sources({
        source:source,
        amount:amount
    })

    newSource.save()
    .then(response=>{
        res.status(200).json({
            success:true,
            result:response
        })
    })
    .catch(err=>{
        res.status(500).json({
            errors:[{error:err}]
        })
    })
}

exports.getAllSources = (req,res,next)=>{
    Sources.find()
    .then(allSources => {
      res.status(200).json({
        success: true,
        allSources: allSources
      });
    })
    .catch(err => {
      res.status(500).json({
        errors: [{ error: err }]
      });
    });
}

exports.deleteSource = ('/deleteSource/:id', (req, res, next) => {
  const sourceId = req.params.id;
  console.log(sourceId)

  // Find and remove the source by ID
  Sources.findByIdAndDelete(sourceId)
    .then((deletedSource) => {
      if (!deletedSource) {
        return res.status(404).json({
          success: false,
          errors: [{ message: 'Source not found' }],
        });
      }

      res.status(200).json({
        success: true,
        message: 'Source deleted successfully',
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

// Update a source by ID
exports.editSource = ('/editSource/:id', (req, res, next) => {
  const sourceId = req.params.id;
  const { source, amount } = req.body;

  // Validate that both source name and amount are provided
  if (!source || !amount) {
    return res.status(400).json({
      success: false,
      errors: [{ message: 'Source name and amount are required' }],
    });
  }

  // Find and update the source by ID
  Sources.findByIdAndUpdate(
    sourceId,
    { source: source, amount: amount },
    { new: true }
  )
    .then((updatedSource) => {
      if (!updatedSource) {
        return res.status(404).json({
          success: false,
          errors: [{ message: 'Source not found' }],
        });
      }

      res.status(200).json({
        success: true,
        message: 'Source updated successfully',
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

exports.addIncome = ('/addIncome',(req, res, next) => {
  const { sourceId, amount, date } = req.body;

  // Assuming Income model has a field called source which references the Sources model
  const income = new Income({
    source: sourceId,
    amount: parseFloat(amount), // Assuming amount is a string
    date: new Date(date),
  });

  income
    .save()
    .then((savedIncome) => {
      // Update the source with the new income amount
      Sources.findByIdAndUpdate(sourceId, { $inc: { amount: parseFloat(amount) } })
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

exports.getAllIncomes = ('/getAllIncomes', async (req, res) => {
  try {
    const allIncomes = await Income.find().populate('source');
    res.status(200).json({
        success: true,
        allIncomes: allIncomes
    });
} catch (error) {
    console.error('Error fetching incomes:', error);
    res.status(500).json({
        errors: [{ error: 'Internal Server Error' }]
    });
}
});

//---------------------------------------------------Category--------------------------------------
exports.addCategory = ('/addCategory',async (req, res) => {
  try {
    const { category } = req.body;
    const newCategory = await Category.create({ category });
    res.status(201).json({
      success: true,
      result: newCategory,
    });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({
      errors: [{ error: 'Internal Server Error' }],
    });
  }
});

exports.deleteCategory = ('deleteCategory/:id',async (req, res) => {
  console.log('here')
  try {
    const categoryId = req.params.categoryId;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      res.status(404).json({
        success: false,
        errors: [{ error: 'Category not found' }],
      });
      return;
    }
    res.status(200).json({
      success: true,
      result: deletedCategory,
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({
      errors: [{ error: 'Internal Server Error' }],
    });
  }
});

exports.editCategory = ('/editCategory/:id',async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const { category } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { category },
      { new: true }
    );
    if (!updatedCategory) {
      res.status(404).json({
        success: false,
        errors: [{ error: 'Category not found' }],
      });
      return;
    }
    res.status(200).json({
      success: true,
      updatedCategory,
    });
  } catch (error) {
    console.error('Error editing category:', error);
    res.status(500).json({
      errors: [{ error: 'Internal Server Error' }],
    });
  }
});

exports.getAllCategories = ('/getAllCategories',async (req, res) => {
  try {
    const allCategories = await Category.find();
    res.status(200).json({
      success: true,
      allCategories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      errors: [{ error: 'Internal Server Error' }],
    });
  }
});