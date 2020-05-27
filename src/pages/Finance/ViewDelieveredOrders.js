import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import { getCustomOrders } from '../../store/procurement/action'
import { connect } from 'react-redux'
import PageSpinner from '../../components/PageSpinner'
import { Link } from 'react-router-dom'
import routes from '../../config/routes'
import status from '../../constant/status'

const Order = ({ order, index }) => {
    return (
        <tr align="left">
            <th scope="row">{index + 1}</th>
            <td>{order.suplier.suplierName}</td>
            <td>{order.orderdBy}</td>
            <td>{order.purchaseOrderNumber}</td>
            <td>{order.purchaseOrderDate}</td>
            <td>{order.status_purchase_order[0].status}</td>
            <td>
                <Link to={{ pathname: routes.ViewSingleDelieveredOrder, state: order }}>
                    <Button size='sm' color='primary' disabled={
                        order.status_purchase_order[0]['status'] === status.invoiced
                    }>
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
        this.state = {
            orders: [],
            done: false
        }
    }

    componentDidMount() {
        this.props.getCustomOrders(status.delivered, status.invoiced)
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.loading_orders && !this.state.done) {
            this.setState({
                orders: this.props.orders,
                done: true
            })
        }
    }

    render() {
        if (!this.state.done) return <PageSpinner />
        return (
            <Page title="Delivered Orders" breadcrumbs={[{ name: 'Finance', active: true }]}>
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
                                            <th>Order Number</th>
                                            <th>Ordered Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.orders.slice(0).reverse().map((item, index) => (
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
    loading_orders: state.procurementReducer.loading_orders,
    orders: state.procurementReducer.orders
})

export default connect(mapStateToProps, { getCustomOrders })(ViewDelieveredOrdersPage)