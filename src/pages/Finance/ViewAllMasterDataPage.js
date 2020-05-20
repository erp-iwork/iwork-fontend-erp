import React, { Component } from 'react';
import Page from '../../components/Page';

class ViewAllMasterDataPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Page title="All Master Data" breadcrumbs={[{ name: 'Master Data', active: true }]}>
                All Master Data


            </Page>
        );
    }
}

export default ViewAllMasterDataPage;

