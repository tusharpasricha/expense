import List from './mycomp/list'
import './App.css'
import Accounts from './mycomp/accounts'
import Expense from './mycomp/expense'
import Income from './mycomp/income'
import Categories from './mycomp/category'
import Head from './mycomp/head'
import Track from './mycomp/track'
function App() {

  return (
    <div className='mineouter'>
      <Head/>
      <Track/>
      <div className='flex flex-row  justify-around mineinner' >
        <Expense />
        <Income />
        <div className='mineinner2'>
          <Accounts />
          <Categories />
        </div>

      </div>
      <List />
    </div>
  )
}

export default App
