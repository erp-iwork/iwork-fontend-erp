import CustomProducts from '../../../models/CustomProducts'

export const updateCustomProduct = async (orderID, components) => {
    await CustomProducts.updateOne({ orderID }, { components, updated: true })
    return true
}