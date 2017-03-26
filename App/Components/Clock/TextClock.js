import React, {Component} from 'react';
import {
 Text
} from 'react-native'


export default class TextClock extends Component {

	constructor(props){
		super(props)
		const date = this.initializeDate()
		this.state = {
			hours: date[0],
			minutes: date[1],
			seconds: date[2],
			timeOfDay: date[3]
		}
			
	}

	updateTime( {hours, minutes, seconds, timeOfDay} ) {
		seconds+=1
		if(seconds == 60) {
			seconds = 0
			minutes+=1
		}
		if(minutes == 60) {
			minutes = 0
			hours+=1
		}
		if(hours == 12) {
			hour = 0
		}
		return {hours, minutes, seconds, timeOfDay}
	}

	componentDidMount(){
		this.interval = setInterval( () => {
			this.setState(this.updateTime(this.state))
		}, 1000)
	}

	initializeDate(){
		let date = new Date().toLocaleString().split(':')
		let timeOfDay = date[2].split(' ')[1]
		let seconds = date[2].split(' ')[0]
		let minutes = date[1]
		let hours = date[0].split(' ')[1]
		return [parseInt(hours), parseInt(minutes), parseInt(seconds), timeOfDay]
	}

	render() {

		let timeString = this.state.hours + ':' + this.state.minutes + ':' + this.state.seconds + ' ' + this.state.timeOfDay

		return (
			<Text> {timeString} </Text>
		)
	}
	

}