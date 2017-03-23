import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native';

import Header from '../Components/Header'

var SunCalc = require('suncalc')

// import Footer from '../Components/Footer'

export default class MainWindow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      position: '',
      latitude: '',
      longitude: '',
      currentCity: '',
      sunset: '',
      sunrise: ''
    }

  }

  componentWillMount() {
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
    // return new Promise( (resolve) => {
    //   navigator.geolocation.getCurrentPosition( (position) => {
    //     this.setState({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude
    //     }, 
    //     () => { 
    //       resolve() 
    //     })
    //   },
    //   (error) => alert(JSON.stringify(error)),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    //   )
    // })

    navigator.geolocation.getCurrentPosition( (position) => {
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
      let sunrise = times.sunrise
      let sunset = times.sunset
      let isDaylightSavings = this.checkDaylightSavings()

      if(isDaylightSavings) {
        offset = offset - 1
      }

      sunrise.setHours(sunrise.getHours() - offset)
      sunset.setHours(sunset.getHours() - offset)

      sunrise = sunrise.toLocaleTimeString()
      sunset = sunset.toLocaleTimeString()

      this.setState({
        currentCity: 'Buffalo',
        sunrise: times.sunrise.toLocaleTimeString(),
        sunset: times.sunset.toLocaleTimeString()
      })
  }

	render() {

		return (
			<View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <Header city={this.state.currentCity}/>
        </View>
        <View style={styles.body}>
          <Text> {this.state.sunrise} </Text>
          <Text> {this.state.sunset} </Text>
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
    backgroundColor: '#F5FCFF',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1,
    width: '100%',
    backgroundColor: 'red'
  },
  body: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  }
});