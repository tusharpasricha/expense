import List from './mycomp/list';
import './App.css';
import Accounts from './mycomp/accounts';
import Expense from './mycomp/expense';
import Income from './mycomp/income';
import Categories from './mycomp/category';
import Head from './mycomp/head';
import Track from './mycomp/track';
import Login from './mycomp/login';
import Signup from './mycomp/signup';
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

function MainPage() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = location?.state?.isLoggedIn;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    fetch("http://localhost:3000/api/getAllIncomes",{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => setIncomes(data.allIncomes))
      .catch((error) => console.error("Error fetching incomes:", error));

    fetch("http://localhost:3000/api/getAllExpenses",{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => setExpenses(data.allExpenses))
      .catch((error) => console.error("Error fetching expenses:", error));
  }, [isLoggedIn, navigate]);

  const handleIncomeSaved = (newIncome) => {
    setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
  };

  const handleExpenseSaved = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  return (
    <>
      <Head />
      <div className='flex flex-row justify-around mineinner'>
        <Expense onExpenseSaved={handleExpenseSaved} />
        <Income onIncomeSaved={handleIncomeSaved} />
        <div className='mineinner2'>
          <Accounts />
          <Categories />
        </div>
      </div>
      <Track />

      <List incomes={incomes} expenses={expenses} />
    </>
  );
}

function App() {
  return (
    <div className='mineouter'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
