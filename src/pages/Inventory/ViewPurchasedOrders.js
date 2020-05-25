import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap';
import { MdAssignment } from "react-icons/md";
import { getPurchasedItems, updateStatus } from '../../store/inventory/action'
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import routes from '../../config/routes'
import { Link } from 'react-router-dom'

const Order = ({ order, index, handleApprove }) => {
    return (
        <tr align="left">
            <th scope="row">{index + 1}</th>
            <td>{order.suplier.suplierName}</td>
            <td>{order.orderdBy}</td>
            <td>{order.purchaseOrderDate}</td>
            <td>{order.status_purchase_order[0]['status']}</td>
            <td align="left">
                {order.status_purchase_order[0]['status'] === "Invoiced" ?
                    <Link to={{ pathname: routes.GRVPage, state: { order: order.purchaseOrderNumber } }}>
                        <Button size='sm' color='primary'>
                            <MdAssignment /> SIV Issued
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
        this.state = {}
        this.handleApprove = this.handleApprove.bind(this)
    }

    componentDidMount() {
        this.props.getPurchasedItems()
    }

    handleApprove = (orderNumber) => {
        this.props.updateStatus(orderNumber)
            .then(res => this.componentDidMount())
    }

    render() {
        if (this.props.loading_items) return <PageSpinner />
        if (this.props.orders.length === 0) return <h2>No Purchased Items</h2>
        return (
            <Page title="Inventory" breadcrumbs={[{ name: 'Purchased Items', active: true }]}>
                <Card className="mb-3">
                    <CardHeader>Purchased Items</CardHeader>
                    <CardBody>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Order #</th>
                                    <th>Supplier</th>
                                    <th>Ordered By</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Generate GRV</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.orders.map((item, index) => (
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
        orders: state.inventoryReducer.orders,
        update_success: state.inventoryReducer.update_success
    }
}

export default connect(mapStateToProps, { getPurchasedItems, updateStatus })(ViewPurchasedItems)