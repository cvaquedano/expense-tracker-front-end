import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './home'
import Category from './category'


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/category' component={Category}/>
    
    </Switch>
  </main>
)

export default Main