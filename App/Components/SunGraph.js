import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Time from '../Util/TimeFunctions'
import Graph from './Chart/Graph'

// think of a better name for this component
export default class SunClock extends Component {

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
    // let data = [
    //   {label: 'fat', value: 55},
    //   {label: 'protein', value: 150},
    //   {label: 'carbohydrate', value: 255}
    // ]

    let data = this.createData()
    let colorMap = ['orange', 'gray', 'orange', 'black']
    
    // seems like a bad way to wait for the data to not be NaN
    if(data.length !== 0){
      return (
        <View style={styles.container}>
          <View style={styles.graph}>
            <Graph data={data} colorMap={colorMap} />
          </View>
          <View style={styles.times}>
            <Text style={styles.headerText}> {this.props.sunriseStart} </Text>
            <Text style={styles.headerText}> {this.props.sunriseEnd} </Text>
            <Text style={styles.headerText}> {this.props.sunsetStart} </Text>
            <Text style={styles.headerText}> {this.props.sunsetEnd} </Text>
          </View>
        </View>
      )
    } else {
      return(
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
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  times: {
    flex: 0.2,
    flexDirection: 'row'
  }
});