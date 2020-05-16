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
                                    <Row>
                                        <CardBody>
                                            First Name :
                                        </CardBody>
                                        <CardBody align='right'>
                                            <b>Yohannes</b>
                                        </CardBody>
                                    </Row>
                                </Col>
                                <Col sm={12} md={6}>
                                    <Row>
                                        <CardBody>
                                            Last Name :
                                        </CardBody>
                                        <CardBody align='right'>
                                            <b>Berhanu</b>
                                        </CardBody>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={6}>
                                    <Row>
                                        <CardBody>
                                            Email :
                                        </CardBody>
                                        <CardBody align='right'>
                                            <b>JohnLights51@gmail.com</b>
                                        </CardBody>
                                    </Row>
                                </Col>
                                <Col sm={12} md={6}>
                                    <Row>
                                        <CardBody>
                                            Phone Number :
                                        </CardBody>
                                        <CardBody align='right'>
                                            <b>+251 921 25 8848</b>
                                        </CardBody>
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={12} md={6}>
                                    <Row>
                                        <CardBody>
                                            Gender :
                                        </CardBody>
                                        <CardBody align='right'>
                                            <b>Male</b>
                                        </CardBody>
                                    </Row>
                                </Col>
                                <Col sm={12} md={6}>
                                    <Row>
                                        <CardBody>
                                            Age:
                                        </CardBody>
                                        <CardBody align='right'>
                                            <b>34</b>
                                        </CardBody>
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={12} md={6}>
                                    <Row>
                                        <CardBody>
                                            Department :
                                        </CardBody>
                                        <CardBody align='right'>
                                            <b>Logistics</b>
                                        </CardBody>
                                    </Row>
                                </Col>
                                <Col sm={12} md={6}>
                                    <Row>
                                        <CardBody>
                                            Role:
                                        </CardBody>
                                        <CardBody align='right'>
                                            <b>Warehouse Manager</b>
                                        </CardBody>
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={12} md={6}>
                                    <Row>
                                        <CardBody>
                                            Level :
                                        </CardBody>
                                        <CardBody align='right'>
                                            <b>Manager</b>
                                        </CardBody>
                                    </Row>
                                </Col>
                                <Col sm={12} md={6}>
                                    <Row>
                                        <CardBody>
                                            Hired Date:
                                        </CardBody>
                                        <CardBody align='right'>
                                            <b>11/12/2006</b>
                                        </CardBody>
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={12} md={6}>
                                    <Row>
                                        <CardBody>
                                            Term Of Employment :
                                        </CardBody>
                                        <CardBody align='right'>
                                            <b>Permanent</b>
                                        </CardBody>
                                    </Row>
                                </Col>
                                <Col sm={12} md={6}>
                                    <Row>
                                        <CardBody>
                                            Country:
                                        </CardBody>
                                        <CardBody align='right'>
                                            <b>Ethiopia</b>
                                        </CardBody>
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={12} md={6}>
                                    <Row>
                                        <CardBody>
                                            Region :
                                        </CardBody>
                                        <CardBody align='right'>
                                            <b>Somewhere</b>
                                        </CardBody>
                                    </Row>
                                </Col>
                                <Col sm={12} md={6}>
                                    <Row>
                                        <CardBody>
                                            City:
                                        </CardBody>
                                        <CardBody align='right'>
                                            <b>Addis-Ababa</b>
                                        </CardBody>
                                    </Row>
                                </Col>

                            </Row>

                            <Row>
                                <Col sm={12} md={6}>
                                    <Row>
                                        <CardBody>
                                            Has Account :
                                        </CardBody>
                                        <CardBody align='right'>
                                            <b>Yes</b>
                                        </CardBody>
                                    </Row>
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