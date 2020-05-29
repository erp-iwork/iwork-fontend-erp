import React, { Component } from 'react';
import Page from '../../components/Page';
import { Col, Row, Card, CardHeader, Table, CardBody } from 'reactstrap';
import "./Manufacturing.scss"
import status from '../../constant/status'

class SingleOrderPage extends Component {
    constructor(props) {
        console.log(props.location.state);
        super(props);
        this.state = {
            order: props.location.state
        }
        this.calculateTotalPrice = this.calculateTotalPrice.bind(this)
    }

    calculateTotalPrice () {
        var price = 0
        var quantity = 0
        this.state.order.manufacture_item_set.forEach(item => {
            price += item.price
            quantity += item.quantity
        })
        return { price, quantity }
    }

    render() {
        const { order } = this.state
        return (
            <Page title="Single Order" breadcrumbs={[{ name: 'Manufacturing', active: true }]}>
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

                    <div class={order.status_manufacture_order ?
                        order.status_manufacture_order[0].status === status.manuFactured || order.status_manufacture_order[0].status === status.finished ?
                            ("step completed") : ("step") : null}>
                        <div class="step-icon-wrap">
                            <div class="step-icon"><i class="pe-7s-config"></i></div>
                        </div>
                        <h4 class="step-title">Manufactured</h4>
                    </div>
                    <div class={order.status_manufacture_order ?
                        order.status_manufacture_order[0].status === status.finished || order.status_manufacture_order[0].status === status.received ?
                            ("step completed") : ("step") : null}>
                        <div class="step-icon-wrap">
                            <div class="step-icon"><i class="pe-7s-config"></i></div>
                        </div>
                        <h4 class="step-title">Finished</h4>
                    </div>
                    <div class={order.status_manufacture_order ? order.status_manufacture_order[0].status === status.received ? ("step completed") : ("step") : null}>
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
                                        Order ID:
                                    </Col>
                                    <Col>
                                        <b>{order.orderNumber}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Product Name :
                                    </Col>
                                    <Col>
                                        <b>{order.requiredProductName}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Sales Price :
                                    </Col>
                                    <Col>
                                        <b>{order.retailPrice}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Total Price :
                                    </Col>
                                    <Col>
                                        <b>{this.calculateTotalPrice().price}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Total Quantity :
                                    </Col>
                                    <Col>
                                        <b>{this.calculateTotalPrice().quantity}</b>
                                    </Col>
                                </Row>
                                <b>Quantity</b>
                                <Col>{order.requiredProductQuantity}</Col>
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
                                            <th>MO#</th>
                                            <th>Material Name</th>
                                            <th>Material Cost</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.manufacture_item_set ? order.manufacture_item_set.map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.componentName}</td>
                                                <td>{item.price}</td>
                                                <td>{item.quantity}</td>
                                            </tr>
                                        )) : null}
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

export default SingleOrderPage;