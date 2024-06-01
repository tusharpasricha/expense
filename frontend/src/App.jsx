import List from './mycomp/list'
import './App.css'
import Accounts from './mycomp/accounts'
import Expense from './mycomp/expense'
import Income from './mycomp/income'
import Categories from './mycomp/category'
import Head from './mycomp/head'
import Track from './mycomp/track'

import { useEffect, useState } from "react";

function App() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);


  useEffect(() => {
    // Fetch initial income data from the backend
    fetch("http://localhost:3000/api/getAllIncomes")
      .then((response) => response.json())
      .then((data) => {
        setIncomes(data.allIncomes);
      })
      .catch((error) => console.error("Error fetching incomes:", error));
  // Fetch initial expense data from the backend
  fetch("http://localhost:3000/api/getAllExpenses")
  .then((response) => response.json())
  .then((data) => {
    setExpenses(data.allExpenses);
  })
  .catch((error) => console.error("Error fetching expenses:", error));
}, []);

  const handleIncomeSaved = (newIncome) => {
    setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
  };
  const handleExpenseSaved = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };
  return (
    <div className='mineouter'>
      <Head />
      <Track />
      <div className='flex flex-row  justify-around mineinner' >
      <Expense onExpenseSaved={handleExpenseSaved} />
        <Income onIncomeSaved={handleIncomeSaved} />
        <div className='mineinner2'>
          <Accounts />
          <Categories />
        </div>

      </div>

      <List incomes={incomes} expenses={expenses} />
    </div>
  )
}

export default App
