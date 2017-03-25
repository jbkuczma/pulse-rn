// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet
// } from 'react-native';

// import Time from '../Util/TimeFunctions'
// import Graph from './Chart/Graph'
// import Triangle from './Chart/Triangle'
// import TimeFooter from './TimeFooter'
// import PulseLoader from './PulseLoader/Loader'

// export default class DaylightGraph extends Component {

//   constructor(props){
//     super(props)
//     this.state = {
//       data: []
//     }
//   }

//   createData() {
//     let secondsInDay = 86400
//     let data = []
//     let morningGoldenHourSeconds = Time.getDifferenceBetweenTwoTimes(this.props.sunriseStart, this.props.sunriseEnd)
//     let daylightSeconds = Time.getDifferenceBetweenTwoTimes(this.props.sunriseEnd, this.props.sunsetStart)
//     let eveningGoldenHourSeconds = Time.getDifferenceBetweenTwoTimes(this.props.sunsetStart, this.props.sunsetEnd)
//     let nighttimeSeconds = secondsInDay - morningGoldenHourSeconds - daylightSeconds - eveningGoldenHourSeconds

//     data.push({value: morningGoldenHourSeconds, color: 'orange'})
//     data.push({value: daylightSeconds, color: 'gray'})
//     data.push({value: eveningGoldenHourSeconds, color: 'orange'})
//     data.push({value: nighttimeSeconds, color: 'black'})

//     let count = 0
//     for(var i = 0; i < data.length; i++){
//       if(isNaN(data[i].value)){
//         break
//       } else {
//         count+=1
//       }
//     }

//     if(count === 4){
//       return data
//     }

//     return []
//   }

// 	render() {

//     let data = this.createData()
//     let colorMap = [
//       '#F4511E', //golden
//       '#ADABAB', //day
//       '#F4511E', //golden
//       '#242527'  //night
//     ]
    
//     // seems like a bad way to wait for the data to not be NaN
//     if(data.length !== 0){
//       return (
//         <View style={styles.container}>
//           <View style={styles.graph}>
//             <Graph data={data} colorMap={colorMap} />
//           </View>
//           <View style={styles.triangle}>
//             <Triangle />
//           </View>
//           <View style={styles.timeTextView}>
//             <Text style={styles.timeText}> Time here from graph? </Text>
//           </View>
//           <View style={styles.times}>
//             <TimeFooter
//               startTime={this.props.sunriseStart} 
//               endTime={this.props.sunriseEnd} 
//             />
//             <TimeFooter 
//               startTime={this.props.sunsetStart} 
//               endTime={this.props.sunsetEnd} 
//             />
//           </View>
//         </View>
//       )
//     } else {
//       return(
//         <PulseLoader size={150} color='#F4511E' />
//       )
//     }
// 	}
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#151719'
//   },
//   headerText: {
//     color: '#EBECEB',
//     // fontSize: 24
//   },
//   graph: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     transform: [
//       {rotate: '90deg'}
//     ]
//   },
//   times: {
//     flex: 0.3,
//     flexDirection: 'row'
//   },
//   triangle: {
//     flex: 0.2,
//     alignItems: 'flex-start'
//   },
//   timeTextView: {
//     flex: 0.15
//   },
//   timeText: {
//     textAlign: 'center',
//     color: '#EBECEB',
//     fontSize: 20
//   }
// });



/* EXPERIMENTAL. ONE GRAPH FOR MORNING, ONE GRAPH FOR EVENING */


import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Time from '../Util/TimeFunctions'
import Graph from './Chart/Graph'
import TimeFooter from './TimeFooter'
import PulseLoader from './PulseLoader/Loader'
import Clock from './Clock/Clock'
import TextClock from './Clock/TextClock'

export default class DaylightGraph extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }

  createMorningData() {
    let secondsInHalfDay = 43200
    let data = []
    let morningGoldenHourSeconds = Time.getDifferenceBetweenTwoTimes(this.props.sunriseStart, this.props.sunriseEnd)
    let daylightSeconds = Time.getDifferenceBetweenTwoTimes(this.props.sunriseEnd, '11:59:59 AM')
    let nighttimeSeconds = secondsInHalfDay - morningGoldenHourSeconds - daylightSeconds

    data.push({value: nighttimeSeconds, color: 'black'})
    data.push({value: morningGoldenHourSeconds, color: 'orange'})
    data.push({value: daylightSeconds, color: 'gray'})
    

    let count = 0
    for(var i = 0; i < data.length; i++){
      if(isNaN(data[i].value)){
        break
      } else {
        count+=1
      }
    }

    if(count === 3){
      return data
    }

    return []
  }

  createEveningData() {
    let secondsInHalfDay = 43200
    let data = []
    let daylightSeconds = Time.getDifferenceBetweenTwoTimes('12:00:00 PM', this.props.sunsetStart)
    let eveningGoldenHourSeconds = Time.getDifferenceBetweenTwoTimes(this.props.sunsetStart, this.props.sunsetEnd)
    let nighttimeSeconds = secondsInHalfDay - daylightSeconds - eveningGoldenHourSeconds

    data.push({value: daylightSeconds, color: 'gray'})
    data.push({value: eveningGoldenHourSeconds, color: 'orange'})
    data.push({value: nighttimeSeconds, color: 'black'})
    
    
    let count = 0
    for(var i = 0; i < data.length; i++){
      if(isNaN(data[i].value)){
        break
      } else {
        count+=1
      }
    }

    if(count === 3){
      return data
    }

    return []
  }

  render() {

    let morningData = this.createMorningData()
    let morningColorMap = [
      '#242527',  //night
      '#F4511E', //golden
      '#ADABAB', //day 
    ]

    let eveningData = this.createEveningData()
    let eveningColorMap = [
      '#ADABAB', //day 
      '#F4511E', //golden
      '#242527' //night
    ]

    // seems like a bad way to wait for the data to not be NaN
    if(morningData.length !== 0){
      return (
        <View style={styles.container}>
          <View style={styles.graph}>
          <View style={styles.clock}>
              <Clock 
                size={160}
                radius={160}
                // color={'#151719'}
                color={'#ABC'} //temp so i can see what im doing
              />
            </View>
            <View style={styles.eveningGraph}>
              <Graph data={eveningData} colorMap={eveningColorMap} outerRadius={180} innerRadius={175}/>
            </View>

            <View style={styles.morningGraph}>
              <Graph data={morningData} colorMap={morningColorMap} outerRadius={90} innerRadius={85}/>
            </View>
            
            
          </View>
          <View style={styles.timeTextView}>
            <Text style={styles.timeText}> <TextClock /> </Text>
          </View>
          <View style={styles.times}>
            <TimeFooter
              startTime={this.props.sunriseStart} 
              endTime={this.props.sunriseEnd} 
            />
            <TimeFooter 
              startTime={this.props.sunsetStart} 
              endTime={this.props.sunsetEnd} 
            />
          </View>
        </View>
      )
    } else {
      return(
        <PulseLoader size={150} color='#F4511E' />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151719'
  },
  headerText: {
    color: '#EBECEB',
    // fontSize: 24
  },
  graph: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  morningGraph: {
    position: 'absolute',
    transform: [
      {rotate: '0deg'}
    ],
  },
  eveningGraph: {
    transform: [
      {rotate: '0deg'}
    ]
  },
  clock: {
    position: 'absolute'
  },
  times: {
    flex: 0.3,
    flexDirection: 'row'
  },
  timeTextView: {
    flex: 0.15
  },
  timeText: {
    textAlign: 'center',
    color: '#EBECEB',
    fontSize: 20
  }
});