import React from 'react'
import PropTypes from '../utils/propTypes'
import bn from '../utils/bemnames'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import Typography from './Typography'
import FilterOptions from './filterOptions'
import { connect } from 'react-redux'
import { transactionTypes } from '../constant/transactions'
import filters from '../constant/filters'

const bem = bn.create('page')

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
  includeFilters,
  hasAdvancedDate,
  ...restProps
}) => {
  
  const classes = bem.b('px-3', className)
  var departments = []
  var levels = []
  var roles = []
  employees.forEach(employee => {
    if (!departments.find(dept => employee.department.departmentName === dept.tag)) {
      departments.push({
        tag: employee.department.departmentName,
        value: employee.department.departmentName
      })
    }
    if (!levels.find(level => employee.level.level === level.tag)) {
      levels.push({
        tag: employee.level.level,
        value: employee.level.level
      })
    }

    if (!roles.find(role => employee.roles.role === role.tag)) {
      roles.push({
        tag: employee.roles.role,
        value: employee.roles.role
      })
    }
  })

  return (
    <Tag className={classes}>
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
            <FilterOptions type={filters.RECORD} data={
              [transactionTypes['Reception'], transactionTypes['Withdrwal']]
            } />
          </div> : <div></div>
        }
        {
          <div style={{ display: hasFilter? 'flex' : 'none', justifyContent: 'flex-end' }}>
            <FilterOptions type="Date" data={[
              { tag: filters.DATE["TODAY"], value: filters.DATE["TODAY"] },
              { tag: filters.DATE['YESTERDAY'], value: filters.DATE['YESTERDAY'] },
              { tag: filters.DATE['THIS WEEK'], value: filters.DATE['THIS WEEK'] },
              { tag: filters.DATE['THIS MONTH'], value: filters.DATE['THIS MONTH']},
              { tag: filters.DATE['LAST MONTH'], value: filters.DATE['LAST MONTH'] },
              { tag: filters.ADVANCED_DATE, value: filters.ADVANCED_DATE }
            ]} hasAdvancedDate={hasAdvancedDate} />
          </div>
        }
      </div>
      <hr></hr>
      {children}
    </Tag>
  )
}

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
}

Page.defaultProps = {
  tag: 'div',
  title: '',
}

const mapStateToProps = state => ({
  employees: state.hrReducer.employees,
})

export default connect(mapStateToProps)(Page)