import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from '../../components/SourceLink';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          2020 <b>iWork</b> PLC  <SourceLink href='https://www.iworkplc.com/'>Website</SourceLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
