import logo200Image from '../../assets/img/logo/logo_200.png';
import sidebarBgImage from '../../assets/img/sidebar/sidebar-4.jpg';
import SourceLink from '../../components/SourceLink';
import React from 'react';
import {
  // MdAccountCircle,
  // MdArrowDropDownCircle,
  // MdBorderAll,
  // MdBrush,
  // MdChromeReaderMode,
  MdDashboard,
  MdExtension,
  // MdGroupWork,
  MdInsertChart,
  MdKeyboardArrowDown,
  // MdNotificationsActive,
  // MdPages,
  // MdRadioButtonChecked,
  // MdSend,
  // MdStar,
  // MdTextFields,
  // MdViewCarousel,
  // MdViewDay,
  // MdViewList,
  // MdWeb,
  MdWidgets,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from '../../utils/bemnames';
import routes from '../../config/routes'


const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

// const navComponents = [
//   { to: '/buttons', name: 'buttons', exact: false, Icon: MdRadioButtonChecked },
//   {
//     to: '/button-groups',
//     name: 'button groups',
//     exact: false,
//     Icon: MdGroupWork,
//   },
//   { to: '/forms', name: 'forms', exact: false, Icon: MdChromeReaderMode },
//   { to: '/input-groups', name: 'input groups', exact: false, Icon: MdViewList },
//   {
//     to: '/dropdowns',
//     name: 'dropdowns',
//     exact: false,
//     Icon: MdArrowDropDownCircle,
//   },
//   { to: '/badges', name: 'badges', exact: false, Icon: MdStar },
//   { to: '/alerts', name: 'alerts', exact: false, Icon: MdNotificationsActive },
//   { to: '/progress', name: 'progress', exact: false, Icon: MdBrush },
//   { to: '/modals', name: 'modals', exact: false, Icon: MdViewDay },
// ];

// const navContents = [
//   { to: '/typography', name: 'typography', exact: false, Icon: MdTextFields },
//   { to: '/tables', name: 'tables', exact: false, Icon: MdBorderAll },
// ];

// const pageContents = [
//   { to: '/login', name: 'login / signup', exact: false, Icon: MdAccountCircle },
//   {
//     to: '/login-modal',
//     name: 'login modal',
//     exact: false,
//     Icon: MdViewCarousel,
//   },
// ];

const HR = [
  { to: routes.allEmployees, name: 'All Employees', exact: false, Icon: MdWidgets },
  { to: routes.addEmployee, name: 'Add Employee', exact: false, Icon: MdWidgets },
]

const IT = [
  { to: routes.itEmployeePage, name: 'All Employees', exact: false, Icon: MdWidgets },
]

const SALES = [
  { to: routes.createOrderPage, name: 'Create Order', exact: false, Icon: MdWidgets },
  { to: routes.ViewAllOrdersPage, name: 'View All Orders', exact: false, Icon: MdWidgets },
]

const FINANCE = [
  { to: routes.viewSuppliers, name: 'View All Suppliers', exact: false, Icon: MdWidgets },
  { to: routes.AddSupplier, name: 'Add Supplier ', exact: false, Icon: MdWidgets },
  { to: routes.viewCustomers, name: 'View Customers', exact: false, Icon: MdWidgets },
  { to: routes.AddCustomer, name: 'Add Customer', exact: false, Icon: MdWidgets },
  { to: routes.AddMasterDataPage, name: 'Add Master Data', exact: false, Icon: MdWidgets },
  { to: routes.ViewAllMasterData, name: 'All Master Data', exact: false, Icon: MdWidgets },
  { to: routes.ViewOrdersFinance, name: 'All Orders', exact: false, Icon: MdWidgets },
  { to: routes.SupplierInvoice, name: 'Supplier Invoice', exact: false, Icon: MdWidgets },
]

const INVENTORY = [
  // { to: routes.ViewAllItems, name: 'View Items', exact: false, Icon: MdWidgets },
  // { to: routes.ViewOrdersInventory, name: 'View All Orders', exact: false, Icon: MdWidgets },
  { to: routes.CategoriesInventoryPage, name: 'Categories', exact: false, Icon: MdWidgets },
  // { to: routes.ViewSingleItemPage, name: 'Single Item', exact: false, Icon: MdWidgets },
  // { to: routes.ViewPurchasedItems, name: 'Purchased Items', exact: false, Icon: MdWidgets },
]


const LOGISTICS = [
  { to: routes.ViewOrdersLogistics, name: 'View Orders', exact: false, Icon: MdWidgets },
  { to: routes.ViewPurchaseOrdersLogistics, name: 'View Purchased Order', exact: false, Icon: MdWidgets },
]

const PROCURMENT = [
  { to: routes.CreatePurchaseOrder, name: 'Create Purchase Order', exact: false, Icon: MdWidgets },
  { to: routes.ViewAllPurchaseOrder, name: 'All Purchase Order', exact: false, Icon: MdWidgets },
]

const MANUFACTURING = [
  { to: routes.CreateOrderManufacturing, name: 'Create Order', exact: false, Icon: MdWidgets },
  { to: routes.ViewAllOrdersManufacturing, name: 'All Orders', exact: false, Icon: MdWidgets },
]

const navItems = [
  { to: '/', name: 'Dashboard', exact: true, Icon: MdDashboard },
  // { to: '/cards', name: 'Cards', exact: false, Icon: MdWeb },
  { to: '/charts', name: 'Charts', exact: false, Icon: MdInsertChart },
  { to: '/widgets', name: 'Widgets', exact: false, Icon: MdWidgets },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    // isOpenComponents: true,
    // isOpenContents: true,
    // isOpenPages: true,
    isOpenHR: false,
    isOpenIT: false,
    isOpenSALES: false,
    isOpenFINANCE: false,
    isOpenINVENTORY: false,
    isOpenLOGISTICS: false,
    isOpenPROCURMENT: false,
    isOpenMANUFACTURING: false
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
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
                ERP
              </span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item1')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
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


            {/* START HR */}

            <NavItem
              className={bem.e('nav-item2')}
              onClick={this.handleClick('HR')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">HR</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenHR
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>

            <Collapse isOpen={this.state.isOpenHR}>
              {HR.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item2')}>
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
            </Collapse>

            {/* END HR */}

            {/* START IT */}

            <NavItem
              className={bem.e('nav-item3')}
              onClick={this.handleClick('IT')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">IT</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenIT
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>

            <Collapse isOpen={this.state.isOpenIT}>
              {IT.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item3')}>
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
            </Collapse>

            {/* END IT */}

            {/* START SALES */}

            <NavItem
              className={bem.e('nav-item4')}
              onClick={this.handleClick('SALES')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Sales</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenSALES
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>

            <Collapse isOpen={this.state.isOpenSALES}>
              {SALES.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item4')}>
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
            </Collapse>

            {/* END SALES */}

            {/* START FINANCE */}

            <NavItem
              className={bem.e('nav-item5')}
              onClick={this.handleClick('FINANCE')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Finance</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenFINANCE
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>

            <Collapse isOpen={this.state.isOpenFINANCE}>
              {FINANCE.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item5')}>
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
            </Collapse>

            {/* END FINANCE */}

            {/* START INVENTORY */}

            <NavItem
              className={bem.e('nav-item6')}
              onClick={this.handleClick('INVENTORY')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Inventory</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenINVENTORY
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>

            <Collapse isOpen={this.state.isOpenINVENTORY}>
              {INVENTORY.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item6')}>
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
            </Collapse>

            {/* END INVENTORY */}

            {/* START LOGISTICS */}

            <NavItem
              className={bem.e('nav-item7')}
              onClick={this.handleClick('LOGISTICS')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Logistics</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon7')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenLOGISTICS
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>

            <Collapse isOpen={this.state.isOpenLOGISTICS}>
              {LOGISTICS.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item7')}>
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
            </Collapse>

            {/* END LOGISTICS */}


            {/* START PROCURMENT */}
            <NavItem
              className={bem.e('nav-item8')}
              onClick={this.handleClick('PROCURMENT')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Procurment</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenPROCURMENT
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>

            <Collapse isOpen={this.state.isOpenPROCURMENT}>
              {PROCURMENT.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item8')}>
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
            </Collapse>
            {/* END PROCURMENT */}


            {/* START MANUFACTURING */}
            <NavItem
              className={bem.e('nav-item9')}
              onClick={this.handleClick('MANUFACTURING')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Manufacturing</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenMANUFACTURING
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>

            <Collapse isOpen={this.state.isOpenMANUFACTURING}>
              {MANUFACTURING.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item9')}>
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
            </Collapse>
            {/* END MANUFACTURING */}

            {/* <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Components')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Components</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenComponents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>

            <Collapse isOpen={this.state.isOpenComponents}>
              {navComponents.map(({ to, name, exact, Icon }, index) => (
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
            </Collapse> */}

            {/* <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Contents')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdSend className={bem.e('nav-item-icon')} />
                  <span className="">Contents</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenContents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenContents}>
              {navContents.map(({ to, name, exact, Icon }, index) => (
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
            </Collapse> */}

            {/* <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Pages')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdPages className={bem.e('nav-item-icon')} />
                  <span className="">Pages</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenPages
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenPages}>
              {pageContents.map(({ to, name, exact, Icon }, index) => (
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
            </Collapse> */}
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
