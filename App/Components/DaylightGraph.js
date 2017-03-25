import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Time from '../Util/TimeFunctions'
import Graph from './Chart/Graph'
import Triangle from './Chart/Triangle'
import TimeFooter from './TimeFooter'

export default class DaylightGraph extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }

  createData() {
    let secondsInDay = 86400
    let data = []
    let morningGoldenHourSeconds = Time.getDifferenceBetweenTwoTimes(this.props.sunriseStart, this.props.sunriseEnd)
    let daylightSeconds = Time.getDifferenceBetweenTwoTimes(this.props.sunriseEnd, this.props.sunsetStart)
    let eveningGoldenHourSeconds = Time.getDifferenceBetweenTwoTimes(this.props.sunsetStart, this.props.sunsetEnd)
    let nighttimeSeconds = secondsInDay - morningGoldenHourSeconds - daylightSeconds - eveningGoldenHourSeconds

    data.push({value: morningGoldenHourSeconds, color: 'orange'})
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

    if(count === 4){
      return data
    }

    return []
  }

	render() {

    let data = this.createData()
    let colorMap = [
      '#F4511E', //golden
      '#ADABAB', //day
      '#F4511E', //golden
      '#242527'  //night
    ]
    
    // seems like a bad way to wait for the data to not be NaN
    if(data.length !== 0){
      return (
        <View style={styles.container}>
          <View style={styles.graph}>
            <Graph data={data} colorMap={colorMap} />
          </View>
          <View style={styles.triangle}>
            <Triangle />
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
        // will be loading view
        <View><Text>  </Text></View>
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
    transform: [
      {rotate: '-90deg'}
    ]
  },
  times: {
    flex: 0.3,
    flexDirection: 'row'
  },
  triangle: {
    flex: 0.4,
    alignItems: 'flex-start'
  }
});