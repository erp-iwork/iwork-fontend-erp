import CustomProducts from '../../../models/CustomProducts'

export const identifyCustomProduct = async (orderID) => {
    const foundProduct = await CustomProducts.findOne({ orderID })
    if (!foundProduct) return false
    if (foundProduct.updated) return false
    return true
}