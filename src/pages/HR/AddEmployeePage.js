import React, { Component } from 'react';
import Page from '../../components/Page';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    FormText,
    Input,
    Label,
    Row,
} from 'reactstrap';
import AllEmployeesPage from "./AllEmployeesPage";

class AddEmployee extends Component {
    state = {}
    render() {
        return (
            <>

                <Page
                    title="Add Employee"
                    breadcrumbs={[{ name: 'Add Employee', active: true }]}
                    className="FormPage"
                >
                    <Col xl={8} lg={12} md={12}>
                        <Card>
                            <CardHeader>Form Grid</CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col xl={6}>
                                            <FormGroup >
                                                <Label for="exampleEmail" sm={5}>
                                                    First Name
                                            </Label>
                                                <Col sm={12}>
                                                    <Input
                                                        // type="email"
                                                        name="First Name"
                                                        placeholder="with a placeholder"
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col xl={6}>
                                            <FormGroup>
                                                <Label for="examplePassword" sm={5}>
                                                    Last Name
                                            </Label>
                                                <Col sm={12}>
                                                    <Input
                                                        // type="password"
                                                        name="Last Name"
                                                        placeholder="password placeholder"
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={6}>
                                            <FormGroup >
                                                <Label for="exampleEmail" sm={5}>
                                                    Email
                                            </Label>
                                                <Col sm={12}>
                                                    <Input
                                                        // type="email"
                                                        name="First Name"
                                                        placeholder="with a placeholder"
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col xl={6}>
                                            <FormGroup>
                                                <Label for="examplePassword" sm={5}>
                                                    Phone Number
                                            </Label>
                                                <Col sm={12}>
                                                    <Input
                                                        // type="password"
                                                        name="Last Name"
                                                        placeholder="password placeholder"
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={6}>
                                            <FormGroup >
                                                <Label for="exampleEmail" sm={5}>
                                                    Birthdate
                                            </Label>
                                                <Col sm={12}>
                                                    <Input
                                                        disabled
                                                        // type="email"
                                                        name="First Name"
                                                        placeholder="BirthDate"
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col xl={6}>
                                            <FormGroup>
                                                <Label for="exampleSelect" sm={5}>
                                                    Gender
                                            </Label>
                                                <Col sm={12}>
                                                    <Input type="select" name="select">
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                    </Input>

                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>

                                        <Col xl={4}>
                                            <FormGroup>
                                                <Label for="exampleSelect" sm={5}>
                                                    Department
                                            </Label>
                                                <Col sm={12}>

                                                    <Input type="select" name="select">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>5</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </Input>

                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col xl={4}>
                                            <FormGroup>
                                                <Label for="exampleSelect" sm={5}>
                                                    Role
                                            </Label>
                                                <Col sm={12}>

                                                    <Input type="select" name="select">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>5</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </Input>

                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col xl={4}>
                                            <FormGroup>
                                                <Label for="exampleSelect" sm={5}>
                                                    Level
                                            </Label>
                                                <Col sm={12}>

                                                    <Input type="select" name="select">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>5</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </Input>

                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xl={6}>
                                            <FormGroup >
                                                <Label for="exampleEmail" sm={5}>
                                                    Hired Date
                                            </Label>
                                                <Col sm={12}>
                                                    <Input
                                                        disabled
                                                        // type="email"
                                                        name="First Name"
                                                        placeholder="BirthDate"
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col xl={6}>
                                            <FormGroup>
                                                <Label for="exampleSelect" sm={5}>
                                                    Term Of Employment
                                            </Label>
                                                <Col sm={12}>
                                                    <Input type="select" name="select">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>5</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </Input>

                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>

                                        <Col xl={4}>
                                            <FormGroup>
                                                <Label for="exampleSelect" sm={5}>
                                                    Country
        </Label>
                                                <Col sm={12}>

                                                    <Input type="select" name="select">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>5</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </Input>

                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col xl={4}>
                                            <FormGroup>
                                                <Label for="exampleSelect" sm={5}>
                                                    Region
        </Label>
                                                <Col sm={12}>

                                                    <Input type="select" name="select">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>5</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </Input>

                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col xl={4}>
                                            <FormGroup>
                                                <Label for="exampleSelect" sm={5}>
                                                    City
        </Label>
                                                <Col sm={12}>

                                                    <Input type="select" name="select">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>5</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </Input>

                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <FormGroup row align='center'>
                                        <Col>
                                            <Button>Submit</Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>

                </Page>

                {/* <AllEmployeesPage /> */}
            </>

        );
    }
}

export default AddEmployee;