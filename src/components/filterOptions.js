import React, { useState } from 'react';
import { DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown, Input, FormGroup } from 'reactstrap';

const FilterOptions = () => {
    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);

    const dropStyle = {

        justifyContent: 'flex-end',
        alignItems: 'end',
       padding:'20px',
        marginLeft: '30px'

    };

    return (
        <ButtonDropdown style={dropStyle} isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret color="primary"  >
                Search options
        </DropdownToggle>
            <DropdownMenu>
                <FormGroup >

                    <DropdownItem  >  <Input type="checkbox" /> Checkbox1 </DropdownItem>
                    <DropdownItem >  <Input type="checkbox" /> Checkbox2 </DropdownItem>
                    <DropdownItem >  <Input type="checkbox" /> Checkbox3 </DropdownItem>
                    <DropdownItem >  <Input type="checkbox" /> Checkbox4 </DropdownItem>
                </FormGroup>
            </DropdownMenu>
        </ButtonDropdown>
    );

};

export default FilterOptions;
