import React, { Component } from 'react';
import Page from '../../components/Page';
import { MdAssignment } from "react-icons/md";
import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap';
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrders, updateStatus } from '../../store/procurement/action'
import routes from '../../config/routes'  

const Order = ({ order, index, deliver }) => {
    return (
        <tbody>
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{order.suplier}</td>
                <td>{order.orderdBy}</td>
                <td>{order.purchaseOrderDate}</td>
                <td>{order.status}</td>
                <td align='left'>
                    <Button size='sm' color='primary'
                        onClick={() => deliver(order.purchaseOrderNumber)}
                        disabled={order.status === "Delivered"? true : false}
                    >
                        <MdAssignment /> {order.status === "Delivered"? "Delivered" : "Deliever"}
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
            lockPage: false
        }
        this.deliver = this.deliver.bind(this)
    }

    componentDidMount() {
        this.props.getOrders()
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.lockPage) {
            this.componentDidMount()
            this.setState({ lockPage: true })
        }
    }

    deliver(order) {
        this.props.updateStatus(order, { status: "Delivered" })
        this.setState({ lockPage: false })
    }

    render() {
        if (this.props.loading_orders) return <PageSpinner />
        const deliveredOrders = this.props.orders.filter((order) => { return order.status === "Created" || order.status === "Delivered" })
        if (deliveredOrders.length === 0) return <h2>No orders to show</h2>
        return (
            <Page
                title="All Purchase Orders"
                breadcrumbs={[{ name: 'All Purchase Orders', active: true }]}
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
                            {deliveredOrders.map((item, index) => (
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
        orders: state.procurementReducer.orders
    }
}

export default connect(mapStateToProps, { getOrders, updateStatus })(ViewAllOrdersPage)