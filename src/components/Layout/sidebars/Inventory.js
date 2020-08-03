import React from 'react';
import {
    // MdAccountCircle,
    // MdArrowDropDownCircle,
    // MdBorderAll,
    // MdBrush,
    // MdChromeReaderMode,
    // MdDashboard,
    MdExtension,
    // MdGroupWork,
    // MdInsertChart,
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
    NavItem,
    NavLink as BSNavLink,
} from 'reactstrap';
import bn from '../../../utils/bemnames';
import routes from '../../../config/routes'
import './Styles.scss'


import { connect } from 'react-redux'

import sideBarOpenController from '../../../store/sidebar/action'
const bem = bn.create('sidebar');
class Inventory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    state = {
        // isOpenComponents: true,
        // isOpenContents: true,
        // isOpenPages: true,
        isOpenHR: true,
        isOpenIT: true,
        isOpenSALES: true,
        isOpenFINANCE: true,
        isOpenINVENTORY: true,
        isOpenLOGISTICS: true,
        isOpenPROCURMENT: true,
        isOpenMANUFACTURING: true
    };

    handleClick = name => () => {
    this.props.sideBarOpenController("INVENTORY")

        this.setState(prevState => {
            const isOpen = prevState[`isOpen${name}`];

            return {
                [`isOpen${name}`]: !isOpen,
            };
        });
    };

    render() {
        const INVENTORY = [
            { to: routes.InventoryDashboard, name: 'Dashboard', exact: false, Icon: MdWidgets },
            // { to: routes.ViewAllItems, name: 'View Items', exact: false, Icon: MdWidgets },
            { to: routes.ViewOrdersInventory, name: 'Sales Orders', exact: false, Icon: MdWidgets },
            { to: routes.CategoriesInventoryPage, name: 'Categories', exact: false, Icon: MdWidgets },
            // { to: routes.ViewSingleItemPage, name: 'Single Item', exact: false, Icon: MdWidgets },
            { to: routes.ViewPurchasedItems, name: 'Purchased Orders', exact: false, Icon: MdWidgets },
            { to: routes.ViewInventoryManufacturedOrders, name: 'Manufactured Orders', exact: false, Icon: MdWidgets },
            { to: routes.RecordTracking, name: 'Inventory Item Tracking', exact: false, Icon: MdWidgets },
            // { to: routes.DeliveredOrders, name: 'Delivered Orders Tracking', exact: false, Icon: MdWidgets },

        ]
        return (
            <React.Fragment>
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

                        {INVENTORY.map(({ to, name, exact, Icon }, index) => (
                            <NavItem key={index} className={bem.e('nav-item6')}>
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
      sidebar: state.sidebarControllerReducer.isOpenINVENTORY,
    }
  }
  
  export default connect(mapStateToProps, { sideBarOpenController })(Inventory)