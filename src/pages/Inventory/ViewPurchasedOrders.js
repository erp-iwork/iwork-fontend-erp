import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap';
import { MdAssignment } from "react-icons/md";
import { getPurchasedItems } from '../../store/inventory/action'
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import routes from '../../config/routes'
import { Link } from 'react-router-dom'

const Order = ({ order, index, handleApprove }) => {
    return (
        <tbody>
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{order.suplier.suplierName}</td>
                <td>{order.salesPerson}</td>
                <td>{order.shipmentAddress}</td>
                <td>{order.status}</td>
                <td>
                    {order.status === "Issued" ?
                        <Link to={{ pathname: routes.SivPage, state: { order: order.orderNumber } }}>
                            <Button size='sm' color='primary'>
                                <MdAssignment /> SIV Issued
                        </Button>
                        </Link> :
                        <Button size='sm' color='primary' onClick={() => handleApprove(order.orderNumber)}>
                            <MdAssignment /> Approve
                    </Button>
                    }
                </td>
                <td>
                    <Link to={{ pathname: routes.ViewSingleOrderPage, state: order }}>
                        <Button size='sm' color='primary'>
                            See Order
                        </Button>
                    </Link>
                </td>
            </tr>
        </tbody>
    )
}

class ViewPurchasedItems extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getPurchasedItems()
    }

    render() {
        if (this.props.loading_items) return <PageSpinner />
        console.log(this.props.items)
        return (
            <Page title="Inventory" breadcrumbs={[{ name: 'Purchased Items', active: true }]}>
                <Card className="mb-3">
                    <CardHeader>Purchased Items</CardHeader>
                    <CardBody>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Order #</th> 
                                    <th>Supplier</th>
                                    <th>Recieved By</th>
                                    <th>Warehouse Name</th>
                                    <th>Status</th>
                                    <th>Generate GRV</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>Shipment Address</td>
                                    <th>
                                        <Button size='sm' color='primary'>
                                            <MdAssignment /> Recieved
                                        </Button>
                                    </th>
                                    <td>Actions</td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading_items: state.inventoryReducer.loading_items,
        items: state.inventoryReducer.items
    }
}

export default connect(mapStateToProps, { getPurchasedItems })(ViewPurchasedItems)