import CustomProducts from '../../../../models/CustomProducts'

export const getData = async () => {
    const data = await CustomProducts.find({})
    var mappedProducts = {
        maxAmount: 0,
        exported: [],
        local: [],
        wasted: []
    }
    var mappedData = {
        exportData: { amount: 0, percentage: 0 },
        localData: { amount: 0, percentage: 0 },
        wastedData: { amount: 0, percentage: 0 }
    }
    data.forEach(product => {
        for (var item in product.components) {
            mappedData[item].amount += parseFloat(
                product.components[item].amount
            )
            mappedData[item].percentage += parseFloat(
                product.components[item].percentage
            )
        }
    })


    return mappedData
}