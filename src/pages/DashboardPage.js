
import React from 'react';

import Finance from './Finance/DashboardPage'
import IT from './IT/DashboardPage'
import Sales from './Sales/DashboardPage'
import Logistics from './Logistics/DashboardPage'
import Procurment from './Procurment/DashboardPage'
import Manufacturing from './Manufacturing/DashboardPage'
import Inventory from './Inventory/DashboardPage'
import HR from './HR/DashboardPage'
import dept from '../config/departments'


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
      case dept.mrp: return <Manufacturing />
      case dept.inventory: return <Inventory />
      default: return <Finance />
    }
  }

  render() {


    const user_dept = localStorage.getItem('department')
    return this.loadDashboard(user_dept)
  }
}
export default DashboardPage;
