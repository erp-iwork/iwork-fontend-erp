import React, { Component } from 'react';
import {
    Card, CardBody, CardHeader, Col, Table, Button, Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';
import Page from '../../components/Page';
import { MdCheckCircle } from "react-icons/md";


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
    render() {
        return (
            <Page
                title="All Items"
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
                                    <tr>
                                        <th>#</th>
                                        <th>Item ID</th>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Retail Price</th>
                                        <th>Packaging</th>
                                        <th>Warehouse Name</th>
                                        <th>Discount</th>
                                        <th>Category</th>
                                        <th>Actions</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Johnlights51@gmail.com</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        <td>Johnlights51@gmail.com</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>
                                            <Button size='sm' color='primary'>
                                                See More
                                                </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Otto</td>
                                        <td>Johnlights51@gmail.com</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        <td>Johnlights51@gmail.com</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>
                                            <Button size='sm' color='primary'>
                                                See More
                                                </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Page>
        );
    }
}

export default ViewAllItems;