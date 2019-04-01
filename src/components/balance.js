import React, { Component } from 'react';
import {Table,FormGroup,Label,Button} from 'reactstrap'

import DatePicker from "react-datepicker"; 
import Axios from 'axios';
import moment from "moment";
import Moment from 'react-moment';

import NumberFormat from 'react-number-format';


class Balance extends Component {

    state={
        balances:[],
        date:new Date(),
        yearAndMonth: moment(new Date()).format('YYYYMM'),
       
      }
      constructor(props){
        super(props);
        this.handleDateChange = this.handleDateChange.bind(this);
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

      handleDateChange(date) {
        this.setState({ 
          yearAndMonth: moment(date).format('YYYYMM'),
          date:date
        });
        console.log( this.state.yearAndMonth);
        console.log( date)
       
      }

      renderBalanceItem(){
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

        let balances=this.renderBalanceItem();
        return (
    <div className="App container">



          <FormGroup>
            <Label for="date">Date</Label>
            <div>
              <DatePicker className="datepiker-container"
                selected={this.state.date}
                onChange={this.handleDateChange}/>
               
                <Button  className="ml-2"    color="primary" onClick={this.refreshData.bind(this)}>Generate Balance</Button>{' '}

               

            
            </div>
          </FormGroup>



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
        { balances.length>1 && balances}

        </tbody>
      </Table>
    </div>);
    }

}

export default Balance;