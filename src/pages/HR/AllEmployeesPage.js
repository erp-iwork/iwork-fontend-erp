import React, { Component } from 'react';

import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import Page from '../../components/Page';

import { MdCheckCircle } from "react-icons/md";


class AllEmployees extends Component {
    state = {}
    render() {
        return (
            <Page
                title="All Employees"
                breadcrumbs={[{ name: 'All Employees', active: true }]}
                className="TablePage"
            >

                <Row>
                    <Col>
                        <Card className="mb-3">
                            <CardHeader>All Employees</CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>First Name</th>
                                            <th>Email</th>
                                            <th>Hired Date</th>
                                            <th>Phone Number</th>
                                            <th>Term Of Employment</th>
                                            <th>Account</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Johnlights51@gmail.com</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>
                                                <Button color='success' disabled>
                                                    <MdCheckCircle />

                                                </Button>
                                            </td>
                                            <td>
                                                <Button color='primary'>
                                                    See Profile
                                                </Button>
                                            </td>

                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Otto</td>
                                            <td>Johnlights51@gmail.com</td>

                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                            <td>
                                                <Button color='primary'>
                                                    See Profile
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

export default AllEmployees;