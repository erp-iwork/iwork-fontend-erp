import React, { Component } from 'react';
import Page from '../../components/Page';

import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';



class EmployeeListPage extends Component {
    state = {}
    render() {
        return (
            <Page title="Employee's list" breadcrumbs={[{ name: 'Employees List', active: true }]}>
      <Row>
        <Col>
          <Card className="mb-3">
            <CardHeader>Responsive</CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Telephone</th>
                    <th>Employment Type</th>
                    <th>City</th>
                    <th>Account</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>



            </Page>

        );
    }
}

export default EmployeeListPage;    