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

    componentDidMount() {
        if (this.props.location.state) {
            this.props.getSingleOrder(this.state.details.orderNumber)
        }
    }

    render() {
        if (this.props.loading_single_order === true || this.props.loading_single_order === undefined) return <PageSpinner />
        const { details } = this.state
        const { order } = this.props
        return (
            <Page title="View Single Order" breadcrumbs={[{ name: 'Single Order', active: true }]}>

                <div class="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                    <div class="step completed">
                        <div class="step-icon-wrap">
                            <div class="step-icon"><i class="pe-7s-cart"></i></div>
                        </div>
                        <h4 class="step-title">Created</h4>
                    </div>
                    <div class="step completed">
                        <div class="step-icon-wrap">
                            <div class="step-icon"><i class="pe-7s-config"></i></div>
                        </div>
                        <h4 class="step-title">Pending</h4>
                    </div>
                    <div class="step">
                        <div class="step-icon-wrap">
                            <div class="step-icon"><i class="pe-7s-config"></i></div>
                        </div>
                        <h4 class="step-title">Manufactured</h4>
                    </div>
                    <div class="step">
                        <div class="step-icon-wrap">
                            <div class="step-icon"><i class="pe-7s-config"></i></div>
                        </div>
                        <h4 class="step-title">Finished</h4>
                    </div>
                    <div class="step">
                        <div class="step-icon-wrap">
                            <div class="step-icon"><i class="pe-7s-home"></i></div>
                        </div>
                        <h4 class="step-title">Recieved</h4>
                    </div>
                </div>
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
                                        Shipment Address :
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
        loading_single_order: state.ordersReducer.loading_single_order,
        order: state.ordersReducer.order,
        items: state.ordersReducer.items,
    }
}

export default connect(mapStateToProps, { getSingleOrder })(ViewSingleOrderPage)