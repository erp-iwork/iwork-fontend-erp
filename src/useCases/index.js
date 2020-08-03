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