export const getSupplierFormat = (data) => {
    return data.map(item => {
        return {
            ...item,
            supplierName: item.suplier.suplierName
        }
    })
}