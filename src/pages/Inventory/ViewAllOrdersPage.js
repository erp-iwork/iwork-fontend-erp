import React, { Component } from 'react';
import Page from '../../components/Page';
import { MdAssignment } from "react-icons/md";
import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap';
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getStatus, getOrders } from '../../store/order/action'
import { getSiv, updateSiv } from '../../store/Siv/action'
import routes from '../../config/routes'

const Order = ({ order, index, handleApprove }) => {
    return (
        <tbody>
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{order.customer}</td>
                <td>{order.salesPerson}</td>
                <td>{order.shipmentAddress}</td>
                <td>{order.status}</td>
                <td>
                {order.status === "Issued"?
                    <Link to={{ pathname: routes.SivPage, state: { order: order.orderNumber } }}>
                        <Button size='sm' color='primary'>
                            <MdAssignment /> SIV Issued
                        </Button>
                    </Link>:
                    <Button size='sm' color='primary' onClick={() => handleApprove(order.orderNumber)}>
                        <MdAssignment /> Approve
                    </Button>
                }
                </td>
                <td>
                    <Link to={{ pathname: routes.ViewSingleOrderPage, state: order }}>
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
        this.state = {}
        this.handleApprove = this.handleApprove.bind(this)
    }

    componentDidMount() {
        this.props.getOrders()
    }

    handleApprove = (order) => {
        this.props.updateSiv(order, {
          'sivStatus': 'Approved',
        })
        this.props.getSiv(order);
    }

    render() {
        if (this.props.loading) return <PageSpinner />
        const createdOrders = this.props.orders ? this.props.orders.filter((order) => { return order.status === "Created" }) : "";
        if (createdOrders.length === 0) return <h2>No orders to show</h2>
        return (
            <Page 
                title="All Orders"
                breadcrumbs={[{ name: 'All Orders', active: true }]}
                className="TablePage">
                <Card className="mb-3">
                    <CardHeader>All Orders</CardHeader>
                    <CardBody>
                        <Table responsive >
                            <thead>
                                <tr align='left'>
                                    <th>Order #</th>
                                    <th>Customer</th>
                                    <th>Sales Person</th>
                                    <th>Shipment Address</th>
                                    <th>Status</th>
                                    <th>Generate SIV</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                                {createdOrders.map((item, index) => (
                                    <Order order={item} key={index} index={index} handleApprove={this.handleApprove} />
                                ))}
                        </Table>
                    </CardBody>
                </Card>
            </Page>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        loading:state.ordersReducer.loading,
        orders: state.ordersReducer.orders,
        status: state.ordersReducer.status,
        sivs: state.invoiceReducer.sivs,
        siv_item: state.invoiceReducer.siv_item,
    }
}

export default connect(mapStateToProps, { getOrders, getStatus, getSiv, updateSiv })(ViewAllOrdersPage)