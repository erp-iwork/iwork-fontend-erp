import logo200Image from '../../assets/img/logo/Sparta2.svg';
import sidebarBgImage from '../../assets/img/sidebar/sidebar-4.jpg';
import SourceLink from '../../components/SourceLink';
import React from 'react';
import {
  MdDashboard,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  NavItem,
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
      case dept.finance:
        return <Finance isOpen={false} />
      case dept.hr: return <HR isOpen={false} />
      case dept.sales: return <Sales isOpen={false} />
      case dept.it: return <IT isOpen={false} />
      case dept.inventory: return <Inventory isOpen={false} />
      case dept.procurment: return <Procurment isOpen={false} />
      case dept.mrp: return <Manufacturing isOpen={false} />
      case dept.logistics: return <Logistics isOpen={false} />

      default: return (
        <React.Fragment>
          <HR isOpen={true} />
          <Finance isOpen={true} />
          <Sales isOpen={false} />
          <IT isOpen={false} />
          <Logistics isOpen={false} />
          <Inventory isOpen={false} />
          <Procurment isOpen={false} />
          <Manufacturing isOpen={false} />
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
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
            {this.getContents(user_dept)}
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
