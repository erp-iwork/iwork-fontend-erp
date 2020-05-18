
import React, { Component } from 'react';
import Page from '../../components/Page';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    Row,
    FormGroup,
    Input,
    Table,
    Label,
} from 'reactstrap';
import "./Sales.scss";
import ViewAllOrdersPage from "./ViewAllOrdersPage";

class CreateOrdersPage extends Component {
    constructor() {
        super();
        this.state = {
            items: [""]
        };
    }

    handleItems() {
        this.setState({
            items: [...this.state.items, '']
        });
    }

    handleChange(e, i) {
        let { items } = this.state;
        let itemsUpdate = [...items];
        items.splice(i, 1);

        itemsUpdate[i] = e.target.value;
        this.setState({
            items: itemsUpdate
        });
    }
    render() {
        let { items } = this.state;
        return (
            <Page title="Create Order" breadcrumbs={[{ name: 'Create Order', active: true }]}>

                <Row>

                    <Col md={6} sm={12}>
                        <Card>
                            <CardHeader>Order Information</CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label for="exampleSelect" sm={5}>
                                            Customer
                                            </Label>
                                        <Col sm={12}>
                                            <Input type="select" name="gender" onChange={this.handleChange}>
                                                <option aria-label="None" value="" disabled>Customer Name</option>
                                                <option>Something</option>
                                                <option>Something</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="examplePassword" sm={12}>
                                            Shipment Address
                                    </Label>
                                        <Col sm={12}>
                                            <Input
                                                placeholder=" Shipment Address"
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup >
                                        <Label for="exampleText" sm={4}>
                                            Description
                                    </Label>
                                        <Col sm={12}>
                                            <Input placeholder=" Description About the Order" type="textarea" name="text" />
                                        </Col>
                                    </FormGroup>

                                    <CardHeader>Item Information</CardHeader>
                                    {items.map((v, i) => {
                                        return (
                                            <Row className='duplicatedForm'>
                                                <Col md={6}>
                                                    <Input value={v} onChange={e => this.handleChange(e, i)} type="select" name="Item Name">
                                                        <option aria-label="None" value="" disabled>Item Name</option>
                                                        <option>Something</option>
                                                        <option>Something</option>
                                                    </Input>
                                                </Col>
                                                <Col md={6}>
                                                    <Input placeholder='Item Quantity' name="Quantity">
                                                    </Input>
                                                </Col>
                                            </Row>
                                        );
                                    })}
                                    <FormGroup align='right'>

                                        <Button
                                            onClick={() => this.handleItems()}
                                            size='sm'
                                            color='primary'
                                        >
                                            Add Another Item
                                    </Button>
                                    </FormGroup>
                                    <FormGroup align='center'>
                                        <Button color='primary'>Submit</Button>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={6} sm={12}>
                        <Card >
                            <CardHeader>Recent Orders</CardHeader>
                            <CardBody>
                                <Table responsive className="scrollTable">
                                    <thead>
                                        <tr>
                                            <th> ID</th>
                                            <th >Customer</th>
                                            <th>Sales Person</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td >Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td >Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td >Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                        </tr>

                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>

                    </Col>

                </Row>

                <ViewAllOrdersPage />

            </Page>
        );
    }
}

export default CreateOrdersPage;