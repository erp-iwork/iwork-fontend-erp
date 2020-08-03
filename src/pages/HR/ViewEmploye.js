import React from 'react'
import { Button } from 'reactstrap'
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom'
import routes from '../../config/routes'
const ViewEmploye = ({ employeeInfos, index, deleteFun }) => {

    return (


        <tr align='left' key={index}>
            <th scope="row">{index + 1}</th>
            <td >{employeeInfos.firstName + " " + employeeInfos.lastName}</td>
            <td >{employeeInfos.email}</td>
            <td>{employeeInfos.hiredDate}</td>
            <td>{employeeInfos.telephone}</td>
            <td>{employeeInfos.termOfEmployment}</td>
            <td>
                <Button size='sm' color='danger' onClick={() => deleteFun(employeeInfos.employeId)}>
                    <MdDelete />
                </Button>
            </td>
            <td>
                <Link to={{
                    pathname: routes.employeeProfile,
                    state: employeeInfos.employeId
                }}>
                    <Button size='sm' color='primary'>
                        See Profile
                                </Button>
                </Link>
            </td>
        </tr>


    )
}
export default ViewEmploye