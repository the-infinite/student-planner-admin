

/**
 * Helper function used to parse the time of a 
 */
export function parsePlatformTime(value: number): string {
  var hour = Math.floor(value / 100)
  var minute = value % 100
  const isPm = hour > 12

  //? If this is beyond 12
  if(hour > 12) {
    hour -= 12;
  }

  //? If this is zero-hour
  if(hour === 0) {
    hour = 12.
  }

  // Return this
  return  hour.toString().padStart(2, '0') + ":" + minute.toString().padStart(2, '0') + (isPm ? " PM" : " AM");
}