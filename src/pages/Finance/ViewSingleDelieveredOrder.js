import React, { Component } from 'react';
import Page from '../../components/Page';
import { Col, Row, Card, CardHeader, Table, CardBody, Input } from 'reactstrap';


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
                            <CardHeader>Order Information</CardHeader>
                            <CardBody>
                                <Row>
                                    <Col>Order Id:</Col>
                                    <Col><b>Something</b></Col>
                                </Row>
                                <Row><Col>Order Date :</Col>
                                    <Col><b>Something</b></Col>
                                </Row>
                                <Row><Col> Shipment Address :</Col>
                                    <Col><b>Something</b></Col>
                                </Row><b>Description</b><Col>Something</Col>
                            </CardBody>
                        </Col>
                        <Col md={8}>
                            <CardHeader>Item Information</CardHeader>
                            <CardBody>
                                <Table className="scrollTableSales">
                                    <thead>
                                        <tr>
                                            <th>Item Id</th>
                                            <th>Item Name</th>
                                            <th>Quantity</th>
                                            <th>Old Price</th>
                                            <th>Update Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <th scope="row">1</th>
                                            <td>Hello</td>
                                            <td>Hello</td>
                                            <td>Hello</td>
                                            <td md={2}>
                                                <div class='col-xs-2'>
                                                    <Input type='number' />
                                                </div>
                                            </td>
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

export default ViewSingleDelieveredOrderPage;