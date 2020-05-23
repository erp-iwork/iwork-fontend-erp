import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Table, Button } from 'reactstrap';


class ViewAllOrdersManufacturingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Page title="Manufacturing" breadcrumbs={[{ name: 'View All Orders', active: true }]}>

                <Card className="mb-3">
                    <CardHeader>All Orders</CardHeader>
                    <CardBody>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Personnel</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Quantity</th>
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
                                    <td>

                                        <Button size='sm'>
                                            See Order
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>


            </Page>
        );
    }
}

export default ViewAllOrdersManufacturingPage;