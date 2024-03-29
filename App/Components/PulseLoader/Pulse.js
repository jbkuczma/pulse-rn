import React, {Component} from 'react';
import {
  Animated,
  ART,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

import Circle from './AnimatedCircle'

const {
  Surface
} = ART

export default class Pulse extends Component {

	constructor(props){
		super(props)
		this.state = {
			pulse: new Animated.ValueXY({
				x: 0.5,
				y: 1
			})
		}
	}

	componentDidMount() {
		this.animate()
	}

	componentWillUnmount() {
		this.unmounted = true
	}

	animate() {
		Animated.timing(this.state.pulse, {
			toValue: {
				x: 1,
				y: 0
			},
			duration: 1000
		})
		.start( () => {
			if(!this.unmounted) {
				this.state.pulse.setValue({
					x: 0,
					y: 1
				})
				this.animate()
			}
		})
	}

	render() {
		const {size, color} = this.props
		const {pulse} = this.state
		const width = size * 2
		const height = size * 2

		return (
			<Surface width={width} height={height}>
				<Circle
					radius={size}
					fill={color}
					scale={pulse.x}
					opacity={pulse.y}
					x={size}
					y={size}
				/>
			</Surface>
		)
	}
}