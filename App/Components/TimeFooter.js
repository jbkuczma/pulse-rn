import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class TimeFooter extends Component {

  removeSecondsFromTime(time) {
    let timeArray = time.split(':')
    return timeArray[0] + ':' + timeArray[1]
  }

  getTimeOfDay(time) {
    let timeArray = time.split(' ')
    return timeArray[1]
  }

	render() {

    let timeOfDay = this.getTimeOfDay(this.props.startTime)
    let isMorning = (timeOfDay == 'AM') ? true : false
    let timeOfDayStyle
    /* sets whether AM or PM should be highlgihted */
    if(isMorning){
      timeOfDayStyle = (
          <View style={styles.times}>
            <Text style={{color: '#EBECEB'}}> AM </Text>
            <Text style={{color: '#242527'}}> PM </Text>
          </View>
        )
    } else {
      timeOfDayStyle = (
          <View style={styles.times}>
            <Text style={{color: '#242527'}}> AM </Text>
            <Text style={{color: '#EBECEB'}}> PM </Text>
          </View>
        )
    }

    return (
      <View style={styles.container}>
        <View style={styles.times}>
          <Text style={styles.timeText}> {this.removeSecondsFromTime(this.props.startTime)} </Text>
          <Text style={styles.timeText}> to </Text>
          <Text style={styles.timeText}> {this.removeSecondsFromTime(this.props.endTime)} </Text>
        </View>
        {timeOfDayStyle}
      </View>
    )
	}
}
//#242527
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#151719'
  },
  timeText: {
    color: '#EBECEB'
  },
  times: {
    flexDirection: 'row'
  }
});