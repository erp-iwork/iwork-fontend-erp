export const countries = [
    'Ethiopia'
]

export const regions = {
    [countries[0]]: [
        'Addis Ababa', 'Afar', 'Amhara', 'Tigray', 'SNNP', 'Oromiya', 'Gambela'
    ]
}

export const termsOfEmployment = [
    'Permanent', 'Contract', 'Hourly'
]

export const cities = {
    [countries[0]]: {
        [regions[countries[0]][0]]: [ "Addis Ababa", ],

        [regions[countries[0]][1]]: [ 'Shellele' ],

        [regions[countries[0]][2]]: [ 'Gondar', 'Bahir Dar' ],

        [regions[countries[0]][3]]: [ 'Mekelle', 'Aksum' ],

        [regions[countries[0]][4]]: [ 'Assosa' ],

        [regions[countries[0]][5]]: [ 'Adama' ],

        [regions[countries[0]][6]]: [ 'Gambela City' ]
    }
}

export const getCity = (region, country) => {
    if (!region || !country) return []
    const res = cities[country]
    return res[region]
}