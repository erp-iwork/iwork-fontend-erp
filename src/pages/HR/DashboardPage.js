import HorizontalAvatarList from '../../components/HorizontalAvatarList';
import Page from '../../components/Page';
import SupportTicket from '../../components/SupportTicket';
import UserProgressTable from '../../components/UserProgressTable';
import { randomNum } from '../../utils/demos';

import {
  avatarsData,

  supportTicketsData,
  userProgressTableData,
} from '../../demos/dashboardPage';
import React from 'react';
import {

  MdPersonPin,

} from 'react-icons/md';
import {
  Button,
  Card,
  CardBody,
  CardDeck,
  CardHeader,
  Col,

  Row,
} from 'reactstrap';
import {  Pie, Doughnut } from 'react-chartjs-2';

import { getColor } from '../../utils/colors';

const genPieData = () => {
  return {
    datasets: [
      {
        data: [randomNum(), randomNum(), randomNum(), randomNum(), randomNum()],
        backgroundColor: [
          getColor('primary'),
          getColor('secondary'),
          getColor('success'),
          getColor('info'),
          getColor('danger'),
        ],
        label: 'New',
      },
    ],
    labels: ['New', 'On-Going', 'Hired', 'On-Boarding', 'Rejected'],
  };
};

const genPieData1 = () => {
  return {
    datasets: [
      {
        data: [randomNum(), randomNum(), randomNum(), randomNum(), randomNum()],
        backgroundColor: [
          getColor('primary'),
          getColor('secondary'),
          getColor('success'),
          getColor('info'),
          getColor('danger'),
        ],
        label: 'Dataset 1',
      },
    ],
    labels: ['No Career Progression', 'Seeking New Skills', 'Salary', 'Personal/Family Change', 'Work Enviroment'],
  };
};

class DashboardPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    // const primaryColor = getColor('primary');
    // const secondaryColor = getColor('secondary');
    // const infoColor = getColor('info');


    return (
      <Page
        className="DashboardPage"
        title="HR"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >

        <CardDeck style={{ marginBottom: '1rem' }}>
          <Card body style={{ overflowX: 'auto', 'paddingBottom': '15px', 'height': 'fit-content', 'paddingTop': 'inherit' }}>
            <CardHeader>Department Managers</CardHeader>
            <HorizontalAvatarList
              avatars={avatarsData}
              avatarProps={{ size: 50 }}
            />
          </Card>

          <Card body style={{ overflowX: 'auto', 'paddingBottom': '15px', 'height': 'fit-content', 'paddingTop': 'inherit' }}>
            <CardHeader>Labor Employees</CardHeader>
            <HorizontalAvatarList
              avatars={avatarsData}
              avatarProps={{ size: 50 }}
              reversed
            />
          </Card>
        </CardDeck>

        <Row>

          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Applicant Status</CardHeader>
              <CardBody>
                <Pie data={genPieData()} />
              </CardBody>
            </Card>
          </Col>

          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Loss Risk for talent pool</CardHeader>
              <CardBody>
                <Doughnut data={genPieData1()} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Accounts</span>
                  <Button>
                    <small>View All</small>
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                {supportTicketsData.map(supportTicket => (
                  <SupportTicket key={supportTicket.id} {...supportTicket} />
                ))}
              </CardBody>
            </Card>
          </Col>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Attendance <small>for this month</small></CardHeader>
              <CardBody>
                <UserProgressTable
                  headers={[
                    <MdPersonPin size={25} />,
                    'name',
                    'Recruited Date',
                    'Attendance',
                    '%',
                  ]}
                  usersData={userProgressTableData}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default DashboardPage;
