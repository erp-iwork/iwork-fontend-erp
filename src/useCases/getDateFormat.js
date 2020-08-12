export const getDateFormat = date => {
    var newDate = new Date(date)
    return "" +
        newDate.getDate() < 10? "0" + newDate.getDate() : newDate.getDate() + "-" +
        (newDate.getMonth() + 1 < 10? "0" + (newDate.getMonth() + 1) : newDate.getMonth() + 1 ) + "-" +
        newDate.getFullYear()
}