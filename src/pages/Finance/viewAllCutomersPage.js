import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Col, Table, Button } from 'reactstrap';
import { MdDelete } from "react-icons/md";


class viewAllCustomersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Page title="All Customers" breadcrumbs={[{ name: 'All Customer', active: true }]}>


                <Col>
                    <Card className="mb-3">
                        <CardHeader>All Customers</CardHeader>
                        <CardBody>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Customer Name</th>
                                        <th>General Manager</th>
                                        <th>Email</th>
                                        <th>Contact Person</th>
                                        <th>Working Field</th>
                                        <th>Payment Option</th>
                                        <th>Tin-Number</th>
                                        <th>Actions</th>
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
                                        <td>
                                            <Col align='center'>
                                                <Button color='danger' size='sm'>

                                                    <MdDelete />
                                                </Button>
                                            </Col>


                                        </td>
                                    </tr>

                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        <td>Mark</td>
                                        <td>
                                            <Col align='center'>
                                                <Button color='danger' size='sm'>

                                                    <MdDelete />
                                                </Button>
                                            </Col>


                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>


            </Page>
        );
    }
}

export default viewAllCustomersPage;