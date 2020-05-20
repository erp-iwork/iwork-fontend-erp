import React, { Component } from 'react';
import Page from '../../components/Page';
import { MdAssignment } from "react-icons/md";
import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap';
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import actions from '../../store/sales/action'
import routes from '../../config/routes'
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from './INVOICE'


const Order = ({ order, index }) => {
    return (
        <tbody>
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{order.customer}</td>
                <td>{order.salesPerson}</td>
                <td>{order.shipmentAddress}</td>
                <td>{order.status}</td>
                <td >

                    <PDFDownloadLink
                        document={<Invoice />}
                        fileName="Invoice.pdf"

                    >
                        {({ loading }) =>
                            loading ? <Button size='sm' color='primary'> Loading</Button>
                                : <Button size='sm' color='primary'> <MdAssignment color='light' /> Generate Invoice</Button>

                        }
                    </PDFDownloadLink>
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
    }
    componentDidMount() {
        this.props.getAllOrder()
    }

    render() {
        if (this.props.loading) return <PageSpinner />
        if (this.props.orders.length === 0) return <h2>No order to show</h2>
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
                                    <th style={{ margin: "auto" }}>Generate Invoice</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {this.props.orders.map((item, index) => (
                                <Order order={item} key={index} index={index} />
                            ))}

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