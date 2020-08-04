import React, { useState } from 'react';
import { DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown, Input, FormGroup } from 'reactstrap';
import { connect } from 'react-redux'
import { updateFilter } from '../store/search/action'

const FilterOptions = ({ type, data, filter, updateFilter }) => {
    const [dropdownOpen, setOpen] = useState(false)
    const toggle = () => setOpen(!dropdownOpen)
    const dropStyle = {
        justifyContent: 'flex-end',
        alignItems: 'end',
        padding: '20px',
        marginLeft: '30px'
    }

    const [checked, setChecked] = useState(() => data.map(_ => false))

    return (
        <ButtonDropdown style={dropStyle} isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret color="primary"  >
                {type}
            </DropdownToggle>
            <DropdownMenu>
                <FormGroup >
                    <DropdownItem onClick={() => updateFilter(type, null)}>
                        <Input type="checkbox" checked={!filter[type]} />
                        All {type}s
                    </DropdownItem>
                    {data.map((item, index) => (
                        <DropdownItem key={index} onClick={_ => {
                            if (!checked[index]) updateFilter(type, item.value)
                            else updateFilter(type, null)
                            var updatedCheck = checked.map(_ => false)
                            updatedCheck[index] = !checked[index]
                            setChecked(updatedCheck)
                        }}>
                            <Input type="checkbox" checked={filter[type] === item.value} /> {item.tag}
                        </DropdownItem>
                    ))}
                </FormGroup>
            </DropdownMenu>
        </ButtonDropdown>
    )
}

const mapStateToProps = state => ({
    filter: state.searchData.filter
})

export default connect(mapStateToProps, { updateFilter })(FilterOptions)
