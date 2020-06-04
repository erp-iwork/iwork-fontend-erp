
import Page from '../../components/Page';
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
import { randomNum } from '../../utils/demos';
import { NumberWidget, IconWidget } from '../../components/Widget';
import { iconWidgetsData } from '../../demos/widgetPage';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augest', 'September', 'October', 'November', 'December'];

const genLineData = (moreData = {}, moreData2 = {}) => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'Recipients',
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
        label: 'Delivers',
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
        title="Inventory"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          <Col md={6} sm={6} xs={12}>
            <NumberWidget
              title="Recieved Items"
              subtitle="This month"
              number="9.8k"
              color="primary"
              progress={{
                value: 75,
                label: 'Last month',
              }}
            />
          </Col>
          <Col md={6} sm={6} xs={12}>
            <NumberWidget
              title="Withdrawed Items"
              subtitle="This month"
              number="5,400"
              color="danger"
              progress={{
                value: 45,
                label: 'Last month',
              }}
            />
          </Col>
        </Row>
        <hr />
        <h4>Sales Activity</h4>
        <hr />
        <Row>
          {iconWidgetsData.map(
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
          <Col md={12} sm={12}>
            <hr />
            <h4>Inventory Activity</h4>
            <hr />
          </Col>
          <Col md="9" sm="12" xs="12">
            <Card>
              <CardHeader>Recipients and Delivers <small> this year  </small> </CardHeader>
              <CardBody>
                <Bar data={genLineData()} />
              </CardBody>
            </Card>
          </Col>
          <Col md="3" sm="12" xs="12">
            <InfiniteCalendar
              selected={today}
              minDate={lastWeek}
              width="100%"
              theme={{
                accentColor: secondaryColor,
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
