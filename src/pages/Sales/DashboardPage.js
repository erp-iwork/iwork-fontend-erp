
import Page from '../../components/Page';
import ProductMedia from '../../components/ProductMedia';
import UserProgressTable from '../../components/UserProgressTable';
import { NumberWidget } from '../../components/Widget';
import {
  productsData,
  userProgressTableData,
} from '../../demos/dashboardPage';
import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import {
  MdPersonPin,
} from 'react-icons/md';
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


const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augest', 'September', 'October', 'December'];

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
        label: 'Electronics',
      },
    ],
    labels: ['Electronics', 'Finished Goods', 'Edibles', 'Sanitation Materials', 'Drinks'],
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
        title="Sales"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Daily Sales"
              subtitle="Today"
              number="23%"
              color="primary"
              progress={{
                value: 60,
                label: 'Last month',
              }}
            />
          </Col>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Weekly Sales"
              subtitle="This week"
              number="3,400"
              color="primary"
              progress={{
                value: 90,
              }}
            />
          </Col>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Monthly Sales"
              subtitle="This month"
              number="5,400"
              color="primary"
              progress={{
                value: 45,
              }}
            />
          </Col>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Sales"
              subtitle="This Year"
              number="9.8k"
              color="primary"
              progress={{
                value: 75,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Yearly Sales</CardHeader>
              <CardBody>
                <Line
                  data={genLineData()}
                  options={{
                    scales: {
                      xAxes: [
                        {
                          scaleLabel: {
                            display: true,
                            labelString: 'Month',
                          },
                        },
                      ],
                      yAxes: [
                        {
                          stacked: true,
                          scaleLabel: {
                            display: true,
                            labelString: 'Value',
                          },
                        },
                      ],
                    },
                  }}
                />
              </CardBody>
            </Card>
          </Col>

          <Col xl={6} lg={12} md={12}>

            <Card>
              <CardHeader>Daily Sale By Category</CardHeader>
              <CardBody>
                <Pie data={genPieData()} />
              </CardBody>
            </Card>


          </Col>


        </Row>

        <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>New Finished Products</CardHeader>
              <CardBody>
                {productsData.map(
                  ({ id, image, title, description, right }) => (
                    <ProductMedia
                      key={id}
                      image={image}
                      title={title}
                      description={description}
                      right={right}
                    />
                  ),
                )}
              </CardBody>
            </Card>
          </Col>

          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Active Sales Personnels</CardHeader>
              <CardBody>
                <UserProgressTable
                  headers={[
                    <MdPersonPin size={25} />,
                    'name',
                    'date Registered',
                    'participation',
                    '%',
                  ]}
                  usersData={userProgressTableData}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Col md="12" sm="12" xs="12">
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
