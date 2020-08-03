import React from 'react';
import PropTypes from '../utils/propTypes';
import bn from '../utils/bemnames';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Typography from './Typography';
import FilterOptions from './filterOptions';
import { connect } from 'react-redux'

const bem = bn.create('page');

const Page = ({
  title,
  breadcrumbs,
  tag: Tag,
  className,
  children,
  employees,
  records,
  hasFilter,
  isEmployeeList,
  isInventory,
  ...restProps
}) => {
  const classes = bem.b('px-3', className);
  var departments = []
  var levels = []
  var roles = []
  employees.forEach(employee => {
    if (!departments.find(dept => employee.department.departmentName === dept)) {
      departments.push(employee.department.departmentName)
    }
    if (!levels.find(level => employee.level.level === level)) {
      levels.push(employee.level.level)
    }

    if (!roles.find(role => employee.roles.role === role)) {
      roles.push(employee.roles.role)
    }
  })

  console.log(records)

  var categories = []
  records.forEach(record => {
    if (!categories.find(_cat => _cat === record.productCategory)) {
      categories.push(record.productCategory)
    }
  })

  return (
    <Tag className={classes} {...restProps}>
      <div className={bem.e('header')}>
        {title && typeof title === 'string' ? (
          <Typography type="h2" className={bem.e('title')}>
            {title}
          </Typography>
        ) : (
            title
          )}
        {breadcrumbs && (
          <Breadcrumb className={bem.e('breadcrumb')}>
            <BreadcrumbItem>Home</BreadcrumbItem>
            {breadcrumbs.length &&
              breadcrumbs.map(({ name, active }, index) => (
                <BreadcrumbItem key={index} active={active}>
                  {name}
                </BreadcrumbItem>
              ))}
          </Breadcrumb>
        )}

        {isEmployeeList?
          <div style={{ display: hasFilter? 'flex' : 'none', justifyContent: 'flex-end' }}>
            <FilterOptions type="Department" data={departments} />
            <FilterOptions type="Role" data={roles} />
            <FilterOptions type="Level" data={levels} />
          </div> : <div></div>
        }
        {isInventory?
          <div style={{ display: hasFilter? 'flex' : 'none', justifyContent: 'flex-end' }}>
            <FilterOptions type="Category" data={departments} />
            <FilterOptions type="Type" data={categories} />
            <FilterOptions type="Date" data={[]} />
          </div> : <div></div>
        }

      </div>
      <hr></hr>
      {children}
    </Tag>
  );
};

Page.propTypes = {
  tag: PropTypes.component,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
  children: PropTypes.node,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      active: PropTypes.bool,
    })
  ),
};

Page.defaultProps = {
  tag: 'div',
  title: '',
};

const mapStateToProps = state => ({
  employees: state.hrReducer.employees,
  records: state.inventoryReducer.records,
  loading_categories: state.inventoryReducer.loading_categories,
        loading_records: state.inventoryReducer.loading_records,
        records: state.inventoryReducer.records,
        categories: state.inventoryReducer.categories
})

export default connect(mapStateToProps)(Page)