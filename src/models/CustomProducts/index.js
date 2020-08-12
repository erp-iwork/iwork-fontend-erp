import PerfectIndex from '../../frameworks/react-perfect-index/index'
import DB from './keys'

const getInstance = () => {
    const Database = new PerfectIndex({ name: DB.database.PRODUCTS })
    const CustomProducts = Database.useTable({ name: "custom_products", schema: {
        id: "number",
        orderID: "string",
        productName: "string",
        endDate: "string",
        components: "object",
        totalQuantity: "number",
        updated: "boolean"
    }})
    return CustomProducts
}

export default getInstance()