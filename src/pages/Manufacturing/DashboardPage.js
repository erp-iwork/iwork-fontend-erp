import { AnnouncementCard, TodosCard } from '../../components/Card';
import HorizontalAvatarList from '../../components/HorizontalAvatarList';
import Page from '../../components/Page';
import ProductMedia from '../../components/ProductMedia';
import SupportTicket from '../../components/SupportTicket';
import UserProgressTable from '../../components/UserProgressTable';
import { IconWidget, NumberWidget } from '../../components/Widget';
import { getStackLineChart, stackLineChartOptions } from '../../demos/chartjs';
import { iconWidgetsData4, numberWidgetsData } from '../../demos/widgetPage';

import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from '../../demos/dashboardPage';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPersonPin,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
} from 'react-icons/md';
import InfiniteCalendar from 'react-infinite-calendar';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
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
        title="Manufacturing"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <h4>
          Production Informations
        </h4>
        <hr />

      <Row>
        {iconWidgetsData4.map(
          ({ bgColor, icon, title, subtitle, ...restProps }, index) => (
            <Col key={index} lg={4} md={6} sm={6} xs={12} className="mb-3">
              <IconWidget
                bgColor={bgColor}
                icon={icon}
                title={title}
                subtitle={subtitle}
                {...restProps}
              />
            </Col>
          )
        )}
      </Row>

      <hr />


      <h4>
          Financial Informations
        </h4>
        <hr />

        <Row>
        {iconWidgetsData4.map(
          ({ bgColor, icon, title, subtitle, ...restProps }, index) => (
            <Col key={index} lg={4} md={6} sm={6} xs={12} className="mb-3">
              <IconWidget
                bgColor={bgColor}
                icon={icon}
                title={title}
                subtitle={subtitle}
                {...restProps}
              />
            </Col>
          )
        )}
      </Row>

        <Row>
          <Col lg="6" md="12" sm="12" xs="12">
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

          <Col lg="6" md="12" sm="12" xs="12">
            <InfiniteCalendar
              selected={today}
              minDate={lastWeek}
              width="100%"
              theme={{
                accentColor: primaryColor,
                floatingNav: {
                  background: secondaryColor,
                  chevron: primaryColor,
                  color: '#FFF',
                },
                headerColor: primaryColor,
                selectionColor: secondaryColor,
                textColor: {
                  active: '#FFF',
                  default: '#333',
                },
                todayColor: secondaryColor,
                weekdayColor: primaryColor,
              }}
            />
          </Col>

        </Row>
      </Page>
    );
  }
}
export default DashboardPage;
