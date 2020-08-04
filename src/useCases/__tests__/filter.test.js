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
        expect(response).toContain(data[0])
    })
    
})
