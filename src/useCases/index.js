import React from 'react'
import filters from '../constant/filters'

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
    if (options.name !== undefined && options.name !== null) {
        const exp = new RegExp("^" + options.name.value, "gi")
        updatedName = data.filter(item => item[options.name.tag].match(exp))
    } else updatedName = data

    var updatedType = []
    if (options.type !== undefined && options.type !== null) {
        if (options.type.value) {
            updatedType = updatedName.filter(item => item[options.type.tag] === options.type.value)
        } else updatedType = updatedName
    } else updatedType = updatedName

    var updatedDates = []
    if (options.date !== undefined && options.date !== null) {
        if (options.date.value) {
            updatedDates = dateFilter(options.date.value, options.date.tag, updatedType)
        } else updatedDates = updatedType
    } else updatedDates = updatedType

    var updatedAdvancedDates = []
    if (
        options.advancedDate !== undefined && options.advancedDate !== null
        && options.advancedDate.value !== undefined && options.advancedDate.value !== null) {
        if (options.advancedDate.value.length === 2) {
            updatedAdvancedDates = advancedDateFilter(
                options.advancedDate.value,
                options.advancedDate.tag,
                updatedDates
            )
        } else updatedAdvancedDates = updatedDates
    } else updatedAdvancedDates = updatedDates

    return updatedAdvancedDates
}

export const advancedDateFilter = (values, tag, data) => {
    var updatedDates = []
    if (typeof values !== "object") return data
    var startDate = new Date(values[0])
    var endDate = new Date(values[1])
    var count = -1
    var date = null
    data.forEach(item => {
        count = 0
        date = new Date(item[tag])
        if (date.getFullYear() === startDate.getFullYear() && date.getFullYear() === endDate.getFullYear()) {
            count++
        }
        if (date.getMonth() >= startDate.getMonth() && date.getMonth() <= endDate.getMonth()) {
            count++
        }
        if (date.getDate() >= startDate.getDate() && date.getDate() <= endDate.getDate()) {
            count++
        }
        if (count === 3) {
            updatedDates.push(item)
        }
    })
    return updatedDates
}

const isThisWeek = date => {
    var now = new Date(Date.now())
    var day = now.getDay()
    var diff =  now.getDate() - day + (day === 9? -6 : 1)
    const monday = new Date(now.setDate(diff)).getDate()
    if (now.getMonth() === date.getMonth()) {
        if (date.getDate() >= monday && date.getDate() < monday + 6) return true
    }
    return false
}

export const dateFilter = (type, tag, data) => {
    var updatedDates = []
    data.forEach(item => {
        var date = new Date(item[tag])
        var now = new Date(Date.now())
        if (now.getFullYear() !== date.getFullYear() && type !== null) {
            return updatedDates
        }
        if (type === filters.DATE.TODAY) {
            if (now.getDate() === date.getDate() && now.getMonth() === date.getMonth()) {
                updatedDates.push(item)
            }
        } else if (type === filters.DATE.YESTERDAY) {
            if (now.getDate() === date.getDate() + 1) {
                updatedDates.push(item)
            }
        } else if (type === filters.DATE["THIS WEEK"]) {
            if (isThisWeek(date)) {
                updatedDates.push(item)
            }
        } else if (type === filters.DATE["THIS MONTH"]) {
            if (now.getMonth() === date.getMonth()) {
                updatedDates.push(item)
            }
        } else if (type === filters.DATE["LAST MONTH"]) {
            if (now.getMonth() === (date.getMonth() + 1)) {
                updatedDates.push(item)
            }
        }
    })

    return updatedDates
}

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