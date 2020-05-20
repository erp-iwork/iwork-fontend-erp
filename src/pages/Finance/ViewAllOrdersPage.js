import React, { Component } from 'react';
import Page from '../../components/Page';
import { MdAssignment } from "react-icons/md";
import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap';
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import actions from '../../store/sales/action'
import routes from '../../config/routes'

const Order = ({ order, index }) => {
    return (
        <tr align="center">
            <th scope="row">{index + 1}</th>
            <td>{order.customer}</td>
            <td>{order.salesPerson}</td>
            <td>{order.shipmentAddress}</td>
            <td>{order.status}</td>
            <td>
                <Button size='sm' color='primary'>
                    <MdAssignment />
                </Button>
            </td>
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
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getAllOrder()
    }

    render() {
        console.log(this.props.orders)
        if (!this.props.orders[0]) return <PageSpinner />
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
                                    <th>Generate Invoice</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.orders.map((item, index) => (
                                    <Order order={item} key={index} index={index} />
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