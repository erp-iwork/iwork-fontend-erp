import React from 'react'

export const reverse = (array = []) => {
    return array.slice(0).reverse()
}

export const UoM = () => {
    const data = [
        'Dozen(s)', 'Unit(s)', 'kg', 'g', 'Day(s)', 'Hour(s)', 'm',
        'km', 'cm', 'Liter(s)', 'Ib(s)', 'oz(s)', 'inch(es)', 'foot(ft)',
        'mile(s)', 'fl oz', 'qt', 'gal(s)'
    ]
    
    return data.map((item, index) => (
        <option key={index}>{item}</option>
    ))
}

export const getCount = (count) => {
    var number = count + ""
    var zeros = ""
    Array(4 - number.length).fill("0").forEach(item => zeros += item)
    return zeros + number
}

export const filter = (options, data) => {
    var updatedName = []
    if (options.name.value !== null || options.name.value !== "") {
        const exp = new RegExp("^" + options.name.value, "gi")
        updatedName = data.filter(item => item[options.name.tag].match(exp))
    } else updatedName = data
    return updatedName
}

/*
    amount: 2.34
​
    itemCost: 2.34
    ​
    orderId: "1"
    ​
    productCategory: "Row material"
    ​
    productId: "5"
    ​
    productName: "Iron oxides and pigment pastes."
    ​
    purchaseQuantity: "1"
    ​
    transactionDate: "2020-06-05"
    ​
    transactionId: 1
    ​
    transactionType: "Receipents"
*/

export const employeeFilter = (options, data) => {
    var updatedDepartments = []
    const { department, level, role } = options
    if (department !== null) {
        updatedDepartments = data.filter(item => department === item.department.departmentName)
    } else updatedDepartments = data

    var updatedLevels = []
    if (level !== null) {
        updatedLevels = updatedDepartments.filter(item => level === item.level.level)
    } else updatedLevels = updatedDepartments

    var updatedRoles = []
    if (role !== null) {
        updatedRoles = updatedLevels.filter(item => role === item.roles.role)
    } else updatedRoles = updatedLevels

    return updatedRoles
}