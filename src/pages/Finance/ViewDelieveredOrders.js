import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';


class ViewDelieveredOrdersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
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
                                            <th>Delivered Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                            <td>
                                                <Button size='sm'>
                                                    See Order
                                                </Button>
                                            </td>
                                        </tr>
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

export default ViewDelieveredOrdersPage;