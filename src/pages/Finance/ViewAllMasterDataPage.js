import React, { Component } from 'react';
import Page from '../../components/Page';
import {
    Card, CardBody, CardHeader, Button, Table, Modal,
    ModalHeader, ModalBody, ModalFooter, Row, Col
} from 'reactstrap';
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import { getMasterData } from '../../store/company/action'
import { getExistingCategories } from '../../store/inventory/action'

const Data = ({ item, index, toggle, category }) => {
    return (
        <tbody>
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{item.productName}</td>
                <td>{item.productType}</td>
                <td>{category(item.productCategory)}</td>
                <td>{item.productPrice}</td>
                <td>{item.unitOfMeasurement}</td>
                <td>
                    <Button size='sm' color='primary' onClick={() => toggle(item)} >
                        See Product
                    </Button>
                </td>
            </tr>
        </tbody>
    )
}

class ViewAllMasterData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            data: { productName: '', productType: '', productCategory: '', productPrice: '', unitOfMeasurement: '' }
        }
        this.toggle = this.toggle.bind(this)
        this.getCategory = this.getCategory.bind(this)
    }

    componentDidMount() {
        this.props.getExistingCategories()
        this.props.getMasterData()
    }

    toggle = (data) => {
        return this.setState({
            modal: !this.state.modal,
            data: !this.state.modal ? data : this.state.data
        })
    }

    getCategory = (id) => {
        const found = this.props.categories.find(item => item.catagoryId === id)
        return found.catagory
    }

    render() {
        if (this.props.loading || this.props.loading_categories) return <PageSpinner />
        if (this.props.masterData.length === 0) return <h2>No products to show</h2>
        const { data } = this.state
        return (
            <Page
                title="Finance"
                breadcrumbs={[{ name: 'All Master Data', active: true }]}
                className="TablePage">
                <Modal
                    isOpen={this.state.modal}
                    backdrop="static"
                    className={this.props.className}>
                    <ModalHeader>
                        <b>Product Information</b>
                    </ModalHeader>
                    <ModalBody>
                        <Row><Col>Product Name:</Col><Col><b>{data.productName}</b></Col></Row>
                        <Row><Col>Category:</Col><Col><b>{data.productCategory}</b></Col></Row>
                        <Row><Col>Type:</Col><Col><b>{data.productType}</b></Col></Row>
                        <Row><Col>Price:</Col><Col><b>{data.productPrice}</b></Col></Row>
                        <Row><Col>Unit of Measurement:</Col><Col><b>{data.unitOfMeasurement}</b></Col></Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={() => this.toggle()}>
                            Close
                      </Button>
                    </ModalFooter>
                </Modal>
                <Card className="mb-3">
                    <CardHeader>All Products</CardHeader>
                    <CardBody>
                        <Table responsive >
                            <thead>
                                <tr align='left'>
                                    <th>ID #</th>
                                    <th>Product Name</th>
                                    <th>Product Type</th>
                                    <th>Product Category</th>
                                    <th>Product Price</th>
                                    <th>Unit of Measurement</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {this.props.masterData.slice(0).reverse().map((item, index) => (
                                <Data item={item} key={index} index={index} toggle={this.toggle} category={this.getCategory} />
                            ))}
                        </Table>
                    </CardBody>
                </Card>
            </Page>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        categories: state.inventoryReducer.categories,
        loading_categories: state.inventoryReducer.loading_categories,
        loading: state.companyReducer.loading,
        masterData: state.companyReducer.masterData
    }
}
const mapDispatchToProps = { getMasterData, getExistingCategories }

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllMasterData)