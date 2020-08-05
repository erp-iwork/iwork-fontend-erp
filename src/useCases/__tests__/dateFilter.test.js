const { dateFilter, advancedDateFilter } = require('../index')
const filter = require('../../constant/filters').default

const today = [
    { transactionDate: "2020-07-05" }
]

const yesterday = [
    { transactionDate: "2020-07-04" }
]

const thisWeek = [
    { transactionDate: "2020-08-05" }
]

const thisMonth = [
    { transactionDate: "2020-08-01" }
]

const lastMonth = [
    { transactionDate: "2020-07-01" }
]

const notThisYear = [
    { transactionDate: "2019-07-01" }
]

const dateRange = [
    { transactionDate: "2020-01-04" }, { transactionDate: "2019-02-06" }
]

describe('filters date', () => {
    it('should filter date', () => {
        var response = dateFilter(filter.DATE.TODAY, 'transactionDate', today)
        expect(response).toContain(today[0])
        response = dateFilter(filter.DATE.YESTERDAY, 'transactionDate', yesterday)
        expect(response).toContain(yesterday[0])
        response = dateFilter(filter.DATE["THIS WEEK"], 'transactionDate', thisWeek)
        expect(response).toContain(thisWeek[0])
        response = dateFilter(filter.DATE["THIS MONTH"], 'transactionDate', thisMonth)
        expect(response).toContain(thisMonth[0])
        response = dateFilter(filter.DATE["LAST MONTH"], 'transactionDate', lastMonth)
        expect(response).toContain(lastMonth[0])
        response = dateFilter(filter.DATE["LAST MONTH"], 'transactionDate', notThisYear)
        expect(response.length).toBe(0)
    })
})

describe('tests for advanced date filtering', () => {
    it('should fetch items based on date', () => {
        const startDate = "2020-01-01"
        const endDate = "2020-02-05"
        const response = advancedDateFilter([startDate, endDate], 'transactionDate', dateRange)
        expect(response).toContain(dateRange[0])
    })
})