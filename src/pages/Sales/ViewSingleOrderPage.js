import React, { Component } from 'react';
import Page from '../../components/Page';

class ViewSingleOrderPage extends Component {
    state = {  }
    render() { 
        return ( 
            <Page title="View Single Order" breadcrumbs={[{ name: 'Single Order', active: true }]}>


            </Page>
         );
    }
}
 
export default ViewSingleOrderPage;