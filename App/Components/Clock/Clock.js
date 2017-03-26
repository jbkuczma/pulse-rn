import React, {Component} from 'react';
import {
  ART
} from 'react-native'

import Svg,{
    Circle,
    G,
    Line
} from 'react-native-svg';

export default class Clock extends Component {

	constructor(props){
		super(props)
		const date = this.initializeDate()
		this.state = {
			hours: date[0],
			minutes: date[1],
			seconds: date[2],
			minuteHandLocation: 0,
			hourHandLocation: 0,
			secondHandLocation: 0
		}	
	}

	/* 
	 * update the actual value for hours, minutes, and seconds. 
	 * updated value is then used to determine the proper angle of each hand of the clock
	 */
	updateTime( {hours, minutes, seconds, hourHandLocation, minuteHandLocation, secondHandLocation} ) {
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
		secondHandLocation = seconds * 6
		hourHandLocation = (hours / 12) * 360
		minuteHandLocation = minutes * 6 + seconds / 60
		return {hours, minutes, seconds, hourHandLocation, minuteHandLocation, secondHandLocation}
	}

	/* update the hours, minutes, and seconds every second (1000ms) */
	componentDidMount(){
		this.interval = setInterval( () => {
			this.setState(this.updateTime(this.state))
		}, 1000)
	}

	componentWillMount() {
		this.setState(this.updateTime(this.state))
	}

	/* get the current hours, minutes, seconds */
	initializeDate(){
		let date = new Date()
		let seconds = date.getSeconds()
		let minutes = date.getMinutes()
		let hours = date.getHours()
		return [hours, minutes, seconds]
	}

	/*
	 * our minimal clock face (only clock hands, no ticks or digits)
	 * hierarchy for render: minutes hand -> hours hand -> seconds hand -> center point
	 */
	render() {
		const {radius} = this.props
		const {size} = this.props
		const width = size * 2
		const height = size * 2
		
		return (
			<Svg
			    width="320"
			    height="320"
			>
				
				<G rotate={this.state.minuteHandLocation} origin="160, 160">
				    <Line
				    	x1="160"
				    	y1="160"
				    	x2="160"
				    	y2="90"
				    	stroke="#565555"
				    	strokeWidth="2"
				    />
			    </G>
			    <G rotate={this.state.hourHandLocation} origin="160, 160">
				    <Line
				    	x1="160"
				    	y1="160"
				    	x2="160"
				    	y2="120"
				    	stroke="#BDBBBB"
				    	strokeWidth="2"
				    />
			    </G>
			    <G rotate={this.state.secondHandLocation} origin="160, 160">
				    <Line
				    	x1="160"
				    	y1="160"
				    	x2="160"
				    	y2="100"
				    	stroke="#848282"
				    	strokeWidth="2"
				    />
			    </G>
			    <Circle
			    	cx="160"
			    	cy="160"
			    	r="2"
			    	fill="#222222"
			    />
			</Svg>
		)
	}
}

