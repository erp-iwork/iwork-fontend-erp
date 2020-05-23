import React, { Component } from 'react';
import Page from '../../components/Page';
import { Col, Row, Card, CardHeader, Table, CardBody } from 'reactstrap';
import "./Manufacturing.scss";


class SingleOrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
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
                                        <b>Something</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Order Date :
                                    </Col>
                                    <Col>
                                        <b>Something</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Shipment Address :
                                    </Col>
                                    <Col>
                                        <b>Something</b>
                                    </Col>
                                </Row>
                                <b>Description</b>
                                <Col>Something</Col>
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
                                        <tr>
                                            <th scope="row">Something</th>
                                            <td>Something</td>
                                            <td>Something</td>
                                        </tr>
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