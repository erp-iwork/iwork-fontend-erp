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
        if (!employeeInfos.firstName) return <PageSpinner />
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
                            <Row>
                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        First-Name : <b>{employeeInfos.firstName}</b>
                                    </CardBody>
                                </Col>
                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Last-Name : <b>{employeeInfos.lastName}</b>
                                    </CardBody>
                                </Col>

                            </Row>
                            <Row>
                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Email : <b>{employeeInfos.lastName}</b>
                                    </CardBody>
                                </Col>
                                <Col sm={12} md={6}>

                                    <CardBody className='titleValue'>
                                        Phone-Number  :  <b>{employeeInfos.telephone}</b>
                                    </CardBody>

                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        BirthDate : <b>{employeeInfos.birthDate}</b>
                                    </CardBody>
                                </Col>

                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Gender : <b>M</b>
                                    </CardBody>
                                </Col>

                            </Row>
                            <Row>
                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Department : <b>{employeeInfos.department}</b>
                                    </CardBody>
                                </Col>
                                <Col sm={12} md={6}>

                                    <CardBody className='titleValue'>
                                        Role  :  <b>{employeeInfos.roles}</b>
                                    </CardBody>

                                </Col>
                            </Row>


                            <Row>
                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Level : <b>{employeeInfos.level}</b>
                                    </CardBody>
                                </Col>

                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Hired-Date : <b>{employeeInfos.hiredDate}</b>
                                    </CardBody>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Employment-Type : <b>{employeeInfos.termOfEmployment}</b>
                                    </CardBody>
                                </Col>
                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Country  :  <b>{employeeInfos.country}</b>
                                    </CardBody>

                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Region : <b>{employeeInfos.region}</b>
                                    </CardBody>
                                </Col>
                                <Col sm={12} md={6}>

                                    <CardBody className='titleValue'>
                                        City  :  <b>{employeeInfos.city}</b>
                                    </CardBody>

                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={6}>
                                    <CardBody className='titleValue'>
                                        Has-Account : <b>{employeeInfos.has_account ? "Yes" : "No"}</b>
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