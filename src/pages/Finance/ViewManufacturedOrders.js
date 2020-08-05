import React, { Component } from 'react';
import Page from '../../components/Page';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getManufacturedOrders } from '../../store/company/action'
import { updateStatus } from '../../store/manufacturing/action'
import routes from '../../config/routes'
import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap'
import PageSpinner from '../../components/PageSpinner'
import status from '../../constant/status'
import { filter, getCount } from '../../useCases' 
import { updateFilter } from '../../store/search/action'
import filters from '../../constant/filters'

const Order = ({ order, index }) => {
    return (
        <tr align="center">
            <th scope="row">{index + 1}</th>
            <td>{order.requiredProductName}</td>
            <td>{order.manufacturePerson}</td>
            <td>{getCount(order.orderNumber)}</td>
            <td>{order.cost}</td>
            <td>{order.requiredProductQuantity}</td>
            <td>{order.status_manufacture_order[0]['date']}</td>
            <td>{order.status_manufacture_order[0]['status']}</td>
            <td>
                {order.status_manufacture_order[0]['status'] === status.confirmed ?
                    <Link to={{
                        pathname: routes.ViewFinanceSingleManufacturedOrder,
                        state: order
                    }}>
                        <Button size='sm' color='primary'>
                            Finish
                        </Button>
                        </Link> :
                    <Button size='sm' color='success' disabled>
                        Finished
                         </Button>
                }
            </td>
            <td>
                <Link to={{ pathname: routes.ViewFinanceSingleManufacturedOrder, state: order }}>
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
            orders: []
        }
    }

    componentDidMount() {
        this.props.getManufacturedOrders(status.manuFactured, status.confirmed)
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.loading_manufactured_orders && !this.state.done) {
            updateFilter('Type', null)
            updateFilter(filters.ADVANCED_DATE, null)
            this.setState({
                orders: this.props.orders,
                done: true
            })
        }
    }

    render() {
        if (!this.state.done) return <PageSpinner />
        if (this.props.orders.length === 0){
            return (
                <Page title="Manufactured Orders" breadcrumbs={[{ name: 'Finance', active: true }]}>
                    No orders created yet.
                </Page>
            )
        }
        const filtered = filter({
            name: { value: this.props.searchValue, tag: 'requiredProductName' },
        }, this.props.orders)
        return (
            <Page title="Manufactured Orders" breadcrumbs={[{ name: 'Finance', active: true }]}>
                <Card className="mb-3">
                    <CardHeader>All Orders</CardHeader>
                    <CardBody>
                        <Table responsive >
                            <thead>
                                <tr align='center'>
                                    <th>N0</th>
                                    <th>Product Name</th>
                                    <th>Manufacture Personnel</th>
                                    <th>MO #</th>
                                    <th>Cost</th>
                                    <th>Quantity</th>
                                    <th>End Date</th>
                                    <th>Status</th>
                                    <th colSpan={2} >Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.done ? filtered.slice(0).reverse().map((item, index) => (
                                    <Order key={index} index={index} order={item} handleApprove={() => null} />
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
        loading_manufactured_orders: state.companyReducer.loading_manufactured_orders,
        orders: state.companyReducer.orders,
        loading_manufacture: state.manuFacturingReducer.loading_manufacture,
        success: state.manuFacturingReducer.success,
        updatedOrders: state.manuFacturingReducer.orders,
        filter: state.searchData.filter,
        searchValue: state.searchData.value
    }
}

export default connect(mapStateToProps, { getManufacturedOrders, updateStatus, updateFilter })(ViewAllPurchaseOrderPage)