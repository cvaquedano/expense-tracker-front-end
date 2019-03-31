import React,{ Component } from 'react'
import { Jumbotron, Button,ButtonToolbar } from 'reactstrap';
import Axios from 'axios';

import { UncontrolledAlert  } from 'reactstrap';

class Home extends Component {

  state={
    notifications:[]

  }



  componentDidMount(){
    this.refreshData();
  
  }

  refreshData(){
    Axios.get('http://localhost:3000/notification').then((response)=>{
      this.setState({
        notifications:response.data           
      })    

    });

  }

  render(){
    return (
      <div>

    { !(this.state.notifications=== undefined || this.state.notifications.length===0)&&<UncontrolledAlert  color="primary">
      You have {this.state.notifications.length} categories that exceed the budget — check it out!
      </UncontrolledAlert >   }   
        <Jumbotron>
          <h1 className="display-3">Expense Tracker app!</h1>
          <p className="lead">this is an app for a development challenge.</p>
          <hr className="my-2" />
          <p>You want lear more of me? check out my LinkedIn or my Github.</p>
         
          <ButtonToolbar>
          <Button className="mr-2"  href="https://www.linkedin.com/in/carlos-vaquedano-633603a1/" color="primary">LinkedIn</Button>
            <Button className="mr-2"  href="https://github.com/cvaquedano" color="primary">Github</Button>
  
          </ButtonToolbar>
           
          
        </Jumbotron>
      </div>
    );

  }
  
}


export default Home