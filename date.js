module.exports = {
   getFormDate (d) {
    let date = new Date(d)
    let dd = date.getDate();
    let MM = date.getMonth() + 1; 
    let yyyy = date.getFullYear();
    let hours = date.getHours()
    if(dd < 10) dd = '0' + dd;
    if(MM < 10) MM = '0' + MM;
    if(hours < 10) hours = '0' + hours;
    return date = MM + '.' + dd + '.' + yyyy + ', ' + hours + ':' + '00';    
   },
   getDate (d) {
    let date = new Date(d)
    let dd = date.getDate();
    let mm = date.getMonth() + 1; 
    let yyyy = date.getFullYear();
    if(dd < 10) dd = '0' + dd;
    if(mm < 10) mm = '0' + mm;
    return date = dd + '.' + mm + '.' + yyyy;    
   },
   getTime (d) {
    let date = new Date(d)
    let hours = date.getHours()
    if(hours < 10) hours = '0' + hours;
    return date = hours + ':' + '00';    
   }
}

