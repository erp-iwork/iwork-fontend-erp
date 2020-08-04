const { dateFilter } = require('../index')
const filter = require('../../constant/filters').default

const today = [
    { transactionDate: "2020-07-04" }
]

const yesterday = [
    { transactionDate: "2020-07-03" }
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
    })
})


/*
    { transactionId: 1, transactionType: "Receipents", orderId: "1", transactionDate: "2020-06-05", productId: "5", productName: "Iron oxides and pigment pastes.", itemCost: 2.34, productCategory: "Row material", purchaseQuantity: "1", amount: 2.34 }
*/