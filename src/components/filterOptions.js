import React, { useState, useEffect } from 'react';
import { DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown, Input, FormGroup } from 'reactstrap';
import { connect } from 'react-redux'
import { updateFilter } from '../store/search/action'
import filters from '../constant/filters'

const FilterOptions = ({ type, data, filter, updateFilter, hasAdvancedDate }) => {
    const [dropdownOpen, setOpen] = useState(false)
    const [advancedDate, setAdvancedDate] = useState({
        startDate: "",
        endDate: ""
    })
    const toggle = () => setOpen(!dropdownOpen)
    const dropStyle = {
        justifyContent: 'flex-end',
        alignItems: 'end',
        padding: '20px',
        marginLeft: '30px'
    }

    const [checked, setChecked] = useState(() => data.map(_ => false))

    useEffect(() => {
        if (advancedDate.startDate.length > 0 && advancedDate.endDate.length > 0) {
            updateFilter(filters.ADVANCED_DATE, [advancedDate.startDate, advancedDate.endDate])
        }
    }, [advancedDate, updateFilter])

    return (
        <div style={{ display: "flex" }}>
            <ButtonDropdown style={dropStyle} isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret color="primary"  >
                    {type}
                </DropdownToggle>
                <DropdownMenu>
                    <FormGroup >
                        <DropdownItem onClick={() => {
                            updateFilter(type, null)
                            if (type === filters.DATE._type) {
                                updateFilter(filters.ADVANCED_DATE, null)
                            }
                        }}>
                            <Input type="checkbox" checked={
                                !filter[type] && (
                                    filter[filters.ADVANCED_DATE] === null ||
                                    filter[filters.ADVANCED_DATE] === undefined
                                )
                                } onChange={() => null} />
                            All {type}s
                        </DropdownItem>
                        {data.map((item, index) => (
                            <DropdownItem key={index} onClick={_ => {
                                if (type === filters.DATE._type && item.value === filters.ADVANCED_DATE) {
                                    updateFilter(type, null)
                                    updateFilter(filters.ADVANCED_DATE, -1)
                                } else if (!checked[index]) {
                                    updateFilter(filters.ADVANCED_DATE, null)
                                    updateFilter(type, item.value)
                                }
                                else updateFilter(type, null)
                                var updatedCheck = checked.map(_ => false)
                                updatedCheck[index] = !checked[index]
                                setChecked(updatedCheck)
                            }}>
                                <Input type="checkbox" checked={
                                    filter[type] === item.value ||
                                    (type === filters.DATE._type && (
                                        !(
                                            filter[filters.ADVANCED_DATE] === null ||
                                            filter[filters.ADVANCED_DATE] === undefined
                                        )
                                        && item.value === filters.ADVANCED_DATE
                                    ))
                                } onChange={() => null} /> {item.tag}
                            </DropdownItem>
                        ))}
                    </FormGroup>
                </DropdownMenu>
            </ButtonDropdown>
            <div>
                <Input type="date" style={{
                    display: filter[filters.ADVANCED_DATE] === -1 && hasAdvancedDate
                    ? "flex" : "none", marginBottom: 5
                }} onChange={({ target: { value } }) => {
                    setAdvancedDate({ ...advancedDate, startDate: value })
                }} />
                <Input type="date" style={{
                    display: filter[filters.ADVANCED_DATE] === -1 && hasAdvancedDate
                    ? "flex" : "none"
                }}  onChange={({ target: { value } }) => {
                    setAdvancedDate({ ...advancedDate, endDate: value })
                }}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    filter: state.searchData.filter
})

export default connect(mapStateToProps, { updateFilter })(FilterOptions)
