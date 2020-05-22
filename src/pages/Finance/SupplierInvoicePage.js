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
    Label,
    Row,
} from 'reactstrap';
import './Finance.scss'

class SupplierInvoicePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [1]
        }
        this.manageItems = this.manageItems.bind(this);
    }

    manageItems(e, type) {
        let array = this.state.array;
        if (type === 'add') {
            //this line will duplicate the object of array and push it in to same array
            array.push(array[1]);
        }
        else if (type === 'remove') {
            array.splice(0, 1);
        }
        this.setState({
            array
        })
    }
    render() {
        return (
            <Page title="Supplier Invoice" breadcrumbs={[{ name: 'Supplier Invoice', active: true }]}>
                <Card>
                    <CardHeader>Supplier Information</CardHeader>
                    <CardBody>
                        <Form>
                            <Row>
                                <Col sm={12} md={4}>
                                    <FormGroup>
                                        <Label for="exampleEmail" sm={12}>
                                            Supplier Name
                                    </Label>
                                        <Col sm={12}>
                                            <Input

                                                placeholder="Supplier Name"
                                            />
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col sm={12} md={4}>

                                    <FormGroup >
                                        <Label for="examplePassword" sm={12}>
                                            Working Field
                                    </Label>
                                        <Col sm={12}>
                                            <Input

                                                placeholder="Working Field"
                                            />
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col sm={12} md={4}>
                                    <FormGroup >
                                        <Label for="examplePassword" sm={12}>
                                            Email Address
                                    </Label>
                                        <Col sm={12}>
                                            <Input
                                                type="email"
                                                name="email"

                                                placeholder="Supplier Email"
                                            />
                                        </Col>
                                    </FormGroup>
                                </Col>

                                <Col sm={12} md={4}>
                                    <FormGroup>
                                        <Label for="exampleEmail" sm={12}>
                                            General Manager
                                    </Label>
                                        <Col sm={12}>
                                            <Input
                                                placeholder=" General Manager"
                                            />
                                        </Col>
                                    </FormGroup>

                                </Col>

                                <Col sm={12} md={4}>
                                    <FormGroup >
                                        <Label for="examplePassword" sm={12}>
                                            Contact Person
                                    </Label>
                                        <Col sm={12}>
                                            <Input
                                                placeholder="Contact Person"
                                            />
                                        </Col>
                                    </FormGroup>

                                </Col>

                                <Col sm={12} md={4}>
                                    <FormGroup >
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
                            </Row>
                            <CardHeader>Order Information</CardHeader>
                            <Row>
                                <Col sm={12} md={4}>
                                    <FormGroup>
                                        <Label for="exampleEmail" sm={12}>
                                            Order Number
                                    </Label>
                                        <Col sm={12}>
                                            <Input

                                                placeholder="Order Number"
                                            />
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col sm={12} md={4}>

                                    <FormGroup >
                                        <Label for="examplePassword" sm={12}>
                                            Invoice Number
                                    </Label>
                                        <Col sm={12}>
                                            <Input
                                                placeholder="Invoice Number"
                                            />
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col sm={12} md={4}>
                                    <FormGroup >
                                        <Label for="examplePassword" sm={12}>
                                            Invoice Date
                                    </Label>
                                        <Col sm={12}>
                                            <Input
                                                type="date"

                                                placeholder="Invoice Date"
                                            />
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <CardHeader>Items Information</CardHeader>
                            {
                                //this map funtion will create dynamic loop on the basis of array length
                                this.state.array.map((item, index) => {
                                    return (
                                        <Row>
                                            <Col sm={12} md={3}>
                                                <FormGroup>
                                                    <Label for="exampleEmail" sm={12}>
                                                        Item Name
                                                    </Label>
                                                    <Col sm={12}>
                                                        <Input
                                                            type="select"

                                                            placeholder="Order Number"
                                                        >
                                                            <option>Hello JUNIOR</option>
                                                            <option>JUNIOR Muhahaha</option>
                                                            <option>MOYA LOVER JUNIOR!! 0_0</option>

                                                        </Input>
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                            <Col sm={12} md={3}>

                                                <FormGroup >
                                                    <Label for="examplePassword" sm={12}>
                                                        Quantity
                                                    </Label>
                                                    <Col sm={12}>
                                                        <Input
                                                            type='number'
                                                            placeholder="Quantity"

                                                        />
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                            <Col sm={12} md={3}>
                                                <FormGroup >
                                                    <Label for="examplePassword" sm={12}>
                                                        Unit Price
                                                    </Label>
                                                    <Col sm={12}>
                                                        <Input
                                                            type="number"
                                                            placeholder="Unit Price"
                                                        />
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                            <Col sm={12} md={3}>
                                                <FormGroup >
                                                    <Label for="examplePassword" sm={12}>
                                                        Amount
                                                    </Label>
                                                    <Row>

                                                        <Col sm={10}>
                                                            <Input
                                                                disabled
                                                                placeholder="Amount"
                                                            />
                                                        </Col>
                                                        <Col>

                                                            <Button
                                                            >-</Button>
                                                        </Col>

                                                    </Row>


                                                </FormGroup>
                                            </Col>
                                            <Col sm={12} md={1}>
                                                <FormGroup >
                                                    <Col align='center' sm={12}>

                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    );
                                })
                            }
                            <FormGroup align='right'>
                                <Button onClick={(e) => this.manageItems(e, 'add')} size='sm' color='primary'>Add Another Item</Button>
                            </FormGroup>
                            <FormGroup align='center'>
                                <Button color='primary'>Submit</Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>

            </Page>
        );
    }
}

export default SupplierInvoicePage;