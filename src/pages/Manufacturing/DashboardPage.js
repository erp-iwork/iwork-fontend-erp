import Page from '../../components/Page';
import { IconWidget } from '../../components/Widget';
import { iconWidgetsData4, iconWidgetsData5 } from '../../demos/widgetPage';
import { randomNum } from '../../utils/demos';
import React from 'react';
import { Bar } from 'react-chartjs-2';

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

const MONTHS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Fidayr', 'Saturday', 'Sunday'];

const genLineData = (moreData = {}, moreData2 = {}, moreData3 = {}) => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'Machine One',
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
        label: 'Machine 2',
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
      {
        label: 'Machine 3',
        backgroundColor: getColor('info'),
        borderColor: getColor('info'),
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
        ...moreData3,
      },
    ],
  };
};

const genLineData2 = (moreData = {}, moreData2 = {}) => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'Down Time',
        backgroundColor: getColor('danger'),
        borderColor: getColor('danger'),
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
        label: 'Run Time',
        backgroundColor: getColor('success'),
        borderColor: getColor('success'),
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
          {iconWidgetsData5.map(
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
        <hr />
        <h4>
          Machinary Informations
        </h4>
        <hr />

        <Row>
          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Machinary Activity Comparisions</CardHeader>
              <CardBody>
                <Bar data={genLineData({ type: 'line', fill: false })} />
              </CardBody>
            </Card>
          </Col>
          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Machinary Run Time vs DownTime Coomparisions</CardHeader>
              <CardBody>
                <Bar data={genLineData2({ type: 'line', fill: false })} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Col md="4" sm="12" xs="12">
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

      </Page>
    );
  }
}
export default DashboardPage;
