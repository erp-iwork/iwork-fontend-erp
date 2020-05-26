import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';


class RecordTracking extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Page
                title="Record Tracking"
                breadcrumbs={[{ name: 'Inventory', active: true }]}
            >
                <Row>
                    <Col>
                        <Card className="mb-3">
                            <CardHeader>Imports and Withdrawals</CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Transaction ID</th>
                                            <th>Transaction Type</th>
                                            <th>Product ID</th>
                                            <th>Product Name</th>
                                            <th>Cost</th>
                                            <th>Order ID</th>
                                            <th>Transaction Date</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Mark</td>
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

export default RecordTracking;