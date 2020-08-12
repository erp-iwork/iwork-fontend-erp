import CustomProducts from '../../../../models/CustomProducts'

export const getAllCustomProducts = async () => {
    const products = await CustomProducts.find({})
    var mappedProducts = []
    products.forEach(product => {
        if (product.updated) {
            mappedProducts.push({
                orderID: product['orderID'],
                endDate: product['endDate'],
                productName: "Exported " + product['productName'],
                amount: product['components']['exportData']['amount'],
                percentile: product['components']['exportData']['percentage']
            })
    
            mappedProducts.push({
                orderID: product['orderID'],
                endDate: product['endDate'],
                productName: "Local " + product['productName'],
                amount: product['components']['localData']['amount'],
                percentile: product['components']['localData']['percentage']
            })
    
            mappedProducts.push({
                orderID: product['orderID'],
                endDate: product['endDate'],
                productName: "Wasted " + product['productName'],
                amount: product['components']['wastedData']['amount'],
                percentile: product['components']['wastedData']['percentage']
            })
        }
    })

    return mappedProducts
}