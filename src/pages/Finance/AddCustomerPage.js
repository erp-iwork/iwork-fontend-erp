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
import AllCustomers from "./viewAllCutomersPage"
import './Finance.scss'
import Error from '../../components/error'
import { connect } from 'react-redux'
import { addCompany, getCompany } from '../../store/company/action'
import Loader from '../../components/loader'
import PageSpinner from '../../components/PageSpinner'

class AddCustomerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: "",
            generalManger: "",
            contactPerson: "",
            workingField: "",
            paymentOption: "VAT 15% sales",
            email: "",
            tinNumber: "",
            companys: [],
            loading: 0,
            update: false,
            lockPage: false
        }
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.getCompany()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.success && !this.state.lockPage) {
            this.setState({
              companyName: "",
              generalManger: "",
              contactPerson: "",
              workingField: "",
              paymentOption: "VAT 15% sales",
              email: "",
              tinNumber: "",
              lockPage: true
            })
          }
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    submit = async (e) => {
        e.preventDefault();
        const newCompany = {
            customerName: this.state.companyName,
            generalManger: this.state.generalManger,
            contactPerson: this.state.contactPerson,
            workingField: this.state.workingField,
            paymentOption: this.state.paymentOption,
            email: this.state.email,
            tinNumber: this.state.tinNumber
        }
        this.props.addCompany(newCompany).then(res => {
            this.setState({ lockPage: false })
        })
    }

    render() {
        if (this.props.loading) return <PageSpinner />
        const { companyName, generalManger, contactPerson, workingField, email, tinNumber } = this.state
        return (
            <Page title="Add Customer" breadcrumbs={[{ name: 'Finance', active: true }]}>
                <Col lg={12} md={12} className='padding'>
                    <Card>
                        <CardHeader>ADD A NEW CUSTOMER TO WORK WITH</CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <FormGroup>
                                            <Label for="exampleEmail" sm={12}>Customer Name</Label>
                                            <Col sm={12}>
                                                <Input placeholder="Enter Customer Name" value={companyName} name="companyName" onChange={this.handleChange} />
                                                <Error
                                                    error={
                                                    this.props.errors.customerName
                                                        ? this.props.errors.customerName
                                                        : null
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="examplePassword" sm={12}>
                                                General Manager
                                            </Label>
                                            <Col sm={12}>
                                                <Input placeholder="General Manager" value={generalManger} name="generalManger" onChange={this.handleChange} />
                                                <Error
                                                    error={
                                                    this.props.errors.generalManger
                                                        ? this.props.errors.generalManger
                                                        : null
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="examplePassword" sm={12}>Contact Person</Label>
                                            <Col sm={12}>
                                                <Input
                                                    placeholder="Contact Person" value={contactPerson} name="contactPerson" onChange={this.handleChange}
                                                />
                                            </Col>
                                            <Error
                                                error={
                                                this.props.errors.contactPerson
                                                    ? this.props.errors.contactPerson
                                                    : null
                                                }
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="examplePassword" sm={12}>
                                                Tin Number
                                    </Label>
                                            <Col sm={12}>
                                                <Input
                                                    type="number"
                                                    placeholder="Tin Number"
                                                    name="tinNumber"
                                                    onChange={this.handleChange}
                                                    value={tinNumber}
                                                />
                                                <Error
                                                    error={
                                                        this.props.errors.tinNumber
                                                        ? this.props.errors.tinNumber
                                                        : null
                                                    }
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
                                                    value={email}
                                                    onChange={this.handleChange}
                                                />
                                                <Error
                                                    error={
                                                    this.props.errors.email ? this.props.errors.email : null
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label sm={12} for="exampleSelect">Payment Option</Label>
                                            <Col>
                                                <Input value={this.state.paymentOption} disabled />
                                                <Error
                                                    error={
                                                        this.props.errors.paymentOption
                                                        ? this.props.errors.paymentOption
                                                        : null
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="examplePassword" sm={12}>Industry</Label>
                                            <Col sm={12}>
                                                <Input
                                                    placeholder="Industry"
                                                    name="workingField"
                                                    onChange={this.handleChange}
                                                    value={workingField}
                                                />
                                                <Error
                                                    error={
                                                    this.props.errors.workingField
                                                        ? this.props.errors.workingField
                                                        : null
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup >
                                    <Col align='center'>
                                        <Button color='primary' onClick={this.submit}>
                                            {this.props.loading_add_customer? <Loader /> : "Add Customer"}
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <AllCustomers lists={this.props.companys} update={this.state.update} />
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
    loading_add_customer: state.companyReducer.loading_add_customer,
    loading: state.companyReducer.loading,
    companys: state.companyReducer.companys,
    errors: state.companyReducer.errors,
    success: state.companyReducer.success
})

export default connect(mapStateToProps, { addCompany, getCompany })(AddCustomerPage)