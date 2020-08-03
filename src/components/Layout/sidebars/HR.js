import React from 'react';
import {
  MdDashboard,
  MdExtension,
  MdInsertChart,
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
class HR extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  state = {
    // isOpenComponents: true,
    // isOpenContents: true,
    // isOpenPages: true,
    isOpenHR: false,
    isOpenIT: true,
    isOpenSALES: true,
    isOpenFINANCE: true,
    isOpenINVENTORY: true,
    isOpenLOGISTICS: true,
    isOpenPROCURMENT: true,
    isOpenMANUFACTURING: true
  };

  handleClick = name => () => {

    
   this.props.sideBarOpenController("HR")

    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    const HR = [
      { to: routes.HRDashboard, name: 'Dashboard', exact: false, Icon: MdWidgets },
      { to: routes.allEmployees, name: 'All Employees', exact: false, Icon: MdInsertChart },
      { to: routes.addEmployee, name: 'Add Employee', exact: false, Icon: MdDashboard },
    ]
    return (
      <React.Fragment>
        <NavItem
          className={bem.e('nav-item2')}
          onClick={this.handleClick('HR')}
        // onClick={() => alert()}

        >
          <BSNavLink className={bem.e('nav-item-collapse')} >
            <div className="d-flex">
              <MdExtension className={bem.e('nav-item-icon')} />
              <span className=" align-self-start">HR</span>
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

            {HR.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item2')}>
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
            ))}</div>
        </Collapse>
      </React.Fragment>
    )
  }
}







const mapStateToProps = (state) => {
  return {
    sidebar: state.sidebarControllerReducer.isOpenHR,
  }
}

export default connect(mapStateToProps, { sideBarOpenController })(HR)