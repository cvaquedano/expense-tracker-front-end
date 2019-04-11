import React, { Component } from 'react';
import {Table} from 'reactstrap'
import Axios from 'axios';

import config from 'react-global-configuration';
import NumberFormat from 'react-number-format';


class Notification extends Component {

    state={
      url:config.get('apiDomain'),
        notifications:[],         
      }

      componentDidMount(){
        this.refreshData();
      
      }

      refreshData(){
        Axios.get(this.state.url +'/notification').then((response)=>{
          this.setState({
            notifications:response.data           
          })    
    
        });
    
      }

      alertNotifications(){
        this.refreshData()
          return this.Notification;
      }

      renderNotificationsItem(){
        let notifications = this.state.notifications.map((notification)=>{
            return (
            <tr>
              <td>{notification.month}</td>
              <td>{notification.name}</td>
             
              <td><NumberFormat value={notification.total} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>   
            
              <td><NumberFormat value={notification.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>   
              
            </tr>
      
            )
          });
    
          return notifications;
    
      }

    render(){

        let notifications=this.renderNotificationsItem();
        return (
    <div className="App container container-white">
         <Table responsive>
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