import React, { Component } from 'react';
import Page from '../../components/Page';

class EmployeeProfilePage extends Component {
    state = {}
    render() {
        return (
            <Page
                title="Employee Profile"
                breadcrumbs={[{ name: 'Employee Profile', active: true }]}
                className="TablePage"
            >

            </Page>
        );
    }
}

export default EmployeeProfilePage;