import React from 'react';
import {
    MdExtension,
    MdKeyboardArrowDown,
    MdRadioButtonChecked,
    MdTextFields,
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
class Logistics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    state = {
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

        this.props.sideBarOpenController("LOGISTICS")

        this.setState(prevState => {
            const isOpen = prevState[`isOpen${name}`];

            return {
                [`isOpen${name}`]: !isOpen,
            };
        });
    };

    render() {
        const LOGISTICS = [
            { to: routes.LogisticsDashboard, name: 'Dashboard', exact: false, Icon: MdWidgets },
            { to: routes.ViewOrdersLogistics, name: 'Sales Orders', exact: false, Icon: MdRadioButtonChecked },
            { to: routes.ViewPurchaseOrdersLogistics, name: 'Purchased Orders', exact: false, Icon: MdTextFields },
        ]
        return (
            <React.Fragment>
                <NavItem
                    className={bem.e('nav-item9')}
                    onClick={this.handleClick('LOGISTICS')}
                >
                    <BSNavLink className={bem.e('nav-item-collapse')}>
                        <div className="d-flex">
                            <MdExtension className={bem.e('nav-item-icon')} />
                            <span className=" align-self-start">Logistics</span>
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
                        {LOGISTICS.map(({ to, name, exact, Icon }, index) => (
                            <NavItem key={index} className={bem.e('nav-item7')}>
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
        sidebar: state.sidebarControllerReducer.isOpenLOGISTICS,
    }
}

export default connect(mapStateToProps, { sideBarOpenController })(Logistics)