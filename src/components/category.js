import React, { Component } from 'react';
import {Table, ButtonGroup} from 'reactstrap'
import { Button,Modal, ModalHeader, ModalBody, ModalFooter,Input,FormGroup,Label } from 'reactstrap';
import Axios from 'axios';
import config from 'react-global-configuration';
import NumberFormat from 'react-number-format';
import CategoryItem from './category-item';
class Category extends Component {

   

  state={
    url:config.get('apiDomain'),
    categories:[],
    newCategoryData:{
      name:'',
      description:'',
      type:false,
      budget:0
    },
    editCategoryData:{
      id:0,
      name:'',
      description:'',
      type:false,
      budget:0
    },
    deleteCategoryData:{
      id:0,
      name:'',    
    },
    newCategoryModal:false,
    editCategoryModal:false,
    deleteCategoryModal:false
  }

  constructor(props){
    super(props);
    this.onRadioBtnClick = this.onNewRadioBtnClick.bind(this);
}

  onNewRadioBtnClick(rSelected) {
    this.setState(prevState => ({
        newCategoryData: {
            ...prevState.newCategoryData,
            type: rSelected
        }
    }));
  }
  
  onEditRadioBtnClick(rSelected) {
    this.setState(prevState => ({
        editCategoryData: {
            ...prevState.editCategoryData,
            type: rSelected
        }
    }));
  }

  componentDidMount(){
    this.refreshData();
  }

  refreshData(){
   
    Axios.get(this.state.url +'/category').then((response)=>{
      this.setState({
        categories:response.data       
      })    

    });
  }

  toggleNewCategoryModal(){
    this.setState({
      newCategoryModal:!this.state.newCategoryModal
    });

  }

  toggleEditCategoryModal(){
    
    this.setState({
      editCategoryModal:!this.state.editCategoryModal
    });
  }

  toggleDeleteCategoryModal(){
    this.setState({
      deleteCategoryModal:!this.state.deleteCategoryModal
    });
  }

  postCategory(){
    Axios.post(this.state.url +'/category',this.state.newCategoryData).then((response)=>{
      this.refreshData();
      this.setState({
       
        newCategoryModal:false,

        newCategoryData:{
          name:'',
          description:'',
          type:false,
          budget:0
        }
        });
    });

  }
  putCategory(){
    let {name,description,type,budget} = this.state.editCategoryData;

    Axios.put(this.state.url +'/category/' + this.state.editCategoryData.id,{
      name,
      description,
      type,
      budget
    }).then((response)=>{
      this.refreshData();
      this.setState({
        editCategoryModal:false,

        editCategoryData:{
          id:0,
          name:'',
          description:'',
          type:false,
          budget:0
        }
      })
    });

  }

  deteleCategoryOnBd(){

    Axios.delete(this.state.url +'/category/' + this.state.deleteCategoryData.id).then((response)=>{

      this.refreshData();

      this.setState({
        deleteCategoryData:{
          id:0,
          name:'',    
        },
        deleteCategoryModal:false
      })

    });

  }

  deleteCategory(id,name){
    this.setState({
      deleteCategoryData:{id,name},
      deleteCategoryModal:!this.state.delteCategoryModal
    });
  }

 
  editCategory(id,name,description,type,budget){
   
    this.setState({
      editCategoryData:{id,name,description,type,budget},
      editCategoryModal:!this.state.editCategoryModal
    });
  }

  renderCategoryItem(){
    let categories=
    this.state.categories.map(category=>(
      
      <CategoryItem
      key={category.id}
      category={category}
      editCategoryModal={this.state.editCategoryModal}
      onDelete={this.deleteCategory.bind(this)}
      onEdit={this.editCategory.bind(this)}

      
      />
    ))

    return categories;
  }

 
  render() {

    let categories = this.renderCategoryItem();

    return (
      
      <div className="App container container-white">

     

        <Button className='my-3' color="primary" onClick={this.toggleNewCategoryModal.bind(this)}>Add Category</Button>

        <Modal isOpen={this.state.newCategoryModal} toggle={this.toggleNewCategoryModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewCategoryModal.bind(this)}>Add Category</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input  id="name" 
                      placeholder="Category name" 
                      value={this.state.newCategoryData.name}
                      onChange={(e)=>{
                        let {newCategoryData}= this.state;
                        newCategoryData.name=e.target.value;
                        this.setState({newCategoryData})
                      }}/>            
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input  id="description" 
                      placeholder="Brief description" 
                      value={this.state.newCategoryData.description}
                      onChange={(e)=>{
                        let {newCategoryData}= this.state;
                        newCategoryData.description=e.target.value;
                        this.setState({newCategoryData})
                      }} />            
            </FormGroup>
            <FormGroup>
              <Label for="type">Type</Label>
             <div>
             <ButtonGroup>
          <Button color="primary" onClick={() => this.onNewRadioBtnClick(true)} active={this.state.rSelected === true}>Income</Button>
          <Button color="primary" onClick={() => this.onNewRadioBtnClick(false)} active={this.state.rSelected === false}>Expense</Button>
        </ButtonGroup> 

             </div>

                          
            </FormGroup>
            <FormGroup>
              <Label for="budget">Budget</Label>
              <Input  id="budget" 
              placeholder="How much you want to expense on it?" 
              type="number"
              value={this.state.newCategoryData.budget}
              onChange={(e)=>{
                let {newCategoryData}= this.state;
                newCategoryData.budget=e.target.value;
                this.setState({newCategoryData})
              }}/>            
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.postCategory.bind(this)}>Add Category </Button>{' '}
            <Button color="secondary" onClick={this.toggleNewCategoryModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        
        <Modal isOpen={this.state.editCategoryModal} toggle={this.toggleEditCategoryModal.bind(this)}>
                <ModalHeader toggle={this.toggleEditCategoryModal.bind(this)}>Edit Category</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input  id="name" 
                            
                            value={this.state.editCategoryData.name}
                            onChange={(e)=>{
                              let {editCategoryData}= this.state;
                              editCategoryData.name=e.target.value;
                              this.setState({editCategoryData})
                            }}/>            
                  </FormGroup>
                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Input  id="description" 
                           
                            value={this.state.editCategoryData.description}
                            onChange={(e)=>{
                              let {editCategoryData}= this.state;
                              editCategoryData.description=e.target.value;
                              this.setState({editCategoryData})
                            }} />            
                  </FormGroup>
                  <FormGroup>
                    <Label for="type">Type</Label>
                    <div>
                        <ButtonGroup>
                            <Button color="primary" onClick={() => this.onEditRadioBtnClick(true)} active={this.state.editCategoryData.type === true}>Income</Button>
                            <Button color="primary" onClick={() => this.onEditRadioBtnClick(false)} active={this.state.editCategoryData.type === false}>Expense</Button>
                        </ButtonGroup> 

                    </div>              
                  </FormGroup>
                  <FormGroup>
                    <Label for="budget">Budget</Label>
                    <Input  id="budget" 
                   type="number"
                    value={this.state.editCategoryData.budget}
                    onChange={(e)=>{
                      let {editCategoryData}= this.state;
                      editCategoryData.budget=e.target.value;
                      this.setState({editCategoryData})
                    }}/> 
                          
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.putCategory.bind(this)}>Update Category </Button>{' '}
                  <Button color="secondary" onClick={this.toggleEditCategoryModal.bind(this)}>Cancel</Button>
                </ModalFooter>
              </Modal>

        <Modal isOpen={this.state.deleteCategoryModal} toggle={this.toggleDeleteCategoryModal.bind(this)}>
                <ModalHeader toggle={this.toggleDeleteCategoryModal.bind(this)}>Delete Category</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label for="name">Do you realy want to delete {this.state.deleteCategoryData.name} category</Label>
                   
                  </FormGroup>
                  
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.deteleCategoryOnBd.bind(this)}>Delete Category </Button>{' '}
                  <Button color="secondary" onClick={this.toggleDeleteCategoryModal.bind(this)}>Cancel</Button>
                </ModalFooter>
              </Modal>




      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Budget</th>
            <th>Action</th>

          </tr>
        </thead>

        <tbody>
         {categories}

        </tbody>
      </Table>
       
      </div>
    );
  }
}

export default Category;
