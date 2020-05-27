import React, { Component } from 'react';
import Page from '../../components/Page';
import { Col, Row, Card, CardImg, CardBody, CardText, Button, CardTitle } from 'reactstrap';
import './HR.scss'
import bg11Image from '../../assets/img/bg/background_1920-11.jpg';
import { connect } from "react-redux"
import actions from '../../store/hr/action'
import PageSpinner from '../../components/PageSpinner'

class EmployeeProfilePage extends Component {
    componentDidMount = () => {
        const employeId = this.props.location.state;
        this.props.getEmployeDetail(employeId)
    }
    render() {
        const employeeInfos = this.props.employee
        console.log(employeeInfos)
        console.log(employeeInfos)
        if (!employeeInfos.firstName) return <PageSpinner />
        return (
            <Page
                title="Human Resource"
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
                                <CardText style={{ paddingTop: 10 }}>{employeeInfos.firstName + ' ' + employeeInfos.lastName}</CardText>
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
                            <CardBody>

                                <Row>
                                    <Col sm={12} md={6}>
                                        <Row>
                                            <Col md={5}>

                                                First Name :
                                        </Col>
                                            <Col>
                                                <b>{employeeInfos.firstName}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={12} md={6}>
                                        <Row>
                                            <Col md={6}>
                                                Last Name :
                                        </Col>
                                            <Col>
                                                <b>{employeeInfos.lastName}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} md={6}>
                                        <Row>
                                            <Col md={5}>
                                                Email :
                                        </Col>
                                            <Col>
                                                <b>{employeeInfos.email}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={12} md={6}>
                                        <Row>
                                            <Col md={6}>
                                                Phone Number :
                                        </Col>
                                            <Col>
                                                <b>{employeeInfos.telephone}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} md={6}>
                                        <Row>
                                            <Col md={5}>
                                                BirthDate :
                                        </Col>
                                            <Col>
                                                <b>{employeeInfos.birthDate}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={12} md={6}>
                                        <Row>
                                            <Col md={6}>
                                                Gender :
                                        </Col>
                                            <Col>
                                                {/* <b>{employeeInfos.Male}</b> */}
                                                <b>Male</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} md={6}>
                                        <Row>
                                            <Col md={5}>
                                                Department :
                                        </Col>
                                            <Col>
                                                <b>{employeeInfos.department.departmentName}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={12} md={6}>
                                        <Row>
                                            <Col md={6}>
                                                Role :
                                        </Col>
                                            <Col>
                                                <b>{employeeInfos.roles.role}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} md={6}>
                                        <Row>
                                            <Col md={5}>
                                                Level :
                                        </Col>
                                            <Col>
                                                <b>{employeeInfos.level.level}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={12} md={6}>
                                        <Row>
                                            <Col md={6}>
                                                Hired Date :
                                        </Col>
                                            <Col>
                                                <b>{employeeInfos.hiredDate}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} md={6}>
                                        <Row>
                                            <Col md={5}>
                                                Employment Type :
                                        </Col>
                                            <Col>
                                                <b>{employeeInfos.termOfEmployment}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={12} md={6}>
                                        <Row>
                                            <Col md={6}>
                                                Country :
                                        </Col>
                                            <Col>
                                                <b>{employeeInfos.country}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} md={6}>
                                        <Row>
                                            <Col md={5}>
                                                Region :
                                        </Col>
                                            <Col>
                                                <b>{employeeInfos.region}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={12} md={6}>
                                        <Row>
                                            <Col md={6}>
                                                City :
                                        </Col>
                                            <Col>
                                                <b>{employeeInfos.city}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} md={6}>
                                        <Row>
                                            <Col md={6}>
                                                Has Account :
                                        </Col>
                                            <Col>
                                                <b>{employeeInfos.has_account ? "Yes" : "No"}</b>
                                            </Col>
                                        </Row>
                                        {/* Has-Account : <b>{employeeInfos.has_account ? "Yes" : "No"}</b> */}
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.hrReducer.loading,
        users: state.hrReducer.users,
        employee: state.hrReducer.employee,
        errors: state.hrReducer.errors,
    }
}
const mapDispatchToProps = {
    getEmployeDetail: actions.getEmployeDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeProfilePage)