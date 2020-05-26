import { AnnouncementCard, TodosCard } from '../components/Card';
import HorizontalAvatarList from '../components/HorizontalAvatarList';
import Page from '../components/Page';
import ProductMedia from '../components/ProductMedia';
import SupportTicket from '../components/SupportTicket';
import UserProgressTable from '../components/UserProgressTable';
import { IconWidget, NumberWidget } from '../components/Widget';
import { getStackLineChart, stackLineChartOptions } from '../demos/chartjs';
import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from '../demos/dashboardPage';
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
import { getColor } from '../utils/colors';
import Finance from './Finance/DashboardPage'
import IT from './IT/DashboardPage'
import Sales from './Sales/DashboardPage'
import Logistics from './Logistics/DashboardPage'
import Procurment from './Procurment/DashboardPage'
import Manufacturing from './Manufacturing/DashboardPage'
import Inventory from './Inventory/DashboardPage'
import HR from './HR/DashboardPage'
import dept from '../config/departments'

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

  loadDashboard = (user_dept) => {
    switch (user_dept) {
      case dept.hr: return <HR />
      case dept.it: return <IT />
      case dept.sales: return <Sales />
      case dept.logistics: return <Logistics />
      case dept.procurment: return <Procurment />
      case dept.Manufacturing: return <Manufacturing />
      case dept.inventory: return <Inventory />
      default: return <Finance />
    }
  }

  render() {
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');
    const infoColor = getColor('info');

    const user_dept = localStorage.getItem('department')
    const dashboard = this.loadDashboard(user_dept)
    return this.loadDashboard(user_dept)
  }
}
export default DashboardPage;
