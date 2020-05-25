
import Page from '../../components/Page';
import { NumberWidget } from '../../components/Widget';
import {
  chartjs,
} from '../../demos/dashboardPage';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPieChart,
  MdShowChart,
} from 'react-icons/md';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import { getColor } from '../../utils/colors';
import { randomNum } from '../../utils/demos';


const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augest', 'September', 'October', 'November', 'December'];


const genLineData = (moreData = {}, moreData2 = {}) => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'This Year',
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
        label: 'Last Year',
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

        <Row>
          <Col md="9" sm="12" xs="12">
            <Card>
              <CardHeader>Recipients and Delivers <small> this year  </small> </CardHeader>
              <CardBody>
                <Bar data={genLineData()} />
              </CardBody>
            </Card>
          </Col>

          <Col md="3" sm="12" xs="12">
            <Card>
              <CardHeader>Total Expense</CardHeader>
              <CardBody>
                <Bar data={chartjs.bar.data} options={chartjs.bar.options} />
              </CardBody>
              <ListGroup flush>
                <ListGroupItem>
                  <MdInsertChart size={25} color={primaryColor} /> Cost of sales{' '}
                  <Badge color="secondary">$3000</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdBubbleChart size={25} color={primaryColor} /> Management
                  costs <Badge color="secondary">$1200</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdShowChart size={25} color={primaryColor} /> Financial costs{' '}
                  <Badge color="secondary">$800</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdPieChart size={25} color={primaryColor} /> Other operating
                  costs <Badge color="secondary">$2400</Badge>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>

      </Page>
    );
  }
}
export default DashboardPage;
