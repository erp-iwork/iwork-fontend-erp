import Page from '../../components/Page';

import { IconWidget } from '../../components/Widget';
import { iconWidgetsData1 } from '../../demos/widgetPage';
import React from 'react';
import { Pie, Doughnut } from 'react-chartjs-2';

import InfiniteCalendar from 'react-infinite-calendar';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import { randomNum } from '../../utils/demos';

import { getColor } from '../../utils/colors';

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

const genPieData = () => {
  return {
    datasets: [
      {
        data: [randomNum(), randomNum(), randomNum(), randomNum()],
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
    labels: ['Rides', 'Contract Vehicles', 'Trucks', 'Buses'],
  };
};

const genPieData1 = () => {
  return {
    datasets: [
      {
        data: [randomNum(), randomNum(), randomNum(), randomNum()],

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
    labels: ['Rides', 'Contract Vehicles', 'Trucks', 'Buses'],

  };
};

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
        title="Logistics"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          {iconWidgetsData1.map(
            ({ bgColor, icon, title, subtitle, ...restProps }, index) => (
              <Col key={index} lg={3} md={6} sm={6} xs={12} className="mb-3">
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
        <Col md={12} sm={12}>
          <hr />
          <h4>Fines Activity</h4>
          <hr />
        </Col>
        <Row>
          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Paid Fines</CardHeader>
              <CardBody>
                <Pie data={genPieData()} />
              </CardBody>
            </Card>
          </Col>

          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Un-paid Fines</CardHeader>
              <CardBody>
                <Doughnut data={genPieData1()} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4" md="12" sm="12" xs="12">
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

        </Row>
      </Page>
    );
  }
}
export default DashboardPage;
