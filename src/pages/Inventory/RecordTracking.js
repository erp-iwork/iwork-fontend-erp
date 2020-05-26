import React, { Component } from 'react';
import Page from '../../components/Page';

class RecordTracking extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Page
                title="Record Tracking"
                breadcrumbs={[{ name: 'GRV', active: true }]}
            >
                Record Tracking
            </Page>
        );
    }
}

export default RecordTracking;