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

const Order = ({ order, index, handleApprove }) => {
    return (
        <tr align="center">
            <th scope="row">{index + 1}</th>
            <td>{order.suplier.suplierName}</td>
            <td>{order.orderdBy}</td>
            <td>{order.purchaseOrderNumber}</td>
            <td>{order.purchaseOrderDate}</td>
            <td>{order.status_purchase_order[0].status}</td>
            <td>
                {order.status_purchase_order[0]['status'] === status.created?
                <Button size='sm' color='primary' onClick={() => handleApprove(order.purchaseOrderNumber)}>
                    Approve
                </Button> :
                <Button size='sm' color='primary' disabled>
                    Approved
                </Button> 
            }
            </td>
            <td>
                <Link to={{ pathname: routes.ViewSinglePurchaseOrder, state: order }}>
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
        this.state = {}
        this.updateOrders = this.updateOrders.bind(this)
        this.handleApprove = this.handleApprove.bind(this)
    }

    componentDidMount() {
        this.updateOrders()
    }

    updateOrders () {
        this.props.getManufacturedOrders(status.manuFactured)
    }

    handleApprove (orderNumber) {
        this.props.updateStatus(orderNumber, {
            'status': 'Approved'
        }).then(res => this.updateOrders())
    }

    render() {
        console.log(this.props.orders)
        if (this.props.loading_manufactured_orders) return <PageSpinner />
        if (this.props.orders.length === 0) return <h2>No orders created yet.</h2>
        return (
            <Page title="Manufactured Orders" breadcrumbs={[{ name: 'Finance', active: true }]}>
                <Card className="mb-3">
                    <CardHeader>All Orders</CardHeader>
                    <CardBody>
                        <Table responsive >
                            <thead>
                                <tr align='center'>
                                    <th>#</th>
                                    <th>Supplier</th>
                                    <th>Ordered By</th>
                                    <th>Ordered Number</th>
                                    <th>Order Date</th>
                                    <th>Status</th>
                                    <th colSpan={2} >Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                
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
        orders: state.companyReducer.orders
    }
}

export default connect(mapStateToProps, { getManufacturedOrders, updateStatus })(ViewAllPurchaseOrderPage)