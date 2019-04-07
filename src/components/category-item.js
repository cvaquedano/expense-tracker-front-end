import React, { Component } from 'react';
import { Button} from 'reactstrap'
import NumberFormat from 'react-number-format';
class CategoryItem extends Component {

    
   customEdit(id,name,description,type,budget){
       this.props.onEdit(id,name,description,type,budget)

   }

   customDelete(id,name){
    this.props.onDelete(id,name)

}

    render(){
        const {category}= this.props;
        return (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              {category.type && <td>Income</td>}
              {!category.type && <td>Expense</td>}
              
              <td><NumberFormat value={category.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>   
              <td>
                <Button color="success" 
                        size="sm" 
                        className="mr-2" 
                        onClick={this.customEdit.bind(this,category.id,category.name,category.description,category.type,category.budget)}>
                        Edit
                </Button>
                <Button color="danger" size="sm" onClick={this.customDelete.bind(this,category.id,category.name)} >Delete</Button>
              </td>
            </tr>
      
            )
        }

}


export default CategoryItem;
