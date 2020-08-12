const { addCustomProduct } = require('../addCustomProduct')

describe('operations on custom products', () => {
    it('should add custom product', async () => {
        const orderID = 1
        const productName = "Ethiopian Coffee"
        const response = addCustomProduct(orderID, productName)
        expect(response).not.toBeNull()
    })
})