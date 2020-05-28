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
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{order.suplier.suplierName}</td>
            <td>{order.orderdBy}</td>
            <td>{order.purchaseOrderNumber}</td>
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
        this.state = {
            orders: [],
            done: false
        }
    }

    componentDidMount() {
        this.props.getOrders()
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.loading_orders && !this.state.done) {
            this.setState({
                orders: this.props.orders,
                done: true
            })
        }
    }

    reverse(orders) {
        return orders.slice(0).reverse()
    }

    render() {
        if (!this.state.done) return <PageSpinner />
        if (this.state.orders.length === 0) return <h2>No orders created yet.</h2>
        return (
            <Page title="All Purchase Orders" breadcrumbs={[{ name: 'Procurment', active: true }]}>
                <Card className="mb-3">
                    <CardHeader>All Orders</CardHeader>
                    <CardBody>
                        <Table responsive >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Supplier</th>
                                    <th>Ordered By</th>
                                    <th>Order Number</th>
                                    <th>Order Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.reverse(this.state.orders).map((order, index) => (
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