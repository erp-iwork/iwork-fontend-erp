import React, { Component } from 'react';
import Page from '../../components/Page';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import actions from '../../store/sales/action'
import routes from '../../config/routes'
import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap'
import PageSpinner from '../../components/PageSpinner'
import { reverse } from '../../useCases'

const Order = ({ order, id }) => {
    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{order.customer}</td>
            <td>{order.salesPerson}</td>
            <td>{order.shipmentAddress}</td>
            <td>{order.orderDate}</td>
            <td>{order.status}</td>
            <td>
                <Link to={{ pathname: routes.ViewSingleOrderPage, state: order }}>
                    <Button size='sm' color='primary'>
                        See Order
                    </Button>
                </Link>
            </td>
        </tr>
    )
}


class ViewAllOrdersPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: this.props.lists,
            passedOrders: false
        }
    }

    async componentDidMount() {
        if (!this.props.lists) {
            await this.props.getAllOrder()
            this.setState({ passedOrders: true })
        } else this.setState({ passedOrders: true })
    }

    render() {
        if (!this.props.lists) {
            if (this.props.loading) return <PageSpinner />
            if (this.props.orders.length === 0) return <h2>No orders created yet.</h2>
        }
        return (
            <Page title="All Sales Orders" breadcrumbs={[{ name: 'Sales', active: true }]}>
                <Card className="mb-3">
                    <CardHeader>All Orders</CardHeader>
                    <CardBody>
                        <Table responsive >
                            <thead>
                                <tr>
                                    <th>SO#</th>
                                    <th>Customer</th>
                                    <th>Sales Person</th>
                                    <th>Shipment Address</th>
                                    <th>Order Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.props.lists ? reverse(this.props.lists).map((order, index) => (
                                    <Order order={order} id={index + 1} />
                                )) : reverse(this.props.orders).map((order, index) => (
                                    <Order order={order} id={index + 1} />
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
        loading: state.salesReducer.loading,
        errors: state.salesReducer.errors,
        items: state.salesReducer.items,
        companys: state.salesReducer.companys,
        success: state.salesReducer.success,
        orders: state.salesReducer.orders
    }
}
const mapDispatchToProps = {
    createOrder: actions.createOrder,
    getAllItem: actions.getAllItem,
    getAllCompany: actions.getAllCompany,
    getAllOrder: actions.getAllOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllOrdersPage)