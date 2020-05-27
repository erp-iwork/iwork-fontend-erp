import React, { Component } from 'react';
import Page from '../../components/Page';
import { MdAssignment } from "react-icons/md";
import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap';
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCustomOrders, updateStatus } from '../../store/procurement/action'
import routes from '../../config/routes'
import status from '../../constant/status'

const Order = ({ order, index, deliver }) => {
    return (
        <tbody>
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{order.suplier.suplierName}</td>
                <td>{order.orderdBy}</td>
                <td>{order.purchaseOrderDate}</td>
                <td>{order.status_purchase_order[0]['status']}</td>
                <td align='left'>
                    <Button size='sm' color='primary'
                        onClick={() => deliver(order.purchaseOrderNumber)}
                        disabled={order.status_purchase_order[0]['status'] === "Delivered"? true : false}
                    >
                        <MdAssignment /> {order.status_purchase_order[0]['status'] === "Delivered"? "Delivered" : "Deliever"}
                    </Button>
                </td>
                <td>
                    <Link to={{ pathname: routes.ViewSinglePurchaseOrder, state: order }}>
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
            orders: [],
            done: false
        }
        this.deliver = this.deliver.bind(this)
    }

    componentDidMount() {
        this.props.getCustomOrders(status.delivered, status.approved)
    }

    deliver(order) {
        this.props.updateStatus(order, { status: "Delivered" }, "Purchase Order Delivered")
    }

    render() {
        if (this.props.loading_orders) return <PageSpinner />
        if (this.props.orders.length === 0) return <h2>No orders to show</h2>
        return (
            <Page
                title="Purchase Orders"
                breadcrumbs={[{ name: 'Logistics', active: true }]}
                className="TablePage">
                <Card className="mb-3">
                    <CardHeader>All Created & Delivered Purchase Orders</CardHeader>
                    <CardBody>
                        <Table responsive >
                            <thead>
                                <tr align='left'>
                                    <th>Order #</th>
                                    <th>Supplier</th>
                                    <th>Ordered By</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th style={{ margin: "auto" }}>Approve</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {this.props.orders.slice(0).reverse().map((item, index) => (
                                <Order order={item} key={index} index={index} deliver={this.deliver} />
                            ))}
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

export default connect(mapStateToProps, { getCustomOrders, updateStatus })(ViewAllOrdersPage)