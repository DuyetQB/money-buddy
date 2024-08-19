

 export const formattedDate = (date:any) =>{
 return date.toLocaleDateString('en-US', {
    weekday: 'short', // 'Fri'
    year: 'numeric',  // '2024'
    month: 'short',   // 'Aug'
    day: 'numeric'    // '16'
 })
 }