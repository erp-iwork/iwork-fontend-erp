import React, { Component } from 'react';
import Page from '../../components/Page';
import { Col, Row, Card, CardHeader, Table, CardBody } from 'reactstrap';


class ViewSingleDelieveredOrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Page title="Finance" breadcrumbs={[{ name: 'Delivered Order', active: true }]}>
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
                                            <tr >
                                                <th scope="row">Hello</th>
                                                <td>Hello</td>
                                                <td>Hello</td>
                                            </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Col>
                    </Row>
                </Card>
                Delivered Orders


            </Page>
        );
    }
}

export default ViewSingleDelieveredOrderPage;