import logo200Image from '../../assets/img/logo/logo_200.png';
import sidebarBgImage from '../../assets/img/sidebar/sidebar-4.jpg';
import SourceLink from '../../components/SourceLink';
import React from 'react';

import { NavLink } from 'react-router-dom';
import {
  Nav,
  Navbar,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from '../../utils/bemnames';
import Finance from './sidebars/Finance'
import HR from './sidebars/HR'
import Sales from './sidebars/Sales'
import IT from './sidebars/IT'
import Inventory from './sidebars/Inventory'
import Logistics from './sidebars/Logistics'
import Procurment from './sidebars/Procurment';
import Manufacturing from './sidebars/Manufacturing';
import dept from '../../config/departments'

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenHR: false,
    isOpenIT: false,
    isOpenSALES: false,
    isOpenFINANCE: false,
    isOpenINVENTORY: false,
    isOpenLOGISTICS: false,
    isOpenPROCURMENT: false,
    isOpenMANUFACTURING: false
  };

  getContents = (user_dept) => {
    switch (user_dept) {
      case dept.finance: return <Finance />
      case dept.hr: return <HR />
      case dept.logistics: return <Logistics />
    }
  }

  render() {
    const user_dept = localStorage.getItem('department')
    return (
      <aside className={bem.b('Something')} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">
                Sparta
              </span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {this.getContents(user_dept)}
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
