import React, { Component } from 'react';
import {
    Card, CardBody, CardHeader, Col, Table, Button, Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';
import Page from '../../components/Page';
import { getItemsByCategory } from '../../store/inventory/action'
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux' 

class ViewAllItems extends Component {
    state = {
        modal: false,
        modal_backdrop: false,
        modal_nested_parent: false,
        modal_nested: false,
        backdrop: true,
    };

    toggle = modalType => () => {
        if (!modalType) {
            return this.setState({
                modal: !this.state.modal,
            });
        }

        this.setState({
            [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
        });
    };

    componentDidMount() {
        this.props.getItemsByCategory(this.props.location.state)
    }

    render() {
        if (this.props.loading_items) return <PageSpinner />
        if (this.props.items.item_catagory.length === 0) return <h2>No items in this Category yet</h2>
        return (
            <Page
                title="Inventory"
                breadcrumbs={[{ name: 'All Items', active: true }]}
                className="TablePage">
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle()}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle()}>Modal title</ModalHeader>
                    <ModalBody>
                        Create An Account For <b>Mark</b> as a Something!!
                  </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle()}>
                            Cancel
                    </Button>{' '}
                        <Button color="primary" onClick={this.toggle()}>
                            Create
                    </Button>
                    </ModalFooter>
                </Modal>

                <Col>
                    <Card className="mb-4">
                        <CardHeader>Inventory Status</CardHeader>
                        <CardBody>
                            <Table responsive>
                                <thead>
                                    <tr align='left'>
                                        <th>#</th>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Retail Price</th>
                                        <th>Unit</th>
                                        <th>Product Type</th>
                                        <th>Category</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.items.item_catagory.map((item, index) => (
                                        <tr align='left'>
                                            <th scope="row">1</th>
                                            <td>{item.itemName}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.retailPrice}</td>
                                            <td>{item.unitOfMeasurement}</td>
                                            <td>{item.productType}</td>
                                            <td>{item.catagory.catagory}</td>
                                            <td>
                                                <Button size='sm' color='primary'>
                                                    See More
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading_items: state.inventoryReducer.loading_items,
        items: state.inventoryReducer.items,
        success: state.inventoryReducer.success
    }
}

export default connect(mapStateToProps, { getItemsByCategory })(ViewAllItems)