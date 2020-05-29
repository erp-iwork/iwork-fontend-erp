import Page from '../../components/Page';
import { IconWidget } from '../../components/Widget';
import { randomNum } from '../../utils/demos';
import { iconWidgetsData3 } from '../../demos/widgetPage';

import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';

import InfiniteCalendar from 'react-infinite-calendar';
import {
  Card,
  CardBody,
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

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


const genLineData = (moreData = {}, moreData2 = {}) => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'Spending',
        backgroundColor: getColor('primary'),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: [
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
        ],
        ...moreData,
      },
      {
        label: 'Saving',
        backgroundColor: getColor('secondary'),
        borderColor: getColor('secondary'),
        borderWidth: 1,
        data: [
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
        ],
        ...moreData2,
      },
    ],
  };
};

const genLineData1 = (moreData = {}, moreData2 = {}) => {
  return {
    labels: WEEKS,
    datasets: [
      {
        label: 'Spending',
        backgroundColor: getColor('primary'),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: [
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
        ],
        ...moreData,
      },
      {
        label: 'Saving',
        backgroundColor: getColor('secondary'),
        borderColor: getColor('secondary'),
        borderWidth: 1,
        data: [
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
        ],
        ...moreData2,
      },
    ],
  };
};

const genPieData = () => {
  return {
    datasets: [
      {
        data: [randomNum(), randomNum()],
        backgroundColor: [
          getColor('primary'),
          getColor('light'),

        ],
        label: 'Suppliers',
      },
    ],
    labels: ['Suppliers', 'None'],

  };
};

const genPieData1 = () => {
  return {
    datasets: [
      {
        data: [randomNum(), randomNum()],
        backgroundColor: [
          getColor('secondary'),
          getColor('light'),
        ],
        label: 'Dataset 1',
      },
    ],
    labels: ['Contracted', 'None'],

  };
};
const genPieData2 = () => {
  return {
    datasets: [
      {
        data: [randomNum(), randomNum()],
        backgroundColor: [
          getColor('info'),
          getColor('light'),
        ],
        label: 'Dataset 1',
      },
    ],
    labels: ['UnListed', 'None'],

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


    return (
      <Page
        className="DashboardPage"
        title="Procurment"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <h4>Suppliers Information</h4>
        <hr />
        <Row>
          <Col xl={4} lg={12} md={12}>
            <Card>
              <CardHeader>Suppliers</CardHeader>
              <CardBody>
                <Doughnut data={genPieData()} />
              </CardBody>
            </Card>
          </Col>
          <Col xl={4} lg={12} md={12}>
            <Card>
              <CardHeader>Contracted</CardHeader>
              <CardBody>
                <Doughnut data={genPieData1()} />
              </CardBody>
            </Card>
          </Col>

          <Col xl={4} lg={12} md={12}>
            <Card>
              <CardHeader>Unlisted</CardHeader>
              <CardBody>
                <Doughnut data={genPieData2()} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <hr />
        <h4>Top Suppliers</h4>
        <hr />
        <Row>
          {iconWidgetsData3.map(
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
        <h4>Total Spendings and Transactions</h4>
        <hr />
        <Row>
          <Col md={6} xs={12} sm={12}>
            <Card >
              <CardHeader>Spendings This Year</CardHeader>
              <CardBody>
                <Line data={genLineData({ fill: false }, { fill: false })} />
              </CardBody>
            </Card>
          </Col>
          <Col md={6} xs={12} sm={12}>
            <Card >
              <CardHeader>Spending This Week</CardHeader>
              <CardBody>
                <Line data={genLineData1({ fill: false }, { fill: false })} />
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
