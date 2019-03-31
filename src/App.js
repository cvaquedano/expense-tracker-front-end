import React, { Component } from 'react'
import Header from './components/header'
import Main from './components/main'
import { Alert } from 'reactstrap';
import Notification from './components/notification';

class App extends Component {

  
  state={
    notifications:[]

  }
  componentDidMount(){  
    
  
    }


  render(){
    return(
      
      <div>       
      <Header />
      <Main />
    </div>

    );
  }

}



export default App
