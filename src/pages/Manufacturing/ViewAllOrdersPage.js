import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Table, Button } from 'reactstrap';
import { connect } from 'react-redux'
import { getOrders } from '../../store/manufacturing/action'
import PageSpinner from '../../components/PageSpinner'
import routes from '../../config/routes'
import { Link } from 'react-router-dom'

const Order = ({ order, index }) => {
    return (
        <tr align="left">
            <th scope="row">{index + 1}</th>
            <td>{order.productName}</td>
            <td>{order.productType}</td>
            <td>{order.productPrice}</td>
            <td>{order.cost}</td>
            <td>{order.unitOfMeasurement}</td>
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
                                    <th>Prodcut Type</th>
                                    <th>Prodcut Price</th>
                                    <th>Prodcut Cost</th>
                                    <th>Unit of Measurement</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.orders.slice(0).reverse().map((item, index) => (
                                    <Order index={index} order={item} />
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

export default connect(mapStateToProps, { getOrders })(ViewAllOrdersManufacturingPage)