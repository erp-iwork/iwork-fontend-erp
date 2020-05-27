import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Table, Button } from 'reactstrap';
import { connect } from 'react-redux'
import { getOrders, updateStatus } from '../../store/manufacturing/action'
import PageSpinner from '../../components/PageSpinner'
import routes from '../../config/routes'
import { Link } from 'react-router-dom'

const Order = ({ order, index, handleDone }) => {


    return (
        <tr align="left">
            <th scope="row">{index + 1}</th>
            <td>{order.requiredProductName}</td>
            <td>{order.retailPrice}</td>
            <td>{order.cost}</td>
            <td>{order.unitOfMesurement}</td>
            <td>{order.status_manufacture_order ? order.status_manufacture_order[0].status : null}</td>
            <td>{order.status_manufacture_order ? order.status_manufacture_order[0].status === "Created" ? (
                <Link onClick={handleDone}>
                    <Button size='sm' color='primary'>
                        Done
     </Button>
                </Link>
            ) : (
                    (
                        <Link onClick={handleDone}>
                            <Button size='sm' color='primary' disabled>
                                Done
         </Button>
                        </Link>
                    )
                ) : null}</td>


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
        this.state = {}
    }

    componentDidMount() {
        this.props.getOrders()
        console.log(this.props.orders);


    }
    handleDone(order, status) {

        this.props.updateStatus(order, status)
    }
    render() {
        if (this.props.loading_orders) return <PageSpinner />

        return (
            <Page title="Manufacturing" breadcrumbs={[{ name: 'View All Orders', active: true }]}>

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
                                    <th>Unit of Measurement</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                    <th>See More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.orders.slice(0).reverse().map((item, index) => (
                                    <Order index={index} order={item} handleDone={() => this.handleDone(item.orderNumber, "Manufactured")} />

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
        success: state.manuFacturingReducer.success,
        loading_orders: state.manuFacturingReducer.loading_orders,
        orders: state.manuFacturingReducer.orders
    }
}

export default connect(mapStateToProps, { getOrders, updateStatus })(ViewAllOrdersManufacturingPage)