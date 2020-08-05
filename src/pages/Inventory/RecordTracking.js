import React, { useEffect } from 'react'
import Page from '../../components/Page'
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap'
import { getRecords } from '../../store/inventory/action'
import { updateFilter } from '../../store/search/action'
import PageSpinner from '../../components/PageSpinner'
import { connect } from 'react-redux'
import { filter as filterRecords, getCount } from '../../useCases'
import { getDateFormat } from '../../useCases/getDateFormat'
import filters from '../../constant/filters'

const RecordTracking = ({ loading_records, records, getRecords, filter, updateFilter, searchValue }) => {
    var _records = []
    useEffect(() => {
        getRecords()
        updateFilter('Type', null)
        updateFilter(filters.ADVANCED_DATE, null)
    }, [getRecords, updateFilter])

    if (loading_records) return <PageSpinner />

    for (var item in records) {
        _records.push(records[item])
    }

    const filtered = filterRecords({
        name: { value: searchValue, tag: 'productName' },
        type: { value: filter[filters.RECORD], tag: 'transactionType' },
        date: { value: filter[filters.DATE._type], tag: 'transactionDate' },
        advancedDate: { value: filter[filters.ADVANCED_DATE], tag: 'transactionDate' }
    }, _records)

    return (
        <Page
            title="Record Tracking"
            breadcrumbs={[{ name: 'Inventory', active: true }]}
            hasFilter={true}
            isInventory={true}
            hasAdvancedDate={true}
        >
            <Row>
                <Col>
                    <Card className="mb-3">
                        <CardHeader>Received Items</CardHeader>
                        <CardBody>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>TID</th>
                                        <th>SKU</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Product Category</th>
                                        <th>Order ID</th>
                                        <th>Amount</th>
                                        <th>Transaction Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered ? filtered.splice(0).reverse().map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.transactionId}</td>
                                            <td>{item.productId}</td>
                                            <td>{item.productName}</td>
                                            <td>{item.purchaseQuantity}</td>
                                            <td>{item.itemCost}</td>
                                            <td>{item.productCategory}</td>
                                            <td>{getCount(item.orderId)}</td>
                                            <td>{item.amount}</td>
                                            <td>{getDateFormat(item.transactionDate)}</td>
                                        </tr>
                                    )) : null}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Page>
    )
}


const mapStateToProps = (state) => {
    return {
        loading_records: state.inventoryReducer.loading_records,
        records: state.inventoryReducer.records,
        filter: state.searchData.filter,
        searchValue: state.searchData.value
    }
}

export default connect(mapStateToProps, { getRecords, updateFilter })(RecordTracking)