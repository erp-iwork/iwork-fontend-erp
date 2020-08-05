import React, { Component } from 'react';
import Page from '../../components/Page';
import { MdAssignment } from "react-icons/md";
import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap';
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getStatus, getOrders } from '../../store/order/action'
import { getSiv, updateSiv } from '../../store/Siv/action'
import routes from '../../config/routes'
import status from '../../constant/status'
import { reverse, getCount } from '../../useCases/'
import { filter } from '../../useCases' 
import { updateFilter } from '../../store/search/action'
import filters from '../../constant/filters'

const Order = ({ order, index, handleApprove, currentOrder, success }) => {
    const [loading, setLoading] = React.useState(false)
    const approve = (order) => {
        setLoading(true)
        handleApprove(order)
    }

    return (
        <tbody>
            <tr>
                <th scope="row">{getCount(index + 1)}</th>
                <td>{order.customer}</td>
                <td>{order.salesPerson}</td>
                <td>{order.shipmentAddress}</td>
                <td>{order.orderNumber}</td>
                <td>{success? status.issued : order.status}</td>
                {currentOrder.orderNumber === order.orderNumber && success?
                (
                    <td>
                        <Link to={{ pathname: routes.SivPage, state: { order: order.orderNumber } }}>
                            <Button size='sm' color='primary'>
                                <MdAssignment /> SIV Issued
                        </Button>
                        </Link>
                    </td>
                ):(
                    <td>
                        {order.status === "Issued" ?
                            <Link to={{ pathname: routes.SivPage, state: { order: order.orderNumber } }}>
                                <Button size='sm' color='primary'>
                                    <MdAssignment /> SIV Issued
                                </Button>
                            </Link> :
                            <Button size='sm' color='primary' onClick={() => approve(order)}>
                                 {loading? "Loading..." : <div><MdAssignment />Approve</div>}
                            </Button>
                        }
                    </td>
                )
                }
                <td>
                    <Link to={{ pathname: routes.ViewSingleOrderPage, state: order }}>
                        <Button size='sm' color='primary'>
                            See Order
                        </Button>
                    </Link>
                </td>
            </tr>
        </tbody>
    )
}

class ViewAllOrdersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {},
            orderNumber: null,
            done: false,
            orders: [],
            lockPage: false
        }
        this.handleApprove = this.handleApprove.bind(this)
    }

    componentDidMount() {
        this.props.getOrders()
        updateFilter('Type', null)
        updateFilter(filters.ADVANCED_DATE, null)
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.loading && !this.state.done) {
            this.setState({
                orders: this.props.orders,
                done: true
            })
        }
    }

    handleApprove = (order) => {
        this.props.updateSiv(order.orderNumber, {
            'sivStatus': 'Approved',
          })
        this.setState({ order })
        this.props.getSiv(order.orderNumber)
    }

    render() {
        if (!this.state.done) return <PageSpinner />
        const createdOrders = this.state.orders ? this.state.orders.filter((order) => { return order.status === status.created || order.status === status.issued }) : "";
        if (createdOrders.length === 0) return <h4>No orders to show</h4>
        const filtered = filter({
            name: { value: this.props.searchValue, tag: 'customer' },
            date: { value: this.props.filter[filters.DATE._type], tag: 'orderDate' },
            advancedDate: { value: this.props.filter[filters.ADVANCED_DATE], tag: 'orderDate' }
        }, createdOrders)
        return (
            <Page
                title="All Sales Orders"
                breadcrumbs={[{ name: 'Inventory', active: true }]}
                className="TablePage"
                hasFilter={true}
                hasAdvancedDate={true}
            >
                <Card className="mb-3">
                    <CardHeader>All Sales Orders</CardHeader>
                    <CardBody>
                        <Table responsive >
                            <thead>
                                <tr align='left'>
                                    <th>N0</th>
                                    <th>Customer</th>
                                    <th>Sales Person</th>
                                    <th>Shipment Address</th>
                                    <th>Sales Order #</th>
                                    <th>Status</th>
                                    <th>Generate SIV</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {reverse(filtered).map((item, index) => (
                                <Order order={item} key={index} index={index} handleApprove={this.handleApprove} currentOrder={this.state.order} success={this.props.success} />
                            ))}
                        </Table>
                    </CardBody>
                </Card>
            </Page>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        loading: state.ordersReducer.loading,
        orders: state.ordersReducer.orders,
        status: state.sivReducer.status,
        sivs: state.sivReducer.sivs,
        success: state.sivReducer.success,
        siv_item: state.invoiceReducer.siv_item,
        filter: state.searchData.filter,
        searchValue: state.searchData.value
    }
}

export default connect(mapStateToProps, {
    getOrders, getStatus, getSiv, updateSiv, updateFilter
})(ViewAllOrdersPage)