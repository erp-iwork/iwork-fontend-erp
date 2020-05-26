import React, { Component } from 'react';
import Page from '../../components/Page';
import { Card, CardHeader, CardBody } from 'reactstrap';

class ViewSingleItemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Page
                title="Inventory"
                breadcrumbs={[{ name: 'Single Item Page', active: true }]}
                className=""
            >
                <Card>
                    <CardHeader>
                        ITEM id Goes here
                    </CardHeader>
                    <CardBody>

                        ITEM id Goes here
                    </CardBody>
                </Card>

            </Page>
        );
    }
}

export default ViewSingleItemPage;