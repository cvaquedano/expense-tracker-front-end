import React from 'react'
import { Jumbotron, Button,ButtonToolbar } from 'reactstrap';

const Home = (props) => {
  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">Expense Tracking app!</h1>
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
};

export default Home