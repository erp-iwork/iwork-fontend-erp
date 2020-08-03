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
import './Finance.scss'
import Error from '../../components/error'
import { connect } from 'react-redux'
import { addSupplier, getSupplier } from '../../store/company/action'
import Loader from '../../components/loader'
import PageSpinner from '../../components/PageSpinner'
import ViewAllSuppliers from './viewAllSuppliersPage'
// import { changeMessage } from '../../components/Layout/MainLayout'
class AddSupplierPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: "",
            generalManger: "",
            contactPerson: "",
            workingField: "",
            paymentOption: "VAT 15% purchase",
            email: "",
            tinNumber: "",
            companys: [],
            loading: 0,
            update: false,
            lockPage: false,
            show: false,
        }
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateSuppliers = this.updateSuppliers.bind(this)
        this.toggle = this.toggle.bind(this)
    }
    componentDidMount() {
        this.props.getSupplier()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.success && !this.state.lockPage) {
            this.setState({
                companyName: "",
                generalManger: "",
                contactPerson: "",
                workingField: "",
                paymentOption: "VAT 15% purchase",
                email: "",
                tinNumber: "",
                show: false,
                lockPage: true
            })
        }
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }
    updateSuppliers(noLoading) {
        this.props.getSupplier(noLoading)
    }
    submit = async (e) => {
        e.preventDefault();
        const newCompany = {
            suplierName: this.state.companyName,
            generalManger: this.state.generalManger,
            contactPerson: this.state.contactPerson,
            workingField: this.state.workingField,
            paymentOption: this.state.paymentOption,
            email: this.state.email,
            tinNumber: this.state.tinNumber
        }
        this.props.addSupplier(newCompany).then(res => this.setState({ lockPage: false }))
    }

    toggle = () => this.setState({ show: !this.state.show })


    render() {
        if (this.props.loading) return <PageSpinner />
        const {
            companyName, generalManger, contactPerson, email,
            tinNumber, workingField
        } = this.state
        return (
            <Page title="Add Supplier" breadcrumbs={[{ name: 'Finance', active: true }]}>
                <Col md={12} className='padding'>
                    <Card>
                        <CardHeader>ADD A NEW SUPPLIER TO WORK WITH</CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <FormGroup>
                                            <Label for="exampleEmail" sm={12}>
                                                Supplier Name
                                    </Label>
                                            <Col sm={12}>
                                                <Input placeholder="Enter Supplier Name" name="companyName" onChange={this.handleChange} value={companyName} />
                                                <Error
                                                    error={
                                                        this.props.errors.suplierName
                                                            ? this.props.errors.suplierName
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
                                                <Input placeholder="General Manager" name="generalManger" onChange={this.handleChange} value={generalManger} />
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
                                                    placeholder="Contact Person" name="contactPerson" onChange={this.handleChange}
                                                    value={contactPerson}
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
                                                Supplier Email
                                    </Label>
                                            <Col sm={12}>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Supplier Email"
                                                    onChange={this.handleChange}
                                                    value={email}
                                                />
                                                <Error
                                                    error={
                                                        this.props.errors.email ? this.props.errors.email : null
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label sm={12} for="exampleSelect">Tax</Label>
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
                                        <Button color='primary' type='submit' onClick={this.submit}>
                                            {this.props.loading_add_supplier ? <Loader /> : "Add Supplier"}
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <ViewAllSuppliers lists={this.props.suppliers} />
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
    loading_add_supplier: state.companyReducer.loading_add_supplier,
    loading: state.companyReducer.loading,
    suppliers: state.companyReducer.suppliers,
    errors: state.companyReducer.errors,
    success: state.companyReducer.success
})

export default connect(mapStateToProps, { addSupplier, getSupplier })(AddSupplierPage)