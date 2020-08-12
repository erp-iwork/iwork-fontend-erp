const { getAllCustomProducts } = require('../getAllCustomProducts')

describe('operations on custom products', () => {
    it('should get all custom products', async () => {
        const response = await getAllCustomProducts()
        console.log(response)
    })
})