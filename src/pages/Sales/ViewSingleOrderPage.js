import React, { Component } from 'react';
import Page from '../../components/Page';
import { Col, Row, Card, CardHeader, Table, CardBody } from 'reactstrap';
import './Sales.scss';
import ViewAllOrdersPage from './ViewAllOrdersPage';

class ViewSingleOrderPage extends Component {
    state = {}
    render() {
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
                                        <b>Something</b>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Order Date:

                                    </Col>
                                    <Col>
                                        <b>Something</b>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Shipment Address:

                                    </Col>
                                    <Col>
                                        <b>Something</b>

                                    </Col>
                                </Row>
                                <b>Description</b>

                                <Col>
                                    
                                Description Goes Here 
                                Description Goes Here 
                                Description Goes Here 
                                Description Goes Here 
                                Description Goes Here 
                                Description Goes Here 
                                Description Goes Here 
                                Description Goes Here 
                                Description Goes Here 
                                Description Goes Here 
                                Description Goes Here 
                                Description Goes Here 
                                Description Goes Here 
                                Description Goes Here 
                                Description Goes Here 

                                    </Col>

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
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>

                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>

                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Col>




                    </Row>


                </Card>


                <ViewAllOrdersPage />


            </Page>
        );
    }
}

export default ViewSingleOrderPage;