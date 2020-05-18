import React, { Component } from 'react';
import Page from '../../components/Page';

class ViewAllOrdersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Page
                title="Orders"
                breadcrumbs={[{ name: 'All Orders', active: true }]}
                className="TablePage">

            </Page>
        );
    }
}

export default ViewAllOrdersPage;