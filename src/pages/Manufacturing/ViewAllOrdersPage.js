import React, { Component } from 'react';
import Page from '../../components/Page';


class ViewAllOrdersManufacturingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Page title="Manufacturing" breadcrumbs={[{ name: 'View All Orders', active: true }]}>


            </Page>
         );
    }
}
 
export default ViewAllOrdersManufacturingPage;