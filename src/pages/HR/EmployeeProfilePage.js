import React, { Component } from 'react';
import Page from '../../components/Page';
import { Col, Row, Card, CardImg, CardBody, CardText, Button, CardTitle } from 'reactstrap';
import './HR.scss'
import bg11Image from '../../assets/img/bg/background_1920-11.jpg';


class EmployeeProfilePage extends Component {
    state = {}
    render() {
        return (
            <Page
                title="Employee Profile"
                breadcrumbs={[{ name: 'Employee Profile', active: true }]}
                className="TablePage"
            >
                <hr></hr>
                <Row md={12} sm={12}>
                    <Col md={4} sm={12} align='center'>
                        <Card className='personalInformation'>
                            <CardImg
                                align='center'
                                src={bg11Image}
                                style={{ width: 'auto', height: 200 }}
                            />
                            <CardBody className="d-flex justify-content-between align-items-center">
                                <CardText style={{ paddingTop: 10 }}>Yohannes Berhanu</CardText>
                                <Button outline color="primary">
                                    Edit/Delete
                            </Button>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={8} sm={12}>
                        <Card className='additionalInformation'>
                            <CardTitle color="primary">Additional Information</CardTitle>
                            <hr />
                            <Row>
                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        First-Name : <b>Yohannes</b>
                                    </CardBody>
                                </Col>

                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Last-Name : <b>Berhanu</b>
                                    </CardBody>
                                </Col>

                            </Row>
                            <Row>
                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Email : <b>JohnLights51@gmail.com</b>
                                    </CardBody>
                                </Col>
                                <Col sm={12} md={6}>

                                    <CardBody className='titleValue'>
                                        Phone-Number  :  <b>+251-921-25-8848</b>
                                    </CardBody>

                                </Col>
                            </Row>

                            <Row>
                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        BirthDate : <b>Something</b>
                                    </CardBody>
                                </Col>

                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Gender : <b>Berhanu</b>
                                    </CardBody>
                                </Col>

                            </Row>
                            <Row>
                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Department : <b>JohnLights51@gmail.com</b>
                                    </CardBody>
                                </Col>
                                <Col sm={12} md={6}>

                                    <CardBody className='titleValue'>
                                        Role  :  <b>+251-921-25-8848</b>
                                    </CardBody>

                                </Col>
                            </Row>


                            <Row>
                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Level : <b>Something</b>
                                    </CardBody>
                                </Col>

                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Hired-Date : <b>Berhanu</b>
                                    </CardBody>
                                </Col>

                            </Row>
                            <Row>
                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Employment-Type : <b>Contractual</b>
                                    </CardBody>
                                </Col>
                                <Col sm={12} md={6}>

                                    <CardBody className='titleValue'>
                                        Country  :  <b>+251-921-25-8848</b>
                                    </CardBody>

                                </Col>
                            </Row>

                            <Row>
                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Region : <b>JohnLights51@gmail.com</b>
                                    </CardBody>
                                </Col>
                                <Col sm={12} md={6}>

                                    <CardBody className='titleValue'>
                                        City  :  <b>+251-921-25-8848</b>
                                    </CardBody>

                                </Col>
                            </Row>

                            <Row>
                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Has-Account : <b>JohnLights51@gmail.com</b>
                                    </CardBody>
                                </Col>

                            </Row>



                        </Card>
                    </Col>
                </Row>
            </Page>
        );
    }
}

export default EmployeeProfilePage;