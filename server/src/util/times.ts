const convertUTCDateToLocalDate = async (date: any) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
}
export { convertUTCDateToLocalDate }