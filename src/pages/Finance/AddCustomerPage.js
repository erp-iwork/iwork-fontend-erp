import React, { Component } from 'react';
import Page from '../../components/Page';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Row,
    Label,
} from 'reactstrap';
import AllCustomers from "./viewAllCutomersPage";
import './Finance.scss'

class AddCustomerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Page title="Add Customer" breadcrumbs={[{ name: 'Add Customer', active: true }]}>
                <Col lg={12} md={12} className='padding'>
                    <Card>u
                        <CardHeader>ADD A NEW CUSTOMER TO WORK WITH</CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <FormGroup>
                                            <Label for="exampleEmail" sm={12}>
                                                Customer Name
                                    </Label>
                                            <Col sm={12}>
                                                <Input placeholder="Customer Name" />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="examplePassword" sm={12}>
                                                General Manager
                                            </Label>
                                            <Col sm={12}>
                                                <Input placeholder="General Manager" />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="examplePassword" sm={12}>
                                                Contact Person
                                    </Label>
                                            <Col sm={12}>
                                                <Input
                                                    placeholder="Contact Person"
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="examplePassword" sm={12}>
                                                Tin Number
                                    </Label>
                                            <Col sm={12}>
                                                <Input
                                                    type="number"
                                                    placeholder="Tin Number"
                                                />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="exampleEmail" sm={12}>
                                                Customer Email
                                    </Label>
                                            <Col sm={12}>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Customer Email"
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label sm={12} for="exampleSelect">Payment Option</Label>
                                            <Col>
                                                <Input type="select" name="select">
                                                    <option>TOT</option>
                                                    <option>VAT</option>
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="examplePassword" sm={12}>
                                                Field Of Work
                                    </Label>
                                            <Col sm={12}>
                                                <Input
                                                    placeholder="Field Of Work"
                                                />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup >
                                    <Col align='center'>
                                        <Button color='primary'>Add Customer</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <AllCustomers />
            </Page>
        );
    }
}

export default AddCustomerPage;