import React, { Component } from 'react';
import Page from "../../components/Page";

class CreateOrderManufacturingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Page
                title="Manufacturing"
                breadcrumbs={[{ name: 'Create Order', active: true }]}
                className="TablePage">

            </Page>
        );
    }
}

export default CreateOrderManufacturingPage;