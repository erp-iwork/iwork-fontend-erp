import CustomProducts from '../../../models/CustomProducts'

export const addCustomProduct = async (orderID, productName, totalQuantity, endDate) => {
    const id =  await CustomProducts.countDocuments() + 1
    console.log(endDate)
    const newCustomProduct = {
        id, orderID, productName, totalQuantity, endDate,
        components: {
            exportData: {
                percentage: "0%",
                amount: "0"
            },
            localData: {
                percentage: "0%",
                amount: "0"
            },
            wastedData: {
                percentage: "0%",
                amount: "0"
            }
        },
        updated: false
    }
    try {
        await CustomProducts.insertOne(newCustomProduct)
        return newCustomProduct
    } catch (e) { return null }
}