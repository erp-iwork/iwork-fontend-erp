import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap';
import { MdAssignment } from "react-icons/md"
import { getCustomOrders, updateStatus } from '../../store/procurement/action'
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import routes from '../../config/routes'
import { Link } from 'react-router-dom'
import status from '../../constant/status'

const Order = ({ order, index, handleApprove }) => {
    return (
        <tr align="left">
            <th scope="row">{index + 1}</th>
            <td>{order.suplier.suplierName}</td>
            <td>{order.orderdBy}</td>
            <td>{order.purchaseOrderNumber}</td>
            <td>{order.purchaseOrderDate}</td>
            <td>{order.status_purchase_order[0]['status']}</td>
            <td align="left">
                {order.status_purchase_order[0]['status'] ===  status.received?
                    <Link to={{ pathname: routes.GRVPage, state: { order: order.purchaseOrderNumber } }}>
                        <Button size='sm' color='primary'>
                            <MdAssignment /> GRV Issued
                    </Button>
                    </Link> :
                    <Button size='sm' color='primary' onClick={() => handleApprove(order.purchaseOrderNumber)}>
                        <MdAssignment /> Approve
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

class ViewPurchasedItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            done: false
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
        this.props.getCustomOrders(status.invoiced, status.received)
    }

    handleApprove = (orderNumber) => {
        this.props.updateStatus(orderNumber, { status: status.received }, 'GRV Issued')
    }

    render() {
        if (!this.state.done) return <PageSpinner />
        if (this.props.orders.length === 0) return <h2>No Purchased Items</h2>
        return (
            <Page title="Purchased Products" breadcrumbs={[{ name: 'Inventory', active: true }]}>
                <Card className="mb-3">
                    <CardHeader>Purchased Items</CardHeader>
                    <CardBody>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Order #</th>
                                    <th>Supplier</th>
                                    <th>Ordered By</th>
                                    <th>Ordered Number</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Generate GRV</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orders.slice(0).reverse().map((item, index) => (
                                    <Order key={index} index={index} order={item} handleApprove={this.handleApprove} />
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
        loading_items: state.inventoryReducer.loading_items,
        update_success: state.inventoryReducer.update_success,
        loading_orders: state.procurementReducer.loading_orders,
        orders: state.procurementReducer.orders,
        success: state.procurementReducer.success,
        order: state.procurementReducer.order,
        status: state.procurementReducer.status
    }
}

export default connect(mapStateToProps, { updateStatus, getCustomOrders })(ViewPurchasedItems)