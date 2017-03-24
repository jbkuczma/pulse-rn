import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native';

import Header from '../Components/Header'
import SunGraph from '../Components/SunGraph'

import Time from '../Util/TimeFunctions'

var SunCalc = require('suncalc')

// import Footer from '../Components/Footer'

export default class MainWindow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      latitude: '',
      longitude: '',
      currentCity: '',
      sunsetStart: '',
      sunsetEnd: '',
      sunriseStart: '',
      sunriseEnd: '',
      daylength: '' //seconds
    }

  }

  componentWillMount() {
    navigator.geolocation.clearWatch();
    this.getUserCoordinates()  
  }

  checkDaylightSavings() {
    let today = new Date()
    let jan = new Date(new Date().getFullYear(), 0, 1)
    let jul = new Date(new Date().getFullYear(), 6, 1)
    let difference = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
    return today.getTimezoneOffset() < difference
  }

  getUserCoordinates() {
    navigator.geolocation.getCurrentPosition( (position) => {
      console.log(position)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }, () => {
          this.getSunriseAndSunsetTimes()
        })
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      )
  }

  getSunriseAndSunsetTimes() {
      let lat = this.state.latitude
      let lon = this.state.longitude
      let currentDate  = new Date()
      let offset = currentDate.getTimezoneOffset() / 60
      let times = SunCalc.getTimes(new Date(), lat, lon)
      let sunriseStart = times.sunrise
      let sunriseEnd = times.goldenHourEnd
      let sunsetStart = times.goldenHour
      let sunsetEnd = times.sunset
      let isDaylightSavings = this.checkDaylightSavings()

      if(isDaylightSavings) {
        offset = offset - 1
      }

      sunriseStart.setHours(sunriseStart.getHours() - offset)
      sunsetStart.setHours(sunsetStart.getHours() - offset)
      sunriseEnd.setHours(sunriseEnd.getHours() - offset)
      sunsetEnd.setHours(sunsetEnd.getHours() - offset)

      sunriseStart = sunriseStart.toLocaleTimeString()
      sunsetStart = sunsetStart.toLocaleTimeString()
      sunriseEnd = sunriseEnd.toLocaleTimeString()
      sunsetEnd = sunsetEnd.toLocaleTimeString()

      this.setState({
        sunriseStart: sunriseStart,
        sunsetStart: sunsetStart,
        sunriseEnd: sunriseEnd,
        sunsetEnd: sunsetEnd,
        dayLength: this.getDayLength(sunriseEnd, sunsetStart)
      }, () => {
        this.getCurrentCity()
      })
  }

  /* gets the length of time between the time of the sunrise ending and the sunset beginning */
  getDayLength(start, end){
    // let t1 = Time.HMStoSec1(start)
    // let t2 = Time.HMStoSec1(end)
    // let diff = t2 - t1
    // return diff
    return Time.getDifferenceBetweenTwoTimes(start, end)
  }

 

  /* to do */
  getCurrentCity() {
    let url = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&sensor=true`
    console.log(url)
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        let city = ''
        let state = ''
        // let city = data.results[0].address_components[2].long_name
        // let state = data.results[0].address_components[4].short_name
        let combined = city + ', ' + state
        this.setState({
          currentCity: combined
        })
      })
    // this.setState({
    //   currentCity: 'Buffalo'
    // })
  }

	render() {

		return (
			<View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <Header 
            city={this.state.currentCity}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
          />
        </View>
        <View style={styles.body}>
          <SunGraph 
            sunriseStart={this.state.sunriseStart} 
            sunsetStart={this.state.sunsetStart}
            sunriseEnd={this.state.sunriseEnd} 
            sunsetEnd={this.state.sunsetEnd}
            dayLength={this.state.dayLength}
          />
        </View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151719'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1,
    width: '100%',
    backgroundColor: '#121416'
  },
  body: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grayText: {
    color: '#EBECEB'
  }
});