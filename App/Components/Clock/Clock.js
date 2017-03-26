import React, {Component} from 'react';
import {
  ART
} from 'react-native'

// const {
//   Shape,
//   Surface,
//   Path,
//   Group
// } = ART

import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

import * as d3 from 'd3'


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
			seconds: date[2],
			minuteHandLocation: 0,
			hourHandLocation: 0,
			secondHandLocation: 0
		}	
	}

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

	componentDidMount(){
		this.interval = setInterval( () => {
			this.setState(this.updateTime(this.state))
		}, 1000)
	}

	componentWillMount() {
		this.setState(this.updateTime(this.state))
	}

	initializeDate(){
		let date = new Date()
		let seconds = date.getSeconds()
		let minutes = date.getMinutes()
		let hours = date.getHours()
		return [hours, minutes, seconds]
	}

	render() {
		const {radius} = this.props
		const {size} = this.props
		const width = size * 2
		const height = size * 2
		
		// face -> minute hand -> hour hand -> center point
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
// return (
			
		// 	<Surface width={width} height={height}>
		// 		<Group>
		// 			<Shape
		// 				radius={size}
		// 				fill={this.props.color}
		// 				x={size}
		// 				y={size}	
		// 				d={path}
		// 			/>
		// 			<Shape
		// 				d={red}
		// 			/>
		// 		</Group>
		// 	</Surface>
		// )

