import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
  
   } from 'reactstrap';



class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      notifications:[]
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Expense Tracker</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
             
              <NavItem>
              <NavLink href='/category'>Category</NavLink>
              </NavItem>
              <NavItem>
              <NavLink href='/transaction'>Transaction</NavLink>
              </NavItem>
              <NavItem>
              <NavLink href='/notification'>Notification</NavLink>
              </NavItem>
              <NavItem>
              <NavLink href='/balance'>Monthly Balance</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

      
      </div>
    );
  }


}
export default Header;