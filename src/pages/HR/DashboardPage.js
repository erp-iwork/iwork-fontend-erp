import { AnnouncementCard } from '../../components/Card';
import HorizontalAvatarList from '../../components/HorizontalAvatarList';
import Page from '../../components/Page';
import SupportTicket from '../../components/SupportTicket';
import UserProgressTable from '../../components/UserProgressTable';
import {
  avatarsData,

  supportTicketsData,
  userProgressTableData,
} from '../../demos/dashboardPage';
import React from 'react';
import {

  MdPersonPin,

} from 'react-icons/md';
import InfiniteCalendar from 'react-infinite-calendar';
import {
  Button,
  Card,
  CardBody,
  CardDeck,
  CardHeader,
  Col,

  Row,
} from 'reactstrap';
import { getColor } from '../../utils/colors';

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

class DashboardPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');
    const infoColor = getColor('info');


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


        <Row>
          <Col md="7" sm="12" xs="12">
            <InfiniteCalendar
              selected={today}
              minDate={lastWeek}
              width="100%"
              theme={{
                accentColor: primaryColor,
                floatingNav: {
                  background: primaryColor,
                  chevron: secondaryColor,
                  color: '#FFF',
                },
                headerColor: primaryColor,
                selectionColor: primaryColor,
                textColor: {
                  active: '#FFF',
                  default: '#333',
                },
                todayColor: infoColor,
                weekdayColor: primaryColor,
              }}
            />
          </Col>
          <Col md="5" sm="12" xs="12">
            <AnnouncementCard
              color="primary"
              header="Announcement"
              avatarSize={60}
              name="Hermela Solomon"
              date="1 hour ago"
              text="All Department Managers are requested to arrive at cinema hall for our weekly Discussions!"
              buttonProps={{
                children: 'show',
              }}
              style={{ height: 500 }}
            />
          </Col>


        </Row>


      </Page>
    );
  }
}
export default DashboardPage;
