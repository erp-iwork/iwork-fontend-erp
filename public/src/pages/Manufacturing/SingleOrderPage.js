import React, { Component } from 'react';
import Page from '../../components/Page';
import { Col, Row, Card, CardHeader, Table, CardBody } from 'reactstrap';
import "./Manufacturing.scss"

class SingleOrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: this.props.location.state
        }
    }
    render() {
        const { order } = this.state
        return (
            <Page title="Manufacturing" breadcrumbs={[{ name: 'Order', active: true }]}>
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
                                        <b>{order.productId}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Order Name :
                                    </Col>
                                    <Col>
                                        <b>{order.productName}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Order Price :
                                    </Col>
                                    <Col>
                                        <b>{order.productPrice}</b>
                                    </Col>
                                </Row>
                                <b>Product Type</b>
                                <Col>{order.productType}</Col>
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
                                            <th>Material Name</th>
                                            <th>Material Cost</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.product_material.map((item, index) => (
                                            <tr>
                                                <th scope="row">{item.materialName}</th>
                                                <td>{item.materialCost}</td>
                                                <td>{item.materialQuantity}</td>
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

export default SingleOrderPage;