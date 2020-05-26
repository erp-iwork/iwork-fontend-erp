import logo200Image from '../../assets/img/logo/logo_200.png';
import sidebarBgImage from '../../assets/img/sidebar/sidebar-4.jpg';
import SourceLink from '../../components/SourceLink';
import React from 'react';
import {
  MdDashboard,
} from 'react-icons/md';

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

const navItems = [
  { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
  { to: '/cards', name: 'cards', exact: false, Icon: MdDashboard },
  { to: '/charts', name: 'charts', exact: false, Icon: MdDashboard },
  { to: '/widgets', name: 'widgets', exact: false, Icon: MdDashboard },
];

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
      case dept.finance: return <Finance isOpen={true} />
      case dept.hr: return <HR isOpen={true} />
      case dept.sales: return <Sales isOpen={true} />
      case dept.it: return <IT isOpen={true} />
      case dept.inventory: return <Inventory isOpen={true} />
      case dept.procurment: return <Procurment isOpen={true} />
      case dept.mrp: return <Manufacturing isOpen={true} />
      case dept.logistics: return <Logistics isOpen={true} />


      default: return (
        <React.Fragment>
          <HR />
          <Finance isOpen={false} />
          <Sales isOpen={false} />
          <IT isOpen={false} />
          <Inventory isOpen={false} />
          <Procurment isOpen={false} />
          <Manufacturing isOpen={false} />
          <Logistics isOpen={false}/>
        </React.Fragment>

      )
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
