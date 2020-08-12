const { filter } = require('../index')
const filters = require('../../constant/filters').default

const data = [
    { transactionId: 1, transactionType: "Receipents", orderId: "1", transactionDate: "2020-07-05", productId: "5", productName: "Iron oxides and pigment pastes.", itemCost: 2.34, productCategory: "Row material", purchaseQuantity: "1", amount: 2.34 }
]

describe('filter operations', () => {
    it('should filter date', () => {
        var response = filter({
            name: { value: 'Iro', tag: 'productName' },
            date: { value: filters.DATE["LAST MONTH"], tag: 'transactionDate' }
        }, data)
        console.log(response)
        expect(response).toContain(data[0])
    })
})

describe('sth', () => {
    it('should filter by date range', () => {
        const startDate = "2020-06-01"
        const endDate = "2020-08-05"
        var response = filter({
            name: { value: 'Iro', tag: 'productName' },
            advancedDate: {
                value: [startDate, endDate],
                tag: 'transactionDate'
            }
        }, data)

        expect(response).toContain(data[0])
    })
})

