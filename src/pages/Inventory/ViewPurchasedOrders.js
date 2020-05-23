import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap';
import { MdAssignment } from "react-icons/md";


class ViewPurchasedItems extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Page title="Inventory" breadcrumbs={[{ name: 'Purchased Items', active: true }]}>
                <Card className="mb-3">
                    <CardHeader>Purchased Items</CardHeader>
                    <CardBody>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Order #</th> 
                                    <th>Supplier</th>
                                    <th>Recieved By</th>
                                    <th>Warehouse Name</th>
                                    <th>Status</th>
                                    <th>Generate GRV</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>Shipment Address</td>
                                    <th>
                                        <Button size='sm' color='primary'>
                                            <MdAssignment /> Recieved
                                        </Button>
                                    </th>
                                    <td>Actions</td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Page>
        );
    }
}

export default ViewPurchasedItems; 