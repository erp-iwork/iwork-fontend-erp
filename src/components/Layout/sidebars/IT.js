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
class IT extends React.Component {
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
        this.props.sideBarOpenController("IT")

        this.setState(prevState => {
            const isOpen = prevState[`isOpen${name}`];

            return {
                [`isOpen${name}`]: !isOpen,
            };
        });
    };

    render() {
        const IT = [
            { to: routes.ITDashboard, name: 'Dashboard', exact: false, Icon: MdWidgets },
            { to: routes.itEmployeePage, name: 'Manage Accounts', exact: false, Icon: MdWidgets },
        ]
        return (
            <React.Fragment>
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

                        {IT.map(({ to, name, exact, Icon }, index) => (
                            <NavItem key={index} className={bem.e('nav-item3')}>
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
        sidebar: state.sidebarControllerReducer.isOpenIT,
    }
}

export default connect(mapStateToProps, { sideBarOpenController })(IT)