import React, { Component } from 'react';
import {Table, ButtonGroup} from 'reactstrap'
import { Button,Modal, ModalHeader, ModalBody, ModalFooter,Input,FormGroup,Label } from 'reactstrap';
import Axios from 'axios';

class Transaction extends Component {

    constructor(props){
        super(props);
        this.onRadioBtnClick = this.onNewRadioBtnClick.bind(this);
    }

  state={
    transactions:[],
    newTransactionData:{     
      description:'',
      categoryid:0,
      amount:0,
      date:'2019-01-01'
    },
    editTransactionData:{
      id:0,
      description:'',
      categoryid:0,
      amount:0,
      date:'2019-01-01'
    },
    deleteTransactionData:{
      id:0,
      description:'',    
    },
    newTransactionModal:false,
    editTransactionModal:false,
    deleteTransactionModal:false
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

  componentDidMount(){
    this.refreshData();
  }

  refreshData(){
    Axios.get('http://localhost:3000/transaction').then((response)=>{
      this.setState({
        transactions:response.data
       
      })    

    });

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

  postTransaction(){
    Axios.post('http://localhost:3000/transaction',this.state.newTransactionData).then((response)=>{
      this.refreshData();
      this.setState({
       
        newTrasactionModal:false,

        newTransactionData:{
            description:'',
            categoryid:0,
            amount:0,
            date:null
        }
        });
    });

  }
  putTransaction(){
    let {description,categoryid,amount,date} = this.state.editTransactionData;

    Axios.put('http://localhost:3000/transaction/' + this.state.editTransactionData.id,{
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

  deleteTransaction(id,name){
    this.setState({
      deleteTransactionData:{id,name},
      delteTransactionModal:!this.state.delteTransactionModal
    });
  }

  editTransaction(id,description,categoryid,amount,date){
    this.setState({
      editCategoryData:{id,description,categoryid,amount,date},
      editCategoryModal:!this.state.editTransactionModal
    });

  }

  render() {

    let transactions = this.state.transactions.map((transaction)=>{
      return (
      <tr key={transaction.id}>
        <td>{transaction.id}</td>
        <td>{transaction.description}</td>
        <td>{transaction.categoryid}</td>       
        
        <td>{transaction.amount}</td>
        <td>{transaction.date}</td>
        <td>
          <Button color="success" 
                  size="sm" 
                  className="mr-2" 
                  onClick={this.editTransaction.bind(this,transaction.id,transaction.description,transaction.categoryid,transaction.amount,transaction.data)}>
                  Edit
          </Button>
          <Button color="danger" size="sm" onClick={this.deleteTransaction.bind(this,transaction.id,transaction.description)} >Delete</Button>
        </td>
      </tr>

      )
    });

    return (
      
      <div className="App container">


        <Button className='my-3' color="primary" onClick={this.toggleNewTransactionModal.bind(this)}>Add Transaction</Button>

        <Modal isOpen={this.state.newTransactionModal} toggle={this.toggleNewTransactionModal.bind(this)}>
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
              <Input  id="category" 
                      placeholder="category?" 
                      value={this.state.newTransactionData.categoryid}
                      onChange={(e)=>{
                        let {newTransactionData}= this.state;
                        newTransactionData.categoryid=e.target.value;
                        this.setState({newTransactionData})
                      }} />            
            </FormGroup>
            <FormGroup>
              <Label for="amount">Amount</Label>
              <Input  id="amount" 
              placeholder="How much you want to post on it?" 
              value={this.state.newTransactionData.budget}
              onChange={(e)=>{
                let {newTransactionData}= this.state;
                newTransactionData.amount=e.target.value;
                this.setState({newTransactionData})
              }}/>            
            </FormGroup>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input  id="date" 
              
              value={this.state.newTransactionData.date}
              onChange={(e)=>{
                let {newTransactionData}= this.state;
                newTransactionData.date=e.target.value;
                this.setState({newTransactionData})
              }}/>            
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.postTransaction.bind(this)}>Add Transaction </Button>{' '}
            <Button color="secondary" onClick={this.toggleNewTransactionModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        
        <Modal isOpen={this.state.editTransactionModal} toggle={this.toggleEditTransactionModal.bind(this)}>
                <ModalHeader toggle={this.toggleEditTransactionModal.bind(this)}>Edit Category</ModalHeader>
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
                    <Input  id="category" 
                           
                            value={this.state.editTransactionData.categoryid}
                            onChange={(e)=>{
                              let {editTransactionData}= this.state;
                              editTransactionData.categoryid=e.target.value;
                              this.setState({editTransactionData})
                            }} />            
                  </FormGroup>
                  <FormGroup>
                    <Label for="amount">Amount</Label>
                    <Input  id="amount" 
                   
                    value={this.state.editTransactionData.amount}
                    onChange={(e)=>{
                      let {editTransactionData}= this.state;
                      editTransactionData.amount=e.target.value;
                      this.setState({editTransactionData})
                    }}/> 
                          
                  </FormGroup>
                  <FormGroup>
                    <Label for="date">Date</Label>
                    <Input  id="date" 
                   
                    value={this.state.editTransactionData.date}
                    onChange={(e)=>{
                      let {editTransactionData}= this.state;
                      editTransactionData.date=e.target.value;
                      this.setState({editTransactionData})
                    }}/> 
                          
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.putTransaction.bind(this)}>Update Transaction </Button>{' '}
                  <Button color="secondary" onClick={this.toggleEditTransactionModal.bind(this)}>Cancel</Button>
                </ModalFooter>
              </Modal>

        <Modal isOpen={this.state.deleteTransactionModal} toggle={this.toggleDeleteTransactionModal.bind(this)}>
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




      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>category</th>
            <th>amount</th>
            <th>data</th>
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
