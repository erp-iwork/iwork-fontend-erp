import React, { Component } from 'react';
import Page from '../../components/Page';
import {
    Card, CardBody, CardHeader, Button, Table, Modal,
    ModalHeader, ModalBody, ModalFooter, Row, Col
} from 'reactstrap';
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import { getAllMasterData, deleteMasterData } from '../../store/company/action'
import { getExistingCategories } from '../../store/inventory/action'
import { reverse } from '../../useCases'
import { MdDelete, MdRemoveRedEye } from "react-icons/md"

const Data = ({ item, index, toggle, deleteMasterData }) => {
    return (
        <tbody>
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{item.productName}</td>
                <td>{item.productType}</td>
                <td>{item.productCategory}</td>
                <td>{item.productPrice}</td>
                <td>{item.unitOfMeasurement}</td>
                <td>
                    <Row>
                        <Button style={{ margin: '10px' }} onClick={() => toggle(item)} color='primary' size='sm' >
                            <MdRemoveRedEye />
                        </Button>
                        <Button style={{ margin: '10px' }} color='danger' size='sm' onClick={() => deleteMasterData(item.productId)} className='spacing'>
                            <MdDelete />
                        </Button>
                    </Row>
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
        this.props.getAllMasterData()
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
        console.log(this.props.loading_manufactured_orders)
        if (this.props.loading || this.props.loading_categories) return <PageSpinner />
        if (this.props.masterData.length === 0) return <h2>No products to show</h2>
        const { data } = this.state
        return (
            <Page
                title="All Master Data"
                breadcrumbs={[{ name: 'Finance', active: true }]}
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
                        <Row><Col>Unit Price:</Col><Col><b>{data.productPrice}</b></Col></Row>
                        <Row><Col>Cost Price:</Col><Col><b>{data.cost}</b></Col></Row>
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
                                    <th>Unit Price</th>
                                    <th>UoM</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {reverse(this.props.masterData).map((item, index) => (
                                <Data item={item} key={index} index={index} toggle={this.toggle} deleteMasterData={this.props.deleteMasterData} />
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
        masterData: state.companyReducer.masterData,
        loading_manufactured_orders: state.companyReducer.loading_manufactured_orders,
        searchValue: state.searchData.value
    }
}
const mapDispatchToProps = { getAllMasterData, getExistingCategories, deleteMasterData }

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllMasterData)