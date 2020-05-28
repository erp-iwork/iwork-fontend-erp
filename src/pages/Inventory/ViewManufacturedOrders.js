import React, { Component } from 'react';
import Page from '../../components/Page';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateStatus, getManufacturedOrders } from '../../store/manufacturing/action'
import routes from '../../config/routes'
import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap'
import PageSpinner from '../../components/PageSpinner'
import status from '../../constant/status'
import { reverse } from '../../useCases'

const Order = ({ order, index, handleReceive }) => {
    return (
        <tr align="center">
            <th scope="row">{index + 1}</th>
            <td>{order.requiredProductName}</td>
            <td>{order.manufacturePerson}</td>
            <td>{order.orderNumber}</td>
            <td>{order.cost}</td>
            <td>{order.requiredProductQuantity}</td>
            <td>{order.status_manufacture_order[0]['date']}</td>
            <td>{order.status_manufacture_order[0]['status']}</td>
            <td>
                {order.status_manufacture_order[0]['status'] === status.finished?
                <Button size='sm' color='primary' onClick={() => handleReceive(order.orderNumber)}>
                        Receieve
                </Button> :
                <Button size='sm' color='primary' disabled>
                    Receieved
                </Button> 
            }
            </td>
            <td>
                <Link to={{ pathname: routes.ViewSingleOrderManufacturing, state: order }}>
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
            done: false,
            orders: [],
            lockPage: false
        }
        this.handleReceive = this.handleReceive.bind(this)
    }

    componentDidMount() {
        this.props.getManufacturedOrders(status.finished, status.received)
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.loading_manufactured_orders && !this.state.done) {
            this.setState({
                orders: this.props.orders,
                done: true
            })
        }
    }

    handleReceive = (orderNumber) => {
        this.setState({ lockPage: false })
        this.props.updateStatus(orderNumber, status.received)
    }

    render() {
        if (!this.state.done) return <PageSpinner />
        if (this.props.orders.length === 0) return <h2>No orders created yet.</h2>
        console.log(this.props.orders)
        return (
            <Page title="Manufactured Orders" breadcrumbs={[{ name: 'Finance', active: true }]}>
                <Card className="mb-3">
                    <CardHeader>All Orders</CardHeader>
                    <CardBody>
                        <Table responsive >
                            <thead>
                                <tr align='center'>
                                    <th>MO#</th>
                                    <th>Product Name</th>
                                    <th>Manufacture Personnel</th>
                                    <th>Order Number</th>
                                    <th>Cost</th>
                                    <th>Quantity</th>
                                    <th>End Date</th>
                                    <th>Status</th>
                                    <th colSpan={2} >Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.done? reverse(this.state.orders).map((item, index) => (
                                    <Order key={index} index={index} order={item} handleReceive={this.handleReceive} />
                                )) : ''}
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
        loading_manufactured_orders: state.manuFacturingReducer.loading_manufactured_orders,
        orders: state.manuFacturingReducer.orders,
        loading_manufacture: state.manuFacturingReducer.loading_manufacture,
        success: state.manuFacturingReducer.success
    }
}

export default connect(mapStateToProps, { getManufacturedOrders, updateStatus })(ViewAllPurchaseOrderPage)