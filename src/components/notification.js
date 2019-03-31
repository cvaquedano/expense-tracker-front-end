import React, { Component } from 'react';
import {Table} from 'reactstrap'
import Axios from 'axios';


class Notification extends Component {

    state={
        notifications:[],         
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

      renderNotificationsItem(){
        let notifications = this.state.notifications.map((notification)=>{
            return (
            <tr>
              <td>{notification.month}</td>
              <td>{notification.name}</td>
              <td>{notification.total}</td>
              <td>{notification.budget}</td>      
              
            </tr>
      
            )
          });
    
          return notifications;
    
      }

    render(){

        let notifications=this.renderNotificationsItem();
        return (
    <div className="App container">
         <Table>
        <thead>
          <tr>
            <th>Month</th>            
            <th>Category</th>
            <th>Expense</th>
            <th>Budget</th>
          

          </tr>
        </thead>

        <tbody>
         {notifications}

        </tbody>
      </Table>
    </div>);
    }

}

export default Notification;