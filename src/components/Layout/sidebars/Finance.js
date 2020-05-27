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
    MdViewList,
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
const bem = bn.create('sidebar');
class Finance extends React.Component {
    state = {
        isOpenIT: true,
        isOpenSALES: true,
        isOpenFINANCE: this.props.isOpen ? true : false,
        isOpenINVENTORY: true,
        isOpenLOGISTICS: true,
        isOpenPROCURMENT: true,
        isOpenMANUFACTURING: true
    }

    handleClick = name => () => {
        this.setState(prevState => {
            const isOpen = prevState[`isOpen${name}`];

            return {
                [`isOpen${name}`]: !isOpen,
            };
        });
    };

    render() {
        const FINANCE = [
            // { to: routes.FinanceDashboard, name: 'Dashboard', exact: false, Icon: MdDashboard },
            { to: routes.viewSuppliers, name: 'View All Suppliers', exact: false, Icon: MdNotificationsActive },
            { to: routes.AddSupplier, name: 'Add Supplier ', exact: false, Icon: MdPages },
            { to: routes.viewCustomers, name: 'View Customers', exact: false, Icon: MdWidgets },
            { to: routes.AddCustomer, name: 'Add Customer', exact: false, Icon: MdWeb },
            { to: routes.AddMasterDataPage, name: 'Add Master Data', exact: false, Icon: MdViewDay },
            { to: routes.ViewAllMasterData, name: 'All Master Data', exact: false, Icon: MdStar },
            { to: routes.ViewOrdersFinance, name: 'All Orders', exact: false, Icon: MdInsertChart },
            { to: routes.ViewDelieveredOrders, name: 'Delivered Orders', exact: false, Icon: MdTextFields },
            { to: routes.ViewFinancePurchaseOrders, name: 'Purchased Orders', exact: false, Icon: MdViewCarousel }
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
            </React.Fragment>
        )
    }
}

export default Finance