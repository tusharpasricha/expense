import List from './mycomp/list'
import './App.css'
import Accounts from './mycomp/accounts'
import Expense from './mycomp/expense'
import Income from './mycomp/income'
import Categories from './mycomp/category'
import Head from './mycomp/head'
import Track from './mycomp/track'

import { useEffect , useState } from "react";

function App() {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    // Fetch initial income data from the backend
    fetch("http://localhost:3000/api/getAllIncomes")
      .then((response) => response.json())
      .then((data) => {
        setIncomes(data.allIncomes);
      })
      .catch((error) => console.error("Error fetching incomes:", error));
  }, []);

  const handleIncomeSaved = (newIncome) => {
    setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
  };

  return (
    <div className='mineouter'>
      <Head/>
      <Track/>
      <div className='flex flex-row  justify-around mineinner' >
        <Expense />
        <Income onIncomeSaved={handleIncomeSaved} />
        <div className='mineinner2'>
          <Accounts />
          <Categories />
        </div>

      </div>
    
      <List incomes={incomes} />
    </div>
  )
}

export default App
