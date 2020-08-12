const { getSupplierFormat } = require('../getCustomFormat')

describe('operations on getCustomFormat', () => {
    it('should get supplier format', () => {
        const name = "Nigga"
        const data = {
            suplier: {
                suplierName: name
            },
            id: 12
        }
        const response = getSupplierFormat([data])
        expect(response[0].supplierName).toEqual(name)
    })
    
    
})
