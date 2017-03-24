import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native';

import Header from '../Components/Header'
import DaylightGraph from '../Components/DaylightGraph'
import PulseLoader from '../Components/PulseLoader/Loader'

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
      daylength: '', //seconds
      loaded: false
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
    return Time.getDifferenceBetweenTwoTimes(start, end)
  }

  getCurrentCity() {
    let baseURL = 'http://query.yahooapis.com/v1/public/yql?q='
    let query = `select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(${this.state.latitude},${this.state.longitude})")&format=json&diagnostics=true&callback=`
    query = query.replace(/\ /g,'%20')
    query = query.replace(/\"/g, '%22')
    let url = baseURL + query
    fetch(url, {data: {format: 'json', q: query}})
      .then( (response) => response.json())
      .then( (data) => {
        let city = data.query.results.channel.location.city
        let region = data.query.results.channel.location.region
        let combined = city + ',' + region
        this.setState({
          currentCity: combined,
          loaded: true
        })
      })
  }

	render() {

    if(!this.state.loaded) {
      return (
        <PulseLoader size={150} color='#F4511E' />
      )
    }
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
          <DaylightGraph 
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