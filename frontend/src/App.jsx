import List from './mycomp/list'
import './App.css'
import Accounts from './mycomp/accounts'
import Expense from './mycomp/expense'
import Income from './mycomp/income'
import Categories from './mycomp/category'

function App() {

  return (
    <>
    <div className='flex flex-row  justify-around' >
      <Expense/>
      <Income/>
      <div>
      <Accounts/>
      <Categories/>
      </div>
      
    </div>
    <List/>
    </>
  )
}

export default App
