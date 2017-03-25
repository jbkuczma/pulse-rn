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
			seconds: date[2]
		}
			
	}

	updateTime( {hours, minutes, seconds} ) {
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
		return {hours, minutes, seconds}
	}

	componentDidMount(){
		this.interval = setInterval( () => {
			this.setState(this.updateTime(this.state))
		}, 1000)
	}

	initializeDate(){
		let date = new Date()
		let seconds = date.getSeconds()
		let minutes = date.getMinutes()
		let hours = date.getHours()
		return [hours, minutes, seconds]
	}

	render() {

		let timeString = this.state.hours + ':' + this.state.minutes + ':' + this.state.seconds

		return (
			<Text> {timeString} </Text>
		)
	}
	

}