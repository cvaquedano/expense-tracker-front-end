import React, { Component } from 'react';
import {Table} from 'reactstrap'
import Axios from 'axios';
import moment from "moment";
import Moment from 'react-moment';

import NumberFormat from 'react-number-format';


class Balance extends Component {

    state={
        balances:[],
        yearAndMonth: moment(new Date()).format('YYYYMM'),
       
      }

      componentDidMount(){   
          this.refreshData();
      }

     
      refreshData(){
         
        Axios.get('http://localhost:3000/balance/' + this.state.yearAndMonth).then((response)=>{
          this.setState({
            balances:response.data           
          })    
    
        });
    
      }

     

      renderBudgetItem(){
        let balances = this.state.balances.map((balnce)=>{
            return (
            <tr key={balnce.transactionid} >
               <td>  <Moment format="YYYY/MM/DD" date={balnce.date} /></td>
              <td>{balnce.description}</td>
              <td>{balnce.category}</td>
              
              <td><NumberFormat value={balnce.positive} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>   
               
              <td><NumberFormat value={balnce.negative} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>   
              
            </tr>
      
            )
          });
    
          return balances;
    
      }

    render(){

        let balances=this.renderBudgetItem();
        return (
    <div className="App container">
         <Table>
        <thead>
          <tr>
            <th>Date</th>            
            <th>Description</th>
            <th>Category</th>
            <th>Income</th>
            <th>Expenses</th>
          

          </tr>
        </thead>

        <tbody>
         {balances}

        </tbody>
      </Table>
    </div>);
    }

}

export default Balance;