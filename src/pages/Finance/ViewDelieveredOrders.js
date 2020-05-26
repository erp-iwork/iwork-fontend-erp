import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import { getDeliveredOrders } from '../../store/order/action'
import { connect } from 'react-redux'
import PageSpinner from '../../components/PageSpinner'
import { Link } from 'react-router-dom'
import routes from '../../config/routes'

const Order = ({ order, index }) => {
    return (
        <tr align="left">
            <th scope="row">{index + 1}</th>
            <td>{order.suplier.suplierName}</td>
            <td>{order.orderdBy}</td>
            <td>{order.purchaseOrderDate}</td>
            <td>{order.status_purchase_order[0].status}</td>
            <td>
                <Link to={{ pathname: routes.ViewSingleDelieveredOrder, state: order }}>
                    <Button size='sm' color='primary'>
                        Invoice
                    </Button>
                </Link>
            </td>
        </tr>
    )
}

class ViewDelieveredOrdersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getDeliveredOrders()
    }

    render() {
        if (this.props.loading) return <PageSpinner />
        return (
            <Page title="Finance" breadcrumbs={[{ name: 'All Delivered Orders', active: true }]}>
                <Row>
                    <Col>
                        <Card className="mb-3">
                            <CardHeader>Delievered Orders</CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Order #</th>
                                            <th>Supplier</th>
                                            <th>Ordered By</th>
                                            <th>Ordered Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.orders.map((item, index) => (
                                            <Order key={index} index={index} order={item} />
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.ordersReducer.loading,
    orders: state.ordersReducer.orders
})

export default connect(mapStateToProps, { getDeliveredOrders })(ViewDelieveredOrdersPage)