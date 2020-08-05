export const getDateFormat = date => {
    var newDate = new Date(date)
    return "" + newDate.getDate() + "-" + (newDate.getMonth() + 1 ) + "-" + newDate.getFullYear()
}