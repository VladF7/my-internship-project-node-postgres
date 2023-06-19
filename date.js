import { format } from 'date-fns'

export const getFormatDateTime = (d) => {
  let date = new Date(d)
  let dd = date.getDate()
  let MM = date.getMonth() + 1
  let yyyy = date.getFullYear()
  let hours = date.getHours()
  if (dd < 10) dd = '0' + dd
  if (MM < 10) MM = '0' + MM
  if (hours < 10) hours = '0' + hours
  return (date = yyyy + '.' + MM + '.' + dd + ', ' + hours + ':' + '00')
}
export const getFormatDate = (d) => {
  const currentDateTime = new Date(d)
  currentDateTime.setHours(0, 0, 0, 0)
  const year = format(currentDateTime, 'yyyy')
  const month = format(currentDateTime, 'MM')
  const day = format(currentDateTime, 'dd')
  return year + '-' + month + '-' + day
}
export const getFormatTime = (d) => {
  let date = new Date(d)
  let hours = date.getHours()
  if (hours < 10) hours = '0' + hours
  return (date = hours + ':' + '00')
}
