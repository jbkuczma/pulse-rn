let moment = require('moment')

export default class Time {
  static convertSecondsToHHMMSS(intSecondsToConvert) {
    let date = new Date(null)
    date.setSeconds(intSecondsToConvert)
    return date.toISOString().substr(11,8)
  }

  static HMStoSec1(T) { // h:m:s AM/PM
    // var A = T.split(':')
    // let B = A[2].split(' ')
    // let hours = A[0]
    // if(B[1] == 'PM') {
    //   hours+=12
    // }
    // let minutes = ((hours * 60) + A[1]) * 60
    // let seconds = B[0]
    // return minutes + seconds 
  }

  // difference is in seconds
  static getDifferenceBetweenTwoTimes(start, end){
    let t1 = moment(start, 'hh:mm:ss a')
    let t2 = moment(end, 'hh:mm:ss a')
    let t3 = t2.diff(t1, 'seconds')
    return t3
  }
}