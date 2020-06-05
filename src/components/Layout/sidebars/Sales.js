import React from 'react';
import {
  MdExtension,
  MdKeyboardArrowDown,

  MdWidgets,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from '../../../utils/bemnames';
import routes from '../../../config/routes'
import './Styles.scss'

import { connect } from 'react-redux'

import sideBarOpenController from '../../../store/sidebar/action'

const bem = bn.create('sidebar');
class Sales extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  state = {
    isOpenHR: this.props.isOpen ? true : false,
    isOpenIT: this.props.isOpen ? true : false,
    isOpenSALES: this.props.isOpen ? true : false,
    isOpenFINANCE: this.props.isOpen ? true : false,
    isOpenINVENTORY: this.props.isOpen ? true : false,
    isOpenLOGISTICS: this.props.isOpen ? true : false,
    isOpenPROCURMENT: this.props.isOpen ? true : false,
    isOpenMANUFACTURING: this.props.isOpen ? true : false,
  };

  handleClick = name => () => {

    this.props.sideBarOpenController("SALES")

    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    const SALES = [
      { to: routes.SalesDashboard, name: 'Dashboard', exact: false, Icon: MdWidgets },
      { to: routes.createOrderPage, name: 'Create Order', exact: false, Icon: MdWidgets },
      { to: routes.ViewAllOrdersPage, name: 'View All Orders', exact: false, Icon: MdWidgets },
    ]
    return (
      <React.Fragment>
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
                transform: this.props.sidebar
                  ? 'rotate(0deg)'
                  : 'rotate(-90deg)',
                transitionDuration: '0.3s',
                transitionProperty: 'transform',
              }}
            />
          </BSNavLink>
        </NavItem>

        <Collapse isOpen={this.props.sidebar}>
          <div className='contents'>


            {SALES.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item4')}>
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
          </div>

        </Collapse>
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    sidebar: state.sidebarControllerReducer.isOpenSALES,
  }
}

export default connect(mapStateToProps, { sideBarOpenController })(Sales)