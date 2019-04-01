import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './home'
import Category from './category'
import Transaction from './transaction';
import Notification from './notification';
import Balance from './balance';


const Main = () => (
  <main  >
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/category' component={Category}/>
      <Route path='/transaction' component={Transaction}/>
      <Route path='/notification' component={Notification}/>
      <Route path='/balance' component={Balance}/>
    
    </Switch>
  </main>
)

export default Main