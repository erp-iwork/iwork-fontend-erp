import React from 'react';
import {
    MdDashboard,
    MdExtension,
    MdInsertChart,
    MdKeyboardArrowDown,
    MdNotificationsActive,
    MdPages,
    MdStar,
    MdTextFields,
    MdViewCarousel,
    MdViewDay,
    MdWeb,
    MdWidgets,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
    // UncontrolledTooltip,
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
class Finance extends React.Component {
    state = {
        isOpenFINANCE: this.props.isOpen ? false : true ,
    }

    handleClick = name => () => {
   this.props.sideBarOpenController("FINANCE")

        this.setState(prevState => {
            const isOpen = prevState[`isOpen${name}`];

            return {
                [`isOpen${name}`]: !isOpen,
            };
        });
    };

    render() {
        const FINANCE = [
            { to: routes.FinanceDashboard, name: 'Dashboard', exact: false, Icon: MdDashboard },
            { to: routes.viewSuppliers, name: 'View All Suppliers', exact: false, Icon: MdNotificationsActive },
            { to: routes.AddSupplier, name: 'Add Supplier ', exact: false, Icon: MdPages },
            { to: routes.viewCustomers, name: 'View Customers', exact: false, Icon: MdWidgets },
            { to: routes.AddCustomer, name: 'Add Customer', exact: false, Icon: MdWeb },
            { to: routes.AddMasterDataPage, name: 'Add Product Data', exact: false, Icon: MdViewDay },
            { to: routes.ViewAllMasterData, name: 'All Product Data', exact: false, Icon: MdStar },
            { to: routes.ViewOrdersFinance, name: 'Sales Orders', exact: false, Icon: MdInsertChart },
            { to: routes.ViewDelieveredOrders, name: 'Delivered Orders', exact: false, Icon: MdTextFields },
            { to: routes.ViewFinancePurchaseOrders, name: 'Purchased Orders', exact: false, Icon: MdViewCarousel },
            { to: routes.ViewFinaceManufacturedOrders, name: 'Manufactured Orders', exact: false, Icon: MdViewCarousel }
        ]
        return (
            <React.Fragment>
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


                    {FINANCE.map(({ to, name, exact, Icon }, index) => (
                        <NavItem key={index} className={bem.e('nav-item5')}>
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
      sidebar: state.sidebarControllerReducer.isOpenFINANCE,
    }
  }
  
  export default connect(mapStateToProps, { sideBarOpenController })(Finance)