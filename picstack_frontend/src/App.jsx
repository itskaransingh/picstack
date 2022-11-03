import { useState } from 'react'
import Login from './components/Login';
import Home from './container/Home';
import {Route,Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App ">
<Routes>
  <Route exact path='login' element={<Login/>}></Route>
  <Route exact path='/*' element={<Home/>}></Route>
</Routes>
    </div>
  )
}

export default App
