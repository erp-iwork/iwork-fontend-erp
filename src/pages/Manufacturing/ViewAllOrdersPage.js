import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Table, Button } from 'reactstrap';
import { connect } from 'react-redux'
import { getOrders, updateStatus, getManufacturedOrders } from '../../store/manufacturing/action'
import PageSpinner from '../../components/PageSpinner'
import routes from '../../config/routes'
import { Link } from 'react-router-dom'
import status from '../../constant/status'

const Order = ({ order, index, handleDone }) => {
    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{order.requiredProductName}</td>
            <td>{order.retailPrice}</td>
            <td>{order.cost}</td>
            <td>{order.orderNumber}</td>
            <td>{order.unitOfMesurement}</td>
            <td>{order.status_manufacture_order ? order.status_manufacture_order[0].status : null}</td>
            <td>{order.status_manufacture_order ? order.status_manufacture_order[0].status === status.created ? 
                <Button size='sm' color='primary' onClick={handleDone}>Done</Button>
                : ( ( <Button size='sm' color='success' disabled>Done</Button> ) ) : null}</td>
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

class ViewAllOrdersManufacturingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            done: false
        }
    }

    componentDidMount() {
        this.props.getOrders()
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.loading_manufactured_orders && !this.state.done) {
            this.setState({
                orders: this.props.orders,
                done: true
            })
        }
    }

    handleDone(order, status) {
        this.props.updateStatus(order, status)
    }
    
    render() {
        if (!this.state.done) return <PageSpinner />
        return (
            <Page title="View All Orders" breadcrumbs={[{ name: 'Manufacturing', active: true }]}>

                <Card className="mb-3">
                    <CardHeader>All Orders</CardHeader>
                    <CardBody>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Product Price</th>
                                    <th>Product Cost</th>
                                    <th>MO #</th>
                                    <th>UoM</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                    <th>See More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orders.slice(0).reverse().map((item, index) => (
                                    <Order key={index} index={index} order={item} handleDone={() => this.handleDone(item.orderNumber, "Manufactured")} />
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
        errors: state.manuFacturingReducer.errors,
        loading_manufactured_orders: state.manuFacturingReducer.loading_manufactured_orders,
        orders: state.manuFacturingReducer.orders,
        loading_manufacture: state.manuFacturingReducer.loading_manufacture,
        success: state.manuFacturingReducer.success,
        updatedOrders: state.manuFacturingReducer.orders
    }
}

export default connect(mapStateToProps, { getOrders, updateStatus, getManufacturedOrders })(ViewAllOrdersManufacturingPage)