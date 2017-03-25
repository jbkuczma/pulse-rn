import React, {Component} from 'react';
import {
  ART
} from 'react-native'

const {
  Shape,
  Surface,
  Path
} = ART


import SecondHand from './SecondHand'
import MinuteHand from './MinuteHand'
import HourHand from './HourHand'

export default class Clock extends Component {

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

	makeClock() {

	}


	render() {
		const {radius} = this.props
		const {size} = this.props
		const width = size * 2
		const height = size * 2
		
		const path = Path()
				.moveTo(0, -radius)
				.arc(0, radius * 2, radius)
				.arc(0, radius * -2, radius)
				.close()


		return (
			
			<Surface width={width} height={height}>
				<Shape
					radius={size}
					fill={this.props.color}
					x={size}
					y={size}	
					d={path}
				/>
			</Surface>
		)
	}
	

}

