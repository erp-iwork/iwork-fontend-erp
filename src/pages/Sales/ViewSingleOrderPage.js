import React, { Component } from 'react';
import Page from '../../components/Page';
import { Col, Row, Card, CardHeader, Table, CardBody } from 'reactstrap';
import './Sales.scss';
import { connect } from 'react-redux'
import { getSingleOrder } from '../../store/order/action'
import PageSpinner from '../../components/PageSpinner'

class ViewSingleOrderPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details: this.props.location.state
        }
    }

    async componentDidMount() {
        if (this.props.location.state) {
            await this.props.getSingleOrder(this.state.details.orderNumber)
        }
    }

    render() {
        if (!this.props.order.orderNumber) return <PageSpinner />
        const { details } = this.state
        const { order } = this.props
        return (
            <Page title="View Single Order" breadcrumbs={[{ name: 'Single Order', active: true }]}>
                <Card className='padding'>
                    <Row sm={12} md={12} >
                        <Col md={4}>
                            <CardHeader >
                                Order Information
                        </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col>
                                        Order Id:
                                    </Col>
                                    <Col>
                                        <b>{details.orderNumber}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Order Date :
                                    </Col>
                                    <Col>
                                        <b>{details.orderDate}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Shipment Address:
                                    </Col>
                                    <Col>
                                        <b>{details.shipmentAddress}</b>
                                    </Col>
                                </Row>
                                <b>Description</b>
                                    <Col>{details.description}</Col>
                            </CardBody>
                        </Col>
                        <Col md={8}>
                            <CardHeader >
                                Item Information
                        </CardHeader>
                            <CardBody>
                                <Table responsive className="scrollTableSales">
                                    <thead>
                                        <tr>
                                            <th>Order Id</th>
                                            <th>Order Name</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.item_order.map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.itemName}</td>
                                                <td>{item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Col>
                    </Row>
                </Card>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.ordersReducer.order,
        items: state.ordersReducer.items,
    }
}

export default connect(mapStateToProps, { getSingleOrder })(ViewSingleOrderPage)