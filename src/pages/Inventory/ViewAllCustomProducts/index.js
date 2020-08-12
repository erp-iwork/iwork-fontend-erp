import React, { useState, useEffect } from 'react'
import Page from '../../../components/Page'
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap'
import { getAllCustomProducts } from './functions/getAllCustomProducts'
import { getCount } from '../../../useCases'
import { getDateFormat } from '../../../useCases/getDateFormat'

const ViewAllCustomProducts = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getAllCustomProducts()
            setProducts(fetchedProducts)
        }

        fetchProducts()
    }, [getAllCustomProducts])

    return (
        <Page
            title="Exports"
            breadcrumbs={[{ name: 'Inventory', active: true }]}
        >
            <Row>
                <Col>
                    <Card className="mb-3">
                        <CardHeader>Exports</CardHeader>
                        <CardBody>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product Name</th>
                                        <th>Order ID</th>
                                        <th>Amount</th>
                                        <th>Percentile</th>
                                        <th>End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, idx) => (
                                        <tr>
                                            <td>{idx + 1}</td>
                                            <td>{product.productName}</td>
                                            <td>{getCount(product.orderID)}</td>
                                            <td>{product.amount}</td>
                                            <td>{product.percentile}%</td>
                                            <td>{getDateFormat(product.endDate)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Page>
    )
}

export default ViewAllCustomProducts