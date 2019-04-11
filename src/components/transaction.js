import React, { Component } from 'react';
import {Table} from 'reactstrap'
import "./style.css";

import { Button,Modal, ModalHeader, ModalBody, ModalFooter,Input,FormGroup,Label } from 'reactstrap';
import Axios from 'axios';

import config from 'react-global-configuration';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';




class Transaction extends Component {

  state={
    url:config.get('apiDomain'),
    categories:[],  
    transactions:[],

    newTransactionData:{     
      description:'',
      categoryid:0,
      amount:0,
      date: new Date()
    },
    editTransactionData:{
      id:0,
      description:'',
      categoryid:0,
      amount:0,
      date:new Date()
    },
    deleteTransactionData:{
      id:0,
      description:'',    
    },
    newTransactionModal:false,
    editTransactionModal:false,
    deleteTransactionModal:false
  }

  constructor(props){
    super(props);
    this.onRadioBtnClick = this.onNewRadioBtnClick.bind(this);
    this.handleNewDateChange = this.handleNewDateChange.bind(this);
    this.handleEditDateChange = this.handleEditDateChange.bind(this);
  
}

componentDidMount(){
  this.refreshData();
  this.getCategoryData();
}

handleNewDateChange(date) {
    this.setState(prevState => ({
        newTransactionData: {
            ...prevState.newTransactionData,
            date: date
        }
    }));
  }

  handleEditDateChange(date) {
    this.setState(prevState => ({
        editTransactionData: {
            ...prevState.editTransactionData,
            date: date
        }
    }));
  }

  onNewRadioBtnClick(rSelected) {
    this.setState(prevState => ({
        newTransactionData: {
            ...prevState.newTransactionData,
            type: rSelected
        }
    }));
  }
  
  onEditRadioBtnClick(rSelected) {
    this.setState(prevState => ({
        editTransactionData: {
            ...prevState.editTransactionData,
            type: rSelected
        }
    }));
  }

  optionCategoryChanged = value => {
    this.setState(prevState => ({
        newTransactionData: {
            ...prevState.newTransactionData,
            categoryid: value
        }
    }));
  }




  toggleNewTransactionModal(){
    this.setState({
        newTransactionModal:!this.state.newTransactionModal
    });

  }

  toggleEditTransactionModal(){
    this.setState({
        editTransactionModal:!this.state.editTransactionModal
    });
  }

  toggleDeleteTransactionModal(){     
    this.setState({
        deleteTransactionModal:!this.state.deleteTransactionModal
    });
  }

  refreshData(){
    Axios.get(this.state.url +'/transaction').then((response)=>{
      this.setState({
        transactions:response.data       
      })    

    });

  }
  getCategoryData(){
    Axios.get(this.state.url +'/category').then((response)=>{     

      this.setState(prevState => ({
        categories:response.data,
        newTransactionData: {
         
          ...prevState.newTransactionData,
          categoryid: response.data[0].id
        }
    }));
     
    });

  }

  postTransaction(){
    Axios.post(this.state.url +'/transaction',this.state.newTransactionData).then((response)=>{
      this.refreshData();
      this.setState({
       
        newTransactionModal:false,

        newTransactionData:{
            description:'',
            categoryid:0,
            amount:0,
            date:new Date()
        }
        });
    });

  }
  putTransaction(){
    let {description,categoryid,amount,date} = this.state.editTransactionData;

    Axios.put(this.state.url +'/transaction/' + this.state.editTransactionData.id,{
        description,
        categoryid,
        amount,
        date
    }).then((response)=>{
      this.refreshData();
      this.setState({
        editTransactionModal:false,

        editTransactionData:{
          id:0,
          description:'',
          categoryid:0,
          amount:0,
          date:null
        }
      })
    });

  }

  deteleTransactionOnBd(){

    Axios.delete('http://localhost:3000/transaction/' + this.state.deleteTransactionData.id).then((response)=>{

      this.refreshData();

      this.setState({
        deleteCategoryData:{
          id:0,
          description:'',    
        },
        deleteTransactionModal:false
      })

    });

  }

  deleteTransaction(id,description){
    this.setState({
      deleteTransactionData:{id,description},
      deleteTransactionModal:!this.state.deleteTransactionModal
    });
  }

  editTransaction(id,description,categoryid,amount,date){
      console.log(date);
    this.setState({
      editTransactionData:{id,description,categoryid,amount,date},
      editTransactionModal:!this.state.editTransactionModal
    });

  

  }

  renderTransactionItem(){
    let transactions = this.state.transactions.map((transaction)=>{
        return (
        <tr key={transaction.id}>
         
          <td>{transaction.description}</td>
          <td>{transaction.categoryname}</td>       
          
          <td><NumberFormat value={transaction.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
          
  
          <td>  <Moment format="YYYY/MM/DD" date={transaction.date} /></td>
          <td>
            <Button color="success" 
                    size="sm" 
                    className="mr-2" 
                    onClick={this.editTransaction.bind(this,transaction.id,transaction.description,transaction.categoryid,transaction.amount,transaction.date)}>
                    Edit
            </Button>
            <Button color="danger" size="sm" onClick={this.deleteTransaction.bind(this,transaction.id,transaction.description)} >Delete</Button>
          </td>
        </tr>
  
        )
      });

      return transactions;

  }

  renderCategoryOptionItem(){
    let categories = this.state.categories.map((category)=>{
        return (
            <option key={category.id} value={category.id}>{category.name}</option>      
  
        )
      });

      return categories;

  }

  render() {

    let transactions=this.renderTransactionItem();

    let categories = this.renderCategoryOptionItem();

    return (
        
      
      <div className="App container container-white">


        <Button className='my-3' color="primary" onClick={this.toggleNewTransactionModal.bind(this)}>Add Transaction</Button>

        <Modal responsive isOpen={this.state.newTransactionModal} toggle={this.toggleNewTransactionModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewTransactionModal.bind(this)}>Add Transaction</ModalHeader>
          <ModalBody>           
            <FormGroup>
              <Label for="description">Description</Label>
              <Input  id="description" 
                      placeholder="how did you spend or did you get money?" 
                      value={this.state.newTransactionData.description}
                      onChange={(e)=>{
                        let {newTransactionData}= this.state;
                        newTransactionData.description=e.target.value;
                        this.setState({newTransactionData})
                      }} />            
            </FormGroup>
            <FormGroup>
              <Label for="category">Category</Label>
              <div  >
              <select className="select-container" value={this.state.newTransactionData.categoryid} 
              onChange={(e)=>{
                let {newTransactionData}= this.state;
                newTransactionData.categoryid=e.target.value;
                this.setState({newTransactionData})
              }}>
                    {categories}
                </select>
              </div>
            
            </FormGroup>
            <FormGroup>
              <Label for="amount">Amount</Label>
              <Input  id="amount" 
              placeholder="How much you want to post on it?" 
              type="number"
              value={this.state.newTransactionData.budget}
              onChange={(e)=>{
                let {newTransactionData}= this.state;
                newTransactionData.amount=e.target.value;
                this.setState({newTransactionData})
              }}/>            
            </FormGroup>
            <FormGroup>
              <Label for="date">Date</Label>
             <div>
             <DatePicker className="datepiker-container"
               selected={this.state.newTransactionData.date}
               onChange={this.handleNewDateChange}/>

             </div>
              
              
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.postTransaction.bind(this)}>Add Transaction </Button>{' '}
            <Button color="secondary" onClick={this.toggleNewTransactionModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        
        <Modal responsive isOpen={this.state.editTransactionModal} toggle={this.toggleEditTransactionModal.bind(this)}>
                <ModalHeader toggle={this.toggleEditTransactionModal.bind(this)}>Edit Transaction</ModalHeader>
                <ModalBody>
                  
                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Input  id="description" 
                           
                            value={this.state.editTransactionData.description}
                            onChange={(e)=>{
                              let {editTransactionData}= this.state;
                              editTransactionData.description=e.target.value;
                              this.setState({editTransactionData})
                            }} />            
                  </FormGroup>
                  <FormGroup>
                  <Label for="category">Category</Label>
                    <div>
                    <select className="select-container" value={this.state.editTransactionData.categoryid} 
                    onChange={(e)=>{
                        let {editTransactionData}= this.state;
                        editTransactionData.categoryid=e.target.value;
                        this.setState({editTransactionData})
                    }}>
                            {categories}
                        </select>
                    </div>         
                  </FormGroup>
                  <FormGroup>
                    <Label for="amount">Amount</Label>
                    <Input  id="amount" 
                   type="number"
                    value={this.state.editTransactionData.amount}
                    onChange={(e)=>{
                      let {editTransactionData}= this.state;
                      editTransactionData.amount=e.target.value;
                      this.setState({editTransactionData})
                    }}/> 
                          
                  </FormGroup>
                  <FormGroup>
                  <Label for="date">Date</Label>
                    <div>
                    <DatePicker className="datepiker-container"
                    selected={this.state.editTransactionData.date}
                    onChange={this.handleEditDateChange}/>

                    </div>
                          
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.putTransaction.bind(this)}>Update Transaction </Button>{' '}
                  <Button color="secondary" onClick={this.toggleEditTransactionModal.bind(this)}>Cancel</Button>
                </ModalFooter>
              </Modal>

        <Modal responsive isOpen={this.state.deleteTransactionModal} toggle={this.toggleDeleteTransactionModal.bind(this)}>
                <ModalHeader toggle={this.toggleDeleteTransactionModal.bind(this)}>Delete Transaction</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label for="description">Do you realy want to delete {this.state.deleteTransactionData.description} Transaction</Label>
                   
                  </FormGroup>
                  
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.deteleTransactionOnBd.bind(this)}>Delete Transaction </Button>{' '}
                  <Button color="secondary" onClick={this.toggleDeleteTransactionModal.bind(this)}>Cancel</Button>
                </ModalFooter>
              </Modal>


      <Table responsive>
        <thead>
          <tr>
           
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>

          </tr>
        </thead>

        <tbody>
         {transactions}

        </tbody>
      </Table>
       
      </div>
    );
  }
}

export default Transaction;
