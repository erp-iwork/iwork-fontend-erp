const transaction = {
    in: 'Receipents',
    out: 'Delivery'
}

export const transactionTypes = {
    'Reception': {
        value: transaction.in,
        tag: 'Reception'
    },
    'Withdrwal': {
        value: transaction.out,
        tag: 'Withdrwal'
    }
}

export default transaction