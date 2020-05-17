import React, { Component } from 'react';
import Page from '../../components/Page';

class ViewAllOrdersPage extends Component {
    state = {  }
    render() { 
        return (
            <Page title="View All Orders" breadcrumbs={[{ name: 'All Orders', active: true }]}>

                View All Orders Page
            </Page>
          );
    }
}
 
export default ViewAllOrdersPage;