import React, { Component } from 'react';
import Page from '../../components/Page';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCustomOrders, updateStatus, getOrders } from '../../store/procurement/action'
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
                <Button size='sm' color='success' disabled>
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
        this.state = {
            orders: [],
            done: false,
            lockPage: false
        }
        this.handleApprove = this.handleApprove.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.loading_orders && !this.state.done) {
            this.setState({
                orders: this.props.orders,
                done: true
            })
        }
    }

    componentDidMount() {
        this.props.getOrders()
    }

    handleApprove (orderNumber) {
        this.props.updateStatus(orderNumber, { status: status.approved })
    }

    render() {
        if (!this.state.done) return <PageSpinner />
        if (this.props.orders.length === 0) return <h2>No orders created yet.</h2>
        return (
            <Page title="Purchase Orders" breadcrumbs={[{ name: 'Finance', active: true }]}>
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
                                {this.state.orders.slice(0).reverse().map((order, index) => (
                                    <Order key={index} order={order} index={index} handleApprove={this.handleApprove} />
                                ))}
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
        loading_orders: state.procurementReducer.loading_orders,
        orders: state.procurementReducer.orders,
        success: state.procurementReducer.success,
        order: state.procurementReducer.order,
        status: state.procurementReducer.status
    }
}

export default connect(mapStateToProps, { getCustomOrders, updateStatus, getOrders })(ViewAllPurchaseOrderPage)