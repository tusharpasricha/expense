const express = require('express');
const { addSource, getAllSources ,deleteSource, editSource } = require('../controllers/auth');
const { addIncome, getAllIncomes} = require('../controllers/auth');
const { addCategory, getAllCategories ,deleteCategory, editCategory } = require('../controllers/auth');
const { addExpense, getAllExpenses} = require('../controllers/auth');
const { getIncomesByYear, getExpensesByYear} = require('../controllers/auth');


const router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        result: "working"
    })
})
router.get('/incomes', getIncomesByYear);
router.get('/expenses', getExpensesByYear);

router.post('/addSource',addSource)
router.get('/getAllSources',getAllSources)
router.delete('/deleteSource/:id',deleteSource)
router.put('/editSource/:id',editSource)

router.post('/addIncome',addIncome)
router.get('/getAllIncomes' ,getAllIncomes)

router.post('/addCategory',addCategory)
router.get('/getAllCategories',getAllCategories)
router.delete('/deleteCategory/:id',deleteCategory)
router.put('/editCategory/:id',editCategory)

router.post('/addExpense',addExpense)
router.get('/getAllExpenses' ,getAllExpenses)


module.exports = router;