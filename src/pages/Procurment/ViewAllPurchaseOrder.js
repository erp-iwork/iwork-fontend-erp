import React, { Component } from 'react';
import Page from '../../components/Page';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrders } from '../../store/procurement/action'
import routes from '../../config/routes'
import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap'
import PageSpinner from '../../components/PageSpinner'

const Order = ({ order, index }) => {
    return (
        <tr align="center">
            <th scope="row">{index + 1}</th>
            <td>{order.suplier.suplierName}</td>
            <td>{order.orderdBy}</td>
            <td>{order.purchaseOrderDate}</td>
            <td>{order.status_purchase_order[0].status}</td>
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
    }

    async componentDidMount() {
        this.props.getOrders()
    }

    render() {
        if (this.props.loading_orders) return <PageSpinner />
        if (this.props.orders.length === 0) return <h2>No orders created yet.</h2>
        return (
            <Page title="All Purchase Orders" breadcrumbs={[{ name: 'Procurment', active: true }]}>
                <Card className="mb-3">
                    <CardHeader>All Orders</CardHeader>
                    <CardBody>
                        <Table responsive >
                            <thead>
                                <tr align='center'>
                                    <th>Order #</th>
                                    <th>Supplier</th>
                                    <th>Ordered By</th>
                                    <th>Order Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.orders.map((order, index) => (
                                    <Order order={order} index={index} />
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
        orders: state.procurementReducer.orders
    }
}

export default connect(mapStateToProps, { getOrders })(ViewAllPurchaseOrderPage)