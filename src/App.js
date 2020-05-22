import GAListener from './components/GAListener';
import { EmptyLayout, PublicRoute, MainLayout } from './components/Layout';
import PageSpinner from './components/PageSpinner';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import routes from './config/routes'
import LoginPage from './pages/Login'

const AlertPage = React.lazy(() => import('./pages/AlertPage'));
const AuthModalPage = React.lazy(() => import('./pages/AuthModalPage'));
const BadgePage = React.lazy(() => import('./pages/BadgePage'));
const ButtonGroupPage = React.lazy(() => import('./pages/ButtonGroupPage'));
const ButtonPage = React.lazy(() => import('./pages/ButtonPage'));
const CardPage = React.lazy(() => import('./pages/CardPage'));
const ChartPage = React.lazy(() => import('./pages/ChartPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const DropdownPage = React.lazy(() => import('./pages/DropdownPage'));
const FormPage = React.lazy(() => import('./pages/FormPage'));
const InputGroupPage = React.lazy(() => import('./pages/InputGroupPage'));
const ModalPage = React.lazy(() => import('./pages/ModalPage'));
const ProgressPage = React.lazy(() => import('./pages/ProgressPage'));
const TablePage = React.lazy(() => import('./pages/TablePage'));
const TypographyPage = React.lazy(() => import('./pages/TypographyPage'));
const WidgetPage = React.lazy(() => import('./pages/WidgetPage'));
const AllEmployeePage = React.lazy(() => import('./pages/HR/AllEmployeesPage'));
const AddEmployeePage = React.lazy(() => import('./pages/HR/AddEmployeePage'));
const EmployeeProfilePage = React.lazy(() => import('./pages/HR/EmployeeProfilePage'));
const ITAllEmployeesPage = React.lazy(() => import('./pages/IT/ViewAllEmployeePage'));
const ITAddaccount = React.lazy(() => import('./pages/IT/AddAccount'));
const CreateOrdersPage = React.lazy(() => import('./pages/Sales/CreateOrdersPage'));
const ViewAllOrdersPage = React.lazy(() => import('./pages/Sales/ViewAllOrdersPage'));
const ViewSingleOrderPage = React.lazy(() => import('./pages/Sales/ViewSingleOrderPage'));
const viewAllItemsPage = React.lazy(() => import('./pages/Inventory/viewAllItems'));
const ViewAllOrdersInventoryPage = React.lazy(() => import('./pages/Inventory/ViewAllOrdersPage'));
const AddCustomerPage = React.lazy(() => import('./pages/Finance/AddCustomerPage'));
const AddSupplierPage = React.lazy(() => import('./pages/Finance/AddSupplier'))
const viewAllCutomersPage = React.lazy(() => import('./pages/Finance/viewAllCutomersPage'));
const viewAllSuppliersPage = React.lazy(() => import('./pages/Finance/viewAllSuppliersPage'));
const ViewAllOrdersFinancePage = React.lazy(() => import('./pages/Finance/ViewAllOrdersPage'));
const AddMasterDataPage = React.lazy(() => import('./pages/Finance/AddMasterDataPage'));
const ViewAllMasterDataPage = React.lazy(() => import('./pages/Finance/ViewAllMasterDataPage'));
const ViewAllOrdersLogisticsPage = React.lazy(() => import('./pages/Logistics/ViewAllOrdersPage'));
const CategoriesInventoryPage = React.lazy(() => import('./pages/Inventory/CategoryPage'));
const ViewSingleItemPage = React.lazy(() => import('./pages/Inventory/ViewSingleItemPage'));
const SivPage = React.lazy(() => import('./pages/Inventory/SIV'));
const CreatePurchaseOrderPage = React.lazy(() => import('./pages/Procurment/CreatePurchaseOrderPage'));





const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <PublicRoute
              exact
              path={routes.login}
              layout={EmptyLayout}
              component={props => (
                <LoginPage />
              )}
            />
            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={DashboardPage} />
                <Route exact path="/login-modal" component={AuthModalPage} />
                <Route exact path="/buttons" component={ButtonPage} />
                <Route exact path="/cards" component={CardPage} />
                <Route exact path="/widgets" component={WidgetPage} />
                <Route exact path="/typography" component={TypographyPage} />
                <Route exact path="/alerts" component={AlertPage} />
                <Route exact path="/tables" component={TablePage} />
                <Route exact path="/badges" component={BadgePage} />
                {/* HR ROUTES/ */}
                <Route exact path={routes.allEmployees} component={AllEmployeePage} />
                <Route exact path={routes.addEmployee} component={AddEmployeePage} />
                <Route exact path={routes.employeeProfile} component={EmployeeProfilePage} />
                {/* IT ROUTES/ */}
                <Route exact path={routes.itEmployeePage} component={ITAllEmployeesPage} />
                <Route exact path={routes.addAccount} component={ITAddaccount} />
                {/* SALES ROUTES */}
                <Route exact path={routes.createOrderPage} component={CreateOrdersPage} />
                <Route exact path={routes.ViewAllOrdersPage} component={ViewAllOrdersPage} />
                <Route exact path={routes.ViewSingleOrderPage} component={ViewSingleOrderPage} />
                {/* INVENTORY ROUTES/ */}
                <Route exact path={routes.ViewAllItems} component={viewAllItemsPage} />
                <Route exact path={routes.ViewOrdersInventory} component={ViewAllOrdersInventoryPage} />
                <Route exact path={routes.CategoriesInventoryPage} component={CategoriesInventoryPage} />
                <Route exact path={routes.ViewSingleItemPage} component={ViewSingleItemPage} />
                <Route exact path={routes.SivPage} component={SivPage} />


                {/* FINANCE ROUTES/ */}
                <Route exact path={routes.AddCustomer} component={AddCustomerPage} />
                <Route exact path={routes.viewCustomers} component={viewAllCutomersPage} />
                <Route exact path={routes.viewSuppliers} component={viewAllSuppliersPage} />
                <Route exact path={routes.AddSupplier} component={AddSupplierPage} />
                <Route exact path={routes.ViewOrdersFinance} component={ViewAllOrdersFinancePage} />
                <Route exact path={routes.AddMasterDataPage} component={AddMasterDataPage} />
                <Route exact path={routes.ViewAllMasterData} component={ViewAllMasterDataPage} />

                {/* LOGISTICS ROUTES */}
                <Route exact path={routes.ViewOrdersLogistics} component={ViewAllOrdersLogisticsPage} />

                {/* PROCURMENT ROUTES */}
                <Route exact path={routes.CreatePurchaseOrder} component={CreatePurchaseOrderPage} />




                <Route
                  exact
                  path="/button-groups"
                  component={ButtonGroupPage}
                />
                <Route exact path="/dropdowns" component={DropdownPage} />
                <Route exact path="/progress" component={ProgressPage} />
                <Route exact path="/modals" component={ModalPage} />
                <Route exact path="/forms" component={FormPage} />
                <Route exact path="/input-groups" component={InputGroupPage} />
                <Route exact path="/charts" component={ChartPage} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
