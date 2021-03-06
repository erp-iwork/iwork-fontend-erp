import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Table, Button } from 'reactstrap';
import { connect } from 'react-redux'
import { getOrders, updateStatus, getManufacturedOrders } from '../../store/manufacturing/action'
import PageSpinner from '../../components/PageSpinner'
import routes from '../../config/routes'
import { Link } from 'react-router-dom'
import status from '../../constant/status'

const Order = ({ order, index, handleQualityCheck }) => {
    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{order.requiredProductName}</td>
            <td>{order.retailPrice}</td>
            <td>{order.cost}</td>
            <td>{order.orderNumber}</td>
            <td>{order.unitOfMesurement}</td>
            <td>{order.status_manufacture_order ? order.status_manufacture_order[0].status : null}</td>
            <td>{order.status_manufacture_order ? order.status_manufacture_order[0].status === status.manuFactured ?
                <Button size='sm' color='primary' onClick={handleQualityCheck}>Quantity Checked</Button>
                : ((<Button size='sm' type='submit' color='success' disabled>Quantity Checked</Button>)) : null}</td>
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

class ViewAllFinishedOrdersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            quantityCheck: false
        }
    }

    componentDidMount() {
        this.props.getOrders()
    }


    componentDidUpdate(prevProps, prevState) {
        if (!this.props.loading_manufactured_orders && !this.state.qualitychecked) {
            this.setState({
                orders: this.props.orders,
                qualitychecked: true
            })
        }
    }



    handleQualityCheck(order, status) {
        this.props.updateStatus(order, status)
    }

    render() {
        if (!this.state.qualitychecked) return <PageSpinner />
        return (
            <Page title="View Finished Orders" breadcrumbs={[{ name: 'Manufacturing', active: true }]}>

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
                                    <th>Order Number</th>
                                    <th>UoM</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                    <th>See More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orders.filter(o => o.status_manufacture_order[0].status === "Manufactured" || o.status_manufacture_order[0].status === "Quantity Checked" || o.status_manufacture_order[0].status === "Confirmed").slice(0).reverse().map((item, index) => (
                                    <Order key={index} index={index} order={item} handleQualityCheck={() => this.handleQualityCheck(item.orderNumber, "Quantity Checked")} />
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

export default connect(mapStateToProps, { getOrders, updateStatus, getManufacturedOrders })(ViewAllFinishedOrdersPage)