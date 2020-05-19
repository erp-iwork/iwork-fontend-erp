import React, { Component } from 'react';
import Page from '../../components/Page';

class ViewSingleItemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Page
                title="Single Item Page"
                breadcrumbs={[{ name: 'Single Item Page', active: true }]}
                className="CardPage"
            >

            </Page>
        );
    }
}

export default ViewSingleItemPage;