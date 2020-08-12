import React, { Component } from 'react';
import Page from '../../components/Page';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateStatus, getManufacturedOrders } from '../../store/manufacturing/action'
import routes from '../../config/routes'
import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap'
import PageSpinner from '../../components/PageSpinner'
import status from '../../constant/status'
import { reverse, filter, getCount } from '../../useCases'
import { getDateFormat } from '../../useCases/getDateFormat'
import { updateFilter } from '../../store/search/action'
import filters from '../../constant/filters'

const Order = ({ order, index, handleReceive }) => {
    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{order.requiredProductName}</td>
            <td>{order.manufacturePerson}</td>
            <td>{getCount(order.orderNumber)}</td>
            <td>{order.cost}</td>
            <td>{order.requiredProductQuantity}</td>
            <td>{getDateFormat(order.status_manufacture_order[0]['date'])}</td>
            <td>{order.status_manufacture_order[0]['status']}</td>
            <td>
                {order.status_manufacture_order[0]['status'] === status.finished ?
                    <Button size='sm' color='primary' onClick={() => handleReceive(order.orderNumber)}>
                        Receieve
                </Button> :
                    <Button size='sm' color='success' disabled>
                        Receieved
                </Button>
                }
            </td>
            <td>
                <Link to={{ pathname: routes.ViewSingleOrderManufacturing, state: order }}>
                    <Button size='sm' color='primary'>
                        See Order
                    </Button>
                </Link>
            </td>
        </tr>
    )
}

class ViewAllPurchaseOrderPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            done: false,
            orders: [],
            lockPage: false
        }
        this.handleReceive = this.handleReceive.bind(this)
    }

    componentDidMount() {
        this.props.getManufacturedOrders(status.finished, status.received)
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.loading_manufactured_orders && !this.state.done) {
            this.setState({
                orders: this.props.orders,
                done: true
            })
        }
    }

    handleReceive = (orderNumber) => {
        this.setState({ lockPage: false })
        this.props.updateStatus(orderNumber, status.received)
    }

    render() {
        if (!this.state.done) return <PageSpinner />
        if (this.props.orders.length === 0) {
            return (
                <Page title="Manufactured Orders" breadcrumbs={[{ name: 'Finance', active: true }]}>
                    No orders created yet.
                </Page>
            )
        }

        const filtered = filter({
            name: { value: this.props.searchValue, tag: 'requiredProductName' },
            date: { value: this.props.filter[filters.DATE._type], tag: 'manufatureEndDate' },
            advancedDate: { value: this.props.filter[filters.ADVANCED_DATE], tag: 'manufatureEndDate' }
        }, this.props.orders)

        return (
            <Page
                title="View All Orders"
                breadcrumbs={[{ name: 'Manufacturing', active: true }]}
                hasFilter={true}
                hasAdvancedDate={true}
            >
                <Card className="mb-3">
                    <CardHeader>All Orders</CardHeader>
                    <CardBody>
                        <Table responsive >
                            <thead>
                                <tr>
                                    <th>MO#</th>
                                    <th>Product Name</th>
                                    <th>Manufacture Personnel</th>
                                    <th>Order Number</th>
                                    <th>Cost</th>
                                    <th>Quantity</th>
                                    <th>End Date</th>
                                    <th>Status</th>
                                    <th colSpan={2} align="center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.done ? reverse(filtered).map((item, index) => (
                                    <Order key={index} index={index} order={item} handleReceive={this.handleReceive} />
                                )) : ''}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading_manufactured_orders: state.manuFacturingReducer.loading_manufactured_orders,
        orders: state.manuFacturingReducer.orders,
        loading_manufacture: state.manuFacturingReducer.loading_manufacture,
        success: state.manuFacturingReducer.success,
        filter: state.searchData.filter,
        searchValue: state.searchData.value
    }
}

export default connect(mapStateToProps, { getManufacturedOrders, updateStatus, updateFilter })(ViewAllPurchaseOrderPage)